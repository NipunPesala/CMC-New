import * as DB from '../DBService';
import { getTicketMobileRefData } from './TicketController';

export const saveExpences = (data: any, type: any, callBack: any) => {
  var response: any;
  if (type == 0) {

    for (let i = 0; i < data.length; ++i) {
      DB.indateData(
        [
          {
            table: 'EXPENCES',
            columns: `ExpenseRequestID,ServiceCall_ID,ExpenseTypeID,Amount,Remark,CreatedBy,CreateDate,RelaventDate,status,isSync,ExpencesWebRefId`,
            values: '?,?,?,?,?,?,?,?,?,?,?',
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
              data[i].ExpencesWebRefId,
            ],
            primaryKey: '_Id',
            subQuery: `ServiceCall_ID = EXCLUDED.ServiceCall_ID,
                      ExpenseTypeID = EXCLUDED.ExpenseTypeID, Amount = EXCLUDED.Amount, Remark = EXCLUDED.Remark
                      CreatedBy = EXCLUDED.CreatedBy,CreateDate = EXCLUDED.CreateDate,RelaventDate = EXCLUDED.RelaventDate,
                      status = EXCLUDED.status`,
          },
        ],
        (res: any, err: any) => {
          callBack(res, err);
        },
      );
    }

  } else if (type == 1) {

    console.log(" sync expences ----------  ");

    for (let i = 0; i < data.length; ++i) {

      DB.indateData(
        [
          {
            table: 'EXPENCES',
            columns: `ExpenseRequestID,ServiceCall_ID,ExpenseTypeID,Amount,Remark,CreatedBy,CreateDate,RelaventDate,ExpencesWebRefId,status`,
            values: '?,?,?,?,?,?,?,?,?,?',
            params: [
              data[i].ExpenceCode,
              data[i].serviceTicketTicketId,
              data[i].ExpenseType,
              data[i].Amount,
              data[i].Remark,
              data[i].CreatedBy,
              data[i].CreatedDate,
              data[i].DateExpire,
              data[i].Id,
              0
            ],
            primaryKey: '_Id',
            subQuery: `ServiceCall_ID = EXCLUDED.ServiceCall_ID,
                      ExpenseTypeID = EXCLUDED.ExpenseTypeID, Amount = EXCLUDED.Amount, Remark = EXCLUDED.Remark
                      CreatedBy = EXCLUDED.CreatedBy,CreateDate = EXCLUDED.CreateDate,RelaventDate = EXCLUDED.RelaventDate,
                      status = EXCLUDED.status`,
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


      getTicketMobileRefData(data[i].serviceTicketTicketId, (res: any) => {
        // console.log(res[0].description, "  [][][][ ========= ", res);


        Update_Expences_MobRefTicketId(res[0].ticketId,data[i].Id,(resp: any) => {
            console.log(" update response ===========  ", resp);

        });


    });



    }


  }



};

export const deleteAllExpences = (callBack: any) => {

  DB.deleteData(
    [
      {
        table: 'EXPENCES',
        query: '',
        params: [],
      },
    ],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );

};
export const DeleteExpences = (expId: any, callBack: any) => {

  DB.deleteData(
    [
      {
        table: 'EXPENCES',
        query: 'WHERE _Id=?',
        params: [expId],
      },
    ],
    (resp: any, err: any) => {
      console.log(resp, ">>>>>>", err);

      callBack(resp, err);
    },
  );
}
// delete expences change tatus
export const DeleteExpencesnew = (expId: any, callBack: any) => {
  DB.updateData(
    'UPDATE EXPENCES SET status=1 WHERE ExpenseRequestID=?',
    [expId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
}

export const getExpenceById = (expId: any, callBack: any) => {
  DB.searchData(
    'SELECT * FROM EXPENCES WHERE _Id=?',
    [expId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
}

export const getLastExpRequestId = (callBack: any) => {
  DB.searchData(
    'SELECT _Id FROM EXPENCES ORDER BY _Id DESC LIMIT 1',
    [],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
}



export const getAllExpences = (data: any, callBack: any) => {
  DB.searchData(
    'SELECT EXPENCES_TYPE.name as ExpencesType,EXPENCES.Amount as Amount,EXPENCES._Id as ExId,EXPENCES.CreateDate as CreateDate,EXPENCES.ExpenseRequestID  FROM EXPENCES INNER JOIN EXPENCES_TYPE ON EXPENCES.ExpenseTypeID=EXPENCES_TYPE.name WHERE EXPENCES.ServiceCall_ID=? AND EXPENCES.status=0',
    [data],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};


export const updateExpences = (ticketID: any, ExpenseTypeID: any, Amount: any, Remark: any, CreatedBy: any, CreateDate: any, RelaventDate: any, status: any, id: any, syncStatus: any, callBack: any) => {

  // console.log(" function amount ---- ", Amount);


  DB.updateData(
    'UPDATE EXPENCES SET ServiceCall_ID=?,ExpenseTypeID=?,Amount=?,Remark=?,CreatedBy=?,CreateDate=?,RelaventDate=?,status=?,isSync=? WHERE _Id=?',
    [ticketID, ExpenseTypeID, Amount, Remark, CreatedBy, CreateDate, RelaventDate, status, syncStatus, id],
    (resp: any, err: any) => {
      callBack(resp, err);
    },

  )

};


export const updateSycnExpences = (ticketID: any, callBack: any) => {
  DB.updateData(
    'UPDATE EXPENCES SET isSync=true WHERE ticketId=?',
    [ticketID],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const Update_Expences_MobRefTicketId = (mobileID:any,expID: any, callBack: any) => {
  DB.updateData(
    'UPDATE EXPENCES SET ServiceCall_ID=? WHERE ExpencesWebRefId=?',
    [mobileID,expID],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

// update sync expencess 
export const updateNewSyncExpences = (ticketID: any, callBack: any) => {
  DB.updateData(
    'UPDATE EXPENCES SET isSync=1 WHERE ServiceCall_ID=?',
    [ticketID],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};
// save expences web reff id
export const Update_Expences_webRefId = (webFef: any, expenceID: any, callBack: any) => {
  console.log('sql web ref id=========' + webFef, " 666666666 ;;;;;;;;;;;;;;; ", expenceID)
  // console.log('sql service call id========='+serviceCallId)
  DB.updateData(
    'UPDATE EXPENCES SET ExpencesWebRefId=?,isSync=1 WHERE ExpenseRequestID=?',
    [webFef, expenceID],
    (resp: any, err: any) => {
      console.log('web ref id update--------- ', resp);
      callBack(resp, err);
    },
  );
};

// get expences web ref id for uplode update service call
export const getExpenWebIdForUpdate = (expenceID: any, callBack: any) => {
  DB.searchData(
    'SELECT * FROM EXPENCES WHERE ExpenseRequestID=?',
    [expenceID],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};



export const getSyncExpences = (TicketID: any, callBack: any) => {

  var status = "0";

  DB.searchData(
    'SELECT EXPENCES.*,TICKET.Ticket_web_RefID FROM EXPENCES INNER JOIN TICKET ON TICKET.ticketId = EXPENCES.ServiceCall_ID WHERE EXPENCES.ServiceCall_ID=? AND EXPENCES.isSync=?',
    [TicketID, status],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );

}
