<?php

$client = new Client1($_POST);

$client->create();
$client->update();

echo json_encode($client);
