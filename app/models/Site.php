<?php

class Site{
  public $siteId;
  public $clientId;
  public $siteName;
  public $siteDescription;
  public $primaryContact;
  public $capacity;
  public $commercialDate;
  public $addrLine1;
  public $addrLine2;
  public $addrCity;
  public $addrState;
  public $addrZip;
  public $addrCountry;

  public function __construct($row){
    $this->siteId = isset($row['siteId']) ? intval($row['siteId']) : null;
    $this->clientId = isset($row['clientId']) ? intval($row['clientId']) : null;
    $this->siteName = $row['siteName'];
    $this->siteDescription = $row['siteDescription'];
    $this->primaryContact = $row['primaryContact'];
    $this->capacity = intval($row['capacity']);
    $this->commercialDate = $row['commercialDate'];
    $this->addrLine1 = $row['addrLine1'];
    $this->addrLine2 = $row['addrLine2'];
    $this->addrCity = $row['addrCity'];
    $this->addrState = $row['addrState'];
    $this->addrZip = intval($row['addrZip']);
    $this->addrCountry = $row['addrCountry'];
  }
  public function create(){
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT INTO client(siteId,clientId,siteName,siteDescription,primaryContact,capacity,commercialDate,addrLine1,addrLine2,addrCity,addrState,addrZip,addrCountry) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

    $statement = $db->prepare($sql);
    $success = $statement->execute([
    $this-> siteId,
    $this-> clientId,
    $this-> siteName,
    $this-> siteDescription,
    $this-> primaryContact,
    $this-> capacity,
    $this-> commercialDate,
    $this-> addrLine1,
    $this-> addrLine2,
    $this-> addrCity,
    $this-> addrState,
    $this-> addrZip,
    $this-> addrCountry]);
    if(!$success){
      die('bad sql on insert');
    }
    $this->siteId = $db->lastInsertId();
  }
  // public static function getSiteById(int $siteId) {
  //  // 1. Connect to the database
  //  $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //  // 2. Prepare the query
  //  $sql = 'SELECT * FROM site WHERE siteId = ?';
  //  $statement = $db->prepare($sql);
  //  // 3. Run the query
  //  $success = $statement->execute(
  //      [$siteId]
  //  );
   public static function getSiteById($siteId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT * FROM site WHERE clientId=?';
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute([$siteId]);
   // 4. Handle the results
   $arr = [];
   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
     // 4.a. For each row, make a new work object
     $siteItem =  new Site($row);
     array_push($arr, $siteItem);
   }
   // 4.b. return the array of work objects
   return $arr;
 }
}
