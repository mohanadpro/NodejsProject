function ValidateSignupForm()
{
    debugger;
    var email=$("#txtemail")?.val();
    var password=$("#txtpassword")?.val();
    var confirmPassword=$("#txtConfirmPassword")?.val();
    
    // define regular expressions

    
    var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var regPassword=/^[a-zA-Z\-0-9]{6,20}/
    // end define regular expressions


    if(email=="")
    {
    $('#email-error').text('please enter email');
    $('#password-error').text('');
    $('#confirm-password-error').text('');
    return false;
    }

    if(!regEmail.test(String(email).toLowerCase()))
    {
        $('#email-error').text('email addres is not valid');
        $('#password-error').text('');
        $('#confirm-password-error').text('');
        return false
    }
    
    if(password=="")
    {
    $('#password-error').text('please enter password');
    $('#email-error').text('');
    $('#confirm-password-error').text('');
    return false;
    }
    if(!regPassword.test(String(password)))
    {
      $('#password-error').text('password is not valid');
      $('#email-error').text('');
      $('#confirm-password-error').text('');
      return false;  
    }
    if(password!=confirmPassword)
    {
    $('#confirm-password-error').text('password and confirm password are not matched');
    $('#email-error').text('');
    $('#password-error').text('');
    return false;

    }
    if(email=="" || password == "" || password!=confirmPassword)
    {

    }
    else
    {
      
      $('#email-error').text('');
      $('#password-error').text('');
      $('#confirm-password-error').text('');
      return true;
    }
}

function showPassword()
{
  if($("#txtpassword").attr('type')=="password")
      $("#txtpassword").attr('type','text');
  else
      $("#txtpassword").attr('type','password');
}
function showConfirmPassword()
{
  if($("#txtConfirmPassword").attr('type')=="password")
      $("#txtConfirmPassword").attr('type','text');
  else
      $("#txtConfirmPassword").attr('type','password');
}
