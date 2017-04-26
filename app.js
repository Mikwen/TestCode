const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const http = require ('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

dotenv.config();
mongoose.Promise = global.Promise;

const routes  = require ('./routes/index');
const users = require ('./routes/users');
const lecture = require('./routes/lecture')
const files = require ('./routes/files');
const course = require ('./routes/course');

//init app
const app = express();
const server = http.createServer(app)

//View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//bodyParser Middleware
//setupcode. need middleware for modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//set static folder for publicly accessible content (stylesheet, img etc)
app.use(express.static(path.join(__dirname, 'public')));

//Express session (middleware)
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.user = req.user;

    next();
});

//Express validator (middleware)
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        const namespace = param.split('.'),
        root          = namespace.shift(),
        formParam     = root;

    while(namespace.length){
        formParam+= '[' + namespace.shift() + ']';
    }
    return{
        param: formParam,
        msg  : msg,
        value: value
    };
    }
}));

//Connect flash (middleware)
app.use(flash());

//Global constiables for flash msg
//passport uses its own error msg, so we use error as well as our own error_msg
app.use(function (req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//File uploading
app.use(fileUpload());

//Route files (middleware)
app.use('/', routes);
app.use('/users', users);
app.use('/files', files);
app.use('/course', course);

// set port
const port = process.env.PORT || 3000;
// listen to port and tell user that connection has been established
mongoose.connect(process.env.MONGODB_URL)
.then(() => app.listen(port, () => console.log('Server started')))
.catch(err => console.log(err));

module.exports = app;





