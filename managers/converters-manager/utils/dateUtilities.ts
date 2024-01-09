/**
 * Convert D8YYMD date to Iso date
 * @param value
 * @returns
 */
export function d8YYMDToIso(value: string): string {
  if (!value) {
    return "";
  }
  value = value.trim();
  if (value == "0" || value == "00000000") {
    return "";
  }
  if (value.length > 7) {
    return `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(
      6,
      8
    )}`;
  }
  return value;
}
