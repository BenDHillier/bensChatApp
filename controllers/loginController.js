let model = require('../models/models');
let accounts = model.accounts;
let chatLogs = model.chatLogs;
module.exports = function(app){
    app.get('/login', function(req, res){
        req.session.user = null;
        res.render('login', {error: ''});
    });

    app.post('/login', function(req, res){
        if(req.body.logout){
            //user is logged out
            req.session.user = null;
            req.session.friend = null;
            res.render('login', {error: ''});
            return;
        } else if(req.body.login){
            accounts.findOne({username: req.body.username}, function(err, data){
                if(data && data.password === req.body.password){
                    req.session.user = req.body.username;
                    res.redirect('/');
                } else {
                    res.render('login', {error: 'invalid username or password'});
                }
            });
        } else if(req.body.signup){
            accounts.findOne({username: req.body.username}, function(err, data){
                if(!data && req.body.username && req.body.password){
                    Object.create(accounts({
                        username: req.body.username,
                        password: req.body.password,
                    })).save();
                    req.session.user = req.body.username;
                    res.redirect('/');
                } else {
                    res.render('signup', {error: 'invalid or taken username'});
                }
            });
        }

    });

};
