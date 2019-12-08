export default function parseDateFromHtml(html: string, dateRegex: RegExp) {
  const date = html.match(dateRegex);
  if (!date) {
    // TODO: log error in Sentry along with the html which failed the regex
    throw new Error('Could not parse date from html.');
  }

  return date[0];
}
