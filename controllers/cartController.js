const Cart=require('../models/Carts');
const DemandedProducts = require('../models/DemandedProducts');
const Product=require('../models/Products');
const calc=require('./utilities/calculateTotalCountAndPrice');
const stripe=require('stripe')('');
  

var addProductToCart=function(req,res,next){
    var id=req.params.id;
    sendedSelectedProduct=new DemandedProducts({
        _id:id
    })

    sessionCart=req.session;
    var cart=sessionCart.cartval

    Product.findById(id,(error,prod)=>{
        
    sendedSelectedProduct.price=prod.productPrice;
    sendedSelectedProduct.name=prod.productName;
    if(cart===undefined)
    {
        sendedSelectedProduct.count=1;
        if(error)
        {
            console.log(error)
        }
        else
        {
        newCart=new Cart({
            _id:req.user._id,
            totalCount:1,
            totalPrice:prod.productPrice,
            selectedProduct:[sendedSelectedProduct]
        });
        req.session['cartval']=newCart;
        }
        res.redirect('/');
    }
    else
    {   
        indProduct=cart.selectedProduct.findIndex(x=>x._id===id);

        if(indProduct!==-1)
        {
            cart.selectedProduct[indProduct].count+=1;
        }
        else
        {
            sendedSelectedProduct.count=1
            cart.selectedProduct.push(sendedSelectedProduct);
        }
        var totalPriceAndCount=calc.getTotalPriceAndCount(cart.selectedProduct);
        var totalPrice=totalPriceAndCount[0];
        var totalCount=totalPriceAndCount[1];

        cart.totalCount=totalCount;
        cart.totalPrice=totalPrice;
        res.redirect('/');
    }   
    }) 
}

var getCartDetails=function(req,res,next){
    var cart=req.session.cartval;
    var totalPriceAndCount=calc.getTotalPriceAndCount(cart.selectedProduct);
    var totalPrice=totalPriceAndCount[0];
    var totalCount=totalPriceAndCount[1];
    res.render('cart.hbs',
    {
    cart:cart,
    title:'Shopping Cart',
    isSignin:req.isAuthenticated(),
    email:req.user.email,            
    totalCount: totalCount,
    totalPrice:totalPrice
    })    
}

var cancelOrder=function(req,res,next){
    req.session.cartval=undefined;
    res.redirect('/');
}

var deleteItem=function(req,res,next)
{    
    req.session.cartval.selectedProduct.splice(req.params.index,1);
    if(cart.selectedProduct.length===0)
    {
        req.session.cartval=undefined;
        res.redirect('/');
    }
    else
    {
        res.redirect('/cart/getCartDetails');
    }
}

var decreaseProduct=function(req,res,next)
{
    req.session.cartval.selectedProduct[req.params.index].count-=1;
    res.redirect('/cart/getCartDetails');
}

var increaseProduct=function(req,res,next)
{
    req.session.cartval.selectedProduct[req.params.index].count+=1;
    res.redirect('/cart/getCartDetails');
}

var checkout=function(req,res,next)
{
    const message=req.flash('checkout-error')[0];
    res.render('checkout',
    {
        email:req.user.email,
        isSignin:req.isAuthenticated(),
        totalCount:req.session.cartval.totalCount,
        totalPrice:req.session.cartval.totalPrice,
        checkoutError:message
    }
    );
}

var checkoutPost=function(req,res,next)
{

    stripe.charges.create({
        amount: req.session.cartval.totalPrice,
        currency: "usd",
        source:req.body.stripeToken, // obtained with Stripe.js
        description:"charge amount"
      }, {
        idempotencyKey: "uAZP9K1reOpqnBKE"
      },
      function(err, charge) {
        // asynchronously called
        if(err) 
        {
            console.log(err);
            req.flash('checkout-error',err.raw.message);
            res.redirect('/cart/checkout');
        }       
        else
        { 
            req.flash('checkout-success','Your order has been done successfully...');
            res.redirect('/');
        }
      });



}

module.exports={
    addProductToCart:addProductToCart,
    getCartDetails:getCartDetails,
    cancelOrder:cancelOrder,
    deleteItem:deleteItem,
    decreaseProduct:decreaseProduct,
    increaseProduct:increaseProduct,
    checkout:checkout,
    checkoutPost:checkoutPost
}