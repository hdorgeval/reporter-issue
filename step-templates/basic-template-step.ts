import { Config } from '../config/config.interface';
import { getCurrentConfig } from '../config/testcafe-config';
import { PageModel } from '../models';
import * as selector from '../selectors';
import { firstMatch } from '../tools/regex-match';
import { t } from 'testcafe';

/**
 * @step
 * @given("I do something")
 */
export default async (stepName: string): Promise<void> => {
  // get the config that was injected into the fixture context by the feature
  const config: Config = getCurrentConfig(t);

  // get the page object model that was injected in the test context
  const inputData = t.ctx.inputData as PageModel;

  // extract the value embedded in the step name
  // by convention this value is prefixed and postfixed by a single quote
  const value = firstMatch(/'.*'/g, stepName);
  if (value === null) {
    throw new Error(`Cannot extract value from the step name "${stepName}"`);
  }

  // you may use the Visual Studio Code Extension Testcafe Snippets
  // to help you write your tests

  await t
    .setTestSpeed(config.testSpeed)
    .hover(selector.firstInputBox)
    .expect(selector.firstInputBox.hasAttribute('disabled'))
    .notOk({ timeout: config.timeout.longTimeout })
    .typeText(selector.firstInputBox, value, { replace: true })
    .pressKey('tab');

  if (inputData.name) {
    await t
      .setTestSpeed(config.testSpeed)
      .hover(selector.secondInputBox)
      .expect(selector.secondInputBox.hasAttribute('disabled'))
      .notOk({ timeout: config.timeout.longTimeout })
      .typeText(selector.secondInputBox, inputData.name, { replace: true })
      .pressKey('tab');
  }
};
