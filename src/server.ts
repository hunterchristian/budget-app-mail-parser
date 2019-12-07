import * as express from 'express';
import * as multiparty from 'multiparty';

import { MailinFormData, MailinMsg } from '@/types/mailin';
import { AMERICAN_EXPRESS_REGEXES } from './regexes';

/* Make an http server to receive the webhook. */
const app = express();

app.head('/webhook', function (req, res) {
  console.log('Received head request from webhook.');
  res.sendStatus(200);
});

app.post('/webhook', function (req, res) {
  console.log('Receiving webhook.');

  /* Respond early to avoid timouting the mailin server. */
  // res.send(200);

  /* Parse the multipart form. The attachments are parsed into fields and can
   * be huge, so set the maxFieldsSize accordingly. */
  const form = new multiparty.Form({
    maxFieldsSize: 70000000,
  });

  form.parse(req, function (err, fields: MailinFormData) {
    const mailinMsg = JSON.parse(fields.mailinMsg[0]) as MailinMsg;
    const matches = mailinMsg.html.match(AMERICAN_EXPRESS_REGEXES.amount);
    if (matches && matches.length > 0) {
      const amount = matches[0];
      console.log(`amount: ${amount}`);
    } else {
      console.log('No matches found.');
    }

    res.sendStatus(200);
  });
});

export default app;
