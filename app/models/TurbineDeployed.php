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
