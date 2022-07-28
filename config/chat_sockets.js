//recieve a request for connection

module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: 'http://localhost:8000'
        }
    });

    io.on('connection', function (socket) {
        console.log('new connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });

        socket.on('join_room', function (data) {
            console.log('joining requrest rec.', data);

            socket.join(data.chatroom); // it there is a charoom i.e., codeial exist it will connecct it the user to codeial

            //to notify that new user has joined
            io.in(data.chatroom).emit('user_joined', data);
        });

    });

}