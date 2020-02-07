# MTMPWAFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

For serverless deployment - (this command is used to deploy to a test server directly from command line, MTM UAT & PROD ENVIRONMENTS ARE MANAGED VIA AWS CONSOLE)

Run `npm run build:serverless:deploy`

Please add the following to your ngsw.worker.js to bypass service worker for all analytics requests
//Check if adobe tagging, FB or analytics
if (req.url.indexOf('adobe') !== -1) { return; }
if (req.url.indexOf('facebook') !== -1) { return; }
if (req.url.indexOf('analytics') !== -1) { return; }
if (req.url.indexOf('unilever') !== -1) { return; }

