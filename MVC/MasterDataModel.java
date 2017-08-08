
import java.util.ArrayList;

public class MasterDataModel extends DataModel {
    private ArrayList<DataModel> children;

    public MasterDataModel(){
        children = new ArrayList<DataModel>();
    }

    public MasterDataModel(int index, String value){
        super(index, value);
        children = new ArrayList<DataModel>();
    }

    public void addChild(DataModel child){
        children.add(child);
    }

    public DataModel[] getChildren(){
        return children.toArray(new DataModel[children.size()]);
    }

    public DataModel getChild(int index){
        return children.get(index);
    }

    public void delChild(int index){
        children.remove(index);
    }

    public void delChildren(){
        children.clear();
    }

    @Override
    public String toString(){
        String data=super.toString();

        for (DataModel child:children){
            data+="\n\tChild: "+child;
        }

        return data;
    }
}