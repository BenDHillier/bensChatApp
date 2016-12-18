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
let profileSchema = Object.create(mongoose.Schema({
    username: String,
    picture: String,
    bio: String
}));


let chatLogs = mongoose.model('chatLogs', chatSchema);
let accounts = mongoose.model('accounts', accountSchema);
let profiles = mongoose.model('profiles', profileSchema);

module.exports = {
    chatLogs,
    accounts,
    profiles
}
