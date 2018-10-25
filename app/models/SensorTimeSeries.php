<?php

class SensorTimeSeries{
  public $sensorTimeSeriesId;
  public $sensorDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heatRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;



  public function __construct($row){
    $this->sensorTimeSeriesId = isset($row['sensorTimeSeriesId']) ? intval($row['sensorTimeSeriesId']) : null;
    $this->sensorDeployedId = intval($row['sensorDeployedId']);
    $this->dataCollectedDate = $row['dataCollectedDate'];
    $this->output = floatval($row['output']);
    $this->heatRate = floatval($row['heatRate']);
    $this->compressorEfficiency = floatval($row['compressorEfficiency']);
    $this->availability = floatval($row['availability']);
    $this->reliability = floatval($row['reliability']);
    $this->trips = intval($row['trips']);
    $this->starts = intval($row['starts']);

  }
  public function create(){
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO sensorTimeSeries(sensorTimeSeriesId,sensorDeployedId,dataCollectedDate,output,heatRate,compressorEfficiency,availability,reliability,firedHours,trips,starts) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

    $statement = $db->prepare($sql);
    $success = $statement->execute([
    $this-> sensorTimeSeriesId,
    $this-> sensorDeployedId,
    $this-> dataCollectedDate,
    $this-> output,
    $this-> heatRate,
    $this-> compressorEfficiency,
    $this-> availability,
    $this-> reliability,
    $this-> firedHours,
    $this-> trips,
    $this-> starts]);
    if(!$success){
      die('bad sql on insert');
    }
    $this->sensorTimeSeriesId = $db->lastInsertId();
  }
  // public static function SensorTimeSeriesById(int $sensorTimeSeriesId) {
  //  // 1. Connect to the database
  //  $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //  // 2. Prepare the query
  //  $sql = 'SELECT * FROM sensorTimeSeries WHERE sensorTimeSeriesId = ?';
  //  $statement = $db->prepare($sql);
  //  // 3. Run the query
  //  $success = $statement->execute(
  //      [$sensorTimeSeriesId]
  //  );
   public static function SensorTimeSeriesById() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM sensorTimeSeries st INNER JOIN sensor_deployed sd ON sd.sensorDeployedId=st.sensorDeployedId INNER JOIN sensor s ON s.sensorId = sd.sensorId WHERE s.sensorId = ?';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
   // 4. Handle the results
   $arr = [];
   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
     // 4.a. For each row, make a new work object
     $sensorTimeSeriesItem =  new SensorTimeSeries($row);
     array_push($arr, $sensorTimeSeriesItem);
   }
   // 4.b. return the array of work objects
   return $arr;
 }
}
