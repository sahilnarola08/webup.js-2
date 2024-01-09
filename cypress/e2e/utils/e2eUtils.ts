export const getBaseUrl = () => {
  return (
    "http" +
    "://" +
    "localhost" +
    ":" +
    Cypress.env("PORT") +
    "/" +
    Cypress.env("WEBUPJS_APP_CONTEXT")
  );
};

export const cyEnterKey = "{enter}";
