
/*
	Procedure.sql
	
	creates a new sql procedure for displaying Thortech DB data
*/

/* if procedure is already defined remove it*/
DROP PROCEDURE IF EXISTS DisplayData

/* create the procedure to display all the table data*/
CREATE PROCEDURE DisplayData ()
LANGUAGE SQL
DETERMINISTIC
SQL SECURITY DEFINER
COMMENT 'master and detail table data'
BEGIN
	SELECT * FROM masterTable mt INNER JOIN detailTable dt ON mt.ID=dt.masterID;
END