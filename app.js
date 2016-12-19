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
let session = expSession({
    resave: false,
    saveUninitialized: false,
    secret: "hello"
});
app.use(session);
io.use(ios(session));

let chatController = require('./controllers/chatController');
let loginController = require('./controllers/loginController');
let signupController = require('./controllers/signupController');
let searchController = require('./controllers/searchController');
let socketSearch = require('./controllers/socketSearch');
let test = require('./controllers/test');
chatController(io, app);
loginController(app);
signupController(app);
searchController(app, io);
io.on('connection', function(socket){
    test(io, socket);
    socketSearch(io, socket);
});
