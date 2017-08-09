
/**
 * @file MasterDataModel.java
 * @author Michael Laucella
 * @desc holds the master data model class
 */

import java.util.ArrayList;

/**
 * @name MAsterDataModel
 * @desc a data model which has child data models
 * @extends DataModel
 */
public class MasterDataModel extends DataModel {
    private ArrayList<DataModel> children;

    /**
     * @name MasterDataModel
     * @desc default constructor
     */
    public MasterDataModel(){
        children = new ArrayList<DataModel>();
    }

    /**
     * @name MasterDataModel
     * @desc constructor
     * @param {Integer} index the models index
     * @param {String} value the models value
     */
    public MasterDataModel(int index, String value){
        super(index, value);
        children = new ArrayList<DataModel>();
    }

    /**
     * @name addChild
     * @desc adds a child to the data model list
     * @param {Object} child the child to be added
     */
    public void addChild(DataModel child){
        children.add(child);
    }

    /**
     * @name getChildren
     * @desc gets all the children data models
     * @return {Array} the children data models
     */
    public DataModel[] getChildren(){
        return children.toArray(new DataModel[children.size()]);
    }

    /**
     * @name getChild
     * @desc get a child data model by the index
     * @return {Object} a child data model
     */
    public DataModel getChild(int index){
        return children.get(index);
    }

    /**
     * @name delChild
     * @desc delete one of the child models based on index
     * @param {Integer} index the index of the child to remove
     */
    public void delChild(int index){
        children.remove(index);
    }

    /**
     * @name delChildren
     * @desc delete all children models held by the master
     */
    public void delChildren(){
        children.clear();
    }

    /**
     * @name toString
     * @desc displays a models info and its childrens info
     * @return {String} all the objects data
     */
    @Override
    public String toString(){
        String data=super.toString();

        for (DataModel child:children){
            data+="\n\tChild: "+child;
        }

        return data;
    }
}