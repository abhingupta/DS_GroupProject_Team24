<?php

$sensorDeployed = new SensorDeployed($_POST);

$sensorDeployed->create();

echo json_encode($sensorDeployed);
