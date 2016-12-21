$('#friends').click(()=>{
    console.log('button works');
    if($('#friendsList').children().length === 0){
        socket.emit('getFriendsList');
    }
    else {
        Array.from($('#friendsList').children()).forEach((child)=>{
            child.remove();
        });
        $('#friendsList').height('0px');
    }
});

socket.on('getFriendsList', (friendsList)=>{

    if(friendsList.length !== 0){
        friendsList.forEach((friend)=>{
            let height = friendsList.length>2 ? 150 : friendsList.length * 50;
            $('#friendsList').height(height + 'px')
                .append($('<button>')
                    .text(friend)
                    .addClass('friend') //possibly not in use
                    .attr('value', friend)
                    .css('background-color', 'rgb(255,230,150)')
                    .click(()=>{
                        socket.emit('search', friend);
                    }));
        });
        //$('.friend').click(function() {
        //    socket.emit('openConversation', this.value);
        //});
    } else {
        $('#friendsList').height('50px')
            .append($('<button>').text('No Friends')
                .css('background-color', 'rgb(255,230,150)'));
    }

});
