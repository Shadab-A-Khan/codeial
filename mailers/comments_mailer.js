// const { connect } = require('mongoose');
// const nodeMailer = require('../config/nodemailer');


// //this is another way of exporting a method 
// exports.newComment = (comment) => {
//     console.log('inside comment mailer');

//     nodeMailer.transporter.sendMail({
//         from: 'shadabahmadkhan4@gmail.com',
//         to: connect.user.email,
//         subject: 'new comment published',
//         html: '<h1> Yup, Comment is published now </h1>'
//     }, (err, info) => {
//         if (err) {
//             console.log('Error in Sending mail ', err);
//             return;
//         }
//         console.log('Message sent ', info);
//         return;
//     });
// }

const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    // console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplet({ comment: comment }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'shadabahmadkhan4@gmail.com',
        to: comment.user.email,
        // to: userEmail,
        subject: "New Comment Published!",
        //html: '<h1>Yup, your comment is now published!</h1>'
        html: htmlString

    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}