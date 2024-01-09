/**
 * Exstract data between XXX(YYYYY) expressions
 * @param key key to search in input
 * @param toParser input string
 * @returns the value of key in input
 */
export const parseBetweenBrackets = (key: string, toParser: string): string => {
  if (!key || !toParser) {
    return null;
  }
  toParser = toParser.trim();
  key = toParser.startsWith(key.trim()) ? key.trim() : " " + key.trim();
  if (toParser.includes(key)) {
    if (toParser.indexOf(key + "(") < 0) {
      return null;
    }
    let bracketsCounter = 1;
    let parsed: string = "";
    const value = toParser.substring(
      toParser.indexOf(key + "(") + key.length + 1
    );

    for (let i = 0; i < value.length; i++) {
      const c = value.charAt(i);
      if (c === "(") {
        bracketsCounter++;
      }
      if (c === ")") {
        bracketsCounter--;
      }

      if (bracketsCounter != 0) {
        parsed += c;
      } else {
        break;
      }
    }

    if (bracketsCounter != 0) {
      return null;
    } else {
      return parsed;
    }
  } else {
    return null;
  }
};

export interface Counter {
  nr: number;
}

/**
 * Creates a regular expression object, from a string un-escaped
 * @param s string to use for create regular expression (not escaped)
 * @param flags flags used for the regular expression
 * @returns the regular expression object
 */
export function getRegExpFromString(s: string, flags?: string): RegExp {
  return new RegExp(escapeRegExp(s), flags);
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
