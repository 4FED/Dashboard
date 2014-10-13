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

	    $statement = $this->pdo->prepare("INSERT INTO `user` (initials, surname, name, email, password) 
	    									VALUES ('".$initials."', '".$surname."', '".$name."', '".$email."', '".$password."');");
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
	
	default:
		# code...
		break;
}
 ?>