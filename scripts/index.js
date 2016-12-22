/*
*   When user trys to send a message, a 'chat message' event
*   is emitted. The server will respond with a 'chat message' event for
*   the recipient.
*   Then a 'getFriend' event is emitted and recieved to check if
*   the sender is the current friend the user is talking with.
*/


//var socket = io();
$('#sendMessage').submit(function(){
    let msg = $('#m').val();
    socket.emit('chat message', msg);
    $('#messages').append($('<li>').text(msg));
    $('#m').val('');
    return false;
});


socket.on('chat message', function(data){
    socket.emit('getFriend', data);
});

socket.on('getFriend', function(data){
    if(data.friend === data.user) {
        addFriendMessage(data.msg);
        //$('#messages').append($('<li>').text(msg));
    } else {
        //notify user they were sent a message
        $('#messages').append($('<li>').text(sender + ' sent you a message'));
    }
});

socket.on('clear', function() {
    Array.from($('#messages').children()).forEach(()=>{
        myChild[i].remove();
    });
})
$('#clear').submit(function() {
    socket.emit('clear');
    return false;
});
