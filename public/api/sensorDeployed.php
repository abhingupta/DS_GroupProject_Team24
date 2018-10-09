<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorDeployedPost.php';
  exit;
}

$sensorDeployedId = intval($_GET['sensorDeployedId'] ?? 0);

if ($sensorDeployedId < 1) {
  throw new Exception('Invalid sensorDeployed ID');
}
