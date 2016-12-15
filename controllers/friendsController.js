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

    add: function(username, friend, callback){
        accounts.findOne({username}, function(err, data){
            let friendsList;
            if(data){
                friendsList = data.friendsList;
                //prevent duplicates
                let duplicate = false;
                friendsList.forEach(function(item){
                    if(item === friend)
                        duplicate = true;
                });
                if(!duplicate)
                    friendsList.push(friend);
                accounts.update({username}, {friendsList}, function(err){
                    callback();
                });
            } else {
                console.log('couldnt find user');
            }
        });
    }
};
