# Issue with TestCafé Reporter

## This repo reproduces an issue with testcafe-reporter-cucumber-json

This issue is not specific to this specific reporter, but to any TestCafé reporter.

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

At the end of test execution, there are three screenshots inside the screenshots folder, but none of these screenshots has been passed to the reporter; instead the reporter receives only some warnings:

```txt
"Was unable to take a screenshot due to an error.\n\nError: Unable to locate the page area in the browser window screenshot at /Users/HDO/VSCodeProjects/reporter-issue/screenshots/2020-07-17_19-04-59/test-1/Chrome_83.0.4103.106_Android_9/1.png, because the page area mark with ID 2292367756 is not found in the screenshot.\n    at calculateClipInfo (/Users/HDO/VSCodeProjects/reporter-issue/node_modules/testcafe/src/screenshots/crop.js:114:19)\n    at Object.cropScreenshot (/Users/HDO/VSCodeProjects/reporter-issue/node_modules/testcafe/src/screenshots/crop.js:131:18)\n    at /Users/HDO/VSCodeProjects/reporter-issue/node_modules/testcafe/src/screenshots/capturer.js:137:40\n    at processTicksAndRejections (internal/process/task_queues.js:93:5)",

"Was unable to take a screenshot due to an error.\n\nErrUnable to locate the page area in the browser winscreenshot at /Users/HDO/VSCodeProjects/reporter-isscreenshots/2020-07-17_19-04-59/test-1/Chrome_83.0.4106_Android_9/2.png, because the page area mark with4066688373 is not found in the screenshot.\n   calculateClipInfo (/Users/HDO/VSCodeProjects/reporter-isnode_modules/testcafe/src/screenshots/crop.js:114:19)\nat Object.cropScreenshot (/Users/HDO/VSCodeProjereporter-issue/node_modules/testcafe/src/screenshots/cjs:131:18)\n    at /Users/HDO/VSCodeProjects/reporter-isnode_modules/testcafe/src/screenshots/captujs:137:40\n    at processTicksAndRejections (interprocess/task_queues.js:93:5)",

"Was unable to take a screenshot due to an error.\n\nErrUnable to locate the page area in the browser winscreenshot at /Users/HDO/VSCodeProjects/reporter-isscreenshots/2020-07-17_19-04-59/test-1/Chrome_83.0.4106_Android_9/3.png, because the page area mark with4249869253 is not found in the screenshot.\n   calculateClipInfo (/Users/HDO/VSCodeProjects/reporter-isnode_modules/testcafe/src/screenshots/crop.js:114:19)\nat Object.cropScreenshot (/Users/HDO/VSCodeProjereporter-issue/node_modules/testcafe/src/screenshots/cjs:131:18)\n    at /Users/HDO/VSCodeProjects/reporter-isnode_modules/testcafe/src/screenshots/captujs:137:40\n    at processTicksAndRejections (interprocess/task_queues.js:93:5)"
```

Here is an excerpt of the testRunInfo object passed to the reporter on `reportTestDone` hook:

```txt
{
  errs: [],
  warnings: [
    'Was unable to take a screenshot due to an error.\n' +
      '\n' +
      'Error: Unable to locate the page area in the browser window screenshot at /Users/HDO/VSCodeProjects/testcafe-starter/screenshots/2020-07-17_18-34-09/test-2/Chrome_83.0.4103.106_Android_9/1.png, because the page area mark with ID 1341325899 is not found in the screenshot.\n' +
      '    at calculateClipInfo (/Users/HDO/VSCodeProjects/testcafe-starter/node_modules/testcafe/src/screenshots/crop.js:114:19)\n' +
      '    at Object.cropScreenshot (/Users/HDO/VSCodeProjects/testcafe-starter/node_modules/testcafe/src/screenshots/crop.js:131:18)\n' +
      '    at /Users/HDO/VSCodeProjects/testcafe-starter/node_modules/testcafe/src/screenshots/capturer.js:137:40\n' +
      '    at processTicksAndRejections (internal/process/task_queues.js:93:5)',
    'Was unable to take a screenshot due to an error.\n' +
      '\n' +
      'Error: Unable to locate the page area in the browser window screenshot at /Users/HDO/VSCodeProjects/testcafe-starter/screenshots/2020-07-17_18-34-09/test-2/Chrome_83.0.4103.106_Android_9/2.png, because the page area mark with ID 3129705498 is not found in the screenshot.\n' +
      '    at calculateClipInfo (/Users/HDO/VSCodeProjects/testcafe-starter/node_modules/testcafe/src/screenshots/crop.js:114:19)\n' +
      '    at Object.cropScreenshot (/Users/HDO/VSCodeProjects/testcafe-starter/node_modules/testcafe/src/screenshots/crop.js:131:18)\n' +
      '    at /Users/HDO/VSCodeProjects/testcafe-starter/node_modules/testcafe/src/screenshots/capturer.js:137:40\n' +
      '    at runMicrotasks (<anonymous>)\n' +
      '    at processTicksAndRejections (internal/process/task_queues.js:93:5)'
  ],
  durationMs: 18870,
  unstable: undefined,
  screenshotPath: null,
  screenshots: [],
  videos: [],
  quarantine: null,
  skipped: false,
  browsers: [
    {
      testRunId: 'gSunaoSAb',
      name: 'Chrome',
      version: '83.0.4103.106',
      platform: 'mobile',
      os: [Object],
      engine: [Object],
      prettyUserAgent: 'Chrome 83.0.4103.106 / Android 9',
      userAgent: 'Mozilla/5.0 (Linux; Android 9; Redmi Note 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36',
      alias: 'browserstack:Xiaomi Redmi Note 8',
      headless: false
    }
  ],
  testId: 'WDhEFsT'
}
```

## Expected behavior

Screenshots should be passed to the reporter even when there are problems while post-processsing them.
