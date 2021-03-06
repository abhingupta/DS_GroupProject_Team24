<?php
// initializing the constructors
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
// connecting to the SQL database and posting information into DB
  public function create(){
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
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
  public static function getSensorDeployedById(int $sensorDeployedId) {
     // 1. Connect to the database
     $db = new PDO(DB_SERVER, DB_USER, DB_PW);
     // 2. Prepare the query
     $sql = 'SELECT sd.* FROM sensor_deployed sd INNER JOIN turbine_deployed td ON td.turbineDeployedId = sd.turbineDeployedId INNER JOIN turbine t ON t.turbineId = td.turbineId WHERE t.turbineId = ?';
     $statement = $db->prepare($sql);
     // 3. Run the query
     $success = $statement->execute(
         [$sensorDeployedId]
     );
     // public static function getSensorDeployedById() {
     //    // 1. Connect to the database
     //    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
     //    // 2. Prepare the query
     //    $sql = 'SELECT * FROM sensor_deployed';
     //    $statement = $db->prepare($sql);
     //    // 3. Run the query
     //    $success = $statement->execute();
     // 4. Handle the results
   $arr = [];
   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
     // 4.a. For each row, make a new work object
     $SensorDeployedItem =  new SensorDeployed($row);
     array_push($arr, $SensorDeployedItem);
   }
   // 4.b. return the array of work objects
   return $arr;
 }
}
