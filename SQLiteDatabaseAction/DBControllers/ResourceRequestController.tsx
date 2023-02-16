import * as DB from '../DBService';

export const saveResourceRequest = (data:any, callBack:any) => {
    
    var response:any;

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'RESOURCE_REQUEST',
                    columns: `RequestID,ResourceID,ServiceCall_id,ResourceType,RequestDate,HandoverDate,CreatedDate,Remark,status,isSync`,
                    values: '?,?,?,?,?,?,?,?,?,?',
                    params: [
                        data[i].RequestID,
                        data[i].ResourceID,
                        data[i].ServiceCall_id,
                        data[i].ResourceType,
                        data[i].RequestDate,
                        data[i].HandoverDate,
                        data[i].CreatedDate,
                        data[i].Remark,
                        data[i].status,
                        data[i].isSync,
                    ],
                    primaryKey: 'RequestID',
                    subQuery: `ResourceID = EXCLUDED.ResourceID,
                    RequestDate = EXCLUDED.RequestDate, HandoverDate = EXCLUDED.HandoverDate,
                    CreatedDate = EXCLUDED.CreatedDate, Remark = EXCLUDED.Remark, status = EXCLUDED.status`,
                },
            ],
            (res:any, err:any) => {
                console.log(res,'+++++++++++++++++++++',err);
                if(res === 'success'){
                    response ==true;
                    // console.log("___________________________",response);
    
                   
                }else{
                    response ==false;
                }
                
            },
        );
    }
    console.log(' resources save ...........   ',response);
    
    callBack(response);
};
export const getLastServiceId = (callBack:any) => {
    DB.searchData(
      'SELECT _Id FROM RESOURCE_REQUEST ORDER BY _Id DESC LIMIT 1',
      [],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

  export const getAllResource = (id:any,callBack:any) => {
    DB.searchData(
      'SELECT RESOURCE_REQUEST.*,TICKET.content FROM RESOURCE_REQUEST INNER JOIN TICKET ON RESOURCE_REQUEST.ServiceCall_id = TICKET.ticketId  WHERE RESOURCE_REQUEST.RequestID =?',
      [id],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };
  export const DeleteResource = ( id:any,callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'RESOURCE_REQUEST',
                query: 'WHERE _id=?',
                params: [id],
            },
        ],
        (resp:any, err:any) => {
            console.log(resp,">>>>>>",err);
            
            callBack(resp, err);
        },
    );
}; 

export const DeleteBackResource = ( id:any,callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'RESOURCE_REQUEST',
                query: 'WHERE status=?',
                params: [id],
            },
        ],
        (resp:any, err:any) => {
            console.log(resp,">>>>>>",err);
            
            callBack(resp, err);
        },
    );
};
export const UpdateSavedToSubmitResource = ( status:any,callBack:any) => {

    DB.updateData(
        'UPDATE RESOURCE_REQUEST SET status=1 WHERE RequestID=? ',
        [status],
        (resp:any, err:any) => {
            console.log(resp," update   >>>>>>",err);
            
            callBack(resp, err);
        },
      );
};



export const RequestBydate = (date:any,resourceID:any,callback:any) => {

    DB.searchData(
        'SELECT RESOURCE_REQUEST.* , SERVICE.customer, SERVICE.customer_address FROM RESOURCE_REQUEST INNER JOIN TICKET ON  TICKET.ticketId = RESOURCE_REQUEST.ServiceCall_id  INNER JOIN SERVICE ON TICKET.serviceId = SERVICE.serviceId WHERE  RequestDate <= ? AND HandoverDate >= ? AND  ResourceID = ? ',
        [date,date,resourceID],
        (resp:any, err:any) => {
            console.log(resp,">>>>>>",err);
            
            callback(resp, err);
        },
      );

};

export const updateSyncResourceRequest= (RID:any,callBack:any) => {
    DB.updateData(
      'UPDATE RESOURCE_REQUEST SET isSync=true WHERE ResourceID=?',
      [RID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };


  export const isAddedTickets = (ReqID:any,ResID:any,TicketID:any,callback:any) => {

    DB.searchData(
        'SELECT COUNT(*) as count FROM RESOURCE_REQUEST  WHERE RequestID = ?  AND  ResourceID = ? AND ServiceCall_id=? ',
        [ReqID,ResID,TicketID],
        (resp:any, err:any) => {
            // console.log(resp,">>>>>>",err);
            
            callback(resp, err);
        },
      );

  };