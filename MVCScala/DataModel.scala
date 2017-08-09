
class DataModel (indx: Int, valu: String) {
    require(index>=0)
    val index = indx
    val value = valu
    override def toString = index + ": " + value
}

class DataModelContainer (indx: Int, valu: String, models: ) 
extends DataModel(indx, valu) {
    private val children = models
    def getChildren = children
    def + (child: DataModel) = 
        new DataModelContainer(index, value, models :: children)
    override def toString = {
        var str=super.toString()
        for (child <- children)
            str+="\n\t"+child
        str
    }
}

class Controller () {
    private val DataContainers = Nil
    private val DataViewers = Nil

}

object Test extends App {
    val testCon = new DataModelContainer(0, "test", Nil)
    val model = new DataModel(1, "test")
    println(testCon)
    println(testCon+model)
    Controller()
}