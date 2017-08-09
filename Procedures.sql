
/*
	Procedure.sql
	
	creates a new sql procedure for displaying Thortech DB data
*/

/* if procedure is already defined remove it*/
DROP PROCEDURE IF EXISTS Thortech.DisplayData;
DROP PROCEDURE IF EXISTS Thortech.DisplayDetail;
DROP PROCEDURE IF EXISTS Thortech.DisplayMaster;
DROP PROCEDURE IF EXISTS Thortech.InsertMaster;
DROP PROCEDURE IF EXISTS Thortech.InsertDetail;

/* create the procedure to display all the table data*/
DELIMITER $$
CREATE PROCEDURE Thortech.DisplayData ()
BEGIN
	SELECT * FROM Thortech.masterTable mt 
	INNER JOIN Thortech.detailTable dt 
	ON mt.ID=dt.masterID;
END $$

/* create the procedure to disply all the detail table data */
DELIMITER $$
CREATE PROCEDURE Thortech.DisplayDetail ()
BEGIN
	SELECT * FROM Thortech.detailTable WHERE 1;
END $$

/* create the procedure to display all the master table data */
DELIMITER $$
CREATE PROCEDURE Thortech.DisplayMaster ()
BEGIN
	SELECT * FROM Thortech.masterTable WHERE 1;
END $$

/* insert into the detail table */
DELIMITER $$
CREATE PROCEDURE Thortech.InsertDetail
	(IN masterID int, IN value varchar(100))
BEGIN
	INSERT INTO Thortech.detailTable VALUES(masterID, value);
END $$

/* insert into the master table */
DELIMITER $$
CREATE PROCEDURE Thortech.InsertMaster
	(IN value varchar(100))
BEGIN
	INSERT INTO Thortech.masterTable VALUES(value);
END $$

/* get the size of the master table */
DELIMITER $$
CREATE PROCEDURE Thortech.MasterSize ()
BEGIN
	SELECT COUNT("ID") AS count FROM Thortech.masterTable WHERE 1; 
END $$

/* grant execute permissions for procedures  */
GRANT EXECUTE ON PROCEDURE Thortech.DisplayData TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DisplayDetail TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DisplayMaster TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.InsertMaster TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.InsertDetail TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.MasterSize TO 'mike'@'localhost';