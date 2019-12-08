import getFinancialInstitutionNameFromEmail from '@/parser/utils/getFinancialInstitutionNameFromEmail';
import getRegexesForFinancialInstitution from '@/parser/utils/getRegexesForFinancialInstitution';
import parseAmountFromHtml from '@/parser/utils/parseAmountFromHtml';
import parseDescriptionFromHtml from '@/parser/utils/parseDescriptionFromHtml';
import { Transaction } from '@/types/piggybank';

export function parseTransactionFromPurchaseNotification(html: string) {
  const financialInstitutionName = getFinancialInstitutionNameFromEmail(html);
  console.log(`Financial institution name: ${financialInstitutionName}`);

  const regexes = getRegexesForFinancialInstitution(financialInstitutionName);
  const amount = Number(parseAmountFromHtml(html, regexes.amount));
  const description = parseDescriptionFromHtml(html, regexes.description);
  const transaction: Transaction = {
    amount,
    description,
    date: 'placeholder',
  };

  return transaction;
}
