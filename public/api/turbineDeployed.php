<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'turbineDeployedPost.php';
  exit;
}

// $turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);
//
// if ($turbineDeployedId < 1) {
//   throw new Exception('Invalid TurbineDeployed ID');
// }

// 1. Go to the database and get all work associated with the $turbineDeployedId
// $turbineDeployedArr = TurbineDeployed::getTurbineDeployedById($turbineDeployedId);

$turbineDeployedArr = TurbineDeployed::getTurbineDeployedById();
// 2. Convert to JSON
$json = json_encode($turbineDeployedArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
