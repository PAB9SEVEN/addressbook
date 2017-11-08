var path=require('path');
var express=require('express');
var mongo=require('mongodb');
var expressValidator=require('express-validator');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var flash=require('connect-flash');

var session=require('express-session');
var cookieParser=require('cookie-parser');
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/address");
var db=mongoose.connection;
var app=express();
var index=require('./routes/index');
var users=require('./routes/users');
port=8000;
//view engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');
app.use(cookieParser());
//body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//static folder
app.use(express.static(path.join(__dirname,'public')));
app.use('/static', express.static(__dirname + '/public'));

//express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  
}));
app.locals.db=db;
//express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//flash 

app.use(flash());
//global vars
app.use(function(req,res,next){
   res.locals.success_msg =req.flash('success');
    res.locals.error_msg=req.flash('error msg');
    res.locals.error=req.flash('error message');
    next();
    
    
});
app.use('/',index);
app.use('/users',users);

app.listen(port,function(req,res){
    console.log("port started");
});