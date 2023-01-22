export default function isANum(input: string): boolean {
  return !isNaN(parseFloat(input)) && isFinite(Number(input));
}
