const mongo=require('mongoose');

var productSchema={
    pathProductImage:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productCompany:{
        type:String,
        required:true
    },
    productInfo:{
        type:{
            storageName:String,
            processorsCore:Number,
            ramNumber:Number
        },
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    }
}

module.exports=mongo.model('Products',productSchema);