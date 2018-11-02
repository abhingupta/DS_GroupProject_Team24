<?php

$sensorDeployed = new SensorAvg($_POST);

$sensorDeployed->create();

echo json_encode($sensorDeployed);
