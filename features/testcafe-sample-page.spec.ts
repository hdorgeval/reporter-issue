import 'testcafe';
import { getCurrentConfig } from '../config/testcafe-config';
import { pageModel } from '../models';
import { given, then, when } from '../step-runner';
declare const fixture: FixtureFn;
/**
 * @feature
 */
fixture('Feature: TestCafe Example')
  .before(async (ctx) => {
    // inject global configuration in the fixture context
    ctx.config = getCurrentConfig();
  })
  .beforeEach(async (t) => {
    // inject page model in the test context
    t.ctx.inputData = pageModel;
    await given('I navigate to the testcafe sample page');
  });

test('Scenario: send feedback', async () => {
  await given('I enter my name');
  await when('I send my feedback on testcafe');
  await then("a 'Thank you' message should appear with my name");
});
