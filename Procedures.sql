
/*
	Procedure.sql
	
	creates a new sql procedure for displaying Thortech DB data
*/

/* if procedure is already defined remove it*/
DROP PROCEDURE IF EXISTS Thortech.DisplayData;
DROP PROCEDURE IF EXISTS Thortech.DisplayDetail;
DROP PROCEDURE IF EXISTS Thortech.DisplayMaster;
DROP PROCEDURE IF EXISTS Thortech.DisplayDetailByID;
DROP PROCEDURE IF EXISTS Thortech.DisplayMasterByID;
DROP PROCEDURE IF EXISTS Thortech.InsertMaster;
DROP PROCEDURE IF EXISTS Thortech.InsertDetail;
DROP PROCEDURE IF EXISTS Thortech.MasterSize;
DROP PROCEDURE IF EXISTS Thortech.DetailSize;
DROP PROCEDURE IF EXISTS Thortech.ChildrenOf;
DROP PROCEDURE IF EXISTS Thortech.DeleteDetailByID;
DROP PROCEDURE IF EXISTS Thortech.DeleteMasterByID;
DROP PROCEDURE IF EXISTS Thortech.UpdateDetail;
DROP PROCEDURE IF EXISTS Thortech.UpdateMaster;
DROP PROCEDURE IF EXISTS Thortech.UpdateDetailParent;

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

/* create the procedure to disply a member of the table data */
DELIMITER $$
CREATE PROCEDURE Thortech.DisplayDetailByID 
	(IN idx int)
BEGIN
	SELECT * FROM Thortech.detailTable WHERE ID = idx;
END $$

/* create the procedure to display all the master table data */
DELIMITER $$
CREATE PROCEDURE Thortech.DisplayMaster ()
BEGIN
	SELECT * FROM Thortech.masterTable WHERE 1;
END $$

/* create the procedure to display a member of the master table data */
DELIMITER $$
CREATE PROCEDURE Thortech.DisplayMasterByID
	(IN idx int)
BEGIN
	SELECT * FROM Thortech.masterTable WHERE ID = idx;
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

/* get the size of the master table */
DELIMITER $$
CREATE PROCEDURE Thortech.DetailSize ()
BEGIN
	SELECT COUNT("ID") AS count FROM Thortech.detailTable WHERE 1; 
END $$

/* get the children of the parent */
DELIMITER $$
CREATE PROCEDURE Thortech.ChildrenOf 
	(IN idx int)
BEGIN
	SELECT * FROM Thortech.detailTable WHERE masterID = idx;
END $$

/* delete detail with id */
DELIMITER $$
CREATE PROCEDURE Thortech.DeleteDetailByID
	(IN idx int)
BEGIN
	DELETE FROM Thortech.detailTable WHERE ID = idx;
END $$

/* delete master with id */
DELIMITER $$
CREATE PROCEDURE Thortech.DeleteMasterByID
	(IN idx int)
BEGIN
	DELETE FROM Thortech.masterTable WHERE ID = idx;
	DELETE FROM Thortech.detailTable WHERE masterID = idx;
END $$

/* update value of detail entry */
DELIMITER $$
CREATE PROCEDURE Thortech.UpdateDetail
	(IN idx int, IN val varchar(100))
BEGIN
	UPDATE Thortech.masterTable SET value = val WHERE ID = idx;
END $$

/* update master entry */
DELIMITER $$
CREATE PROCEDURE Thortech.UpdateMaster
	(IN idx int, IN val varchar(100))
BEGIN
	UPDATE Thortech.masterTable SET value = val WHERE ID = idx;
END $$

/* update childs parent if the parent id exists */
DELIMITER $$
CREATE PROCEDURE Thortech.UpdateDetailParent
	(IN idx int, IN pidx int, IN val varchar(100))
BEGIN
	UPDATE Thortech.detailTable SET masterID = pidx WHERE ID = idx
	AND
	pidx IN (SELECT ID FROM Thortech.masterTable WHERE ID = pidx);
END $$

/* grant execute permissions for procedures  */
GRANT EXECUTE ON PROCEDURE Thortech.DisplayData TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DisplayDetail TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DisplayMaster TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DisplayDetailByID TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DisplayMasterByID TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.InsertMaster TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.InsertDetail TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.MasterSize TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DetailSize TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.ChildrenOf TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DeleteDetailByID TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.DeleteMasterByID TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.UpdateDetail TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.UpdateMaster TO 'mike'@'localhost';
GRANT EXECUTE ON PROCEDURE Thortech.UpdateDetailParent TO 'mike'@'localhost';