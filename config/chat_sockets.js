module.exports.chatSockets = function (socketServer) {

    const io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://54.227.172.33:8000",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', function (socket) {

        socket.on('disconnect', function () {
            console.log('socket disconnected');
            return;
        });

        socket.on('join_room', function (data) {

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}