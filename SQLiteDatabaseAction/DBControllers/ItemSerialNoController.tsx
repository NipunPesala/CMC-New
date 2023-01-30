import * as DB from '../DBService';

export const saveItemSerialNo = (data:any, callBack:any) => {
    var response:any;

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'Item_serialNO',
                    columns: `ItemId,ItemCode,ItemName,msnfSN,InternalSN,status`,
                    values: '?,?,?,?,?,?',
                    params: [
                        data[i].Id,
                        data[i].itemCode,
                        data[i].itemName,
                        data[i].msnfSN,
                        data[i].internalSN,
                        data[i].Status,
                    ],
                },
            ],
            (res:any, err:any) => {
                if(res === 'success'){
                    response =true;
                    console.log("___________ItemSRN________________",response);
    
                   
                }else{
                    response =false;
                }
                
            },
        );
        
    }
    console.log(response,"=========================");
    callBack(true);
    
};
