<?php

class SensorDeployed{
  public $sensorDeployedId;
  public $sensorId;
  public $turbineDeployedId;
  public $serialNumber;
  public $deployedDate;

  public function __construct($row){
    $this->sensorDeployedId = isset($row['sensorDeployedId']) ? intval($row['sensorDeployedId']) : null;
    $this->sensorId = intval($row['sensorId']);
    $this->turbineDeployedId = intval($row['turbineDeployedId']);
    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];

  }

  public function create(){
    $db = new PDO(DB_SEVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO sensor_deployed(sensorDeployedId,sensorId,turbineDeployedId,serialNumber,deployedDate) VALUES (?,?,?,?,?)';

    $statement = $db->prepare($sql);
    $success = $statement->execute([
    $this-> sensorDeployedId,
    $this-> sensorId,
    $this-> turbineDeployedId,
    $this-> serialNumber,
    $this-> deployedDate]);
    if(!$success){
      die('bad sql on insert');
    }
    $this->sensorDeployedId = $db->lastInsertId();
  }
