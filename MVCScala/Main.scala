
/**
 * @file Main.scala
 * @author Michael Laucella
 * @desc entry process for application
 * grabs and shapes data from DB then beings MVC process
 */

import java.sql.ResultSet

/**
 * @name MVC
 * @desc entry point for the MVC application
 * @extends App
 */
object MVC extends App {
    val testCon = new DataModelContainer(0, "test", Nil)
    val model = new DataModel(1, "test")
    val query = new Query("localhost:3306", "mike", "pass", "Thortech")
    
    //stored procedure interactions
    val masterDataSize = getSize(query.callProcedure("MasterSize"))
    val masterData = query.callProcedure("DisplayMaster")
    val detailData = query.callProcedure("DisplayDetail")

    //shaping the data 
    val masterDataSet = appendChildren(
        makeMasterSet(masterData, masterDataSize),
        makeDetailSet(detailData)
    )

    //starting the controller
    val controller = new Controller(masterData)

    //close db connection
    query.close()
   
    /**
     * @name makeMasterSet
     * @desc extract the data from the result of the sql query and model it
     * @param {Object} data the result set of the master table query
     * @param {Integer} size the size of the master table 
     * @return {Array} return an array with the master table data
     */
    def makeMasterSet (data: ResultSet, size: Int) = {
        val dataSet = new Array[DataModelContainer](size+1)
        
        while(data.next()){
            val index = data.getInt("ID")
            val value = data.getString("value")

            dataSet(index) = new DataModelContainer(index, value, Nil)
        } 

        dataSet
    }

    /**
     * @name getSize
     * @desc returns the size of the table (assuming correct result is passed in)
     * @param {Object} data the result set from the sql query
     * @return {Integer} the size of the table
     */
    def getSize (data: ResultSet) = if(data.next()) data.getInt("count") else 0

    /**
     * @name makeDetailSet
     * @desc starts off a recursive sequence to create the children model list
     * @param {Object} data the result set from the sql query
     * @return {Object} list of data model objects
     */
    def makeDetailSet (data: ResultSet) = getNextModel(data)

    /**
     * @getNextModel
     * @desc a recursive iteration through the result set to build a child model list
     * @param {Object} data the result set from the sql query
     * @return {Object} list of data model objects
     */
    def getNextModel (data: ResultSet): List[(Int, DataModel)] = {
        if(data.next()){
            val model = (
                data.getInt("masterID"), 
                new DataModel(data.getInt("ID"), data.getString("value"))
            )
            val models = getNextModel(data)
            model :: models
        }
        else Nil
    }

    /**
     * @name appendChildren
     * @desc appends the children models to their appropriate parent containers
     * @param {Array} data the array holding all the parent models
     * @param {Object} childList the list holding all the child models
     * @return {Object} the final shaped sql dataset
     */
    def appendChildren(data: Array[DataModelContainer], childList: List[(Int, DataModel)]) = {
        val dataSet=data

        childList.foreach(item => data(item._1)+=item._2)
        
        dataSet
    }
}
