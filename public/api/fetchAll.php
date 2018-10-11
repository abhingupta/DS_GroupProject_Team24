<?php

require '../../app/common.php';

// $turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);
//
// if ($turbineDeployedId < 1) {
//   throw new Exception('Invalid TurbineDeployed ID');
// }

// 1. Go to the database and get all work associated with the $turbineDeployedId
// $turbineDeployedArr = TurbineDeployed::getTurbineDeployedById($turbineDeployedId);

$turbineDeployedArr = TurbineDeployed::getTurbineDeployedById();
// 2. Convert to JSON
$turbineDeployedJson = json_encode($turbineDeployedArr, JSON_PRETTY_PRINT);

$clientArr = Client::getClientById();

// 2. Convert to JSON
$clientJson = json_encode($clientArr, JSON_PRETTY_PRINT);

$sensorArr = Sensor::getSensorById();

// 2. Convert to JSON
$sensorJson = json_encode($sensorArr, JSON_PRETTY_PRINT);

$sensorDeployedArr = SensorDeployed::getSensorDeployedById();

// 2. Convert to JSON
$sensorDeployedJson = json_encode($sensorDeployedArr, JSON_PRETTY_PRINT);

$sensorTimeSeriesArr = SensorTimeSeries::SensorTimeSeriesById();

// 2. Convert to JSON
$sensorTimeSeriesjson = json_encode($sensorTimeSeriesArr, JSON_PRETTY_PRINT);

$siteArr = Site::getSiteById();

// 2. Convert to JSON
$siteJson = json_encode($siteArr, JSON_PRETTY_PRINT);


$turbineArr = Turbine::getTurbineById();

// 2. Convert to JSON
$turbineJson = json_encode($turbineArr, JSON_PRETTY_PRINT);
// 3. Print
header('Content-Type: application/json');
// echo $json;
 echo $siteJson . "\n" . "Client data" . $clientJson .  "\n". "Turbine data" . $turbineJson .  "\n". "Sensor data" . $sensorJson .  "\n". "Sensor Deployed data" . $sensorDeployedJson .  "\n". "Turbine deployed data" . $turbineDeployedJson .  "\n". "Sensor Time series data" . $sensorTimeSeriesjson .  "\n";
