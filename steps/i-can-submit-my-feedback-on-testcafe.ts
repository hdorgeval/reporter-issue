import { getCurrentConfig } from '../config/testcafe-config';
import * as selector from '../selectors';
import { t } from 'testcafe';

/**
 * @step
 * @then("I can submit my feedback on testcafe")
 */
export default async (): Promise<void> => {
  // get the config that was injected into the fixture/test context by the feature
  const config = getCurrentConfig(t);
  await t
    .expect(selector.submitButton.hasAttribute('disabled'))
    .notOk({ timeout: config.timeout.longTimeout });
};
