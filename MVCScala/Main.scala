
object Test extends App {
    val testCon = new DataModelContainer(0, "test", Nil)
    val model = new DataModel(1, "test")
    val query = new Query("localhost:3306", "mike", "pass", "Thortech")
    println(query.callProcedure("DisplayMaster"))
    println(testCon)
    println(testCon+model+model)
}
