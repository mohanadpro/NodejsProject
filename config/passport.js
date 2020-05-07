const passport=require('passport');
const localStrategy=require('passport-local').Strategy ;
const User=require('../models/Users');


passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id,('email'),(err,user)=>{
    return done(null,user);
    })
})

// specify strategy
// 1. my strategy name
// 2. create an object from passport-local which takes our strategy's properities and a call back function 
// 3. done it's a function that it is passed to authenticate function 

passport.use('local-signin', new localStrategy({
    usernameField:'txtemail',
    passwordField:'txtpassword',
    passReqToCallback:true,
} , ( req , email , password , done)=>{
    User.findOne({email : email} , (err , res)=>{
        if(err)
        {
            return done(err)
        }
        if(!res)
        {
            return done(null,false,req.flash('signInUserNotFound','Email is not correct'))
        }
        if(!res.comparePassword(password))
        {
            return done(null,false,req.flash('signInWrongPassword','Password is wrong'));
        }        
        return done(null,res,req.flash('signInUserIsSignedIn','true'));
        })
}))


passport.use('local-sign-up',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({email:email},(err,user)=>{
        if(err)
        {
            return done(err)
        }
        if(user)
        {
            return done(null,false,req.flash('signUpUserIsFound','User is already found'))
        }
        const newuser=new User({
            email:email,
            password:new User().hashPassword(password)
        })
        newuser.save((err,user)=>{
            if(err)
            {
                return done(err)
            }
            return done(null,user);
        })
    })
}))
