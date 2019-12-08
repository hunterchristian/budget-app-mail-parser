import getFinancialInstitutionNameFromEmail from '@/parser/utils/getFinancialInstitutionNameFromEmail';
import { PURCHASE_NOTIFICATION_REGEX_GROUPS as REGEX_GROUPS } from '@/purchaseNotificationRegexes';
import { Transaction } from '@/types/piggybank';

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

function parseAmountFromHtml(html: string, amountRegex: RegExp) {
  const amount = html.match(amountRegex);
  if (!amount) {
    // TODO: log error in Sentry along with the html which failed the regex
    throw new Error(`Could not parse amount from html: ${html}`);
  }

  return amount[0];
}

function parseDescriptionFromHtml(
  html: string,
  descriptionRegexes: RegExp[]
): string {
  let description: RegExpMatchArray;
  for (const regex of descriptionRegexes) {
    description = html.match(regex);
    if (description) {
      break;
    }
  }

  if (!description) {
    // TODO: log error in Sentry along with the html which failed the regex
    throw new Error(`Could not parse description from html: ${html}`);
  }

  return description[0];
}

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
