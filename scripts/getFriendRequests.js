$('#friendRequests').click(()=>{
    if($('#requestsList').children().length === 0){
        console.log('emitting getFriendRequests');
        socket.emit('getFriendRequests');
    }
    else {
        Array.from($('#requestsList').children()).forEach((child)=>{
            child.remove();
        });
    }
});

socket.on('getFriendRequests', (requestsList)=>{

    if(requestsList.length !== 0){
        console.log('recieved requests');
        requestsList.forEach((request)=>{
            $('#requestsList')
                .append($('<li>').text(request))
                .append($('<button>').text('add'));
        });
    } else {
        $('#requestsList').append($('<li>').text('No Requests'));
    }

});

socket.on('sentRequest', (success)=>{
    console.log('in sentRequest', success);
    if(success){
        $('#addFriend').text('SENT');
    } else {
        $('#addFriend').text('FAILED');
    }
});
