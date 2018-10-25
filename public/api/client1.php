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

// // 2. Convert to JSON
// foreach($hello as &$v) {
//   $v['order_item_name'] = utf8_encode($v['order_item_name']);
// }
// $hello['name'] = mb_convert_encoding($hello['name'], 'UTF-8', 'UTF-8');

$json1 = json_encode(utf8ize($hello), JSON_PRETTY_PRINT| JSON_UNESCAPED_UNICODE);

if (json_last_error() !== JSON_ERROR_NONE) {
  echo json_last_error_msg();
}
// $json = json_last_error_msg();
// echo($json);
// $error = json_last_error();

// foreach ($hello as $string) {
//     echo 'Encoding: ' . $string;
//     json_encode($string);

//     switch (json_last_error()) {
//         case JSON_ERROR_NONE:
//             echo ' - No errors';
//         break;
//         case JSON_ERROR_DEPTH:
//             echo ' - Maximum stack depth exceeded';
//         break;
//         case JSON_ERROR_STATE_MISMATCH:
//             echo ' - Underflow or the modes mismatch';
//         break;
//         case JSON_ERROR_CTRL_CHAR:
//             echo ' - Unexpected control character found';
//         break;
//         case JSON_ERROR_SYNTAX:
//             echo ' - Syntax error, malformed JSON';
//         break;
//         case JSON_ERROR_UTF8:
//             echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
//         break;
//         default:
//             echo ' - Unknown error';
//         break;
//     }
//
//     echo PHP_EOL;
// }


// 3. Print
header('Content-Type: application/json; charset=utf-8');
// print json_encode($json1);

echo $json1;
// echo '<pre> buga buga1 buga';
// var_dump($json1);
// echo '</pre>';
