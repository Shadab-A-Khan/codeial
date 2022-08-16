const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplet({ comment: comment }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString

    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }
        return;
    });
}