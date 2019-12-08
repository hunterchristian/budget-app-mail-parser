export default function parseDescriptionFromHtml(
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
