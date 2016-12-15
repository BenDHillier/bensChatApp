var socket = io();
$('#sendMessage').submit(function(){
    let msg = $('#m').val();
    socket.emit('chat message', msg);
    $('#messages').append($('<li>').text(msg));
    $('#m').val('');
    return false;
});

//check if sender is person user is chatting with currently
socket.on('chat message', function(msg, sender){
    let result = false;
    socket.emit('getFriend', sender, msg);
});

socket.on('getFriend', function(data){
    let friend = data.friend,
        sender = data.sender,
        msg = data.msg;
    console.log('friend:',friend, 'sender:', sender);
    if(friend === sender) {
        $('#messages').append($('<li>').text(msg));
    } else {
        //notify user they were sent a message
        $('#messages').append($('<li>').text('someone sent a message'));
    }
});

socket.on('clear', function() {
    let myChild = $('#messages').children();
    console.log(myChild.length);
    for(i=0;i<myChild.length;i++){
        myChild[i].remove();
    }
})
$('#clear').submit(function() {
    socket.emit('clear');
    return false;
});
