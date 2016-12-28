let models = require('../models/models');
let friendsController = require('../controllers/friendsController');
let connections = require('./connections');
let accounts = models.accounts;
let profiles = models.profiles;


module.exports = (io, socket)=>{
    let session = socket.handshake.session;
    //should probable be in friendRequestsController
    socket.on('sendRequest', (friend)=>{
        friendsController.sendRequestTo(friend, session.user, (success)=>{
            io.to(socket.id).emit('sentRequest', success);
            if(success){
                //notify friend that someone sent a request
                io.to(connections.getId(friend)).emit('newRequest')

            }
        });
    });
};
