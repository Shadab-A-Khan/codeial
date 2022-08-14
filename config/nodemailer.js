const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');               //development---------------

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {                                       //authentication
//         user: 'shadabahmadkhan4@gmail.com',       // it will be user email id
//         pass: 'wszjicyzavkwfsrt'                  //password
//     }
//     ,
//     tls: {
//         rejectUnauthorized: false
//     }
// });


                                                      //development---------------

let transporter = nodemailer.createTransport(env.smtp);


let renderTemplet = (data, relativePath) => {
    //mailHTML is what html is going to be send it that mail
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath), //the relativePath is the place from where this function is being called
        data,                                                  //the data that needs to be filled inside the templets -- data is the context that is passed to the ejs
        function (err, templet) {  //templet = path.join + data
            if (err) {
                console.log('error in rendering the templet', err);
                return;
            }
            mailHTML = templet;
        }

    )
    return mailHTML;
};


module.exports = {
    transporter: transporter,
    renderTemplet: renderTemplet
}
