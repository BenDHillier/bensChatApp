/*
*   When user trys to send a message, a 'chat message' event
*   is emitted. The server will respond with a 'chat message' event for
*   the recipient.
*   Then a 'getFriend' event is emitted and recieved to check if
*   the sender is the current friend the user is talking with.
*/

socket.on('chat message', function(data){
    socket.emit('getFriend', data);
});

socket.on('isCurrentFriend', function(data){
    addFriendMessage(data.msg);
    $("#messages").scrollTop($("#messages")[0].scrollHeight);
});
socket.on('notification', (data)=>{
    console.log('recieved notification');
    $('#notifications').css('color', 'red');
});
socket.on('newRequest', ()=>{
    $('#friendRequests').css('color', 'red');
});

//currently not in use
socket.on('clear', function() {
    Array.from($('#messages').children()).forEach(()=>{
        myChild[i].remove();
    });
})
$('#clear').submit(function() {
    socket.emit('clear');
    return false;
});
