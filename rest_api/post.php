<?php
include "config.php";
include "utils.php";


$dbConn =  connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if ($_GET['operationType'] == 'getGroupList'){
      $sql = $dbConn->prepare("SELECT g.id, g.groupName
                               FROM groups AS g");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode( $sql->fetchAll()  );
      exit();
    }
    else if ($_GET['operationType'] == 'getStudentList'){
      $currentPage = $_GET['currentPage'];
      $listSize = $_GET['listSize'];
      $lowerLimit = 0;
      if ($currentPage == 1){
        $lowerLimit = 0;
      }
      else{
        $lowerLimit = ($currentPage * $listSize) - $listSize;
      }
      $sql = $dbConn->prepare("SELECT count(s.id) as numRows 
                               FROM students AS s");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      while($datos = $sql->fetch(PDO::FETCH_ASSOC)) {
        $numRows = $datos['numRows'];
      }

      $sql = $dbConn->prepare("SELECT '".$numRows."' as numRows, s.id, s.userName, s.firstName, 
                               s.lastName, s.`status`, grp.groupName, 
                               s.idGroup 
                               FROM students AS s 
                               INNER JOIN groups AS grp ON grp.id = s.idGroup 
                               LIMIT $lowerLimit,$listSize");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode( $sql->fetchAll()  );
      exit();
    }

}

// Create a new post
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $status = 0;
    if (isset($_POST['id']))
      $id = $_POST['id'];
    if ($_POST['operationType'] == 'changeStatus'){
      if ($_POST['currentStatus'] == 0)
        $sql = "update students SET status = 1 where id = ?";
      else 
        $sql = "update students SET status = 0 where id = ?";
      $statement = $dbConn->prepare($sql);
      $statement->bindParam(1, $id);
      if(!$statement->execute()) throw New Exception();
      $status = 1;
    }
    else if ($_POST['operationType'] == 'changeGroup'){
      $idGroup = $_POST['idGroup'];
      $sql = "update students SET idGroup = ? where id = ?";
      $statement = $dbConn->prepare($sql);
      $statement->bindParam(1, $idGroup);
      $statement->bindParam(2, $id);
      if(!$statement->execute()) throw New Exception();
      $status = 1;
    }
    else if ($_POST['operationType'] == 'login'){
      $username = $_POST['username'];
      $password = $_POST['password'];
      $rememberMe = $_POST['rememberMe'];
      $sql = "select id, password, salt from api_users where userName = ?";
      $statement = $dbConn->prepare($sql);
      $statement->bindParam(1, $username);
      if(!$statement->execute()){
        throw New Exception();
      }
      while($row = $statement->fetch()){
        if (hash("sha256", $password.$row['salt']) == $row['password']) {
          //If is correct password and checked "Remember Me", then we create a cookie 
          // and a session variable named sId.
          session_start();
          $_SESSION['sId'] = $row['id'];
          if ($rememberMe == 1)
            $_SESSION['rememberMe'] = 1;
          else
            $_SESSION['rememberMe'] = 0;
        $status = 1;
        }
      }
    }
    else if ($_POST['operationType'] == 'checkLogin'){
      $status = 0;
      session_start();
      if (isset($_SESSION['sId']) || (isset($_SESSION['rememberMe']) && $_SESSION['rememberMe'] == 1))
        $status = 1;
    }

    if($status == 1){
      header("HTTP/1.1 200 OK");
      echo json_encode('Success');
      exit();
	  }
    else{
     header("HTTP/1.1 200 OK");
     echo json_encode('Error');
     exit();
    }
}

//Delete
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
  session_start();
  if (session_destroy()){
  	header("HTTP/1.1 200 OK");
    echo json_encode('Success');
  }
	exit();
}

//If none of the above options were executed
header("HTTP/1.1 400 Bad Request");

?>