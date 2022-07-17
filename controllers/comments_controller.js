const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const nodemailer = require('../config/nodemailer');
const User = require('../models/user');

const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

// module.exports.create = function (req, res) {
//     Post.findById(req.body.post, function (err, post) {

//         if (post) {
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function (err, comment) {
//                 // handle error

//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// }



module.exports.create = async function (req, res) {
    console.log('Befor try');
    try {
        console.log('****** Control is here');
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            let user = await User.findById(post.user);
            comment = await comment.populate('user', 'name email');
            //commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log('error in creating a queue',err);
                    return;
                }

                console.log('job enqueued',job.id);
            });

            if (req.xhr) {


                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');
            console.log('****** Control is here');
            return res.redirect('/');
        } else {
            console.log("post not found");
            return res.redirect('/');
        }
    } catch (err) {
        console.log('Inside Catch block', err);
        req.flash('error', err);
        return res.redirect('/');
    }

}




module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user == req.user.id) {

            let postId = comment.post;

            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });
}

