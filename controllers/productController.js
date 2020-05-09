const Product=require('../models/Products');
const User=require('../models/Users');
const calc=require('./utilities/calculateTotalCountAndPrice');
const Cart=require('../models/Carts');


var getProducts=function(req,res,next){
    newuser=new User(req.user);

    var cart=req.session.cartval;
    var totalCount,totalPrice;
    Product.find({},(error,result)=>{
        if(error){
            console.log(error);
        }
        var products=[];
        var gridColumn=3;
        for(var index=0;index<result.length;index+=gridColumn)
        {
            products.push(result.slice(index,index+gridColumn));
        }
        
        if(cart!==undefined)
        {                            
            var totalPriceAndCount=calc.getTotalPriceAndCount(cart.selectedProduct);
                totalPrice=totalPriceAndCount[0];
                totalCount=totalPriceAndCount[1];
            resultGetProductsCall(res,req,products,totalCount,totalPrice);
            
        } 
        else
        {
            if(req.user!==undefined)
            {
                Cart.findById(newuser._id,(err,storedCart)=>{
                    if(err)
                    {
                        console.log(err);
                    }

                    if(storedCart!=null)
                    {
                        console.log(storedCart);
                        cart=storedCart;
                        req.session.cartval=cart;
                        var totalPriceAndCount=calc.getTotalPriceAndCount(cart.selectedProduct);
                        totalPrice=totalPriceAndCount[0];
                        totalCount=totalPriceAndCount[1];
                    } 
                    resultGetProductsCall(res,req,products,totalCount,totalPrice);
                })
            }
            else
            {
                        resultGetProductsCall(res,req,products,totalCount,totalPrice);
            }
        }
    })
}

function resultGetProductsCall(res,req,products,totalCount,totalPrice)
{
    res.render('index',{
        prods:products,
        title:'Shopping Cart',
        isSignin:req.isAuthenticated(),
        email:newuser.email,       
        totalCount:totalCount,
        totalPrice:totalPrice,
        checkoutSuccess:req.flash('checkout-success')[0]
        })  
}

module.exports={
    getProducts:getProducts,
}