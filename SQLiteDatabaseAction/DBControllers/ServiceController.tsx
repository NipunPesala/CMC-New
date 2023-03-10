import { useState } from 'react';
import * as DB from '../DBService';
import { getItemDescription } from './ItemController';

//INSERT OR (UPDATE ON CONFLICT) QUERY
export const saveServiceData = (data: any, type: any, callBack: any) => {
  var response: any;

  if (type == 0) {
    for (let i = 0; i < data.length; ++i) {

      DB.indateData(
        [
          {
            table: 'SERVICE',
            columns: `serviceId, priority, service_type, item_code, item_description, customer,customer_address,contact_name,contact_no,
          subject, handle_by, TechnicianID,secretary, SecretaryID,assistance,AssisstanceID,start_date, end_date, created_by,Approve_status,Attend_status,status,CreateAt,Syncstatus,itemID,customerID,serialNumber,service_web_RefID,service_typeID`,
            values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',
            params: [
              data[i].ServiceCallId,
              data[i].Priority,
              data[i].type,
              data[i].item_code,
              data[i].item_description,
              data[i].customer,
              data[i].customer_address,
              data[i].contact_name,
              data[i].contact_no,
              data[i].Subject,
              data[i].HandledBy,
              data[i].TechnicianID,
              data[i].Secretary,
              data[i].SecretaryID,
              data[i].SalesAssistant,
              data[i].AssisstanceID,
              data[i].PlanedStartDateTime,
              data[i].PlanedEndDateTime,
              data[i].CreatedBy,
              data[i].approve_status,
              data[i].attend_status,
              data[i].Status,
              data[i].createAt,
              data[i].syncstatus,
              data[i].itemID,
              data[i].customerID,
              data[i].serialNumber,
              data[i].service_web_RefID,
              data[i].service_typeID,

            ],
            primaryKey: 'serviceId',
            //   subQuery: `priority = EXCLUDED.priority,
            //   service_type = EXCLUDED.service_type, item_code = EXCLUDED.item_code,
            //   item_description = EXCLUDED.item_description, customer_address = EXCLUDED.customer_address, 
            //   contact_name=EXCLUDED.contact_name, contact_no = EXCLUDED.contact_no,subject = EXCLUDED.subject,
            // handle_by = EXCLUDED.handle_by`,
          },
        ],
        (res: any, err: any) => {
          //   if (res === 'success') {

          //     if (i + 1 == data.length) {
          //         response = 3;

          //         callBack(response);
          //         console.log(" done unaaaaaaaa");
          //     } else if (i == 0) {

          //         response = 1;
          //         callBack(response);
          //         console.log(" first time .....");
          //     }


          // } else {
          //     // response =false;
          //     response = 2;
          //     callBack(response);
          // }
          callBack(res, err);
        },
      );
    }
  } else if (type == 1) {
    // web service calls
    console.log('web service call+++++++++++');
    var start: any;
    var end: any;

    for (let i = 0; i < data.length; ++i) {

      start = data[i].PlanedStartDateTime.split("T")[0];// done 
      end = data[i].PlanedEndDateTime.split("T")[0]; // done


      DB.indateData(
        [
          {
            table: 'SERVICE',
            columns: `serviceId, priority, service_type, item_code, item_description, customer,customer_address,contact_name,contact_no,
            subject, handle_by, TechnicianID,secretary, SecretaryID,assistance,AssisstanceID,start_date, end_date, created_by,Approve_status,Attend_status,status,CreateAt,Syncstatus,itemID,customerID,serialNumber,service_web_RefID,service_typeID`,
            values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',
            params: [
              data[i].ServiceCallNumber, //mobille service call id 
              data[i].Priority, //done
              data[i].ProblemType,
              data[i].ItemCode,//done
              // ItemName,
              "",
              data[i].CustomerName,
              data[i].CustomerAddress,
              data[i].ContactPerson,//done
              data[i].TelephoneNumber,//
              data[i].Subject,
              data[i].HandledBy, //done
              data[i].handledByUserId,// done
              data[i].Secretary,//done
              data[i].secretaryUserId,//done
              data[i].SalesAssistant,
              data[i].salesAssistantUserId,//done
              start,// done 
              end, // done
              data[i].CreatedBy,
              data[i].IsApprovedBy, //done
              data[i].StatusId,
              data[i].Status, //done
              data[i].CreatedOn,//done
              // data[i].syncstatus,
              1,  // sync status
              data[i].ItemId,///done
              data[i].customerID,
              data[i].msnfSN,
              data[i].ServiceCallId,// done
              data[i].ProblemType,
            ],
            primaryKey: 'serviceId',

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
          // callBack(res, err);
        },
      );



      // console.log(" *************** split start  --------  ", );

      getItemDescription(data[i].ItemCode, (res: any) => {
        // console.log(res[0].description, "  [][][][ ========= ", res);

        updateSycnServiceCAllItemName(data[i].ServiceCallNumber,res[0].description,(resp:any) => {
          // console.log(" update response ===========  " , resp);
          
        });


      });



    }
  }

};
export const updateService = (data: any, callBack: any) => {
  console.log(data, ' =======================');

  DB.updateData(
    'UPDATE SERVICE SET priority=?, service_type=?, item_code=?, item_description=?, customer=?,customer_address=?,contact_name=?,contact_no=?,subject=?, handle_by=?,TechnicianID=?, secretary=?,SecretaryID=?, assistance=?,AssisstanceID=?,start_date=?, end_date=?, created_by=?,Approve_status=?,Attend_status=?,status=?,CreateAt=?,Syncstatus=?,itemID=?,customerID=?,serialNumber=? WHERE serviceId=?',
    [data[0].Priority, data[0].type, data[0].item_code, data[0].item_description, data[0].customer, data[0].customer_address, data[0].contact_name, data[0].contact_no, data[0].Subject, data[0].HandledBy, data[0].TechnicianID, data[0].Secretary, data[0].SecretaryID, data[0].SalesAssistant, data[0].AssisstanceID, data[0].PlanedStartDateTime, data[0].PlanedEndDateTime, data[0].CreatedBy, data[0].approve_status, data[0].attend_status, data[0].Status, data[0].createAt, data[0].syncstatus, data[0].itemID, data[0].customerID, data[0].serialNumber, data[0].ServiceCallId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const deleteAllServices = (callBack: any) => {
  DB.deleteData(
    [
      {
        table: 'SERVICE',
        query: '',
        params: [],
      },
    ],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  )
};


export const updateServiceCAll = (serviceId: any, status: any, callBack: any) => {
  DB.updateData(
    'UPDATE SERVICE SET Approve_status=? WHERE serviceId=?',
    [status, serviceId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const getWebRefIDServiceCAll = (serviceId: any, callBack: any) => {
  DB.searchData(
    'SELECT service_web_RefID FROM SERVICE WHERE serviceId=?',
    [serviceId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const getMobileRefData = (serviceId: any, callBack: any) => {
  DB.searchData(
    'SELECT item_code,item_description,serviceId FROM SERVICE WHERE service_web_RefID=?',
    [serviceId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};



export const enableServiceCall = (serviceId: any, status: any, callBack: any) => {

  console.log(serviceId, "---", status);

  DB.updateData(
    'UPDATE SERVICE SET Attend_status=? WHERE serviceId=?',
    [status, serviceId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};


export const getServiceById = (serviceId: any, callBack: any) => {
  DB.searchData(
    'SELECT * FROM SERVICE WHERE serviceId=?',
    [serviceId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

//------------------------------------------------------------------------

export const getUploadServiceCallsById = (serviceId: any, callBack: any) => {
  DB.searchData(
    'SELECT created_by as UserID,serviceId,priority,service_type,item_code,1 as itemID,2 as customerID,customer,customer_address,contact_name,contact_no,handle_by,secretary,assistance as sales_assistance,start_date,end_date,created_by,1 as active_status,Approve_status,Attend_status FROM SERVICE WHERE serviceId=? and syncstatus=0',
    [serviceId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const updateSycnServiceCAll = (serviceId: any, callBack: any) => {
  var status = "1";
  DB.updateData(
    'UPDATE SERVICE SET Syncstatus=? WHERE serviceId=?',
    [status, serviceId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const updateSycnServiceCAllItemName = (serviceId: any, item:any,callBack: any) => {
 
  DB.updateData(
    'UPDATE SERVICE SET item_description=? WHERE serviceId=?',
    [item, serviceId],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const Update_webRefId = (webFef: any, serviceCallId: any, callBack: any) => {
  // console.log('sql web ref id========='+webFef)
  // console.log('sql service call id========='+serviceCallId)
  DB.updateData(
    'UPDATE SERVICE SET service_web_RefID=? WHERE serviceId=?',
    [webFef, serviceCallId],
    (resp: any, err: any) => {
      console.log('web ref id update--------- ', resp);
      callBack(resp, err);
    },
  );
};
//----------------------------------------------------------------------

export const getLastServiceId = (callBack: any) => {
  DB.searchData(
    'SELECT _Id FROM SERVICE ORDER BY _Id DESC LIMIT 1',
    [],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const getServiceId = (callBack: any) => {
  DB.searchData(
    'SELECT serviceId,_Id,customer FROM SERVICE WHERE Approve_status != 2 OR ',
    [],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const getServiceCalls = (status: any, callBack: any) => {
  DB.searchData(
    'SELECT * FROM SERVICE WHERE Approve_status=? AND Attend_status != 3',
    [status],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );
};

export const getServiceCallCustomer = (id: any, callBack: any) => {

  DB.searchData(
    'SELECT customer,start_date, end_date FROM SERVICE WHERE serviceId=?',
    [id],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );

};

export const RequestBydateRoute = (date: any, callback: any) => {

  DB.searchData(
    'SELECT * FROM SERVICE WHERE start_date <= ? AND end_date >= ? AND Attend_status != 3 AND Approve_status != 2 ',
    [date, date],
    (resp: any, err: any) => {
      console.log(resp, ">>>>>>", err);

      callback(resp, err);
    },
  );

};

export const RequestBydateRangeRoute = (startdate: any, endDate: any, callback: any) => {

  DB.searchData(
    'SELECT * FROM SERVICE WHERE (start_date >= ? AND start_date <= ?) OR (end_date >= ? AND end_date <= ?)  AND Attend_status != 3 AND Approve_status != 2 ',
    [startdate, startdate, endDate, endDate],
    (resp: any, err: any) => {


      console.log(resp, ">>>>>>", err);

      callback(resp, err);
    },
  );

};

export const saveServiceHistoryData = (data: any, serviceId: any, callBack: any) => {
  DB.indateData(
    [
      {

        table: 'SERVICE_HISTORY',
        columns: `historyId, serviceId, description, ticketType, status, date`,
        values: '?,?,?,?,?,?',
        params: [
          data.Service_No,
          serviceId,
          data.Description,
          data.Ticket_Type,
          data.Status,
          data.Date
        ],
        primaryKey: 'historyId',
        subQuery: `description = EXCLUDED.description,
        ticketType = EXCLUDED.ticketType, status = EXCLUDED.status,
        date = EXCLUDED.date`,
      },
    ],
    (res: any, err: any) => {
      callBack(res, err);
    },
  );
};


export const getDataForEmail = (id: any, callBack: any) => {

  DB.searchData(
    'SELECT * FROM SERVICE WHERE serviceId=?',
    [id],
    (resp: any, err: any) => {
      callBack(resp, err);
    },
  );

};