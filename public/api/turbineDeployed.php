<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'turbineDeployedPost.php';
  exit;
}

$turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);

if ($turbineDeployedId < 1) {
  throw new Exception('Invalid TurbineDeployed ID');
}

// 1. Go to the database and get all work associated with the $taskId
$turbineDeployedArr = TurbineDeployed::getTurbineDeployedById($turbineDeployedId);
