// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  uat: false,
  dev: true,
  local: false,
  host: 'https://4w0hc7sglf.execute-api.us-east-1.amazonaws.com/dev',
  baseHref: '/',
  baseUrl: 'https://dev.mealsthatmatter.com',
  devUrlKey: 'UniMTM@devTWH',
  frenchImage: '/assets/static_images/MTM_FINAL_LOGO_FR.png',
  englishImage: '/assets/static_images/MTM_FINAL_LOGO.svg',
  dropSecret: '2557749db3be79907ec7ec7a139f8b288eb948628955ae0942a59b61dfd8a97f'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
