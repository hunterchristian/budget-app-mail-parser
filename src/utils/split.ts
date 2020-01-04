export default function split(
  text: string,
  numShift: number,
  callback: (text: string, index: number) => void
) {
  let remainingChars = text.length;
  let index = 0;
  while (remainingChars > 0) {
    callback(text.substr(index * numShift, numShift), index);
    index += 1;
    remainingChars -= numShift;
  }
}
