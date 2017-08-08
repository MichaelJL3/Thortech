
import java.sql.*;

public class Test {

    public static void main(String[] args){
        System.out.println("testing");

        GetData();
    }

    public static void GetData(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            
            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/Thortech",
                "mike",
                "pass"
            );

            CallableStatement cs = con.prepareCall("{call DisplayData}");

            ResultSet rs = cs.executeQuery();

            while(rs.next()){
                System.out.println(rs);
            }

            con.close();
        } catch(Exception e){
            System.out.println(e);
        }
    }

}