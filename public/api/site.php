<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sitePost.php';
  exit;
}

// $siteId = intval($_GET['siteId'] ?? 0);
//
// if ($siteId < 1) {
//   throw new Exception('Invalid site ID');
// }


// 1. Go to the database and get all work associated with the $taskId
$siteArr = Site::getSiteById();

// 2. Convert to JSON
$json = json_encode($siteArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
