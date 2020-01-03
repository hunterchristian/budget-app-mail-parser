// TODO: replace regexes with String.indexOf() lookups for vastly improved performance

type MailinMsgRegexSource = 'html' | 'text';

export type FieldTransformation = (rawField: string) => string;

export interface EmailRegexGroup {
  financialInstitutionName: RegExp;
  amount: RegExp;
  // Purchase descriptions are sent in multiple different formats
  description: RegExp[];
  date: RegExp;
  // American Express doesn't include purchase information in the 'text' field of the email, but Wells Fargo does
  operatesOn: MailinMsgRegexSource;
  transformations: ImmutableRecord<string, FieldTransformation>;
}

const AMERICAN_EXPRESS_REGEX_GROUP: EmailRegexGroup = {
  financialInstitutionName: /American Express/g,
  amount: /(?<=\n\$)(.*?)(?=\*)/g,
  description: [/(?<=have been present\n)(.*?)(?=\n)/g],
  date: /(?<=\d\*\n)(.*?)(?=\n\*)/g,
  operatesOn: 'text',
  transformations: {
    date: (date: string) => new Date(date).toDateString(),
  },
};

const WELLS_FARGO_REGEX_GROUP: EmailRegexGroup = {
  financialInstitutionName: /Wells Fargo Online/g,
  amount: /(?<=\*Purchase amount\*\s)(.*?)(?=\sUSD)/g,
  description: [
    /(?<=\*Purchase method\*\sat\s)(.*?)(?=\n)/g,
    /(?<=\*Purchase location\*\sat\s)(.*?)(?=\n)/g,
  ],
  date: /(?<=\*Date\*\s)(.*?)(?=\n)/g,
  operatesOn: 'text',
  transformations: {
    date: (date: string) => new Date(date).toDateString(),
  },
};

export const PURCHASE_NOTIFICATION_REGEX_GROUPS: ImmutableRecord<
  string,
  EmailRegexGroup
> = {
  AMERICAN_EXPRESS_REGEX_GROUP,
  WELLS_FARGO_REGEX_GROUP,
};

// TODO: format is unique to GMail. Figure out how to extract
// name from email providers other than GMail.
export const ORIGINAL_SENDER_REGEX = /(?<=From: <strong class="gmail_sendername" dir="auto">)(.*?)(?=<\/strong>)/g;
