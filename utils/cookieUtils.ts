/**
 * Get cookie by name
 * @param name
 * @returns
 */
const getCookie = (name: string): string | undefined => {
  if (document) {
    const cname = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return decodeURIComponent(c.substring(cname.length, c.length));
      }
    }
  }
};

/**
 * Set cookie
 * @param name
 * @param value
 * @param expirationDateUTCString string date as UTC
 */
const setCookie = (
  name: string,
  value: string,
  expirationDateUTCString?: string,
) => {
  if (document) {
    if (expirationDateUTCString) {
      document.cookie = `${name}=${encodeURIComponent(
        value,
      )};Expires=${expirationDateUTCString}`;
    } else {
      document.cookie = `${name}=${encodeURIComponent(value)}`;
    }
  }
};

/**
 * Delete cookie by name
 * @param name
 * @returns
 */
const deleteCookie = (name: string) => {
  if (document) {
    const d = new Date(Date.now() - 1);
    document.cookie = `${name}=; expires=${d.toUTCString()}`;
  }
};

const CookieUtils = {
  getCookie,
  setCookie,
  deleteCookie,
};

export default CookieUtils;
