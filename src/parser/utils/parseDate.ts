import { FieldTransformation } from '../regexes';

export default function parseDate(
  regexSource: string,
  dateRegex: RegExp,
  dateTransformation: Maybe<FieldTransformation>
) {
  const date = regexSource.match(dateRegex);
  if (!date) {
    // TODO: log error in Sentry along with the text which failed the regex
    throw new Error('Could not parse date.');
  }

  const parsedDate = date[0];
  if (dateTransformation) {
    return dateTransformation(parsedDate);
  }

  return parsedDate;
}
