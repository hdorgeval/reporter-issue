import { Config } from '../config/config.interface';
import { TargetEnvironnement } from '../config/environments';
import { getCurrentConfig } from '../config/testcafe-config';
import { t } from 'testcafe';
import * as chalk from 'chalk';

export const env: { only: (...targets: TargetEnvironnement[]) => void } = {
  only: async (...targets: TargetEnvironnement[]): Promise<void> => {
    const config: Config = getCurrentConfig(t);
    if (config.env === undefined) {
      throw new Error('The env property in the configuration file is not defined.');
    }
    if (config.env.name === 'any') {
      // filters are bypassed if the environment in the configuration file is any
      t.ctx.canExecute = true;
      return;
    }
    if (targets.length === 0) {
      return;
    }
    t.ctx.canExecute = false;
    for (const target of targets) {
      if (config.env.name === target) {
        t.ctx.canExecute = true;
      }
      if (target === 'any') {
        t.ctx.canExecute = true;
      }
    }
    if (t.ctx.canExecute === false) {
      const message = `next steps will not run because scenario is targeted only for ${targets}`;

      // eslint-disable-next-line no-console
      console.log(`    ${chalk.inverse(message)}`);
    }
  },
};
