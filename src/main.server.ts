import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

import Amplify from "@aws-amplify/core"
import awsExports from './aws-exports';

Amplify.configure({
  ...awsExports,
  Analytics: { 
      disabled: true
  }
});
if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
