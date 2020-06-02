import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { AccountService } from './services/account/account.service';
import { MealService } from './services/meal/meal.service';
import { SharedModule } from './shared/shared.module';
import { SharedService } from './shared/shared.service';
import { HomeModule } from './modules/home/home.module';
import { SeoService } from './services/seo.service';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader/dynamic-script-loader.service';
import { FooterComponent } from './modules/footer/footer.component';
import { CommonModule } from '@angular/common';
import { UrlSerializer } from '@angular/router';
// StandardUrlSerializer 
import { DefaultUrlSerializer, UrlTree } from "@angular/router";

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
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRouting,
    CommonModule,
    ToolbarModule,
    HttpClientModule,
    HomeModule,
    ToolbarModule,
    // environment.production ?
      // [] : 
      // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      //   passThruUnknownUrl: true,
      //   delay: 100
      // }),
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    MealService,
    SeoService,
    DynamicScriptLoaderService,
    // AmplifyService,
    AccountService,
    SharedService,
      {
         provide: UrlSerializer,
         useClass: StandardUrlSerializer
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

