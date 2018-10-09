<?php

class TurbineDeployed{
  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $serialNumber;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;


  public function __construct($row){
    $this->turbineDeployedId = isset($row['turbineDeployedId']) ? intval($row['turbineDeployedId']) : null;
    $this->turbineId = intval($row['turbineId']);
    $this->siteId = intval($row['siteId']);
    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];
    $this->totalFiredHours = intval($row['totalFiredHours']);
    $this->totalStarts = intval($row['totalStarts']);
    $this->lastPlannedOutageDate = $row['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate = $row['lastUnplannedOutageDate'];
  }

  public function create(){
  $db = new PDO(DB_SEVER, DB_USER, DB_PW);
  $sql = 'INSERT INTO turbine_deployed(turbineDeployedId,turbineId,siteId,serialNumber,deployedDate,totalFiredHours,totalStarts,lastPlannedOutageDate,lastUnplannedOutageDate) VALUES (?,?,?,?,?,?,?,?,?)';

  $statement = $db->prepare($sql);
  $success = $statement->execute([
  $this-> turbineDeployedId,
  $this-> turbineId,
  $this-> siteId,
  $this-> serialNumber,
  $this-> deployedDate,
  $this-> totalFiredHours,
  $this-> totalStarts,
  $this-> lastPlannedOutageDate,
  $this-> lastUnplannedOutageDate]);
  if(!$success){
    die('bad sql on insert');
  }
  $this->turbineDeployedId = $db->lastInsertId();
}
