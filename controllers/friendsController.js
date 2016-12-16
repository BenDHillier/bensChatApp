let model = require('../models/models');
let accounts = model.accounts;
let chatLogs = model.chatLogs;
module.exports = {
    getFriends: function(username, callback) {
        accounts.findOne({username}, function(err, data){
            let friendsList;
            if(data)
                 friendsList = data.friendsList;
            else
                console.log(username, 'does not exist');
            callback(friendsList);
        });
    },

    getFriendRequests: function(username, callback) {
        accounts.findOne({username}, function(err, data){
            let friendRequests;
            if(data)
                 friendRequests = data.friendRequests;
            else
                console.log(username, 'does not exist');
            callback(friendRequests);
        });
    },

    acceptRequest: function(username, friend, callback){
        addFriend(username, friend, ()=>0);
        addFriend(friend, username, callback);
    },

    sendRequestTo: function(username, sender, callback){
        accounts.findOne({username}, function(err, data){
            let friendRequests;
            if(data){
                friendRequests = data.friendRequests;
                //prevent duplicates
                let duplicate = false;
                friendRequests.forEach(function(item){
                    if(item === sender)
                        duplicate = true;
                });
                if(!duplicate)
                    friendRequests.push(sender);
                accounts.update({username}, {friendRequests}, function(err){
                    callback();
                });
            } else {
                console.log('couldnt find user', friend);
            }
        });
    }
};

function addFriend(username, friend, next){
    accounts.findOne({username}, function(err, data){
        Object.create(chatLogs({
            user: username,
            friend,
            chatLog: []
        })).save();
        if(data){
            let friendsList = data.friendsList;
            let friendRequests = data.friendRequests;

            friendRequests = friendRequests.filter(item => item !== friend);
            //prevent duplicates
            if(friendsList.indexOf(friend) === -1)
                friendsList.push(friend);
            accounts.update({username}, {friendsList, friendRequests}, function(err){
                next();
            });
        }
    });
}
