class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //now we have initiate a connection
        this.socket = io.connect('http://localhost:5000'); //io is a global variable available as soon as we include cdnjs in home js

        if (this.userEmail) {
            this.connectHandler();
        }
    }

    connectHandler() {

        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using sockets...');
        });

        self.socket.emit('join_room', {
            user_email: self.userEmail,
            chatroom: 'codeial'
        });

        self.socket.on('user_joined', function (data) {
            console.log('a user has joined');
        });

        //CHANGE :: send a message on clicking the send message button
        $('#send-messege').click(function () {
            let msg = $('chat-message-input').val();

            if (msg != '') {
                self.socket.email('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('recive_message', function (data) {
            console.log('message received', data.message);

            let message = $('<li>');
            let messageType = 'other-messsage'
            if (data.user_email == self.userEmail) {
                messageType = 'self-message'
            }
            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append('<sub>', {
                'html': data.user_email
            })

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
            
        })
    }
}
