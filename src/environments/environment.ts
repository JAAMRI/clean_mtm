// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  uat: false,
  dev: false,
  local: true,
  host: 'https://4w0hc7sglf.execute-api.us-east-1.amazonaws.com/dev',
  baseHref: '/',
  baseUrl: 'localhost:4200',
  devUrlKey: 'UniMTM@devTWH',
  frenchImage: '/assets/static_images/MTM_FINAL_LOGO_FR.png',
  englishImage: '/assets/static_images/MTM_FINAL_LOGO.svg'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
