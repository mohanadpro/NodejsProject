$(function(){
      $(".fold-table tr.view").on("click", function(){
        $(this).toggleClass("open").next(".fold").toggleClass("open");
      });
    });


document.getElementById('fileImage').onchange=function()
{
  var reader=new FileReader();
  reader.readAsDataURL(this.files[0]);

  reader.onload=function(){
    document.getElementById('imgProfile').src=this.result;
    $('#fileImage').addClass('d-none');
    $('#divButtonProfileImageActions').removeClass('d-none');
    
  }
}