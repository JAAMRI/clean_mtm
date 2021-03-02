import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AuthGuard } from './guards/auth.guard';
import { FooterModule } from './modules/shared/footer/footer.module';
import { AccountService } from './services/account/account.service';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader/dynamic-script-loader.service';
import { SeoService } from './services/seo.service';

export class StandardUrlSerializer implements UrlSerializer {
    private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    parse(url: string): UrlTree {
       url = url.replace(/\(/g, "").replace(/\)/g, "");
       return this._defaultUrlSerializer.parse(url);
    }

    serialize(tree: UrlTree): string {
       return this._defaultUrlSerializer.serialize(tree);
    }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    FooterModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    SeoService,
    DynamicScriptLoaderService,
    AccountService,
    AuthGuard,
      {
         provide: UrlSerializer,
         useClass: StandardUrlSerializer
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

