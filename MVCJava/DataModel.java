
/**
 * @file DataModel.java
 * @author Michael Laucella
 * @desc holds model Objects and methods for modifying/storing data 
 */

/**
 * @name DataModel
 * @desc stores and manipulates a basic tuple of data
 * an Integer and a String
 */
public class DataModel {
    private String value;
    private int index;

    /**
     * @name DataModel
     * @dsc empty default constructor
     */
    public DataModel(){}

    /**
     * @name DataModel
     * @desc constructor for data model object
     * @param {Integer} index he models index number
     * @param {String} value the models value 
     */
    public DataModel(int index, String value){
        this.index = abs(index);
        this.value = value;
    }

    /**
     * @name getIndex
     * @desc get the models index unmber
     * @return {Integer} the models index number 
     */
    public int getIndex(){
        return index;
    }

    /**
     * @name setIndex
     * @desc sets the index number of the model
     * @param {Integer} index the models new index number
     */
    public void setIndex(int index){
        this.index = abs(index);
    }

    /**
     * @name getValue
     * @desc get the models value
     * @return {String} the models value
     */
    public String getValue(){
        return value;
    }

    /**
     * @name setValue
     * @desc set the models value
     * @param {String} value the models new value
     */
    public void setValue(String value){
        this.value = value;
    }

    /**
     * @name toString
     * @desc display the models information
     * @return {String} the models information
     */
    public String toString(){
        return index+": "+value;        
    }

    /**
     * @ame abs
     * @desc absolute value for integers
     * @param {Integer} n the number to check the sign of
     * @return {Integer} the positive value of n
     */
    private int abs(int n){
        return (n<0?0-n:n);
    }
}
