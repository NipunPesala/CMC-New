import * as DB from '../DBService';
import { getTicketMobileRefData } from './TicketController';

export const saveSparepartsHeader = (data: any, type: any, callBack: any) => {
    var response: any;

    if (type == 0) {

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
                (res: any, err: any) => {
                    if (res === 'success') {

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


    } else if (type == 1) {

        for (let i = 0; i < data.length; ++i) {
            DB.indateData(
                [
                    {
                        table: 'Spartpart_Header',
                        columns: `spareparts_No,ticket_ID,CreatedBy,CreatedAt,Web_Ref_Id,status,is_Sync`,
                        values: '?,?,?,?,?,?,?',
                        params: [
                            data[i].SparePartCode,
                            data[i].serviceTicketEntityTicketId,
                            data[i].CreatedBy,
                            data[i].CreatedDate,
                            data[i].SPReqId,
                            0,
                            1,
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


            getTicketMobileRefData(data[i].serviceTicketEntityTicketId, (res:any) =>{


                updateTicketMobID(res[0].ticketId,data[i].SPReqId, (resp:any) => {

                });

            });

        }


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

export const getSparePartReqNO = (requestID: any, callBack: any) => {
    DB.searchData(
        'SELECT spareparts_No FROM Spartpart_Header WHERE Web_Ref_Id=?',
        [requestID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const updateTicketMobID = (ticketID: any,refID:any,callBack: any) => {
    DB.updateData(
      'UPDATE Spartpart_Header SET ticket_ID=? WHERE Web_Ref_Id=?',
      [ticketID,refID],
      (resp: any, err: any) => {
        callBack(resp, err);
      },
    );
  };
  
