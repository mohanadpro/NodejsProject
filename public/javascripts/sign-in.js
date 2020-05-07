function validateSignInForm()
{
    var email=$("#txtemail")?.val();
    var password=$("#txtpassword")?.val();
    
    // define regular expressions
    
    var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var regPassword=/^[a-zA-Z\-0-9]{6,20}/
    // end define regular expressions

    if(email=="")
    {
    $('#email-error').text('please enter email');
    $('#password-error').text('');
    return false;
    }

    if(!regEmail.test(String(email).toLowerCase()))
    {
        $('#email-error').text('email addres is not valid');
        $('#password-error').text('');
        return false
    }

    if(password=="")
    {
    $('#password-error').text('please enter password');
    $('#email-error').text('');
    return false;
    }
}