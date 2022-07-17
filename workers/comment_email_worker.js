const { workers } = require('kue');
const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer.js');
queue.process('emails', function (job, done) {
    console.log("emails workers is processing the Job ", job.data);

    commentsMailer.newComment(job.data);

    done();
});
