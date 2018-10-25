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
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
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

  public static function getTurbineById(int $turbineId) {
     // 1. Connect to the database
     $db = new PDO(DB_SERVER, DB_USER, DB_PW);
     // 2. Prepare the query
     $sql = 'SELECT * FROM turbine WHERE turbineId = ?';
     $statement = $db->prepare($sql);
     // 3. Run the query
     $success = $statement->execute(
         [$turbineId]
     );
     // public static function getTurbineById() {
     //    // 1. Connect to the database
     //    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
     //    // 2. Prepare the query
     //    $sql = 'SELECT * FROM turbine';
     //    $statement = $db->prepare($sql);
     //    // 3. Run the query
     //    $success = $statement->execute();
     // 4. Handle the results
     $arr = [];
     while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
       // 4.a. For each row, make a new work object
       $turbineItem =  new Turbine($row);
       array_push($arr, $turbineItem);
     }
     // 4.b. return the array of work objects
     return $arr;
   }
  }
