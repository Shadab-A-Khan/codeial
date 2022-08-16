const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');              

let transporter = nodemailer.createTransport(env.smtp);


let renderTemplet = (data, relativePath) => {
    
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath), 
        data,                                                 
        function (err, templet) { 
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
