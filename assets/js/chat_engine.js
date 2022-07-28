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
    }
}
