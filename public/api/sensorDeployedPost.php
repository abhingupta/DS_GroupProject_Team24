<?php

$sensorDeployed = new SensorDeployedTest($_POST);

$sensorDeployed->create();

echo json_encode($sensorDeployed);
