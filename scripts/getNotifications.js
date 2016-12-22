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
                    .attr('value', friend)
                    .css('background-color', 'rgb(255,230,150)')
                    .click(()=>{
                        //go to chat page of friend
                        socket.emit('openConversation', friend);
                    })
                );
        });
    }  else {
        $('#notificationsList').height('50px')
            .append($('<button>').text('Empty')
                .css('background-color', 'rgb(255,230,150)'));
    }
})
