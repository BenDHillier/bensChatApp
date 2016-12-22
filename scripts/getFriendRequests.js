$('#friendRequests').click(()=>{
    if($('#requestsList').children().length === 0){
        console.log('emitting getFriendRequests');
        socket.emit('getFriendRequests');
    }
    else {

        Array.from($('#requestsList').children()).forEach((child)=>{
            child.remove();
        });
        $('#requestsList').height('0px');
    }
});

socket.on('getFriendRequests', (requestsList)=>{

    if(requestsList.length !== 0){
        console.log('recieved requests');
        let height = requestsList.length>2 ? 150 : requestsList.length * 50;
        $('#requestsList').height(height);
        requestsList.forEach((sender)=>{
            $('#requestsList')
                .append($('<button>').text(sender)
                    .attr('id', sender+'Request')
                    //.addClass('request')
                    .css('background-color', 'rgb(255,230,150)')
                    .width('80%')
                    .click(()=>{
                        socket.emit('acceptRequest', sender);

                    }))
                .append($('<button>').text('x')
                    .width('20%')
                    .attr('id', sender+'Remove')
                    .click(()=>{
                        $('#'+sender+'Request').remove();
                        $('#'+sender+'Remove').remove();
                        if($('#requestsList').children().length<6){
                            let height = $('#requestsList').height();
                            $('#requestsList').height(height-50);
                        }
                    }));
        });
    } else {
        $('#requestsList').height('50px')
            .append($('<button>')
                .text('No Requests')
                .css('background-color', 'rgb(255,230,150)'));
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

socket.on('acceptedRequest', (friend)=>{
    $('#'+friend+'Request').remove();
    $('#'+friend+'Remove').remove();
    if($('#requestsList').children().length<6){
        let height = $('#requestsList').height();
        $('#requestsList').height(height-50);
    }

});

function renderDropDown(list, ulId, emit, className, emptyMessage) {
    if(list.length !== 0){
        list.forEach((friend)=>{

            $(ulId).height(height + 'px')
                .append($('<button>')
                    .text(friend)
                    .addClass(className)
                    .attr('value', friend)
                    .css('background-color', 'rgb(255,230,150)'));
        });
        $('.'+className).click(function() {
            socket.emit('openConversation', this.value);
        });
    } else {
        $(ulId).height('50px')
            .append($('<button>').text('No Friends')
                .css('background-color', 'rgb(255,230,150)'));
    }
}
