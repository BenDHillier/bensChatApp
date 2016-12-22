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
                    res.render('index', model.createProfile(req.session.user));
                } else {
                    res.render('index', data);
                }
            });
        }

    });
};
