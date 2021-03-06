<?php

class TurbineDeployedTest{
  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $serialNumber;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;
  public $turbineName;
  public $turbineDescription;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;


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
    $this->turbineName = $row['turbineName'];
    $this->turbineDescription = $row['turbineDescription'];
    $this->capacity = $row['capacity'];
    $this->rampUpTime = $row['rampUpTime'];
    $this->maintenanceInterval = $row['maintenanceInterval'];
  }

  public function create(){
  $db = new PDO(DB_SERVER, DB_USER, DB_PW);
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

public static function getTurbineDeployedById(int $turbineDeployedId) {
 // 1. Connect to the database
 $db = new PDO(DB_SERVER, DB_USER, DB_PW);
 // 2. Prepare the query
 $sql = 'SELECT td.*,t.turbineName,t.turbineDescription,t.capacity,t.rampUpTime,t.maintenanceInterval FROM turbine t INNER JOIN turbine_deployed td ON td.turbineId=t.turbineId  WHERE td.siteId = ?';
 $statement = $db->prepare($sql);
 // 3. Run the query
 $success = $statement->execute(
     [$turbineDeployedId]

 );

 // public static function getTurbineDeployedById() {
 //  // 1. Connect to the database
 //  $db = new PDO(DB_SERVER, DB_USER, DB_PW);
 //  // 2. Prepare the query
 //  $sql = 'SELECT * FROM turbine_deployed';
 //  $statement = $db->prepare($sql);
 //  // 3. Run the query
 //  $success = $statement->execute();

 // 4. Handle the results
 $arr = [];
 while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
   // 4.a. For each row, make a new work object
   $turbineDeployedItem =  new TurbineDeployedTest($row);
   array_push($arr, $turbineDeployedItem);
 }
 // var_dump($sql);
 // var_dump($success);
 // print_r($arr);

 // 4.b. returnthe array of work objects
 return $arr;
}
}
