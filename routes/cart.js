var express=require('express');
var router=express.Router();
const cartController=require('../controllers/cartController');


router.get('/addProductToCart/:id',isSignIn,cartController.addProductToCart)

router.get('/getCartDetails',isSignIn,isProductsFound,cartController.getCartDetails);

router.get('/cancelOrder',cartController.cancelOrder);

router.get('/deleteItem/:id',cartController.deleteItem);

router.get('/decreaseProduct/:index',cartController.decreaseProduct);

router.get('/increaseProduct/:index',cartController.increaseProduct);

router.get('/checkout',cartController.checkout);

router.post('/checkout',cartController.checkoutPost);

function isSignIn(req,res,next)
{
    if(!req.isAuthenticated())
    {
        res.redirect('/users/signin');
        return;
    }
    next();
}

function isProductsFound(req,res,next)
{
    if(req.session.cartval===undefined)
    {
        res.redirect('/');
        return
    }
    next();
}

module.exports = router;