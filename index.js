const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const { where } = require('./models/user');
const flash = require('connect-flash')
const app = express();
require('./config/view-helpers')(app);
const customMware = require('./config/middleware');
const path = require('path');


const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(env.asset_path));

app.use(expressLayout);

app.use(bodyParser.json());


app.use(cookieParser());


app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));


app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: db._connectionString,
        autoRemove: 'disabled'
    })
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));


const PORT = process.env.PORT || 8000;
app.listen(PORT, function (err) {
    if (err) {
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is runnig on port: ${PORT}`);
});
