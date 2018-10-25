<?php

$client = new Client1($_POST);

$client->update();

echo json_encode($client);
