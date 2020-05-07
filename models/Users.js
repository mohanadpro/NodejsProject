const mongo=require('mongoose');

const bcrypt=require('bcrypt');

const userSchema=mongo.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.methods.hashPassword=function(password)
{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5));
}

userSchema.methods.comparePassword=function(password)
{
    return bcrypt.compareSync(password,this.password);
}

module.exports=mongo.model('Users',userSchema);