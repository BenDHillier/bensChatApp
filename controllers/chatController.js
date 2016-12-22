let model = require('../models/models');
let chatLogs = model.chatLogs;
let connections = [];

module.exports = function(io, app){
    app.get('/', (req, res)=>{
        if(!req.session.user){
            res.redirect('/login');
        } else {
            model.profiles.findOne({username: req.session.user}, (err, data)=>{
                if(!data){
                    res.render('index', Object.assign(model.createProfile(req.session.user),
                        {friendsList: null, friendRequests: null, userNotFound:false}));
                } else {
                    res.render('index', Object.assign(data,
                        {friendsList: null, friendRequests: null, userNotFound:false}));
                }
            });
        }

    });
};
