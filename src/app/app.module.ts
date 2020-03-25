import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { AmplifyAngularModule } from 'aws-amplify-angular';
// import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { AccountService } from './services/account/account.service';
import { MealService } from './services/meal.service';
import { SharedModule } from './shared/shared.module';
import { SharedService } from './shared/shared.service';
import { HomeModule } from './modules/home/home.module';
import { SeoService } from './services/seo.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRouting,
    ToolbarModule,
    HttpClientModule,
    HomeModule,
    ToolbarModule,
    // AmplifyAngularModule,
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
    // AmplifyService,
    AccountService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
