var socket = io();

socket.on('openConversation', (data)=>{
    console.log('data recieved', data.chatLog)
    data.chatLog.forEach(function(msg) {
        $('#messages').append($('<li>').text(msg));
    });
});

$('.friend').click(function() {
    console.log(this.value);
    socket.emit('openConversation', this.value);
});
console.log($('.friend')[0].onclick);
