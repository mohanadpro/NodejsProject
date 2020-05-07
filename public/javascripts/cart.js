$(document).on("click", ".open-RemoveItemDialog", function () {
    // var productId = $('#productIdTable').val();

    var productIndex =  $('#productNameTable').val();

    // var productName = $('#productNameTable').val();
    // $(".modal-body #productId").text( productName );
    $("#deleteItemId").attr("href",'/cart/deleteItem/'+productIndex);
    // As pointed out in comments, 
    // it is unnecessary to have to manually call the modal.
    // $('#addBookDialog').modal('show');
});