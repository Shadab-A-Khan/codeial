const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {                                      
            user: 'shadabahmadkhan4@gmail.com',       
            pass: 'wszjicyzavkwfsrt'                 
        }
        ,
        tls: {
            rejectUnauthorized: false
        }
    },
    google_client_id: "768544295505-ha1n6sr75elqov237netcpvb4okum241.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',

    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }


}


const codeial_production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH, 
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {                                       
            user: 'shadabahmadkhan4@gmail.com',       
            pass: 'wszjicyzavkwfsrt'                  
        }
        ,
        tls: {
            rejectUnauthorized: false
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}



module.exports = eval(process.env.CODEIAL_DB) == undefined ? development : eval(process.env.CODEIAL_DB);
