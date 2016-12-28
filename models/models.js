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
    friendsList: {type:Array, default:[]},
    friendRequests: {type:Array, default:[]},
    notifications: {type:Array, default:[]},
    newNotifications: {type:Boolean, default:false},
    newRequests: {type:Boolean, default:false}
}));
let profileSchema = Object.create(mongoose.Schema({
    username: String,
    picture: {type:String, default:'assets/profilePictures/default.png'},
    bio: {type:String, default:'bio goes here'}
}));


let chatLogs = mongoose.model('chatLogs', chatSchema);
let accounts = mongoose.model('accounts', accountSchema);
let profiles = mongoose.model('profiles', profileSchema);

let defaultProfile = {
        username: 'Name',
        picture: 'assets/profilePictures/default.png',
        bio: 'Bio goes here'
};

function createProfile(username){
    let result = Object.create(profiles({username}));
    result.save();
    return result;
}

function saveProfile(){
    Object.create(profiles({
        username: 'test',
        picture: 'assets/profilePictures/default.png',
        bio: 'I made a bio'
    })).save();
}

module.exports = {
    chatLogs,
    accounts,
    profiles,
    createProfile,
    defaultProfile,
    saveProfile
}
