var express = require('express');
var router = express.Router();
const passport = require('passport');
const User=require('../models/Users');
const Cart=require('../models/Carts');
const Order=require('../models/Orders');
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
  Order.find({user:req.user._id},(err,orders)=>{

    res.render('Usermanagement/profile.hbs',{   
      isSignin:req.user,
      email:registeredUser.email,
      orders:orders
    });
  })

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

  cart=new Cart(req.session.cartval);
  if(req.session.cartval==undefined)
  {
    destroySession(req,res);
  }
  else
  {
    Cart.findById(cart.id,(err,storedCart)=>{

      if(storedCart)
      {
        var updatedColumn={$set:{
          createAt:Date.now(),
          selectedProduct:cart.selectedProduct,
          totalPrice:cart.totalPrice,
          totalCount:cart.totalCount
        }}
        Cart.updateOne({_id:cart.id},updatedColumn,(err,updatedCart)=>{
          if(err)
          {
            console.log(err);
          }
          else
          {
            destroySession(req,res);
          }
        })       
      }
      else
      {
        cart['createAt']=Date.now();
        cart.save((err,userCart)=>
        {
            if(err)
            {
              console.log(err);
            }
            else
            {
              console.log(userCart);
              destroySession(req,res);
            }
        })
      }
    })

  }
})

function destroySession(req,res)
{
  req.session.destroy();
  req.logOut();
  res.redirect('/');
}

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
