const mongo=require('mongoose');

const cartsSchema=mongo.Schema({
    _id:
    {
        type:String,
        required:true,
    },
    totalCount:
    {
        type:Number,
        required:true
    },
    totalPrice:
    {
        type:Number,
        required:true
    },
    selectedProduct:
    {
        type:Array,
        required:true
    }        
})


module.exports=mongo.model('Carts',cartsSchema);