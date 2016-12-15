let models = require('../models/models');
let chatLogs = models.chatLogs;
let accounts = models.accounts;
module.exports = function(app){
    app.get('/search', function(req, res){
        res.render('search');
    });

    app.post('/search', function(req, res){
        let user = req.session.user;
        let searchQuery = req.body.searchQuery;
        accounts.findOne({username: searchQuery}, function(err, account) {
            if(account) {
                chatLogs.findOne({users: [user, searchQuery]}, function(err, data){
                    if(!data) {
                        Object.create(chatLogs({
                            users: [req.session.user, account.username],
                            chatLog: []
                        })).save();
                        Object.create(chatLogs({
                            users: [account.username, req.session.user],
                            chatLog: []
                        })).save();
                    }
                    req.session.friend = account.username;
                    res.redirect('/chat');
                });

            } else {
                res.send('User does not exist');
            }
        })
    });
};

function chatLogExists(user, friend){
    chatLogs.findOne({users: [user, friend]}, function(err, data){
        if(data) return true;
        return false;
    });
}
