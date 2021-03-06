
/**
 * @file DataModels.scala
 * @author Michael Laucella
 * @desc Holds the data models for the application
 */

/**
 * @name DataModel
 * @desc holds a key, value pair (essentially a tuple)
 * @param {Integer} indx the models index number
 * @param {String} valu the models value
 */
class DataModel (indx: Int, valu: String) {
    //the index must be greater than 0
    require(indx>=0)
    val index = indx
    val value = valu
    override def toString = index + ": " + value
}

/**
 * @name DataModelContainer
 * @desc a DataModel that is the parent to a list of DataModels
 * @extends DataModel
 * @param {Integer} indx the models index number
 * @param {String} valu the models value
 * @param {Object} models a list containing a predefined set of models 
 * to act as the children
 */
class DataModelContainer (indx: Int, valu: String, models: List[DataModel]) 
extends DataModel(indx, valu) {
    val children = models 

    def getChild (childIndex: Int) = children.filter(child => child.index == childIndex)

    def setChild (childIndex: Int, model: DataModel) =
        new DataModelContainer(index, value, model :: children.filterNot(elm => elm.index == child.index))

    def + (child: DataModel) = 
        new DataModelContainer(index, value, child :: children)

    def - (child: DataModel) = 
        new DataModelContainer(index, value, 
            children.filterNot(elm => elm.index == child.index))

    def clear() = new DataModelContainer(index, value, Nil)

    override def toString = {
        var str=super.toString()
        for (child <- children)
            str+="\n\t"+child
        str
    }
}
