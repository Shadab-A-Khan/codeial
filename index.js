const express = require('express');
const cookieParser = require('cookie-parser')
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const bodyParser = require('body-parser');

//used for session cookie
const session = require('express-session'); //encprypts the id
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const app = express();

//middle ware to the form post data 
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./assets'));

app.use(expressLayout);

app.use(bodyParser.json());




//middleware to use the cookieParser
app.use(cookieParser());


//extract styles and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




app.set('view engine','ejs');
app.set('views','./views');

//passport
//session ,here we are encrypting the id

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret:'kuch_v',
    saveUninitialized: false,
    resave: false,  //if password is not changed no need to resave again and again
    cookie: {
        maxAge:(1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)
//use express router
app.use('/', require('./routes'));

const port=8000;
app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is runnig on port: ${port}`);
});