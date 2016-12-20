$('#friends').click(()=>{
    console.log('button works');
    if($('#friendsList').children().length === 0){
        socket.emit('getFriendsList');
    }
    else {
        Array.from($('#friendsList').children()).forEach((child)=>{
            child.remove();
        });
    }
});

socket.on('getFriendsList', (friendsList)=>{

    if(friendsList.length !== 0){
        friendsList.forEach((friend)=>{
            $('#friendsList')
                .append($('<li>').text(friend))
                .append($('<button>').text('chat'));
        });
    } else {
        $('#friendsList').append($('<li>').text('No Friends'));
    }

});
