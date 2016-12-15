let friends = require('../controllers/friendsController');
let model = require('../models/models');
let accounts = model.accounts;

accounts.findOne({username: 'test'}, function(err, data){
    friends.getList(data.username, function(list){
            
            console.log(list);
            console.log('getFriendsList works');
            friends.add(data.username, 'friend', function(err){
                friends.getList(data.username, function(newlist){
                    if(newlist === list)
                        console.log('add friend works');
                    else {

                        console.log('failed: ',newlist);
                    }
                });
            });
    });

})
