var express=require('express');
var router=express.Router();
var mongodb=require('mongodb');
var User=require('../models/user');
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/address");
var db=mongoose.connection;

router.get('/add',function(req,res){
   res.render('add'); 
});


router.get('/view',function(req,res,next)
           {
          User.find(function(err,docs){
              var usersarray=[];
              for(var i=0;i<=docs.length;i++){
                  usersarray.push(docs.slice(i,i+1));
              }
              res.render('view',{users:usersarray});
          });
});

/*
router.get('/view',function(req,res){
    res.render('view');
});


router.get('/user/:id',function(req,res,next){
    User.findOne({_id:mongodb.ObjectID(req.params.id)},function(err,user){
        if(err) throw err;
        else{
            res.json(user);
        }
    });
});
*/
//delete user

router.get('/user/:id',function(req,res,next){
    User.remove({_id:req.params.id},function(err,user){
        //User.remove({_id:mongodb.ObjectID(req.params.id)},function(err,user){
        //if(err) throw err;
        //else
        //{
          //  res.redirect('/view');
            //res.json(user);
    //    }
       // res.send();
        res.redirect('../view');
    });
   // res.send();
              
              });
/*
router.put('/user/update/:id',function(req,res,next){
   
        updated={};
        var entry=req.body;
        if(entry.fname){
            updated.fname=entry.fname;
        }
        if(entry.lname){
            updated.lname=entry.lname;
        }
        if(entry.mobile){
            updated.mobile=entry.mobile;
        }
        if(entry.email){
            updated.email=entry.email;
        }
        if(entry.address){
            updated.address=entry.address;
        }
        if(!updated){
            res.status(400);
            res.json({
                "error":"Bad data"
            });
        }
        else{
             User.update({_id:req.params.id},updated,{},function(err,user){
                 res.redirect('../view');
 });
        }  
});
*/
router.get('/update/:id',function(req,res){
    res.render('update',{User:req.params.id});
   /*
   updated={};
        var entry=req.body;
        if(entry.fname){
            updated.fname=entry.fname;
        }
        if(entry.lname){
            updated.lname=entry.lname;
        }
        if(entry.mobile){
            updated.mobile=entry.mobile;
        }
        if(entry.email){
            updated.email=entry.email;
        }
        if(entry.address){
            updated.address=entry.address;
        }
        if(!updated){
            res.status(400);
            res.json({
                "error":"Bad data"
            });
        }
        else{
             User.update({_id:req.params.id},updated,{},function(err,user){
                 res.redirect('../view');
 });
        } */
    
    
});
router.get('/update',function(req,res){
    User.update({_id:req.params.id},
                {
        email:req.body.email,
        mobile:req.body.mobile,
        address:req.body.address
    },function(err){
        if(err)
            res.json(err);
        else
            res.redirect('../view');
        
    });
        
});
/*
router.post('/view/update/:id',function(req,res){
   // console.log("passed");
    console.log(req.body.fname);
    
});
*/
router.post('/add',function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var address=req.body.address;
    var mobile=req.body.mobile;
    req.checkBody('fname','first name is required').notEmpty();
    req.checkBody('lname','last name is required').notEmpty();
    req.checkBody('mobile','mobile no is required').notEmpty();
    req.checkBody('address','address is required').notEmpty();
    var errors=req.validationErrors();
    if(errors){
        res.render('add',{
            errors:errors
        });
    }
    else{
        var newuser=new User({
            fname:fname,
            lname:lname,
            email:email,
            address:address,
            mobile:mobile
        });
        User.createUser(newuser,function(err,user){
            if (err) throw err;
            else{
                console.log(user);
                //res.send(user);            
                //res.render('index');
            }

        });
        req.flash('success_msg',"Successfully registered the Contact");
        res.redirect('/');
    }
    
            });
//router.post('/view',function(req,res){
    
/*
    User.find({},function(err,user){
        if (err) throw err;
        else{
            res.json(user);
        }
       // res.render('view');
    });

    
    
});
*/


module.exports=router;
