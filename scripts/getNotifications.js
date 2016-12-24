$('#notifications').click(()=>{
    openList('#notificationsList', 'getNotifications')
});

socket.on('recieveNotifications', notifications=>{
    console.log('recieved', notifications)
    if(notifications.length !== 0){
        let height = notifications.length>2 ? 150 : notifications.length * 50;
        $('#notificationsList').height(height+'px');
        notifications.forEach((friend)=>{
            $('#notificationsList')
                .append($('<button>')
                    .text(friend)
                    //.attr('value', friend)
                    .attr('id', friend+'Note')
                    .css('background-color', 'rgb(255,230,150)')
                    .click(()=>{
                        //go to chat page of friend
                        //and remove item from notifications
                        socket.emit('openConversation', friend);
                        socket.emit('removeNotification', friend);
                        //duplicate in getFriendRequests
                        $('#'+friend+'Note').remove();
                        if($('#notificationsList').children().length<3){
                            let height = $('#notificationsList').height();
                            $('#notificationsList').height(height-50);
                        }
                    })
                );
        });
    }  else {
        $('#notificationsList').height('50px')
            .append($('<button>').text('Empty')
                .css('background-color', 'rgb(255,230,150)'));
    }
})
