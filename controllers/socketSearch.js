let models = require('../models/models');
let friendsController = require('../controllers/friendsController');
let accounts = models.accounts;
let profiles = models.profiles;


module.exports = function(io, socket){
    let session = socket.handshake.session;
    socket.on('search', (searchQuery)=>{
        accounts.findOne({username: searchQuery}, (err, data)=>{
            if(data){
                profiles.findOne({username: searchQuery}, (err, data)=>{
                    if(!data){
                        data = models.createProfile(searchQuery);
                    }
                    io.to(socket.id).emit('search', data);
                });

                //friendsController.sendRequestTo(searchQuery, session.user, ()=>{
            } else {
                    io.to(socket.id).emit('search', false);
            }
        });
    });
};
