npm install --package--
npm i --package--
 or to install a package globaly
npm i -g --package--

to have access to globle defined packages you have to run npm link --packageName-- in commendline
and after that you can require it in a index.js and use it.
example 
npm i -g cowsay
npm link cowsay

and require('cowsay') in js file


#################################################
to make a package.json by yourself you need to run this commendline:

npm init

npm init is a creation utilite for package.json
there will be some question like packageName, version nummber, describtion, entry point, test commend, git repository, keywords, ...


#####################################################

to install all dependencies in a project with a json file in. just run:

npm install







