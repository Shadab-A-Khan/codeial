// //recieve a request for connection

// module.exports.chatSockets = function (socketServer) {
//     let io = require('socket.io')(socketServer, {
//         cors: {
//             origin: 'http://localhost:8000',
//             methods: ['GET', 'POST']
//         }
//     });

//     io.on('connection', function (socket) {
//         console.log('new connection received', socket.id);

//         socket.on('disconnect', function () {
//             console.log('socket disconnected!');
//             return;
//         });

//         socket.on('join_room', function (data) {
//             console.log('joining request rec.', data);


//             socket.join(data.chatroom);// it there is a charoom i.e., codeial exist it will connecct it the user to codeial

//             //to notify that new user has joined
//             io.in(data.chatroom).emit('user_joined', data);
//         });


//         // CHANGE :: detect send_message and broadcast to everyone in the room
//         socket.on('send_message', function (data) {
//             io.in(data.chatroom).emit('receive_message', data);
//         });

//     });

// }


module.exports.chatSockets = function (socketServer) {

    const io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', function (socket) {
        // console.log('new connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected');
            return;
        });

        socket.on('join_room', function (data) {
            // console.log('Joining request rec.', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}