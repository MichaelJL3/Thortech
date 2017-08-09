
class Controller (models: Array[DataModelContainer]) {
    private val views = new DataViewer[models.length]

    for(model <- models) views[model.getIndex()].display(model) 

    def getValue (index: Int) = models[index].getValue() 

    def getValue (index: Int, childIndex: Int) = models[index].getChildValue(childIndex)

    def updateView (index: Int): Unit = views[index].display(models[index])
}