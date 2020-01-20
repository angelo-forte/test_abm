<?php

  //Open database connection
  function connect($db)
  {
      try {
          $conn = new PDO("mysql:host={$db['host']};dbname={$db['db']}", $db['username'], $db['password']);

          // set the PDO error mode to exception
          $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          return $conn;
      } catch (PDOException $exception) {
          exit($exception->getMessage());
      }
  }


 //Get parameters to updates
 function getParams($input)
 {
    var_dump($input);
    $filterParams = [];
    $count = 0;
    foreach($input as $param => $value)
    {
        if ($count != 0)
            $filterParams[] = "$param=$param";
        $count++;
    }
    var_dump($filterParams);
    return implode(", ", $filterParams);
	}

  //Associate all parameters
	function bindAllValues($statement, $params)
  {
    $count = 0;
		foreach($params as $param => $value)
    {
        if ($param != 'operationType')
				  $statement->bindValue(':'.$param, $value);
        $count++;
		}
    var_dump($statement);
		return $statement;
   }
 ?>