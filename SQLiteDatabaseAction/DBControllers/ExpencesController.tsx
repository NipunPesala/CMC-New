import * as DB from '../DBService';

export const saveExpences = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'EXPENCES',
                    columns: `ExpenseRequestID,ServiceCall_ID,ExpenseTypeID,Amount,Remark,CreatedBy,CreateDate,RelaventDate,status,isSync`,
                    values: '?,?,?,?,?,?,?,?,?,?',
                    params: [
                        data[i].ExpenseRequestID,
                        data[i].ServiceCall_ID,
                        data[i].ExpenseTypeID,
                        data[i].Amount,
                        data[i].Remark,
                        data[i].CreatedBy,
                        data[i].CreateDate,
                        data[i].RelaventDate,
                        data[i].status,
                        data[i].isSync,
                    ],
                    primaryKey: '_Id',
                    subQuery: `ServiceCall_ID = EXCLUDED.ServiceCall_ID,
                    ExpenseTypeID = EXCLUDED.ExpenseTypeID, Amount = EXCLUDED.Amount, Remark = EXCLUDED.Remark
                    CreatedBy = EXCLUDED.CreatedBy,CreateDate = EXCLUDED.CreateDate,RelaventDate = EXCLUDED.RelaventDate,
                    status = EXCLUDED.status`,
                },
            ],
            (res:any, err:any) => {
                callBack(res, err);
            },
        );
    }
};

export const deleteAllExpences = (callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'EXPENCES',
                query: '',
                params: [],
            },
        ],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );

};
export const DeleteExpences = ( expId:any,callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'EXPENCES',
                query: 'WHERE _Id=?',
                params: [expId],
            },
        ],
        (resp:any, err:any) => {
            console.log(resp,">>>>>>",err);
            
            callBack(resp, err);
        },
    );
}

export const getExpenceById = (expId:any, callBack:any) => {
    DB.searchData(
        'SELECT * FROM EXPENCES WHERE _Id=?',
        [expId],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}

export const getLastExpRequestId = (callBack:any) => {
    DB.searchData(
         'SELECT _Id FROM EXPENCES ORDER BY _Id DESC LIMIT 1',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}



export const getAllExpences = (data:any,callBack:any) => {
    DB.searchData(
      'SELECT EXPENCES_TYPE.name as ExpencesType,EXPENCES.Amount as Amount,EXPENCES._Id as ExId,EXPENCES.CreateDate as CreateDate,EXPENCES.ExpenseRequestID  FROM EXPENCES INNER JOIN EXPENCES_TYPE ON EXPENCES.ExpenseTypeID=EXPENCES_TYPE.name WHERE ServiceCall_ID=?',
      [data],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

  
export const updateExpences = (ticketID:any,ExpenseTypeID:any,Amount:any,Remark:any,CreatedBy:any,CreateDate:any,RelaventDate:any,status:any,id:any,callBack:any) => {
    DB.updateData(
      'UPDATE EXPENCES SET ServiceCall_ID=?,ExpenseTypeID=?,Amount=?,Remark=?,CreatedBy=?,CreateDate=?,RelaventDate=?,status=? WHERE _Id=?',
      [ticketID,ExpenseTypeID,Amount,Remark,CreatedBy,CreateDate,RelaventDate,status,id],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };


  export const updateSycnExpences = (ticketID:any,callBack:any) => {
    DB.updateData(
      'UPDATE EXPENCES SET isSync=true WHERE ticketId=?',
      [ticketID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };
