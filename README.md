# Issue with TestCafé Reporter

## This repo reproduces an issue with testcafe-reporter-cucumber-json

## After cloning the repo

- run the command `npm install`.

## To execute the tests locally

- setup the browserstack environment variables:

```sh
export BROWSERSTACK_USERNAME="foo"
export BROWSERSTACK_ACCESS_KEY="bar"
```

- execute tests

```sh
npm test
```

## To get the HTML report from the generated json files

```sh
npm run report
```

This will generate a nice and searchable HTML report like this ([more details here](https://github.com/hdorgeval/testcafe-reporter-cucumber-json)):

## The problem

Some screenshots are asked during test execution:

[screenshot 1](steps/i-enter-my-name.ts) |
[screenshot 2](steps/i-send-my-feedback-on-testcafe.ts) |
[screenshot 3](steps/a-xxx-message-should-appear-with-my-name.ts)
