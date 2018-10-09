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
