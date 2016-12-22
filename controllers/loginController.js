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
            req.session.user = null;
            req.session.friend = null;
            res.render('login', {error: ''});
            return;
        }
        accounts.findOne({username: req.body.user}, function(err, data){
            if(data && data.password === req.body.password){
                req.session.user = req.body.user;
                res.redirect('/');
            } else {

                res.render('login', {error: 'invalid username or password'});
            }
        });
    });

};
