
public class MVC{
    public static void main(String[] args){
        //get data from db
        MasterDataModel masterData[] = retrieveMasterDataFromDB();

        //create the controllers
        Controller controllers[] = new Controller[masterData.length];

        //initialize the controllers
        for (int i=0; i<masterData.length; ++i){
            controllers[i] = new Controller(masterData[i]);
        }
    }

    private static MasterDataModel[] retrieveMasterDataFromDB(){
        MasterDataModel masterData[] = new MasterDataModel[6];
        
        for(int i=0; i<masterData.length; ++i){
            masterData[i] = new MasterDataModel(i, "test");
            System.out.println(masterData[i]);
        }

        return masterData;
    }
}