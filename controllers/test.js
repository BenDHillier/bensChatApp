let model = require('../models/models');
let chatLogs = model.chatLogs;
let connections = [];
module.exports = function(io, socket){
    let session = socket.handshake.session;
    addConnection(session.user, socket.id);
    socket.on('chat message', function(msg){
        let friend = session.friend;
        let user = session.user;
        let friendID = getId(friend);
        io.to(friendID).emit('chat message', {user,msg});
        //update chatLog for user and friend
        chatLogs.findOne({user, friend}, function(err, data){
            data.chatLog.push({user, msg});
            chatLogs.update({user, friend}, {chatLog: data.chatLog}, function(err){
            });
        });
        chatLogs.findOne({user: friend, friend: user}, function(err, data){
            data.chatLog.push({user, msg});
            chatLogs.update({user: friend, friend: user}, {chatLog: data.chatLog}, function(err){
            });
        });
    });
    socket.on('clear', function(){
        update(session.user, session.friend, '', true, io);
    });
    socket.on('getFriend', function(data){
        data.friend = session.friend;
        io.to(socket.id).emit('getFriend', data);
    });
    socket.on('openConversation', (friend) =>{
        session.friend = friend;
        console.log('friend: ',friend);
        chatLogs.findOne({user: session.user, friend}, function(err, data) {
            if(data){
                console.log('sending data');
                io.to(socket.id).emit('openConversation', data)
            } else {
                console.log(friend, 'conversation not found');
                io.to(socket.id).emit('openConversation', {error: 'chatlog not found'});
            }
        })
    });

}
//seems to only be used in socket 'clear'
//should probably make inline
function update(user, friend, msg, clear, io){
    chatLogs.findOne({user}, function(err, data){
        if(clear){
            io.emit('clear')
            chatLogs.update({user, friend}, {chatLog: []}, function(err){
            });
        } else {
            data.chatLog.push(msg);
            chatLogs.update({user, friend}, {chatLog: data.chatLog}, function(err){
            });
        }
    });
};

function addConnection(user, id){
    if(user){
        let result = true;
        connections.forEach(function(item){
            if(item.user === user) result = false;
        })
        if(result)
            connections.push({user: user, id: id});
    }
}

function getId(user){
    let id = "";
    connections.forEach(function(item){
        if(item.user === user) {
            id = item.id;
        }
    })
    return id;
}
