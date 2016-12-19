let models = require('../models/models');
let friendsController = require('../controllers/friendsController');
let accounts = models.accounts;


module.exports = function(io, socket){
    let session = socket.handshake.session;
    socket.on('search', (searchQuery)=>{
        accounts.findOne({username: searchQuery}, (err, data)=>{
            if(data){
                friendsController.sendRequestTo(searchQuery, session.user, ()=>{
                    io.to(socket.id).emit('search', true);
                })
            } else {
                    io.to(socket.id).emit('search', false);
            }
        });
    });
};
