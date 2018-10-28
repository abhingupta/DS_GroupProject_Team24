<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'turbineDeployedPostTest.php';
  exit;
}

$turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);

if ($turbineDeployedId < 1) {
  throw new Exception('Invalid TurbineDeployed ID');
}

// 1. Go to the database and get all work associated with the $turbineDeployedId
$turbineDeployedArr = TurbineDeployedTest::getTurbineDeployedById($turbineDeployedId);

// $turbineDeployedArr = TurbineDeployed::getTurbineDeployedById();
// 2. Convert to JSON
$json = json_encode($turbineDeployedArr, JSON_PRETTY_PRINT);

// $turbineDeployedArr1 = TurbineDeployed::getTurbineDeployedById();
// // 2. Convert to JSON
// $json1 = json_encode($turbineDeployedArr1, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
// echo $json . "nl2br" . "New array" . $json1 .  "\n";
