
DROP TABLE IF EXISTS client;

CREATE TABLE client (
  clientId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  clinetName varchar(64) NOT NULL,
  clientDescription varchar(128) NOT NULL,
  gicsSector varchar (32) NOT NULL,
  gicsSubIndustry varchar (64)  NOT NULL,
  headquarter varchar(64) NOT NULL
);

DROP TABLE IF EXISTS sensor;
CREATE TABLE sensor (
  sensorId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  sensorName VARCHAR(32) NOT NULL,
  sensorDescription varchar(128) NOT NULL,
  manufacturer varchar(64) NOT NULL,
  totalLifeExpectancyHours int NOT NULL
);

DROP TABLE IF EXISTS turbine;
CREATE TABLE turbine (
  turbineId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  turbineName VARCHAR(32) NOT NULL,
  turbineDescription varchar(128) NOT NULL,
  capacity int NOT NULL,
  rampUpTime int NOT NULL,
  maintenanceInterval int NOT NULL
);

DROP TABLE IF EXISTS site;
CREATE TABLE site (
  siteId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  clientId INT NOT NULL ,
  siteName VARCHAR(64) NOT NULL,
  siteDescription varchar(128) NOT NULL,
  primaryContact varchar(64)  NOT NULL,
  capacity int NOT NULL,
  commercialDate date NOT NULL,
  addrLine1 varchar(128) NOT NULL,
  addrLine2 varchar (64),
  addrCity varchar(64) NOT NULL,
  addrState varchar (64) NOT NULL,
  addrZip INT NOT NULL,
  addrCountry varchar(64) NOT NULL,
  FOREIGN KEY(clientId) REFERENCES client(clientId) ON DELETE CASCADE
);

DROP TABLE IF EXISTS turbine_deployed;
CREATE TABLE turbine_deployed (
  turbineDeployedId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  turbineId INT NOT NULL,
  siteId INT NOT NULL,
  serialNumber varchar(64) NOT NULL,
  deployedDate date NOT NULL,
  totalFiredHours int NOT NULL,
  totalStarts int NOT NULL,
  lastPlannedOutageDate date,
  lastUnplannedOutageDate date,
  FOREIGN KEY(turbineId) REFERENCES turbine(turbineId) ON DELETE CASCADE,
  FOREIGN KEY(siteId) REFERENCES site(siteId) ON DELETE CASCADE

);

DROP TABLE IF EXISTS sensor_deployed;
CREATE TABLE sensor_deployed (
  sensorDeployedId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  sensorId INT NOT NULL,
  turbineDeployedId INT NOT NULL,
  serialNumber varchar(64) NOT NULL,
  deployedDate date NOT NULL,
  FOREIGN KEY (sensorId) REFERENCES sensor(sensorId) ON DELETE CASCADE,
  FOREIGN KEY (turbineDeployedId) REFERENCES turbine_deployed(turbineDeployedId) ON DELETE CASCADE
);

-- Yes, we will create this using inner joins
DROP TABLE IF EXISTS sensor_timeseries;
CREATE TABLE sensor_timeseries (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  sensorDeployedId INT NOT NULL,
  dataCollectedDate date NOT NULL,
  output decimal NOT NULL,
  heatrate decimal NOT NULL,
  compressorEfficiency decimal NOT NULL,
  availability decimal NOT NULL,
  reliability decimal NOT NULL,
  firedHours decimal NOT NULL,
  trips decimal NOT NULL,
  starts decimal NOT NULL,
  FOREIGN KEY (sensorDeployedId) REFERENCES sensor_deployed(sensorDeployedId) ON DELETE CASCADE

);
