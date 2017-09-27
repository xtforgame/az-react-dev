import { ServiceBase } from '../../azioc';
import {forceSync} from '../../core/config';
import credentials from './credentials';

export default class EnvCfg extends ServiceBase {
  static $name = 'envCfg';
  static $type = 'service';

  constructor(){
    super();
    this.credentials = credentials;
  }
}
