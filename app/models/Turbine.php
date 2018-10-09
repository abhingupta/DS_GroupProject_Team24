<?php

class Turbine{
  public $turbineId;
  public $turbineName;
  public $turbineDescription;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;

  public function __construct($row){
    $this->turbineId = isset($row['turbineId']) ? intval($row['turbineId']) : null;
    $this->turbineName = $row['turbineName'];
    $this->turbineDescription = $row['turbineDescription'];
    $this->capacity = $row['capacity'];
    $this->rampUpTime = $row['rampUpTime'];
    $this->maintenanceInterval = $row['maintenanceInterval'];
  }
