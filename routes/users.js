var express = require('express');
var router = express.Router();
const passport = require('passport');
const User=require('../models/Users');
const csrf=require('csurf');

router.use(csrf());

/* GET users listing. */
router.get('/signup',isNotSignedIn,function(req, res, next) {

  res.render('Usermanagement/signup.hbs',{error:req.flash('signUpUserIsFound'),token:req.csrfToken()})
});


router.post('/signup',passport.authenticate('local-sign-up',{
  // session :false to lock the session
  sesseion:false,
  successRedirect:'signin',
  failureRedirect:'signup',
  failureFlash:true
}));


router.get('/signin',isNotSignedIn,(req,res,next)=>{
  console.log(req.csrfToken());
  res.render('Usermanagement/signin.hbs',
  {
    userNotFound:req.flash('signInUserNotFound'),
    passwordWrong:req.flash('signInWrongPassword'),
    isSignin:req.user,
    token:req.csrfToken()
  });
})

// 1. strategy name that I config 
router.post('/signin',passport.authenticate('local-signin' , {
   successRedirect : '/',
   failureRedirect : 'signin',
   badRequestMessage: 'you make a bad request',
   failureFlash : true,
}))


router.get('/profile',isSignedIn,(req,res,next)=>{
  registeredUser =new User(req.user);
  res.render('Usermanagement/profile.hbs',{   
    isSignin:req.user,
    email:registeredUser.email
  });
})

function isSignedIn(req,res,next)
{
  if(!req.isAuthenticated())
  {
    res.redirect('signin',{isSign});
    return;
  }
  next();
}


router.get('/logout',isSignedIn,(req,res,next)=>{
  req.session.destroy();
  req.logOut();
  res.redirect('/');
})

function isNotSignedIn(req,res,next)
{
  if(req.isAuthenticated())
  {
    res.redirect('/')
    return
  }
  next();
}

module.exports = router;
