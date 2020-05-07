const Product=require('../models/Products');
const User=require('../models/Users');
const calc=require('./utilities/calculateTotalCountAndPrice');

var getProducts=function(req,res,next){
    newuser=new User(req.user);
    var cart=req.session.cartval;
    var email,totalCount,totalPrice;
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
            }
            res.render('index',{
            prods:products,
            title:'Shopping Cart',
            isSignin:req.isAuthenticated(),
            email:newuser.email,       
            totalCount:totalCount,
            totalPrice:totalPrice,
            checkoutSuccess:req.flash('checkout-success')[0]
            })
    
    })
}


module.exports={
    getProducts:getProducts,
}