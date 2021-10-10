1. to start a new express web app firstly you have to init json file:
npm init -y 
-y : to skip configuration.
2. nmp i express
3. make a new index.js file
touch index.js
4. add basic codes like require, listen, get set, etc.
5- install ejs as main tamplating engine
npm i ejs
6. add ejs in index.js 
7. make directory views (its default folder)
mkdir views
8. make files in views like home , etc. the format should be defined as *.ejs
touch home.ejs
9. add basic html structure in ejs file and render it in app.get. 
10. to have access to our templates as we start index.js from differents directories. we need to require the path and 
use set method to set the views directory to local views.
const path = require('path');
&
app.set('views', path.join(__dirname, '/views'))