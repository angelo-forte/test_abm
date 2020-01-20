  $( document ).ready(function() {
    $('#passwordWrong').hide();
	  $('#btnLogIn').click(function(){
      if ($('#username').val().length == 0 || $('#password').val().length == 0){
        return;
      }
      else{
        var rememberMe = 0;
        if ($('#rememberMe').is(":checked"))
          rememberMe = 1;
        $.ajax({
          type: "POST",
          dataType: "json",
          data: {operationType:'login',username:$('#username').val(),
                password:$('#password').val(),rememberMe:rememberMe},
          url: "rest_api/post.php",
        }).done(function(result){
          if (result == 'Success'){
            window.location.href = "list.html";
          }
          else{
            $('#passwordWrong').fadeIn('slow');
            setTimeout(function(){ 
              $('#passwordWrong').fadeOut('slow');
              $('#username').focus();
            }, 3000);
          }
        });
      }
	  });
  }); //End of Document Ready