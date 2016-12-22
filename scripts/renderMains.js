function renderChat(data){
    emptyMain();
    $('#main').append($('<ul>').attr('id', 'messages'));
    $('#messages').contents().remove();
    data.chatLog.forEach(function(entry) {
        if(data.user === entry.user){
            addUserMessage(entry.msg);
        } else {
            $('#messages')
                .append($('<div>').addClass('left')
                    .append($('<img>').addClass('thumbnail')
                        .attr('src', 'assets/profilePictures/default.png'))
                    .append($('<div>').addClass('message friendmsg')
                        .append($('<p>').text(entry.msg))));
        }
    });
    $('#main')
        .append($('<form>')
            .submit(()=>{
                let text = $('#messageText').val();
                if(text){
                    socket.emit('chat message', text);
                    addUserMessage(text);
                    $('#messages').scrollTop($("#messages")[0].scrollHeight);
                    $('#messageText').val('');
                }
                return false;
            })
            .append($('<input>').attr('id', 'messageText')
                .attr('type', 'textfield'))
            .append($('<button>').attr('id', 'sendMessage')
                .attr('type', 'submit')
                .text('SEND')))
    $("#messages").scrollTop($("#messages")[0].scrollHeight);
}

function renderProfile(data) {
    emptyMain();
    $('#main')
        .append($('<div>').attr('id', 'topMain')
            .append($('<img>').attr('src', data.picture))
            .append($('<h2>').text(data.username))
            .append($('<button>').text('ADD')
                .attr('id', 'addFriend')
                .click(()=>{
                    socket.emit('sendRequest', data.username);
                    console.log('sending request');
                }))
            .append($('<button>').text('CHAT')
                .click(()=>{
                    socket.emit('openConversation', data.username);
                })))
        .append($('<div>').attr('id', 'bio')
            .append($('<h3>').text('BIO'))
            .append($('<p>').text(data.bio)));
}

function emptyMain() {
    Array.from($('#main').children()).forEach((child)=>{
        child.remove();
    });
}

function addUserMessage(text){
    $('#messages')
        .append($('<div>').addClass('message usermsg')
            .append($('<p>').text(text)));
}

function addFriendMessage(text){
    $('#messages')
        .append($('<div>').addClass('left')
            .append($('<img>').addClass('thumbnail')
                .attr('src', 'assets/profilePictures/default.png'))
            .append($('<div>').addClass('message friendmsg')
                .append($('<p>').text(text))));
}
