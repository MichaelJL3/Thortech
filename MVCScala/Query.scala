
/**
 * @file Query.scala
 * @author Michael Laucella
 * @desc provides class for simplifying stored procedure calls
 */

import java.sql.Connection
import java.sql.DriverManager

/**
 * @name Query
 * @desc connects to database and processes 
 * @param {String} host the database location
 * @param {String} username the login useername
 * @param {String} password the associated password
 * @param {String} db the database to connect to
 */
class Query (host: String, username: String, password: String, db: String) {
    private val Pre_Url = "jdbc:mysql://"
    private val Driver = "com.mysql.jdbc.Driver"
    private var con:Connection = null

    Class.forName(Driver)

    con = DriverManager.getConnection(Pre_Url + host + "/" + db, username, password)

    /**
     * @name callProcedure
     * @desc calls a stored procedure and returns the result
     * @param {String} procedure the stored procedure to run
     * @return {Object} a result set from the query
     */
    def callProcedure (procedure: String) = 
        con.prepareCall("{call "+procedure+"}").executeQuery()

    /**
     * @name closeConn
     * @desc close the database connection
     */
    def close (): Unit = if(!con.isClosed()) con.close();
}