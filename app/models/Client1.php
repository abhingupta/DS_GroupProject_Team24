<?php

class Client1{
  public $clientId;
  public $clientName;
  public $clientDescription;
  public $gicsSector;
  public $gicsSubIndustry;
  public $headquarter;

  public function __construct($row){
    $this->clientId = isset($row['clientId']) ? intval($row['clientId']) : null;
    $this->clientName = $row['clientName'];
    $this->clientDescription = $row['clientDescription'];
    $this->gicsSector = $row['gicsSector'];
    $this->gicsSubIndustry = $row['gicsSubIndustry'];
    $this->headquarter = $row['headquarter'];

  }
  public function create(){
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO client(clientId,clientName,clientDescription,gicsSector,gicsSubIndustry,headquarter) VALUES (?,?,?,?,?,?)';

    $statement = $db->prepare($sql);
    $success = $statement->execute([
    $this-> clientId,
    $this-> clientName,
    $this-> clientDescription,
    $this-> gicsSector,
    $this-> gicsSubIndustry,
    $this-> headquarter]);
    if(!$success){
      die('bad sql on insert');
    }
    $this->sensorId = $db->lastInsertId();
  }
  // public static function getClient1ById(int $sensorId) {
  //  // 1. Connect to the database
  //  $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //  // 2. Prepare the query
  //  $sql = 'SELECT * FROM sensor WHERE sensorId = ?';
  //  $statement = $db->prepare($sql);
  //  // 3. Run the query
  //  $success = $statement->execute(
  //      [$sensorId]
  //  );

   public static function getClientById() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    mysql_query('SET CHARACTER SET utf8');
    $sql = 'SELECT * FROM client';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute();
    if(!$success){
      die('bad sql on insert');
    }
   // 4. Handle the results
   $arr = [];
   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
     // 4.a. For each row, make a new work object
     $clientItem =  new Client1($row);
     array_push($arr, $clientItem);
   }
   // 4.b. return the array of work objects
   // var_dump($sql);
 //   echo '<pre>';
 // print_r($arr);
 // echo '</pre>';
   return $arr;
 }
}
