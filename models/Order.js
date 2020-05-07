const mongo=require('mongoose');

var Orderschema=mongo.Schema({

});

module.exports=mongo.model('Order',Orderschema);