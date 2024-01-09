# TESTING

## E2E

For e2e is used [Cypress](https://www.cypress.io/).

Skill yourself about Cypress e2e reading: https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test.

## Configuration

Currently e2e are built on a webup.js with a smeup backend (https://webuptest.smeup.com/openproxy).

So put in your {user.home}/etc/[WEBUPJS_APP_CONTEXT]/config.json the same configs used for https://webuptest.smeup.com/webup-js-smeup

Then create a `cypress.env.json` file on the root of the project and put inside it the credentials of the smeup showcase user:

```
{
  "test_user_name": "XXX",
  "test_user_password": "XXX",
  "test_user_env": "XXX"
}
```

## Useful commands

- It opens Cypress GUI (tests work if you have the webup.js app served)

```
npm run cy:open
```

- It runs Cypress tests headlessly (tests work if you have the webup.js app served)

```
npm run cy:run
```

- It starts your app and opens Cypress GUI

```
npm run e2e:open
```

- It starts your app and runs Cypress tests headlessly

```
npm run e2e:run
```

## Jest

For ut is used [Jest](https://jestjs.io).

## Useful commands

To run all unit tests use:

```
npm run test:ci
```

You can find a junit like report and an html report inside ./target/reports dir
TODO: setup creation better!!!

To run with code coverage use:

```
npm run test:coverage:report
```

You can find a coverage report inside ./target/coverage

## To run or debug test using VS Code

- Ensure the test file you want to run is open and in the current active window in VS Code.

- Set breackpoints

- Go to Run and Debug menu.

- Select the 'Spec Test Current File' (in Run or Debug mode as you want)

- Press F5 for launch

## Test Style Guide

Unit tests are in ./jest/unit dir. File names start with src files tested.

Mocked data are in ./assets:

- backend data in ./backend-data in \*.ts files
- frontend (ketchup format) data in ./kup-data in \*.ts files
- utility methods for components management in ./components in \*.ts files

Backend data to frontend data converters tests are in ./converters/components
Utility methods tests are in ./utils

If you write new tests keep them uniform to boxListConverter.test.ts.

Jest Unit Test Report inside ./target/jest dir must be easily understandable.
TODO: setup creation better!!!

## TODO

- Coverage seems not to work correctly
