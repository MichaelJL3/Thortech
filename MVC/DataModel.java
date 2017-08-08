
public class DataModel {
    private String value;
    private int index;

    public DataModel(){}

    public DataModel(int index, String value){
        this.index = abs(index);
        this.value = value;
    }

    public int getIndex(){
        return index;
    }

    public void setIndex(int index){
        this.index = abs(index);
    }

    public String getValue(){
        return value;
    }

    public void setValue(String value){
        this.value = value;
    }

    public String toString(){
        return index+": "+value;        
    }

    private int abs(int n){
        return (n<0?0-n:n);
    }
}
