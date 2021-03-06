<?php

class Client1{
  public $clientId;
  public $clientName;
  public $clientDescription;
  public $gicsSector;
  public $gicsSubIndustry;
  public $headquarter;
  public $notes;


  public function __construct($row){
    $this->clientId = isset($row['clientId']) ? intval($row['clientId']) : null;
    $this->clientName = $row['clientName'];
    $this->clientDescription = $row['clientDescription'];
    $this->gicsSector = $row['gicsSector'];
    $this->gicsSubIndustry = $row['gicsSubIndustry'];
    $this->headquarter = $row['headquarter'];
    $this->notes = $row['notes'];

  }
  public function create(){
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO client_notes(clientId,notes) VALUES (?,?)';

    $statement = $db->prepare($sql);
    $success = $statement->execute([
    $this-> clientId,
    // $this-> clientName,
    // $this-> clientDescription,
    // $this-> gicsSector,
    // $this-> gicsSubIndustry,
    // $this-> headquarter,
    $this-> notes]);
    if(!$success){
      die('bad sql on insert');
    }
    $this->sensorId = $db->lastInsertId();
  }

  public function update(){
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'UPDATE client SET notes = ? where clientId=?';

    $statement = $db->prepare($sql);
    $success = $statement->execute([

    // $this-> clientName,
    // $this-> clientDescription,
    // $this-> gicsSector,
    // $this-> gicsSubIndustry,
    // $this-> headquarter,
    $this-> notes,
  $this-> clientId]);
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
  // public function update(){
  //  // 1. Connect to the database
  //  $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //  // 2. Prepare the query
  //  $sql = 'UPDATE client SET notes = ? WHERE clientId= ?';
  //  $statement = $db->prepare($sql);
  //  // 3. Run the query
  //  $success = $statement->execute();
  //  if(!$success){
  //    die('bad sql on insert');
  //  }

   public static function getClientById() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM client c ';
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
