import { ORIGINAL_SENDER_REGEX } from '@/purchaseNotificationRegexes';

export default function getFinancialInstitutionNameFromEmail(html: string) {
  const originalSender = html.match(ORIGINAL_SENDER_REGEX);
  if (!originalSender) {
    // TODO: upload message to Sentry along with error
    console.log(html);
    throw Error('Could not find original sender in email');
  }

  return originalSender[0];
}
