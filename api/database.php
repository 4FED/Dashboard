<?php
#Start Session
session_start();
#Start Output Buffering
ob_start();
#Set Default TimeZone
date_default_timezone_set('Asia/Kolkata');

#Define Connection Constant
define('HOST','localhost');
define('USERNAME','schrava001');
define('PASSWORD','42+qzyLQd');
define('DATABASE','zschrava001');
//Define Configuration Constant
define('DATE', date("d-F-Y/H:ia"));

#Connect to the database
try
{
    #Define Connection String Using PDO.
    $pdo = new PDO('mysql:host='.HOST.';dbname='.DATABASE,USERNAME,PASSWORD);

    #Set Error Mode to ERRMODE_EXCEPTION.
    $pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    return; $e->getMessage();
}
?>