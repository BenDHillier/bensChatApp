function renderChat(data){
    emptyMain();
    $('#main').append($('<ul>').attr('id', 'messages'));
    $('#messages').contents().remove();
    data.chatLog.forEach(function(msg) {
        $('#messages')
            .append($('<div>')
                .append($('<p>').text(msg)));
    });
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
