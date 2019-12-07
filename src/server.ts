import * as express from 'express';
import * as multiparty from 'multiparty';

import { MailinFormData, MailinMsg } from '@/types/mailin';
import {
  ORIGINAL_SENDER_REGEX,
  PURCHASE_NOTIFICATION_REGEX_GROUPS as REGEX_GROUPS,
} from './purchaseNotificationRegexes';

function getFinancialInstitutionNameFromEmail(mailinMsg: MailinMsg) {
  const originalSender = mailinMsg.html.match(ORIGINAL_SENDER_REGEX);
  if (!originalSender) {
    // TODO: upload message to Sentry along with error
    console.log(mailinMsg.html);
    throw Error('Could not find original sender in email');
  }

  return originalSender[0];
}

function getRegexesForFinancialInstitution(name: string) {
  for (const property in REGEX_GROUPS) {
    if (REGEX_GROUPS.hasOwnProperty(property)) {
      const group = REGEX_GROUPS[property];
      if (name.match(group.financialInstitutionName).length > 0) {
        return group;
      }
    }
  }

  // A group of regexes should exist for every financial institution name
  // TODO: report these errors to Sentry so that the unknown financial institution
  // name can be mapped to a group of regexes
  throw new Error(
    `Could not find regex group for given financial instituion: ${name}`
  );
}

/* Make an http server to receive the webhook. */
const app = express();

app.head('/webhook', function (req, res) {
  console.log('Received head request from webhook.');
  res.sendStatus(200);
});

app.post('/webhook', function (req, res) {
  console.log('Receiving webhook.');

  // TODO: put a try/catch block around all of this and send
  // back an error status in the catch block
  /* Respond early to avoid timouting the mailin server. */
  res.sendStatus(200);

  /* Parse the multipart form. The attachments are parsed into fields and can
   * be huge, so set the maxFieldsSize accordingly. */
  const form = new multiparty.Form({
    maxFieldsSize: 70000000,
  });

  form.parse(req, function (err, fields: MailinFormData) {
    const mailinMsg = JSON.parse(fields.mailinMsg[0]) as MailinMsg;
    const financialInstitutionName = getFinancialInstitutionNameFromEmail(
      mailinMsg
    );
    console.log(`Financial institution name: ${financialInstitutionName}`);

    const regexes = getRegexesForFinancialInstitution(financialInstitutionName); \
    const matches = mailinMsg.html.match(regexes.amount);
    if (matches && matches.length > 0) {
      const amount = matches[0];
      console.log(`amount: ${amount}`);
    } else {
      console.log('No matches found.');
    }
  });
});

export default app;
