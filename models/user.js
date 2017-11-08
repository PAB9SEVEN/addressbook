var mongoose=require('mongoose');
var userSchema=mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    mobile:{
        type:String
    }
   
});
var User=module.exports=mongoose.model('User',userSchema);
module.exports.createUser=function(newUser,callback){
    newUser.save(callback);     
    
}

//this is used to export the fnction to the out of this file
