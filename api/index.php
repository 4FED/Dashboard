<?php 
	include('database.php');
/**
* 
*/
class apiCalls
{	
	protected $pdo;
	function __construct($pdo)
	{
		$this->pdo = $pdo;
	}

	function login($email, $password) {	
		   
	    $statement = $this->pdo->prepare("SELECT * FROM `user` WHERE email= '".$email."' AND password='".$password."'");
	    if (!$statement->execute()) {
	    	print_r("Error in query ".$this->pdo>errorInfo());
	    	break;
	    }

	    try {	    	
	    	$result = $statement->fetchAll();
	    } catch (PDOException $e) {
	    	echo "error in fetch " . $e;
	    }	   
	   return $result;
	}

	function registerUser($initials, $surname, $name, $email, $password) {

		try {		
		    $statement = $this->pdo->prepare("INSERT INTO `user` (initials, surname, name, email, password) 
		    									VALUES (:initials, :surname, :name, :email, :password);");
		    $result = !$statement->execute(array(
		    	':initials' => $initials,
		    	':surname' => $surname,
		    	':name' => $name,	 
		    	':email' => $email,
		    	':password' => $password
		    ));
		} catch(PDOException $e) {
			echo 'Error: ' . $e->getMessage();
	    }
	    return  $this->pdo->lastInsertId();
	}
	
	function registerExercise($userID, $title, $responsePrevention, $category, $fearFactor) {
		switch ($category) {
			case 0:
				$category = "control";
				break;
			case 1:
				$category = "wash";
				break;
			case 2:
				$category = "normal";
				break;
		}

		try {		
		    $statement = $this->pdo->prepare("INSERT INTO `exercise` (userID, title, responsePrevention, category, fearFactor) 
		    									VALUES (:userID, :title, :responsePrevention, :category, :fearFactor);");
		    $result = $statement->execute(array(
		    	':title' => $title,
		    	':userID' => $userID,
		    	':responsePrevention' => $responsePrevention,
		    	':category' => $category,	 
		    	':fearFactor' => $fearFactor
		    ));
		} catch(PDOException $e) {
			echo 'Error: ' . $e->getMessage();
	    }
	    return  $this->pdo->lastInsertId();
	}

	function getExercise($userID)	{
			
		 $statement = $this->pdo->prepare("SELECT * FROM `exercise` WHERE userID= '".$userID."'");
	    if (!$statement->execute()) {
	    	print_r("Error in query ".$this->pdo>errorInfo());
	    	break;
	    }

	    try {	    	
	    	$result = $statement->fetchAll();
	    } catch (PDOException $e) {
	    	echo "error in fetch " . $e;
	    }	   
	   return $result;
	}
}

$apiCalls = new apiCalls($pdo);

switch ($_GET['function']) {
	case 'login':
		print_r($apiCalls->login($_GET['email'], $_GET['password']));
		break;
	case 'registerUser':
		print_r($apiCalls->registerUser($_GET['initials'], $_GET['surname'], $_GET['name'],$_GET['email'],  $_GET['password']));
		break;
	case 'registerExercise':
		print_r($apiCalls->registerExercise($_GET['userID'], $_GET['title'], $_GET['responsePrevention'], $_GET['category'],$_GET['fearFactor']));
		break;
	case 'getExercise':
		print_r($apiCalls->getExercise($_GET['userID']));
		break;
}
 ?>