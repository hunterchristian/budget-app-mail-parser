import { ORIGINAL_SENDER_REGEX } from '@/parser/regexes';

export default function getFinancialInstitutionNameFromEmail(html: string) {
  const originalSender = html.match(ORIGINAL_SENDER_REGEX);
  if (!originalSender) {
    // TODO: upload message to Sentry along with error
    throw Error('Could not find original sender in email');
  }

  return originalSender[0];
}
