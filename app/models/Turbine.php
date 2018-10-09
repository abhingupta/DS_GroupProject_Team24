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

  public function create(){
    $db = new PDO(DB_SEVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO turbine(turbineId,turbineName,turbineDescription,capacity,rampUpTime,maintenanceInterval) VALUES (?,?,?,?,?,?)';

    $statement = $db->prepare($sql);
    $success = $statement->execute([
    $this-> turbineId,
    $this-> turbineName,
    $this-> turbineDescription,
    $this-> capacity,
    $this-> rampUpTime,
    $this-> maintenanceInterval]);
    if(!$success){
      die('bad sql on insert');
    }
    $this->turbineId = $db->lastInsertId();
  }
