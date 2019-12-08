import * as express from 'express';
import * as multiparty from 'multiparty';

import { parseTransactionFromPurchaseNotification } from '@/parser';
import { MailinFormData, MailinMsg } from '@/types/mailin';

/* Make an http server to receive the webhook. */
const app = express();

app.head('/webhook', function(req, res) {
  console.log('Received head request from webhook.');
  res.sendStatus(200);
});

app.post('/webhook', function(req, res) {
  console.log('Receiving webhook.');
  try {
    /* Parse the multipart form. The attachments are parsed into fields and can
     * be huge, so set the maxFieldsSize accordingly. */
    const form = new multiparty.Form({
      maxFieldsSize: 70000000,
    });

    form.parse(req, function(err, fields: MailinFormData) {
      const mailinMsg = JSON.parse(fields.mailinMsg[0]) as MailinMsg;
      console.log(`MailinMsg: ${mailinMsg}`);
      const transaction = parseTransactionFromPurchaseNotification(
        mailinMsg.html
      );
      console.log(`Transaction: ${JSON.stringify(transaction)}`);

      res.sendStatus(200);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default app;
