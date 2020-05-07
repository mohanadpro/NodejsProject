const mongo=require('mongoose');

var DemandedProductSchema=mongo.Schema({
    _id:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required:true,
    },
    count:
    {
        type:Number,
        required:true
    }    
})

module.exports=mongo.model('DemandedProducts',DemandedProductSchema);