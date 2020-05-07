var Product=require('../models/Products');

const mongo=require('mongoose');

mongo.connect('mongodb://localhost/ShoppingCard',{useNewUrlParser:true},(error)=>{
    if(error){
        console.log(error);
    }
    else
    {
        console.log('database is connected succesfully....');
    }
})

var products=[new Product({
    pathProductImage:'/images/iphone-11.jpg',
    productName:'Iphon 11',
    productCompany:'Apple',
    productInfo:{
            storageName:'64GB',
            processorsCore:4,
            ramNumber:16
    },
    productPrice:240
}),
new Product({
    pathProductImage:'/images/iphonex.jpg',
    productName:'Iphone X',
    productCompany:'Apple',
    productInfo:{
            storageName:'40GB',
            processorsCore:4,
            ramNumber:16
    },
    productPrice:240
}),
new Product({
    pathProductImage:'/images/note9.jpg',
    productName:'Note 9',
    productCompany:'Galaxy',
    productInfo:{
            storageName:'30GB',
            processorsCore:4,
            ramNumber:16
    },
    productPrice:240
}),
new Product({
    pathProductImage:'/images/note10.jpg',
    productName:'Note 10',
    productCompany:'Galaxy',
    productInfo:{
            storageName:'36GB',
            processorsCore:4,
            ramNumber:16
    },
    productPrice:240
}),
new Product({
    pathProductImage:'/images/s20.jpg',
    productName:'S20',
    productCompany:'Galaxy',
    productInfo:{
            storageName:'25GB',
            processorsCore:4,
            ramNumber:16
    },
    productPrice:240
}),
new Product({
    pathProductImage:'/images/sonyz.jpg',
    productName:'Sony Z',
    productCompany:'Sony',
    productInfo:{
            storageName:'70GB',
            processorsCore:4,
            ramNumber:16
    },
    productPrice:240
})
]

for(var index=0; index<products.length;index++)
{
    products[index].save((error,res)=>{
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(res);
            if(index==products.length)
            {
                mongo.disconnect();
            }
        }
    });
}