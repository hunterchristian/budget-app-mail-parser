export interface PurchaseNotificationEmailRegexGroup {
  financialInstitutionName: RegExp;
  amount: RegExp;
  // Sometimes descriptions are displayed as links in American Express
  description: RegExp[];
}

const AMERICAN_EXPRESS_REGEX_GROUP: PurchaseNotificationEmailRegexGroup = {
  financialInstitutionName: /American Express/g,
  amount: /(?<=<p align="right" style="margin-top:0px;font-family:Arial;margin-bottom:0px;font-size:13pt;color:black"><b>\$)(.*?)(?=\*<\/b><\/p>)/g,
  description: [
    /(?<=" shape="rect" target="_blank">)(.*)(?=<\/a><\/b>)/g,
    /(?<=<p align="left" style="margin-top:0px;font-family:Arial;margin-bottom: 0px;font-size: 13pt;color: #006fcf"><b>)(.*)(?=<\/b><\/p>)/g,
  ],
};

export const PURCHASE_NOTIFICATION_REGEX_GROUPS: ImmutableRecord<
  string,
  PurchaseNotificationEmailRegexGroup
> = {
  AMERICAN_EXPRESS_REGEX_GROUP,
};

// TODO: format is unique to GMail. Figure out how to extract
// name from email providers other than GMail.
export const ORIGINAL_SENDER_REGEX = /(?<=---------- Forwarded message ---------<br>From: <strong class="gmail_sendername" dir="auto">)(.*?)(?=<\/strong>)/g;
