<?php

$client = new Client1($_POST);

$client->create();

echo json_encode($client);
