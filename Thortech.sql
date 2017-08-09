
/*
Thortech.sql

creates a new database and user for aws project
*/

/* Create New Database */
DROP DATABASE Thortech;
CREATE DATABASE Thortech;

/* Create Associated User With Permissions */
DROP USER 'mike'@'localhost';
CREATE USER 'mike'@'localhost' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON Thortech . * TO 'mike'@'localhost';
GRANT ALL PRIVILEGES ON `mysql`.`proc` TO 'mike'@'localhost';
FLUSH PRIVILEGES;

/*
Master Table

ID 	  = primary key
value = random string
*/
CREATE TABLE Thortech.masterTable (
	ID int NOT NULL AUTO_INCREMENT,
	value varchar(100) NOT NULL,
	PRIMARY KEY(ID)
);

/*
Detail Table

ID 		 = primary key
masterID = reference to masterTable
value 	 = random string
*/
CREATE TABLE Thortech.detailTable (
	ID int NOT NULL AUTO_INCREMENT,
	masterID int NOT NULL,
	value varchar(100) NOT NULL,
	PRIMARY KEY(ID)	
);