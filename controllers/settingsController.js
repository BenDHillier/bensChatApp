let models = require('../models/models');
let fs = require('fs');
let profiles = models.profiles;

module.exports = (io, socket)=>{
    let session = socket.handshake.session;
    let path = 'assets/profilePictures/'+session.user+'.png';
    socket.on('getSettings', ()=>{
        profiles.findOne({username:session.user}, (err,data)=>{
            if(data){
                io.to(socket.id).emit('getSettings', data);
            }
        });
    });
    var imageData = '';
    socket.on('saveSettings', (settings)=>{
        imageData+=settings;
    });
    socket.on('Start', (data)=>{
        fs.openSync(path, 'w');
    })
    socket.on('done', (bio)=>{
        fs.writeFile(path, imageData, 'binary');
        profiles.update({username:session.user}, {
            picture:path,
            bio
        }, ()=>0);
    })
};
