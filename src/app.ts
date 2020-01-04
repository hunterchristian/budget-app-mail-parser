import * as Sentry from '@sentry/node';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as multiparty from 'multiparty';

import split from './utils/split';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

// Setup Sentry
// https://sentry.io/hunterhodnett/budget-app/getting-started/node/
Sentry.init({
  dsn: 'https://325b6782cef54f818da07e0115b9e1f5@sentry.io/1849927',
});

import { parseTransactionFromPurchaseNotification } from '@/parser';
import { MailinFormData, MailinMsg } from '@/types/mailin';

// Helpers
function addMailinMsgToSentryScope(mailinMsg: MailinMsg) {
  Sentry.configureScope(function(scope) {
    scope.setExtra('mailinMsg.from[0].address', mailinMsg.from[0].address);
    scope.setExtra('mailinMsg.from[0].name', mailinMsg.from[0].name);
    scope.setExtra('mailinMsg.to[0].address', mailinMsg.to[0].address);
    scope.setExtra('mailinMsg.to[0].name', mailinMsg.to[0].name);
  });

  const MAX_EXTRA_DATA_LENGTH = 500;
  split(mailinMsg.text, MAX_EXTRA_DATA_LENGTH, (splitText, index) => {
    Sentry.configureScope(function(scope) {
      scope.setExtra(`mailinMsg.text${index}`, splitText);
    });
  });
}

/* Make an http server to receive the webhook. */
const app = express();

// TODO: Upload source maps to Sentry
// Sentry Express error handler
// https://docs.sentry.io/platforms/node/express/
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

app.head('/webhook', function(req, res) {
  console.log('Received head request from webhook.');
  res.sendStatus(200);
});

app.post('/webhook', function(req, res) {
  console.log('Receiving webhook.');

  // Respond early to avoid timing out the mailin server
  // TODO: send rejection response if email fails validation
  res.sendStatus(200);

  /* Parse the multipart form. The attachments are parsed into fields and can
   * be huge, so set the maxFieldsSize accordingly. */
  const form = new multiparty.Form({
    maxFieldsSize: 70000000,
  });

  form.parse(req, async function(err, fields: MailinFormData) {
    const mailinMsg = JSON.parse(fields.mailinMsg[0]) as MailinMsg;

    addMailinMsgToSentryScope(mailinMsg);

    try {
      const transaction = parseTransactionFromPurchaseNotification(mailinMsg);
      console.log(`Transaction: ${JSON.stringify(transaction)}`);

      // email is used as a username
      const username = mailinMsg.from[0].address;
      await db
        .collection(`${username}\\daily`)
        .doc(transaction.date)
        .set(
          {
            transactions: admin.firestore.FieldValue.arrayUnion(transaction),
          },
          { merge: true }
        );
    } catch (e) {
      console.error(e);
      Sentry.captureException(e);
    }
  });
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

export default app;
