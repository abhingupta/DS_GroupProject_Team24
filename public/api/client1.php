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
$json1 = json_encode($hello, JSON_FORCE_OBJECT);

// 3. Print
header('Content-Type: application/json');
echo $json1;
echo '<pre> buga buga1 buga';
print_r($json1);
echo '</pre>';
