# Showdown editor using Angular 4 [![Build Status](https://travis-ci.org/aaradhanas/showdown-editor.svg?branch=master)](https://travis-ci.org/aaradhanas/showdown-editor) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/aaradhanas/showdown-editor/blob/master/LICENSE) [![codecov](https://codecov.io/gh/aaradhanas/showdown-editor/branch/master/graph/badge.svg)](https://codecov.io/gh/aaradhanas/showdown-editor) [![HitCount](http://hits.dwyl.io/aaradhanas/showdown-editor.svg)](http://hits.dwyl.io/aaradhanas/showdown-editor)

This project is inspired by the works of the developers of Showdown editor. The [existing showdown editor](http://demo.showdownjs.com/) has been developed using AngularJS (Version 1 of Angular). The editor has been rewritten in Angular 4 in a simpler and easier way. You can access the revamped showdown editor [here](https://aaradhanas.github.io/showdown-editor/).

# Angular 4 components

Since Angular 2 and higher make use of components for better readability and resuability, the same has been applied here and the editor has been divided into the following components.

- Left navigation bar, which contains the various showdown options.
- Top navigation bar
- Editor section, which comprises the editor and the preview.

# Angular 4 services

In order to access the information related to the available releases and sample markdown content, a data service class has been created.

# External fonts

Font-awesome and google fonts has been used here. These have been installed using npm, as follows:

- npm install font-awesome@4.4.0 --save
- npm install google-fonts@latest --save

# Node package for showdown

- npm install showdown --save
- const showdownJs = require('showdown');
- const converter = new showdownJs.Converter(); 
- converter.makeHtml("text");

# Publish the app as Github page

- npm install -g angular-cli-ghpages --save 
- ng build --prod --base-href https://aaradhanas.github.io/angular/
- ngh

# Unit tests

- Each component has been tested in isolation.
- Used the angular testing framework
- Wrote unit tests using Jasmine
- Used Karma as a test runner
- Total 26 tests
- ``` ng test ```

# End to end tests

- e2e tests using Protractor.
- Functional and UI usecases covered.
- Total 10 tests
- ``` ng e2e ```

# Code coverage

To know the percentage of code covered by your unit tests, execute the command ``` ng test --code-coverage ```. You will find a folder called coverage created in your project root folder. Open the index.html file in the folder to view the results.

To publish the report to [Codecov](https://codecov.io), do the following:

- Create an account at codecov and add your repository.
- ``` npm install codecov ```
- ``` codecov ```

Codecov will search for the coverage folder and upload the report to your repo in Codecov.

# How to run ?

- Check out the project
- npm install
- ng serve

# License

- [MIT license](https://github.com/aaradhanas/showdown-editor/blob/master/LICENSE)