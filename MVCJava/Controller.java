
/**
 * @file Controller.java
 * @auhor Michael Laucella
 * @desc Controllers for handling data flow from models to views
 */

/**
 * @name Controller
 * @desc a controller for handling control view and data flow between
 * MasterDataModel objects and MasterDataView displays
 */
public class Controller {
    private MasterDataModel masterData;
    private MasterDataView  masterView;

    /**
     * @name Controller
     * @desc constructor
     * @param {Object} masterData the data model associated with the controller
     */
    public Controller(MasterDataModel masterData){
        this.masterData = masterData;
        this.masterView = new masterView();
        updateView();
    }

    /**
     * @name getIndex
     * @desc gets the Models index number
     * @return {Integer} the models index number
     */
    public int getIndex(){
        return masterData.getIndex();
    }

    /**
     * @name setIndex
     * @desc sets the models index number
     * @param {Integer} index the index to set
     */
    public void setIndex(int index){
        masterData.setIndex(index);
        updateView();
    }

    /**
     * @name getValue
     * @desc gets the models value
     * @return {String} the models value
     */
    public String getValue(){
        return masterData.getValue();
    }

    /**
     * @name setValue
     * @desc sets the models value
     * @param {String} value the new models value
     */
    public void setValue(String value){
        masterData.setValue(value);
        updateView();
    }

    /**
     * @name getChild
     * @desc get the associated child model of the master model
     * @param {Integer} index the index of the child model to obtain
     */
    public DataModel getChild(int index){
        return masterData.getChild(index);
    }

    /**
     * @name getChildren
     * @desc grab all the children models held by the master
     * @return {Array} the array of child data model objects
     */
    public DataModel[] getChildren(){
        return masterData.getChildren();
    }

    /**
     * @name addChild
     * @desc add a new child to the model
     * @param {Object} child the data model to insert
     */
    public void addChild(DataModel child){
        masterData.addChild(child);
        updateView();
    }

    /**
     * @name removeChild
     * @desc remove a child from the master models list
     * @param {Integer} index the location of the child to remove
     */
    public void removeChild(int index){
        masterData.removeChild(index);
        updateView();
    }

    /**
     * @name updateView
     * @desc update the views display
     */
    public void updateView(){
        masterView.displayData();
    }
}