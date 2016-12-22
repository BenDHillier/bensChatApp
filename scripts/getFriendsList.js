$('#friends').click(()=>{
    openList('#friendsList', 'getFriendsList');
});

socket.on('getFriendsList', (friendsList)=>{

    if(friendsList.length !== 0){
        let height = friendsList.length>2 ? 150 : friendsList.length * 50;
        $('#friendsList').height(height + 'px');
        friendsList.forEach((friend)=>{
            $('#friendsList')
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

function openList(list, emit){
    if($(list).children().length === 0){
        socket.emit(emit);
    }
    else {
        Array.from($(list).children()).forEach((child)=>{
            child.remove();
        });
        $(list).height('0px');
    }
}
