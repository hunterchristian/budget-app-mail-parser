import getFinancialInstitutionNameFromEmail from '@/parser/utils/getFinancialInstitutionNameFromEmail';
import getRegexesForFinancialInstitution from '@/parser/utils/getRegexesForFinancialInstitution';
import parseAmount from '@/parser/utils/parseAmount';
import parseDate from '@/parser/utils/parseDate';
import parseDescription from '@/parser/utils/parseDescription';
import { MailinMsg } from '@/types/mailin';
import { Transaction } from '@/types/piggybank';
import * as uuidv4 from 'uuid/v4';

export function parseTransactionFromPurchaseNotification(mailinMsg: MailinMsg) {
  const financialInstitutionName = getFinancialInstitutionNameFromEmail(
    mailinMsg.html
  );
  console.log(`Financial institution name: ${financialInstitutionName}`);

  const regexes = getRegexesForFinancialInstitution(financialInstitutionName);
  const { transformations } = regexes;
  const regexSource = mailinMsg[regexes.operatesOn];
  const amount = Number(parseAmount(regexSource, regexes.amount));
  const description = parseDescription(regexSource, regexes.description);
  const date = parseDate(regexSource, regexes.date, transformations.date);
  const transaction: Transaction = {
    amount,
    description,
    date,
    source: financialInstitutionName,
    id: uuidv4(),
  };

  return transaction;
}
