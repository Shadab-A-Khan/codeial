class ChatEngine{constructor(e,s){this.chatBox=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection established using sockets...!"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"codeial"}),e.socket.on("user_joined",(function(e){console.log("a user joined!")}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();document.getElementById("chat-message-input").value="",""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"codeial"})})),e.socket.on("receive_message",(function(s){const t=document.getElementById("chat-messages-list");function o(){t.scrollTop=t.scrollHeight}o(),function(s){var n=t.scrollTop+t.clientHeight===t.scrollHeight;(function(s){let t=$("<li>"),o="other-message";s.user_email==e.userEmail&&(o="self-message"),t.append($("<span>",{html:s.message})),t.append($("<sub>",{html:s.user_email})),t.addClass(o),$("#chat-messages-list").append(t)})(s),n||o()}(s)}))}}