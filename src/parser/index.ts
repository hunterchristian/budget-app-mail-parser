import getFinancialInstitutionNameFromEmail from '@/parser/utils/getFinancialInstitutionNameFromEmail';
import getRegexesForFinancialInstitution from '@/parser/utils/getRegexesForFinancialInstitution';
import parseAmountFromHtml from '@/parser/utils/parseAmountFromHtml';
import parseDateFromHtml from '@/parser/utils/parseDateFromHtml';
import parseDescriptionFromHtml from '@/parser/utils/parseDescriptionFromHtml';
import { Transaction } from '@/types/piggybank';
import * as uuidv4 from 'uuid/v4';

export function parseTransactionFromPurchaseNotification(html: string) {
  const financialInstitutionName = getFinancialInstitutionNameFromEmail(html);
  console.log(`Financial institution name: ${financialInstitutionName}`);

  const regexes = getRegexesForFinancialInstitution(financialInstitutionName);
  const amount = Number(parseAmountFromHtml(html, regexes.amount));
  const description = parseDescriptionFromHtml(html, regexes.description);
  const date = parseDateFromHtml(html, regexes.date);
  const transaction: Transaction = {
    amount,
    description,
    date,
    source: financialInstitutionName,
    id: uuidv4(),
  };

  return transaction;
}
