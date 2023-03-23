import * as DB from '../DBService';

export const saveSparepartsHeader = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'Spartpart_Header',
                    columns: `spareparts_No,ticket_ID,CreatedBy,CreatedAt,Web_Ref_Id,status,is_Sync`,
                    values: '?,?,?,?,?,?,?',
                    params: [
                        data[i].spareparts_No,
                        data[i].ticket_ID,
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
export const checkSparpartsHeader = (requestID: any, callBack: any) => {
    DB.searchData(
      'SELECT * FROM Spartpart_Header WHERE spareparts_No=?',
      [requestID],
      (resp: any, err: any) => {
        callBack(resp, err);
      },
    );
  };
