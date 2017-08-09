
import java.sql.*;

public class Test {

    public static void main(String[] args){
        System.out.println("testing");

        try{
            Query db = new Query("localhost:3306", "mike", "pass", "Thortech");
            
            ResultSet rs = db.callProcedure("DisplayMaster");

            while(rs.next()){
                System.out.println(rs.getInt(1)+" "+rs.getString(2));
            }
            
            rs = db.callProcedure("DisplayDetail");

            while(rs.next()){
                System.out.println(rs.getInt(1)+" "+rs.getInt(2)+" "+rs.getString(3));
            }

            db.close();
        } catch(SQLException e){
            System.out.println(e);
        } catch(ClassNotFoundException e){
            System.out.println(e);
        }
    }
}

/**
 * @name Query
 * @desc connects to database and processes 
 * procedure call queries
 */
class Query {
    private String DRIVER = "jdbc:mysql://";
    private Connection con;

    /**
     * @name Query
     * @desc constructor for connecting to database
     * @param {String} host the database location
     * @param {String} username the login useername
     * @param {String} password the associated password
     * @param {String} db the database to connect to
     */
    Query(String host, String username, String password, String db) 
    throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");

        con = DriverManager.getConnection(
            DRIVER + host + "/" + db, username, password
        );
    }

    /**
     * @name callProcedure
     * @desc calls a stored procedure and returns the result
     * @param {String} procedure the stored procedure to run
     * @return {Object} a result set from the query
     */

    public ResultSet callProcedure(String procedure) throws SQLException {
        CallableStatement cs = con.prepareCall("{call "+procedure+"}");
        return cs.executeQuery();
    }

    /**
     * @name closeConn
     * @desc close the database connection
     */
    public void close() throws SQLException {
        if(!con.isClosed()) con.close();
    }

}