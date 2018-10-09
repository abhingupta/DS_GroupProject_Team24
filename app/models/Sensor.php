<?php

class Sensor{
  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $manufacturer;
  public $totalLifeExpectancyHours;

  public function __construct($row){
    $this->sensorId = isset($row['sensorId']) ? intval($row['sensorId']) : null;
    $this->sensorName = $row['sensorName'];
    $this->sensorDescription = $row['sensorDescription'];
    $this->manufacturer = $row['manufacturer'];
    $this->totalLifeExpectancyHours = $row['totalLifeExpectancyHours'];

  }
  public function create(){
    $db = new PDO(DB_SEVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO sensor(sensorId,sensorName,sensorDescription,manufacturer,totalLifeExpectancyHours) VALUES (?,?,?,?,?)';

    $statement = $db->prepare($sql);
    $success = $statement->execute([
    $this-> sensorId,
    $this-> sensorName,
    $this-> sensorDescription,
    $this-> manufacturer,
    $this-> totalLifeExpectancyHours]);
    if(!$success){
      die('bad sql on insert');
    }
    $this->sensorId = $db->lastInsertId();
  }
  public static function getSensorById(int $sensorId) {
   // 1. Connect to the database
   $db = new PDO(DB_SERVER, DB_USER, DB_PW);
   // 2. Prepare the query
   $sql = 'SELECT * FROM sensor WHERE sensorId = ?';
   $statement = $db->prepare($sql);
   // 3. Run the query
   $success = $statement->execute(
       [$sensorId]
   );
   // 4. Handle the results
   $arr = [];
   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
     // 4.a. For each row, make a new work object
     $sensorItem =  new Sensor($row);
     array_push($arr, $sensorItem);
   }
   // 4.b. return the array of work objects
   return $arr;
 }
}
