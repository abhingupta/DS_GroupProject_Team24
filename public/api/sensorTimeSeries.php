<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorTimeSeriesPost.php';
  exit;
}

$sensorTimeSeriesId = intval($_GET['sensorTimeSeriesId'] ?? 0);

if ($sensorTimeSeriesId < 1) {
  throw new Exception('Invalid SensorTimeSeries ID');
}


// 1. Go to the database and get all work associated with the $taskId
$sensorTimeSeriesArr = SensorTimeSeries::getSensorTimeSeriesById($sensorTimeSeriesId);

// 2. Convert to JSON
$json = json_encode($sensorTimeSeriesArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
