const MAX_SPLIT = 3;
const MAX_CHARS_IN_EXTRA_DATA = 400;

export default function split(
  text: string,
  callback: (text: string, index: number) => void
) {
  let remainingChars = text.length;
  let index = 0;
  while (remainingChars > 0 && index < MAX_SPLIT) {
    callback(
      text.substr(index * MAX_CHARS_IN_EXTRA_DATA, MAX_CHARS_IN_EXTRA_DATA),
      index
    );
    index += 1;
    remainingChars -= MAX_CHARS_IN_EXTRA_DATA;
  }
}
