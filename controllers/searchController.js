let models = require('../models/models');
let friendsController = require('../controllers/friendsController');
let chatLogs = models.chatLogs;
let accounts = models.accounts;
module.exports = function(app){
    app.get('/search', function(req, res){
        friendsController.getFriends(req.session.user, function(friendsList){
            res.render('search', {friendsList});
        })

    });

    app.post('/search', function(req, res){
        let user = req.session.user;
        let searchQuery = req.body.searchQuery;
        accounts.findOne({username: searchQuery}, function(err, account) {
            if(account) {
                chatLogs.findOne({user: user, friend: searchQuery}, function(err, data){
                    if(!data) {
                        Object.create(chatLogs({
                            user: req.session.user,
                            friend: account.username,
                            chatLog: []
                        })).save();
                        Object.create(chatLogs({
                            user: account.username,
                            friend: req.session.user,
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
    chatLogs.findOne({user: user, friend: friend}, function(err, data){
        if(data) return true;
        return false;
    });
}
