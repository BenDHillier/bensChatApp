let model = require('../models/models');
let accounts = model.accounts;
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
        accounts.findOne({username}, function(err, data){
            if(data){
                let friendsList = data.friendsList;
                let friendRequests = data.friendRequests;

                friendRequests = friendRequests.filter((item)=>{
                    return item !== friend;
                });
                //prevent duplicates
                let duplicate = false;
                friendsList.forEach(function(item){
                    if(item === friend)
                        duplicate = true;
                });
                if(!duplicate)
                    friendsList.push(friend);
                accounts.update({username}, {friendsList, friendRequests}, function(err){
                    callback();
                });
            } else {
                console.log('couldnt find user');
            }
        });
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
