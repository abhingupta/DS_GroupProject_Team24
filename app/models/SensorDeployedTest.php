<?php
// initializing the constructors
class SensorDeployedTest{
  public $sensorName;
  public $deployedDate;
  public $sensorDeployedId;
  public $sensorId;
  public $avgOutput;
  public $avgHeatrate;
  public $avgCompressorefficiency;
  public $avgAvailability;
  public $avgReliability;
  public $totalTrips;
  public $totalStarts;
  public $totalLifeExpectancyHours;


  public function __construct($row){
    $this->sensorName = $row['sensorName'];
    $this->deployedDate = $row['deployedDate'];
    $this->sensorDeployedId = isset($row['sensorDeployedId']) ? intval($row['sensorDeployedId']) : null;
    $this->sensorId = intval($row['sensorId']);
  $this->avgOutput = floatval($row['avgOutput']);
  $this->avgHeatrate = floatval($row['avgHeatrate']);
  $this->avgCompressorefficiency = floatval($row['avgCompressorefficiency']);
  $this->avgAvailability = floatval($row['avgAvailability']);
  $this->avgReliability = floatval($row['avgReliability']);
  $this->totalTrips = intval($row['totalTrips']);
  $this->totalStarts = intval($row['totalStarts']);
  $this->totalLifeExpectancyHours = intval($row['totalLifeExpectancyHours']);

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
     $sql = 'select
s.sensorName,
sd.deployedDate,
st.sensorDeployedId,
s.sensorId,
round(avg(st.output),2) as 'avgOutput',
round(avg(st.heatRate),2) as 'avgHeatrate',
round(avg(st.compressorEfficiency),2) as 'avgCompressorefficiency',
round(avg(st.availability),2) as 'avgAvailability',
round(avg(st.reliability),2) as 'avgReliability',
count(st.trips) as 'totalTrips',
count(st.starts) as 'totalStarts',
s.totalLifeExpectancyHours
from sensorTimeSeries st
INNER JOIN sensor_deployed sd
ON sd.sensorDeployedId = st.sensorDeployedId
INNER JOIN sensor s
ON s.sensorId =sd.sensorId
GROUP BY st.sensorDeployedId,s.sensorName
';
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
     $SensorDeployedItem =  new SensorDeployedTest($row);
     array_push($arr, $SensorDeployedItem);
   }
   // 4.b. return the array of work objects
   return $arr;
 }
}
