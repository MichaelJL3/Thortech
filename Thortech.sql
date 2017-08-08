
/*
Thortech.sql

creates a new database and user for aws project
*/

/* Create New Database */
CREATE DATABASE Thortech;

/* Create Associated User With Permissions */
CREATE USER 'mike'@'localhost' IDENTIFIED BY 'pass';
GRANT ALL PRIVILIGES ON Thortech . * TO 'mike'@'localhost';
FLUSH PRIVILIGES;

/*
Master Table

ID 	  = primary key
value = random string
*/
CREATE TABLE masterTable (
	ID int NOT NULL,
	value varchar(100) NOT NULL,
	PRIMARY KEY(ID)
);

/*
Detail Table

ID 		 = primary key
masterID = reference to masterTable
value 	 = random string
*/
CREATE TABLE detailTable (
	ID int NOT NULL,
	masterID int NOT NULL,
	value varchar(100) NOT NULL,
	PRIMARY KEY(ID)	
);