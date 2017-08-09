
/*
	Procedure.sql
	
	creates a new sql procedure for displaying Thortech DB data
*/

/* if procedure is already defined remove it*/
DROP PROCEDURE IF EXISTS DisplayData;
DROP PROCEDURE IF EXISTS DisplayDetail;
DROP PROCEDURE IF EXISTS DisplayMaster;
DROP PROCEDURE IF EXISTS InsertMaster;
DROP PROCEDURE IF EXISTS InsertDetail;

/* create the procedure to display all the table data*/
CREATE PROCEDURE DisplayData ()
SQL SECURITY DEFINER
COMMENT 'master and detail table data'
BEGIN
	SELECT * FROM masterTable mt INNER JOIN detailTable dt ON mt.ID=dt.masterID;
END
DELIMITER ;

/* create the procedure to disply all the detail table data */
CREATE PROCEDURE DisplayDetail ()
SQL SECURITY DEFINER
COMMENT 'grab all the data in the detail table'
BEGIN
	SELECT * FROM detailTable WHERE 1
END
DELIMITER ;

/* create the procedure to display all the master table data */
CREATE PROCEDURE DisplayMaster ()
SQL SECURITY DEFINER
COMMENT 'grab all the data in the master table'
BEGIN
	SELECT * FROM masterTable WHERE 1
END
DELIMITER ;

/* insert into the detail table */
CREATE PROCEDURE InsertDetail (@masterID int, @value varchar(100))
SQL SECURITY DEFINER
COMMENT 'insert into detail table'
BEGIN
	INSERT INTO detailTable VALUES(@masterID, @value)
END
DELIMITER ;

/* insert into the master table */
CREATE PROCEDURE InsertMaster (@value varchar(100))
SQL SECURITY DEFINER
COMMENT 'insert into master table'
BEGIN
	INSERT INTO masterTable VALUES(@value)
END
DELIMITER ;