<?php

class Client{
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
    $db = new PDO(DB_SEVER, DB_USER, DB_PW);
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
    $this->clientId = $db->lastInsertId();
  }
  public static function getClientById(int $clientId) {
   // 1. Connect to the database
   $db = new PDO(DB_SERVER, DB_USER, DB_PW);
   // 2. Prepare the query
   $sql = 'SELECT * FROM client WHERE clientId = ?';
   $statement = $db->prepare($sql);
   // 3. Run the query
   $success = $statement->execute(
       [$clientId]
   );

   // public static function getClientById() {
   //  // 1. Connect to the database
   //  $db = new PDO(DB_SERVER, DB_USER, DB_PW);
   //  // 2. Prepare the query
   //  $sql = 'SELECT * FROM client';
   //  $statement = $db->prepare($sql);
   //  // 3. Run the query
   //  $success = $statement->execute();
   // 4. Handle the results
   $arr = [];
   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
     // 4.a. For each row, make a new work object
     $clientItem =  new Client($row);
     array_push($arr, $clientItem);
   }
   // 4.b. return the array of work objects
   return $arr;
 }
}
