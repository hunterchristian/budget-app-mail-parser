export default function parseAmount(regexSource: string, amountRegex: RegExp) {
  const amount = regexSource.match(amountRegex);
  if (!amount) {
    // TODO: log error in Sentry along with the text which failed the regex
    throw new Error('Could not parse amount.');
  }

  return amount[0];
}
