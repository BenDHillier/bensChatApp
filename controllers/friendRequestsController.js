let models = require('../models/models');
let friendsController = require('../controllers/friendsController');
let accounts = models.accounts;

module.exports = (io, socket)=>{
    let session = socket.handshake.session;
    socket.on('getFriendRequests', ()=>{

        accounts.findOne({username: session.user}, (err, account)=>{
            console.log('recieved getFriendRequests');
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
            io.to(socket.id).emit('acceptedRequest')
        });
    });
};
