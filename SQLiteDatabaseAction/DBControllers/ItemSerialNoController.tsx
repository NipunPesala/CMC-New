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

                    if (i + 1 == data.length) {
                        response = 3;

                        callBack(response);
                        console.log(" done unaaaaaaaa");
                    } else if (i == 0) {

                        response = 1;
                        callBack(response);
                        console.log(" first time .....");
                    }


                } else {
                    // response =false;
                    response = 2;
                    callBack(response);
                }
                
            },
        );

       

    }


    // console.log("___________ItemSRN________________",response);
    // callBack(response);
    
};
