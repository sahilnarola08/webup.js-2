/**
 * Exstract data between XXX(YYYYY) expressions
 * @param key key to search in input
 * @param toParser input string
 * @returns the value of key in input
 */
export const parseBetweenBrackets = (key: string, toParser: string): string => {
  if (toParser.includes(key)) {
    if (toParser.indexOf(key + "(") < 0) {
      return null;
    }
    let bracketsCounter = 1;
    let parsed: string = "";
    const value = toParser.substring(
      toParser.indexOf(key + "(") + key.length + 1,
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

/** Capturing [ABC] expression */
export const parseBetweenSquareBrackets = (toParser: string): string[] => {
  const expressions: string[] = [];
  if (toParser.includes("[")) {
    const regex = /\[([^\][]*)]/g;
    let m: RegExpExecArray;
    while ((m = regex.exec(toParser))) {
      expressions.push(m[1]);
    }
  }
  return expressions;
};

/**
 * Is string blank ?
 * @param value
 * @returns
 */
export const isBlank = (value: string) => {
  if (!value || value === "") {
    return true;
  } else {
    return false;
  }
};
