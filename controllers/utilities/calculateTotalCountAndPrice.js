
function getTotalPriceAndCount(selectedProduct)
{
    var totalPrice=0;
    var totalCount=0;
    for(var indexProduct=0;indexProduct<selectedProduct.length;indexProduct++)
    {
        totalCount+=selectedProduct[indexProduct].count;
        totalPrice+=selectedProduct[indexProduct].count*selectedProduct[indexProduct].price;
    }
    return [totalPrice,totalCount];
}

module.exports={
    getTotalPriceAndCount:getTotalPriceAndCount
}