  var selectList = '';
  var numRows = 0;
  var numPages = 0;
  var currentPage = 1;
  var paginationStr = '';
  var listSize = 5; //Number of rows on the table
  $(document).ready(function(){
    isLogIn(); //Check if log in is active, if not, redirects to other page
  }); //End of Document Ready

  //Get list of groups
  function GetGroupList(){
    $.ajax({
      type: "GET",
      dataType: "json",
      data: {operationType:'getGroupList'},
      url: "rest_api/post.php",
      }).done(function(result){
        selectList += '<option value="0" disabled="disabled">SELECT GROUP</option>'
        for (var i =0;result.length > i; i++) {
          selectList += '<option value="'+result[i].id+'">'+result[i].groupName+'</option>'
        }
      });
  }

  //Load students data and manage all its transactions
  //Load students data and fill the table
  function GetStudentList(){
    $.ajax({
      type: "GET",
      dataType: "json",
      data: {operationType:'getStudentList',currentPage:currentPage,listSize:listSize},
      url: "rest_api/post.php",
      }).done(function(result){
        setNullFunctions();
        var row = '';
        numRows = parseInt(result[0].numRows);
        for (var i =0;result.length > i; i++) {
          var icon = 'fa-times-circle timesCircle estatus';
          if (result[i].status == 1)
            icon = 'fa-check-circle checkCircle estatus';
          row += '<tr id="studentId'+result[i].id+'" class="studentRow">' + 
                 '  <td align="center"><i id="status'+result[i].id+'" class="fa '+icon+'"></i>' + 
                 '  <input type="hidden" id="currstatus'+result[i].id+'" value="'+result[i].status+'" /></td>' + 
                 '  <td>'+result[i].userName+'<br>'+result[i].firstName+' '+result[i].lastName+'</td>' + 
                 '  <td><span id="changeGroup'+result[i].id+'"' + 
                 '  class="changeGroup" style="font-size:1em;font-weight:bold;">...</span><br>'+
                 '  <span id="groupName'+result[i].id+'" class="groupName">'+result[i].groupName+'</span>' + 
                 '  <select id="selectGroup'+result[i].id+'" class="form-control-sm pull-left selectGroup hide" style="width:12em;" data-idgroup="'+result[i].idGroup+'" >' + 
                    selectList + 
                 '  </select>' + 
                 '</td>' + 
                 '</tr>';
        }
        $('#studentsTable > tbody:last').empty();
        $('#studentsTable > tbody:last').append(row);

        //Build the paginator
        numPages = numRows / listSize; //Number of pages
        paginationStr = '<li id="btnPagesPrev" class="page-item"><a id="prevPage" class="page-link pages" href="#">Previous</a></li>';
        for (var i =1;numPages >= i; i++) {
            paginationStr += '<li id="btnPages'+i+'" class="page-item"><a id="page'+i+'" class="page-link pages" href="#">'+i+'</a></li>';
        }
        paginationStr += '<li id="btnPagesNext" class="page-item"><a id="nextPage" class="page-link pages" href="#">Next</a></li>';
        $('#pagination').html(paginationStr);

        //Function to change student's status
        $('.estatus').dblclick(function(){
          var id = $(this).attr("id").substring(6,$(this).attr("id").length);
          var currentStatus = $('#currstatus'+id).val();
          $.ajax({
            type: "POST",
            dataType: "json",
            data: {operationType:'changeStatus', id:id, currentStatus:currentStatus},
            url: "rest_api/post.php",
            }).done(function(result){
              if (result == 'Success'){
                if (currentStatus == 0){ //Activate
                  $('#status'+id).addClass('fa-check-circle checkCircle');
                  $('#status'+id).removeClass('fa-times-circle timesCircle');
                  $('#currstatus'+id).val('1');
                }
                else{ //deactivate
                  $('#status'+id).addClass('fa-times-circle timesCircle');
                  $('#status'+id).removeClass('fa-check-circle checkCircle');
                  $('#currstatus'+id).val('0');
                }
              }
          });
        });

        //Function to change the student's group
        $('.changeGroup').dblclick(function(){
          var id = $(this).attr("id").substring(11,$(this).attr("id").length);
          var idGroup = $('#selectGroup'+id).data('idgroup');
          $('#selectGroup'+id+' > option').each(function() {
            if (this.value == idGroup)
              $('#selectGroup'+id+' option[value=' + idGroup + ']').attr("selected","selected");
          });
          $('#groupName'+id).addClass('hide');
          $('#selectGroup'+id).removeClass('hide');
        });

        //When select a new group, the select closes and update data on page
        $('.selectGroup').change(function(){
          var id = $(this).attr("id").substring(11,$(this).attr("id").length);
          var idGroup = $('#selectGroup'+id).val();
          var newGroup = $('#selectGroup'+id+' option:selected').text();
          $.ajax({
            type: "POST",
            dataType: "json",
            data: {operationType:'changeGroup',idGroup:idGroup,id:id},
            url: "rest_api/post.php",
            }).done(function(result){
              if (result == 'Success'){
                $('#groupName'+id).text(newGroup);
                $('#selectGroup'+id).addClass('hide');
                $('#groupName'+id).removeClass('hide');
              }
          });
        });

        //When you click outside an open select, it will close
        $('#theBody').click(function(){ 
          $('.selectGroup').addClass('hide');
          $('.groupName').removeClass('hide');
        });

        //Function to change page on data table
        $('.pages').click(function(){
          var idPage = $(this).attr("id");
          if ($(this).attr("id") == 'prevPage'){
            currentPage--;
          }
          else if($(this).attr("id") == 'nextPage'){
            currentPage++;
          }
          else{
            idPage = $(this).attr("id").substring(4,$(this).attr("id").length);
            currentPage = idPage;
          }
          GetStudentList();
        });

        //Handles the states of the page buttons
        if (parseInt(currentPage) == 1){
          $('#btnPagesPrev').addClass('disableOpaque');
          $('#btnPages1').addClass('disableOpaque');
        }
        else if (parseInt(currentPage) == numPages){
          $('#btnPagesNext').addClass('disableOpaque');
          $('#btnPages'+currentPage).addClass('disableOpaque');
        }
        else if (parseInt(currentPage) >= 2 && parseInt(currentPage) < numPages){
          $('#btnPages'+currentPage).addClass('disableOpaque');
        }
      });
  }

  //Cancel all table's functions to renew them when the data is reloaded
  function setNullFunctions(){
    $('.timesCircle').unbind();
    $('.checkCircle').unbind();
    $('.changeGroup').unbind();
    $('.selectGroup').unbind();
    $('.pages').unbind();
  }

  //Check if there is an open session, if not, redirect to page unauthorized.html
  function isLogIn(){
    var resultado = false;
    $.ajax({
      type: "POST",
      dataType: "json",
      data: {operationType:'checkLogin'},
      url: "rest_api/post.php",
      }).done(function(result){
        if (result == 'Success'){
          GetGroupList();
          GetStudentList();
          $('#logout').click(function(){
            Logout();
         });
        }
        else if (result == 'Error'){
          window.location.href = "unauthorized.html";
        }
      });
  }

  //Close the session
  function Logout(){
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "rest_api/post.php",
    }).done(function(result){
      if (result == 'Success')
        window.location.href = "login.html";
    });
  }