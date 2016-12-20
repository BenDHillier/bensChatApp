var socket = io();

socket.on('openConversation', (data)=>{
    renderChat(data);
});

//$('.friend').click
friendClick = (function() {
    console.log('clicked on ', this.value);
    console.log(this.value);
    socket.emit('openConversation', this.value);
});
