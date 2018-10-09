<?php

$sensorTimeSeries = new SensorTimeSeries($_POST);

$sensorTimeSeries->create();

echo json_encode($sensorTimeSeries);
