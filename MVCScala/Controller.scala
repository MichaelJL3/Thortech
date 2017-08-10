
class Controller (models: Array[DataModelContainer]) {
    private val views = new DataViewer[models.length]

    for(model <- models) views[model.getIndex()].display(model) 

    def getValue (index: Int) = models[index].getValue() 

    def getValue (index: Int, childIndex: Int) = models[index].getChild(childIndex).getValue()

    def setValue (index: Int, childIndex: Int, childValue: String): Unit = {
        models[index]=models[index].setChild(childIndex, new DataModel(childIndex, childValue))
        updateView(index)
    }

    def updateView (index: Int): Unit = views[index].display(models[index])
}