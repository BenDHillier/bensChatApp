let model = require('../models/models');
let chatLogs = model.chatLogs;
let connections = [];

module.exports = function(app){
    app.get('/', (req, res)=>{
        if(!req.session.user){
            res.redirect('/login');
        } else {
            model.profiles.findOne({username: req.session.user}, (err, profile)=>{
                model.accounts.findOne({username: req.session.user}, (err,account)=>{
                    if(!profile){
                        //make this create someones profile page
                        profile = model.createProfile(req.session.user);
                    }
                    res.render('index', Object.assign(profile,{
                        newNotifications:account.newNotifications
                    }));
                })
            });
        }

    });
};
