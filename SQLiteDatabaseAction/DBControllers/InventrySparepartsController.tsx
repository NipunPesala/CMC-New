import * as DB from '../DBService';

export const saveInventrySpareparts = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'Invenrty_Spartpart',
                    columns: `SP_ItemCode,ItemName,Quantity,Spareparts_HeaderID,CreatedBy,CreatedAt,Web_Ref_Id,status,is_Sync`,
                    values: '?,?,?,?,?,?,?,?,?',
                    params: [
                        data[i].SP_ItemCode,
                        data[i].ItemName,
                        data[i].Quantity,
                        data[i].Spareparts_HeaderID,
                        data[i].CreatedBy,
                        data[i].CreatedAt,
                        data[i].Web_Ref_Id,
                        data[i].status,
                        data[i].is_Sync,
                    ],
                    primaryKey: '_Id',
                },
            ],
            (res:any, err:any) => {
                if(res === 'success'){

                    if( i+1 == data.length){
                        response = 3;
            
                        callBack(response);
                        console.log(" done unaaaaaaaa");
                    }else if(i == 0){
            
                        response =1;
                        callBack(response);
                        console.log(" first time .....");
                    }
    
                   
                }else{
                    // response =false;
                    response =2;
                    callBack(response);
                }
            },
        );
    }
};

export const updateSyncInventrySpareParts = (headerID: any,SP_ItemCode:any, callBack: any) => {
    DB.updateData(
        'UPDATE Invenrty_Spartpart SET is_Sync=1 WHERE Spareparts_HeaderID=? AND SP_ItemCode=?',
        [headerID,SP_ItemCode],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};
