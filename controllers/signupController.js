let model = require('../models/models');
let accounts = model.accounts;
let chatLogs = model.chatLogs;
module.exports = function(app){
    app.get('/signup', function(req, res){
        res.render('signup', {error: ""});
    });

    app.post('/signup', function(req, res){
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

    });
}
