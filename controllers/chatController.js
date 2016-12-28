let model = require('../models/models');
let chatLogs = model.chatLogs;
let connections = [];

module.exports = function(io, app){
    app.get('/', (req, res)=>{
        if(!req.session.user){
            res.redirect('/login');
        } else {
            model.profiles.findOne({username: req.session.user}, (err, profile)=>{
                model.accounts.findOne({username: req.session.user}, (err,account)=>{
                    if(!profile){
                        //make this create someones profile page
                        res.render('index', Object.assign(
                            model.createProfile(req.session.user),
                            {friendRequests: account.friendRequests,
                                notifications: account.notifications}));
                    } else {
                        res.render('index', profile);
                    }
                })
            });
        }

    });
};
