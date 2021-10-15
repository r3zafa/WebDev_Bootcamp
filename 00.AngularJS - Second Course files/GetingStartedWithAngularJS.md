CLI Overview and Command Reference - The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications directly from a command shell.


Installing Angular CLI - Major versions of Angular CLI follow the supported major version of Angular, but minor versions can be released separately.

Install the CLI using the npm package manager:

npm install -g @angular/cli

    
For details about changes between versions, and information about updating from previous releases, see the Releases tab on GitHub: https://github.com/angular/angular-cli/releases
Basic workflow

Invoke the tool on the command line through the ng executable. Online help is available on the command line. Enter the following to list commands or options for a given command (such as generate) with a short description.

ng help
ng generate --help

To create, build, and serve a new, basic Angular project on a development server, go to the parent directory of your new workspace use the following commands:

ng new [projectName] --no-strict

Thereafter, this tool will ask you two questions:
1) Do you want to use the Angular Router? => Choose "No Router"
2) Which CSS pre-processor do you want to use? => Choose "CSS"

cd [projectName]
ng serve


In your browser, open http://localhost:4200/ to see the new application run. When you use the ng serve command to build an application and serve it locally, the server automatically rebuilds the application and reloads the page when you change any of the source files.

When you run ng new my-first-project a new folder, named my-first-project, will be created in the current working directory. Since you want to be able to create files inside that folder, make sure you have sufficient rights in the current working directory before running the command.

If the current working directory is not the right place for your project, you can change to a more appropriate directory by running cd <path-to-other-directory> first.


the rest of content available here; https://angular.io/cli