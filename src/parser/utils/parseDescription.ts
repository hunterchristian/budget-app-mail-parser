export default function parseDescription(
  regexSource: string,
  descriptionRegexes: RegExp[]
): string {
  let description: RegExpMatchArray;
  for (const regex of descriptionRegexes) {
    description = regexSource.match(regex);
    if (description) {
      break;
    }
  }

  if (!description) {
    // TODO: log error in Sentry along with the text which failed the regex
    throw new Error('Could not parse description.');
  }

  return description[0];
}
