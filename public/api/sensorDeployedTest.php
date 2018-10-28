<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorDeployedPostTest.php';
  exit;
}

$sensorDeployedId = intval($_GET['sensorDeployedId'] ?? 0);

if ($sensorDeployedId < 1) {
  throw new Exception('Invalid sensorDeployed ID');
}

// 1. Go to the database and get all work associated with the $sensorDeployedId
$sensorDeployedArr = SensorDeployedTest::getSensorDeployedById($sensorDeployedId);

// 2. Convert to JSON
$json = json_encode($sensorDeployedArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
echo $json;
