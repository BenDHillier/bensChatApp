let models = require('../models/models');
let friendsController = require('../controllers/friendsController');
let accounts = models.accounts;

module.exports = (io, socket)=>{
    let session = socket.handshake.session;
    socket.on('getFriendRequests', ()=>{

        accounts.findOne({username: session.user}, (err, account)=>{
            if(account){
                    io.to(socket.id).emit('getFriendRequests', account.friendRequests);
            } else {
                console.log('could not find', session.user)
            }

        })
    });
    socket.on('getFriendsList', ()=>{

        accounts.findOne({username: session.user}, (err, account)=>{
            if(account){
                    io.to(socket.id).emit('getFriendsList', account.friendsList);
            } else {
                console.log('could not find', session.user)
            }

        })
    });
    socket.on('acceptRequest', (sender)=>{
        friendsController.acceptRequest(session.user, sender, ()=>{
            io.to(socket.id).emit('acceptedRequest', sender)
        });
    });
    socket.on('getNotifications', ()=>{
        accounts.findOne({username: session.user}, (err,data)=>{
            if(data){
                data.newNotifications = false;
                data.save();
                io.to(socket.id).emit('recieveNotifications', data.notifications);
            }
        })
    })
    socket.on('removeNotification', friend=>{
        accounts.findOne({username: session.user}, (err,data)=>{
            data.notifications = data.notifications.filter(x=>x!==friend);
            data.save();
        });
    });
};
