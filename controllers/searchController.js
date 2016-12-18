let models = require('../models/models');
let friendsController = require('../controllers/friendsController');
let chatLogs = models.chatLogs;
let accounts = models.accounts;
module.exports = function(app, io){

    app.get('/search', function(req, res){
        if(!req.session.user) {
            res.redirect('/login');
            return;
        }
        friendsController.getFriends(req.session.user, function(friendsList){
            friendsController.getFriendRequests(req.session.user, (friendRequests)=>{
                res.render('search', {friendsList, friendRequests, userNotFound:false});
            })
        })

    });

    app.post('/search', function(req, res){
        let user = req.session.user;
        let searchQuery = req.body.searchQuery;
        accounts.findOne({username: searchQuery}, function(err, account) {
            if(account){
                friendsController.sendRequestTo(searchQuery, user, ()=>{
                    friendsController.getFriends(req.session.user, function(friendsList){
                        friendsController.getFriendRequests(req.session.user, (friendRequests)=>{
                            res.render('search', {friendsList, friendRequests, userNotFound:null});
                        })
                    })
                });
            } else {
                friendsController.getFriends(req.session.user, function(friendsList){
                    friendsController.getFriendRequests(req.session.user, (friendRequests)=>{
                        res.render('search', {friendsList, friendRequests, userNotFound: true});
                    })
                })
            }
            /*
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


                    res.render('search', {friendsList});
                });

            } else {
                res.send('User does not exist');
            }
            */
        })
    });

    app.post('/acceptRequest', function(req, res){
        console.log(req.body.friend);
        friendsController.acceptRequest(req.session.user, req.body.friend, function(){
            res.redirect('/search');
        });
    });
};

function chatLogExists(user, friend){
    chatLogs.findOne({user: user, friend: friend}, function(err, data){
        if(data) return true;
        return false;
    });
}
