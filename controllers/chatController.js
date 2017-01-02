let model = require('../models/models');
let chatLogs = model.chatLogs;
let accounts = model.accounts;
let connections = require('./connections')  //[];
module.exports = function(io, socket){
    let session = socket.handshake.session;
    connections.addConnection(session.user, socket.id);
    socket.on('chat message', function(msg){
        let friend = session.friend;
        let user = session.user;
        let friendID = connections.getId(friend);
        io.to(friendID).emit('chat message', {user,msg});
        //add user to friends notification list
        accounts.findOne({username: friend}, (err, data)=>{
            if(data.notifications.indexOf(user) === -1){
                data.notifications.push(user);
            }
            data.newNotifications = true;
            data.save();

        })
        //update chatLog for user and friend
        chatLogs.findOne({user, friend}, function(err, data){
            data.chatLog.push({user, msg});
            data.save();
        });
        chatLogs.findOne({user: friend, friend: user}, function(err, data){
            data.chatLog.push({user, msg});
            data.save();
        });
    });
    socket.on('clear', function(){
        chatLogs.findOne({user:session.user}, function(err, data){
            if(data){
                data.chatLogs = [];
                data.save();
            }
        });
    });
    socket.on('getFriend', function(data){
        if(session.friend === data.user)
            io.to(socket.id).emit('isCurrentFriend', data);
        else {
            io.to(socket.id).emit('notification', data)
        }
    });
    socket.on('openConversation', (friend) =>{
        session.friend = friend;
        chatLogs.findOne({user: session.user, friend}, function(err, data) {
            if(data){
                io.to(socket.id).emit('openConversation', data)
            } else {
                console.log(friend, 'conversation not found');
                io.to(socket.id).emit('openConversation', {error: 'chatlog not found'});
            }
        })
    });

}
