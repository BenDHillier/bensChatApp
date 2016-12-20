function renderChat(data){
    emptyMain();
    $('#main').append($('<ul>').attr('id', 'messages'));
    $('#messages').contents().remove();
    data.chatLog.forEach(function(msg) {
        $('#messages').append($('<li>').text(msg));
    });
    $("#messages").scrollTop($("#messages")[0].scrollHeight);
}

function renderProfile(data) {
    emptyMain();
    $('#main')
        .append($('<img>').attr('src', data.picture)
            .attr('height', '100px')
            .attr('width', '100px'))
        .append($('<h2>').text(data.username))
        .append($('<button>').text('add')
            .attr('id', 'addFriend')
            .click(()=>{
                socket.emit('sendRequest', data.username);
                console.log('sending request');
            }))
        .append($('<p>').text(data.bio));
}

function emptyMain() {
    Array.from($('#main').children()).forEach((child)=>{
        child.remove();
    });
}
