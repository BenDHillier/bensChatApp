let mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds129018.mlab.com:29018/benschatdb');
let chatSchema = Object.create(mongoose.Schema({
    user: String,
    friend: String,
    chatLog: Array
}));
let accountSchema = Object.create(mongoose.Schema({
    username: String,
    password: String,
    friendsList: Array,
    friendRequests: Array
}));

let chatLogs = mongoose.model('chatLogs', chatSchema);
let accounts = mongoose.model('accounts', accountSchema);

module.exports = {
    chatLogs: chatLogs,
    accounts: accounts
}
