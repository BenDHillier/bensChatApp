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
                .append($('<button>')
                    .text(friend)
                    .addClass('friend')
                    .attr('value', friend));
        });
        $('.friend').click(function() {
            socket.emit('openConversation', this.value);
        });
    } else {
        $('#friendsList').append($('<li>').text('No Friends'));
    }

});
