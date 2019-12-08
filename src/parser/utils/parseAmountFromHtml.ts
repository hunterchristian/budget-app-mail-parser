export default function parseAmountFromHtml(html: string, amountRegex: RegExp) {
  const amount = html.match(amountRegex);
  if (!amount) {
    // TODO: log error in Sentry along with the html which failed the regex
    throw new Error(`Could not parse amount from html: ${html}`);
  }

  return amount[0];
}
