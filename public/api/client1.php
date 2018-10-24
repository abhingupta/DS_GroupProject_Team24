<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientPost1.php';
  exit;
}

// $clientId = intval($_GET['clientId'] ?? 0);
//
// if ($clientId < 1) {
//   throw new Exception('Invalid Client ID');
// }


// 1. Go to the database and get all work associated with the $taskId

$hello = Client1::getClientById();

// 2. Convert to JSON
$json1 = json_encode($hello, JSON_PRETTY_PRINT);

$error = json_last_error();

var_dump($json1, $error === JSON_ERROR_UTF8);
?>

// 3. Print
header('Content-Type: application/json');
echo $json1;
echo '<pre> buga buga1 buga';
var_dump($json1);
echo '</pre>';
