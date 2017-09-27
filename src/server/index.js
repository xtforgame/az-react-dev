import Azioc from './azioc';
import { httpPort, httpsPort } from './core/config';
// ============================================
import EnvCfg from './services/env-cfg';
import HttpApp from './services/http-app';
import RouterManager from './services/router-manager';
import {
  runningMode,
} from './common/core/config';

const ioc = new Azioc();
ioc.register([
  EnvCfg,
  HttpApp,
  RouterManager,
]);

ioc.start()
  .then(() => {
    console.log(`======= Running in the ${runningMode} mode =======`);
    console.log(`Express listening on http port ${httpPort}`);
    console.log(`Express listening on https port ${httpsPort}`);
  })
  .catch((error) => {
    console.log(error);
  });
