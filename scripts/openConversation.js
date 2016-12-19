var socket = io();

socket.on('openConversation', (data)=>{
    console.log('data recieved', data.chatLog)
    $('#messages').contents().remove();
    data.chatLog.forEach(function(msg) {
        $('#messages').append($('<li>').text(msg));
    });
    $("#messages").scrollTop($("#messages")[0].scrollHeight);
});

$('.friend').click(function() {
    console.log(this.value);
    socket.emit('openConversation', this.value);
});
