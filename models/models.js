let mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds129018.mlab.com:29018/benschatdb');
let chatSchema = Object.create(mongoose.Schema({
    users: Array,
    chatLog: Array
}));
let accountSchema = Object.create(mongoose.Schema({
    username: String,
    password: String
}));

let chatLogs = mongoose.model('chatLogs', chatSchema);
let accounts = mongoose.model('accounts', accountSchema);

module.exports = {
    chatLogs: chatLogs,
    accounts: accounts
}
