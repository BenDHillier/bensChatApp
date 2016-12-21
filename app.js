let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let expSession = require('express-session');
let http = require('http').Server(app).listen(8080, function(){
    console.log("listening on port 8080");
});
let io = require('socket.io')(http);
let ios = require('socket.io-express-session');

app.set('view engine', 'ejs');
app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));
let theSession = expSession({
    resave: false,
    saveUninitialized: false,
    secret: "hello"
});
app.use(theSession);
io.use(ios(theSession));

let chatController = require('./controllers/chatController');
let loginController = require('./controllers/loginController');
let signupController = require('./controllers/signupController');
let searchController = require('./controllers/searchController');
let friendRequestsController = require('./controllers/friendRequestsController');
let socketSearch = require('./controllers/socketSearch');
let test = require('./controllers/test');
let addFriends = require('./controllers/addFriends.js');
chatController(io, app);
loginController(app);
signupController(app);
searchController(app, io);
io.on('connection', function(socket){
    test(io, socket);
    socketSearch(io, socket);
    friendRequestsController(io, socket);
    addFriends(io, socket);
});
