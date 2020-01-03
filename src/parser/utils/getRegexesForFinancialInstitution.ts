import { PURCHASE_NOTIFICATION_REGEX_GROUPS as REGEX_GROUPS } from '@/parser/regexes';

export default function getRegexesForFinancialInstitution(name: string) {
  for (const property in REGEX_GROUPS) {
    if (REGEX_GROUPS.hasOwnProperty(property)) {
      const group = REGEX_GROUPS[property];
      if (name.match(group.financialInstitutionName)) {
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
