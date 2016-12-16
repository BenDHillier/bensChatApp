let model = require('../models/models');
let chatLogs = model.chatLogs;
let connections = [];

module.exports = function(io, app){
    /*
    io.on('connection', function(socket){
        let session = socket.handshake.session;
        addConnection(session.user, socket.id);
        socket.on('chat message', function(msg){
            let friendID = getId(session.friend);
            io.to(friendID).emit('chat message', session.user+": "+msg, session.user);
            //io.to(socket.id).emit('chat message', session.user+": "+msg, session.user);
            //update chatLog for user and friend
            chatLogs.findOne({user: session.user, friend: session.friend}, function(err, data){
                data.chatLog.push(session.user+ ": "+ msg);
                chatLogs.update({user: session.user, friend: session.friend}, {chatLog: data.chatLog}, function(err){
                });
                chatLogs.update({user: session.friend, friend: session.user}, {chatLog: data.chatLog}, function(err){
                });
            });
        });
        socket.on('clear', function(){
            chatLogs.findOne({user: session.user, friend: session.friend}, function(err, data){

            });
            update(session.user, session.friend, '', true, io);
        });
        socket.on('getFriend', function(sender, msg){
            console.log('sender:', sender, 'msg:', msg);
            let data = {
                sender,
                msg,
                friend: session.friend
            }
            io.to(socket.id).emit('getFriend', data);
        })
    });
    */

    app.get('/chat', function(req, res){
        if(req.session.user === null) {
            res.redirect('/login');
            return;
        } else if(req.session.friend === null)
            res.redi
        let data = chatLogs.findOne({user: req.session.user, friend: req.session.friend}, function(err, data) {
            if(data){
            res.render('index', data);
            } else {
                res.send('chatlog not found');
            }
        })
    });

    app.post('/chat', function(req, res){
        req.session.friend = req.body.friend;
        if(req.session.user == null) {
            res.redirect('/login');
            return;
        }
        let data = chatLogs.findOne({user: req.session.user, friend: req.session.friend}, function(err, data) {
            if(data){
            res.render('index', data);
            } else {
                res.send('chatlog not found');
            }
        })
    });

    app.get('/', function(req, res) {
        if(!req.session.user) {
            res.redirect('/login');
        } else {
            res.redirect('/search');
        }
    })
};

function update(user, friend, msg, clear, io){
    chatLogs.findOne({'user': user}, function(err, data){
        if(clear){
            io.emit('clear')
            chatLogs.update({'user': user, friend: friend}, {chatLog: []}, function(err){
                console.log('cleared log');
            });
        } else {
            data.chatLog.push(msg);
            chatLogs.update({'user': user, friend: friend}, {chatLog: data.chatLog}, function(err){
                console.log('updated log');
            });
        }
    });
};

function addConnection(user, id){
    if(user){
        let result = true;
        connections.forEach(function(item){
            if(item.user === user) result = false;
        })
        if(result)
            connections.push({user, id});
            console.log(connections);
    }
}

function getId(user){
    let id = "";
    connections.forEach(function(item){
        if(item.user === user) {
            id = item.id;
        }
    })
    return id;
}
