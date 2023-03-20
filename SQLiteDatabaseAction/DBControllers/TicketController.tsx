import * as DB from '../DBService';
import { getMobileRefData } from './ServiceController';

export const saveTicket = (data: any, type: any, callBack: any) => {
    var response: any;
    if (type == 0) {

        for (let i = 0; i < data.length; ++i) {

            DB.indateData(
                [
                    {
                        table: 'TICKET',
                        columns: `ticketId,serviceId,startDate,endDate,itemDescription,content,assignTo,technicianID,priority,attend_status,status,engRemark,cusNic,cusRemark,signatureStatus,syncStatus,actualstartDate,actualendtDate,itemCode,Ticket_web_RefID`,
                        values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',
                        params: [
                            data[i].ticketId,
                            data[i].serviceId,
                            data[i].startDate,
                            data[i].endDate,
                            data[i].itemDescription,
                            data[i].content,
                            data[i].assignTo,
                            data[i].technicianID,
                            data[i].priority,
                            data[i].attend_status,
                            data[i].status,
                            data[i].engRemark,
                            data[i].cusNic,
                            data[i].cusRemark,
                            data[i].signatureStatus,
                            data[i].syncStatus,
                            data[i].actualstartDate,
                            data[i].actualendtDate,
                            data[i].itemCode,
                            data[i].Ticket_web_RefID,
                        ],
                        primaryKey: 'ticketId',

                    },
                ],
                (res: any, err: any) => {
                    console.log(err, " ___________________ ", res);

                    callBack(res, err);
                },
            );
        }

    } else if (type == 1) {
        console.log('thi is a sync------------')

        var start;
        var end;
        for (let i = 0; i < data.length; ++i) {

            start = data[i].PlannedStartDate.split("T")[0];// done 
            end = data[i].PlannedEndDate.split("T")[0]; // done

            DB.indateData(
                [
                    {
                        table: 'TICKET',
                        columns: `ticketId,serviceId,startDate,endDate,itemDescription,content,assignTo,technicianID,priority,attend_status,status,engRemark,cusNic,cusRemark,signatureStatus,syncStatus,actualstartDate,actualendtDate,itemCode,Ticket_web_RefID`,
                        values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',
                        params: [
                            data[i].ServiceTicketNumber, // need to change done
                            "",
                            start,// done 
                            end, //done
                            "",
                            data[i].Content,// done 
                            data[i].AssignedTo,//done
                            data[i].handledByUserId,//done
                            data[i].Priority,//done
                            data[i].StatusId,//attend_status
                            data[i].Status,//done
                            data[i].engRemark,
                            data[i].cusNic,
                            data[i].cusRemark,
                            data[i].signatureStatus,
                            1,  // sync status
                            data[i].ActualStartDate, //done
                            data[i].ActualEndDate, //done
                            "",
                            data[i].TicketId,//done
                        ],
                        primaryKey: 'ticketId',

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


            getMobileRefData(data[i].serviceCallServiceCallId, (res: any) => {
                // console.log(res[0].description, "  [][][][ ========= ", res);

                updateSycnServiceTicketDetails(data[i].ServiceTicketNumber, res[0].serviceId, res[0].item_description, res[0].item_code, (resp: any) => {
                    console.log(" update response ===========  ", resp);

                });


            });



        }

    }
};

export const deleteAllTicket = (callBack: any) => {

    DB.deleteData(
        [
            {
                table: 'TICKET',
                query: '',
                params: [],
            },
        ],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );

};

export const getTicketById = (ticketId: any, callBack: any) => {
    DB.searchData(
        'SELECT TICKET.ticketId,TICKET.serviceId,TICKET.status,SERVICE.customer,TICKET.assignTo,SERVICE.customer_address,SERVICE.contact_name,SERVICE.contact_no,TICKET.attend_status,TICKET.Ticket_web_RefID,TICKET.priority FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId WHERE TICKET.ticketId=?',
        [ticketId],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );
}
export const getALLTicketById = (ticketId: any, callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET WHERE ticketId=?',
        [ticketId],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );
}



export const getSearchServiceTicket = (txt: String, callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET WHERE (ticketId like ? OR assignTo like ? OR priority like ?)',
        [`%${txt}%`, `%${txt}%`, `%${txt}%`],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}
export const getServiceTicket = (callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}



export const getServiceTicketID = (callBack: any) => {
    DB.searchData(
        'SELECT _Id,ticketId FROM TICKET WHERE attend_status != 3',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}


export const getLastTicketId = (callBack: any) => {
    DB.searchData(
        'SELECT _Id FROM TICKET ORDER BY _Id DESC LIMIT 1',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const getTicketByServiceId = (serviceId: any, callBack: any) => {
    DB.searchData(
        "SELECT *,CASE WHEN IFNUll(attend_status,'0')=='2' THEN  'Hold'  ELSE 'Pending' END attend_statusStr FROM TICKET WHERE serviceId=? AND attend_status !=3",
        [serviceId],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}
// export const getTicketDataById = (serviceId, callBack:any) => {
//     DB.searchData(
//         "SELECT * FROM TICKET WHERE serviceId=? AND attend_status !=3",
//         [serviceId],
//         (resp, err) => {
//             callBack(resp, err);
//         },
//     );
// }
export const getCompelteTicketByServiceId = (serviceId: any, callBack: any) => {
    DB.searchData(
        "SELECT * FROM TICKET WHERE serviceId=? AND attend_status =3",
        [serviceId],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}

export const getTicketsForHome = (callBack: any) => {
    DB.searchData(
        'SELECT TICKET._Id,TICKET.ticketId,TICKET.assignTo,TICKET.priority,TICKET.serviceId FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE  TICKET.attend_status != 3',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" ************** service getTicketsForReport ************  " ,resp);

        },
    );
}
export const getTicketsForReport = (callBack: any) => {
    DB.searchData(
        'SELECT TICKET._Id,TICKET.ticketId,TICKET.assignTo,TICKET.priority,TICKET.serviceId FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2) AND TICKET.attend_status = 3',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" ************** service getTicketsForReport ************  " ,resp);

        },
    );
}


export const getTicketsForCustomerReport = (callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2 ) AND TICKET.attend_status = 3',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" ************** service ticket with customer details ************  " + resp);
        },
    );
}


export const getTicketDates = (id: any, callBack: any) => {
    DB.searchData(
        'SELECT startDate,endDate FROM TICKET WHERE ticketId=?',
        [id],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}

export const getServiceTicketForReport = (callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" getServiceTicket_For_report ...............   " , resp);

        },
    );
}


export const getServiceTicketFor7Days = (ctrrentD: any, callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET where actualendtDate >= ?',
        [ctrrentD],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" getServiceTicket_For_report ...............   " , resp);

        },
    );
}



export const getServiceTicketFor30Days = (ctrrentD: any, callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET where actualendtDate >= ?',
        [ctrrentD],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" getServiceTicket_For_report ...............   " , resp);

        },
    );
}
export const getTicketsForInprogress = (callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET where attend_status = 1  ',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" ticket inprogress ...............   " , resp);

        },
    );
}


export const updateTicketStatus = (ticketID: any, status: any, callBack: any) => {
    DB.updateData(
        'UPDATE TICKET SET status=? WHERE ticketId=?',
        [status, ticketID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};


export const updateSycnServiceTicketDetails = (ticketID: any, serviceID: any, desc: any, code: any, callBack: any) => {
    DB.updateData(
        'UPDATE TICKET SET serviceId=?,itemDescription=?,itemCode=? WHERE ticketId=?',
        [serviceID, desc, code, ticketID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const SearchTicketUsingDateRange = (date1: any, date2: any, callBack: any) => {
    console.log(" controller data-  ", date1);
    console.log(" controller data-  ", date2);
    DB.searchData(
        'SELECT * FROM TICKET WHERE(startDate >= ? AND startDate <= ?) OR (endDate >= ? AND endDate <= ?)  ',
        [date1, date2, date1, date2],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" filter data using date range-  " , resp);

        },
    );
};
// get all uplode fail tickets

export const getAllUploadFailServiceTickets = (callBack: any) => {
    DB.searchData(
      'SELECT * FROM TICKET WHERE Ticket_web_RefID=0',
      [],
      (resp: any, err: any) => {
        callBack(resp, err);
      },
    );
  };


export const updateTicketAttendStatus = (ticketID: any, status: any, callBack: any) => {
    DB.updateData(
        'UPDATE TICKET SET attend_status=? WHERE ticketId=?',
        [status, ticketID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

//update actual start date
export const updateActualStartDate = (ticketID: any, Sdate: any, callBack: any) => {
    DB.updateData(
        'UPDATE TICKET SET actualstartDate=? WHERE ticketId=?',
        [Sdate, ticketID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

//update actual end date
export const updateActualendDate = (ticketID: any, Sdate: any, callBack: any) => {
    DB.updateData(
        'UPDATE TICKET SET actualendtDate=? WHERE ticketId=?',
        [Sdate, ticketID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

////// get web ref id for spare part uplode 
export const getWebRefIdByServiceId = (data: any, callBack: any) => {

    DB.searchData(
        "select * from TICKET  where ticketId=?",
        [data],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}
//====================================================
export const updateSyncServiceTicket = (ticketID: any, callBack: any) => {
    var status = 1;
    DB.updateData(
        'UPDATE TICKET SET syncStatus=? WHERE ticketId=?',
        [status, ticketID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const updateUploadedServiceTicket = (ticketID: any, webFef: any, callBack: any) => {
    var status = 1;
    DB.updateData(
        'UPDATE TICKET SET syncStatus=?, Ticket_web_RefID=? WHERE ticketId=?',
        [status, webFef, ticketID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};




export const Update_serviceTicket_webRefId = (webFef: any, serviceCallId: any, callBack: any) => {
    console.log('sql web ref id=========' + webFef, " --------------  ", serviceCallId)
    // console.log('sql service call id========='+serviceCallId)
    DB.updateData(
        //   'UPDATE TICKET SET Ticket_web_RefID=? WHERE ticketId=?',
        'UPDATE TICKET SET Ticket_web_RefID=? WHERE ticketId=?',
        [webFef, serviceCallId],
        (resp: any, err: any) => {
            console.log('web ref id update--------- ', resp);
            callBack(resp, err);
        },
    );
};


export const uplodeCompTicketAync = (ticketID: any, callBack: any) => {
    DB.updateData(
        'UPDATE TICKET SET syncStatus=1 WHERE ticketId=?',
        [ticketID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};
//====================================================
export const updateTicket = (data: any, callBack: any) => {

    console.log(data, '--------------------------------');

    DB.updateData(
        'UPDATE TICKET SET serviceId=?,startDate=?,endDate=?,itemDescription=?,content=?,assignTo=?,priority=?,attend_status=?,status=?,engRemark=?,cusNic=?,cusRemark=?,signatureStatus=?,technicianID=?,syncStatus=?,actualstartDate=?,actualendtDate=?,itemCode=? WHERE ticketId=?',
        [data[0].serviceId, data[0].startDate, data[0].endDate, data[0].itemDescription, data[0].content, data[0].assignTo, data[0].priority, data[0].attend_status, data[0].status, data[0].engRemark, data[0].cusNic, data[0].cusRemark, data[0].signatureStatus, data[0].technicianID, data[0].syncStatus, data[0].actualstartDate, data[0].actualendtDate, data[0].itemCode, data[0].ticketId],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};
//======================================================================================================
export const saveTicketSpareparts = (data: any, callBack: any) => {

    //console.log("^^^^",JSON.stringify(data));
    for (let i = 0; i < data.length; ++i) {
        DB.insertData(
            [
                {
                    table: 'TICKET_SPARE_PARTS',
                    columns: `SPRequestID,ticketId,SPartID,name,description,qty,approveStatus,spType_ID,creationdate,isSync,TickSpare_web_RefID`,
                    values: '?,?,?,?,?,?,?,?,?,?,?',
                    params: [
                        data[i].SPRequestID,
                        data[i].ticketId,
                        data[i].SPartID,
                        data[i].name,
                        data[i].description,
                        data[i].qty,
                        data[i].approveStatus,
                        data[i].spType_ID,
                        data[i].creationdate,
                        data[i].isSync,
                        data[i].TickSpare_web_RefID

                    ],
                    primaryKey: 'spId',
                    subQuery: `ticketId = EXCLUDED.ticketId,
                    name = EXCLUDED.name, description = EXCLUDED.description,
                    qty = EXCLUDED.qty,
                    approveStatus = EXCLUDED.approveStatus,
                    spType_ID=EXCLUDED.spType_ID,
                    creationdate=EXCLUDED.creationdate,
                    isSync=EXCLUDED.isSync,
                    `,
                },
            ],
            (res: any, err: any) => {
                callBack(res, err);
                // console.log("^^saveTicketSpareparts^^",res );
            },
        );
    }
};

export const getALLAdditionalSpareTiketdetasils = (data: any, callBack: any) => {

    DB.searchData(
        "select * from TICKET_SPARE_PARTS  where spType_ID='2' and ticketId = ? order by  spId asc",
        [data],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}



export const getALLAInventrySpareTiketdetasils = (data: any, callBack: any) => {
    DB.searchData(
        "select * from TICKET_SPARE_PARTS  where spType_ID='1' AND ticketId=? order by  spId asc",
        [data],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}



export const getSparepartDetailsForEmail = (ticketId: any, callBack: any) => {
    DB.searchData(
        "select SPRequestID,SPartID,description,qty,creationdate from TICKET_SPARE_PARTS  where ticketId=? ",
        [ticketId],
        (resp: any, err: any) => {
            callBack(resp, err);
            console.log('ticket details for email+++++++++', resp);
        },
    );

}
export const getAll_Data = (callBack: any) => {
    DB.searchData(
        "select * from TICKET_SPARE_PARTS order by  spId asc",
        [],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}

//update sync spare part sync state
export const updateSycncSparepart = (ticketID: any, callBack: any) => {
  
    DB.updateData(
      'UPDATE TICKET_SPARE_PARTS SET isSync=2 WHERE ticketId=?',
      [ticketID],
      (resp: any, err: any) => {
        callBack(resp, err);
      },
    );
  }

  
//update ticket spare part web ref id
export const updateTicketSpare_webRef = (ticketID: any,wenRef:any, callBack: any) => {
  
    DB.updateData(
      'UPDATE TICKET_SPARE_PARTS SET TickSpare_web_RefID=? WHERE ticketId=?',
      [wenRef,ticketID],
      (resp: any, err: any) => {
        callBack(resp, err);
      },
    );
  }

export const getSearchSparePart = (txt: String, callBack: any) => {
    DB.searchData(
        'select * from TICKET_SPARE_PARTS WHERE (SPRequestID like ?) ',
        [`%${txt}%`],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" service ticket search result---- " , resp);
        },
    );
}


export const getLastRequestId = (callBack: any) => {
    DB.searchData(
        'SELECT spId FROM TICKET_SPARE_PARTS ORDER BY spId DESC LIMIT 1',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

// get spare part delete web refId
export const getSparePart_Remove_web_ref = (SpId:any, callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET_SPARE_PARTS WHERE spId=?',
        [SpId],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const CompleteTicket_Update = (engRemark: any, cusNic: any, cusRemark: any, signatureStatus: any, attend_status: any, ticketId: any, callBack: any) => {

    console.log(engRemark, "--", cusNic, "--", cusRemark, "---", signatureStatus, "---", attend_status, "---", ticketId);

    DB.updateData(
        'UPDATE TICKET SET engRemark=?,cusNic=?,cusRemark=?,signatureStatus=?,attend_status=? WHERE ticketId=?',
        [engRemark, cusNic, cusRemark, signatureStatus, attend_status, ticketId],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const deleteAllSparePartsReleventTickets = (id: any, callBack: any) => {

    DB.deleteData(
        [
            {
                table: 'TICKET_SPARE_PARTS',
                query: 'WHERE spId = ?',
                params: [id],
            },
        ],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );

};


export const getServiceTicketList = (callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET',
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" service ticket list select all ...............   " , resp);
        },
    );
}

export const getAllTickets = (callBack: any) => {

    DB.searchData(
        'SELECT * FROM TICKET WHERE status=1',
        [],
        (resp: any, err: any) => {

            callBack(resp, err);
            // console.log(" ************** service ticket ************  " + resp);
        },
    );
};

export const getTicketDetailsFromID = (id: any, callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET WHERE ticketId=?',
        [id],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" service ticket using id...............   " , resp);
        },
    );
}


export const getSearchTicket = (txt: String, callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2) AND (TICKET.attend_status = 3) AND (TICKET.ticketId like ?)',
        [`%${txt}%`],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" service ticket search result---- " , resp);
        },
    );
}

export const getSearchTicketByCustomer = (txt: String, callBack: any) => {
    DB.searchData(
        'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE  (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2 ) AND TICKET.attend_status = 3 AND (SERVICE.customer like ?)',
        [`%${txt}%`],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" service ticket search result---- " , resp);
        },
    );
}

export const SearchTicketForSummaryReport = (date1: any, date2: any, callBack: any) => {
    console.log(" controller data-  ", date1);
    console.log(" controller data-  ", date2);
    //
    DB.searchData(

        'SELECT TICKET._Id,TICKET.ticketId,TICKET.assignTo,TICKET.priority,TICKET.serviceId FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2) AND (TICKET.attend_status = 3) AND((TICKET.startDate >= ? AND TICKET.startDate <= ?) OR (TICKET.endDate >= ? AND TICKET.endDate <= ?))  ',
        [date1, date2, date1, date2],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" filter data using date range-  " , resp);

        },
    );
};

export const SearchTicketForCusSummaryReport = (date1: any, date2: any, callBack: any) => {
    // console.log(" controller data-  " , date1);
    // console.log(" controller data-  " , date2);
    DB.searchData(
        'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2 )AND (TICKET.attend_status = 3) AND((TICKET.startDate >= ? AND TICKET.startDate <= ?) OR (TICKET.endDate >= ? AND TICKET.endDate <= ?))',
        [date1, date2, date1, date2],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" filter data using date range-  " , resp);

        },
    );
};

export const SearchSpairePartByDateRange = (date1: any, date2: any, callBack: any) => {
    // console.log(" controller data-  " , date1);
    // console.log(" controller data-  " , date2);
    DB.searchData(
        'SELECT * FROM TICKET_SPARE_PARTS WHERE creationdate >= ? AND creationdate <= ?',
        [date1, date2],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" filter data using date range-  " , resp);

        },
    );
};


export const SearchGetCustomer = (date1: any, date2: any, callBack: any) => {

    DB.searchData(
        'SELECT * FROM TICKET_SPARE_PARTS WHERE creationdate => ? AND creationdate <= ?',
        [date1, date2],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" filter data using date range-  " , resp);

        },
    );
};


/////
export const getServiceTicketBycustomer = (callBack: any) => {

    DB.searchData(
        'SELECT * FROM TICKET WHERE status=1',
        [],
        (resp: any, err: any) => {

            callBack(resp, err);
            // console.log(" ************** service ticket ************  " + resp);
        },
    );
};

//////////////////////////////KPI Reports/////////////////////////////////////

// export const getCompliteTicketCount = (callBack:any) => {
//     DB.searchData(
//         "SELECT COUNT(*) FROM TICKET WHERE startDate >= DATE('now', 'startofmonth') AND startDate < DATE('now', 'startofmonth','+1 month') AND status = 0",
//         [],
//         (resp, err) => {
//             callBack(resp, err);
//         },
//     );
// }

export const getCompliteTicketCount2 = (month: any, callBack: any) => {

    DB.searchData(
        "SELECT COUNT(*) FROM TICKET WHERE (strftime('%m', startDate) = ?) AND attend_status = 3",
        [month],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );
};



export const getAllTicketCount = (callBack: any) => {
    DB.searchData(
        "SELECT COUNT(*) FROM TICKET",
        [],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}


export const getAllTicketCountNew = (month: any, callBack: any) => {

    DB.searchData(
        "SELECT COUNT(*) FROM TICKET WHERE (strftime('%m', startDate) = ?) AND attend_status = 3 OR attend_status = 2 OR attend_status = 1",
        [month],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );
};