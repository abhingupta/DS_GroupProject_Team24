<?php

$client = new Client1($_POST);

$client->update();
// $client->update();

echo json_encode($client);
