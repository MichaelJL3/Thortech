
public class Controller {
    private MasterDataModel masterData;
    private MasterDataView  masterView;

    public Controller(MasterDataModel masterData){
        this.masterData = masterData;
        this.masterView = new masterView();
        updateView();
    }

    public int getIndex(){
        return masterData.getIndex();
    }

    public void setIndex(int index){
        masterData.setIndex(index);
        updateView();
    }

    public String getValue(){
        return masterData.getValue();
    }

    public void setValue(String value){
        masterData.setValue(value);
        updateView();
    }

    public DataModel getChild(int index){
        return masterData.getChild(index);
    }

    public DataModel[] getChildren(){
        return masterData.getChildren();
    }

    public void addChild(DataModel child){
        masterData.addChild(child);
        updateView();
    }

    public void removeChild(int index){
        masterData.removeChild(index);
        updateView();
    }

    public void updateView(){
        masterView.displayData();
    }
}