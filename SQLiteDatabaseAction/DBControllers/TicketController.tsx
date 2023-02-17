import * as DB from '../DBService';

export const saveTicket = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'TICKET',
                    columns: `ticketId,serviceId,startDate,endDate,itemDescription,content,assignTo,priority,attend_status,status,engRemark,cusNic,cusRemark,signatureStatus,syncStatus,actualstartDate,actualendtDate`,
                    values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',
                    params: [
                        data[i].ticketId,
                        data[i].serviceId,
                        data[i].startDate,
                        data[i].endDate,
                        data[i].itemDescription,
                        data[i].content,
                        data[i].assignTo,
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
                    ],
                    primaryKey: 'ticketId',
                   
                },
            ],
            (res:any, err:any) => {
                console.log(err , " ___________________ " , res);
                
                callBack(res, err);
            },
        );
    }
};

export const deleteAllTicket = (callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'TICKET',
                query: '',
                params: [],
            },
        ],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );

};

export const getTicketById = (ticketId:any, callBack:any) => {
    DB.searchData(
        'SELECT TICKET.ticketId,TICKET.serviceId,TICKET.status,SERVICE.customer,TICKET.assignTo,SERVICE.customer_address,SERVICE.contact_name,SERVICE.contact_no,TICKET.attend_status FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId WHERE ticketId=?',
        [ticketId],
        (resp:any, err:any) => {
            callBack(resp, err);
            
        },
    );
}
export const getALLTicketById = (ticketId:any, callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET WHERE ticketId=?',
        [ticketId],
        (resp:any, err:any) => {
            callBack(resp, err);
            
        },
    );
}

export const getSearchServiceTicket = (txt:String, callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET WHERE (ticketId like ? OR assignTo like ? OR priority like ?)',
        [`%${txt}%`,`%${txt}%`,`%${txt}%`],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}
export const getServiceTicket = (callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}



export const getServiceTicketID = (callBack:any) => {
    DB.searchData(
        'SELECT _Id,ticketId FROM TICKET WHERE attend_status != 3',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}


export const getLastTicketId = (callBack:any) => {
    DB.searchData(
      'SELECT _Id FROM TICKET ORDER BY _Id DESC LIMIT 1',
      [],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

export const getTicketByServiceId = (serviceId:any, callBack:any) => {
    DB.searchData(
        "SELECT *,CASE WHEN IFNUll(attend_status,'0')=='2' THEN  'Hold'  ELSE 'Pending' END attend_statusStr FROM TICKET WHERE serviceId=? AND attend_status !=3",
        [serviceId],
        (resp:any, err:any) => {
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
export const getCompelteTicketByServiceId = (serviceId:any, callBack:any) => {
    DB.searchData(
        "SELECT * FROM TICKET WHERE serviceId=? AND attend_status =3",
        [serviceId],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}

export const getTicketsForReport = (callBack:any) => {
    DB.searchData(
        'SELECT TICKET._Id,TICKET.ticketId,TICKET.assignTo,TICKET.priority,TICKET.serviceId FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2) AND TICKET.attend_status != 3',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" ************** service getTicketsForReport ************  " ,resp);
            
        },
    );
}


export const getTicketsForCustomerReport = (callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2 ) AND TICKET.attend_status = 3',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" ************** service ticket with customer details ************  " + resp);
        },
    );
}


export const getTicketDates = (id:any,callBack:any) => {
    DB.searchData(
        'SELECT startDate,endDate FROM TICKET WHERE ticketId=?',
        [id],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}

export const getServiceTicketForReport = (callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" getServiceTicket_For_report ...............   " , resp);
            
        },
    );
}


export const getServiceTicketFor7Days = (ctrrentD:any,callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET where actualendtDate >= ?',
        [ctrrentD],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" getServiceTicket_For_report ...............   " , resp);
            
        },
    );
}



export const getServiceTicketFor30Days = (ctrrentD:any,callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET where actualendtDate >= ?',
        [ctrrentD],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" getServiceTicket_For_report ...............   " , resp);
            
        },
    );
}
export const getTicketsForInprogress = (callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET where attend_status = 1  ',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" ticket inprogress ...............   " , resp);
            
        },
    );
}


export const updateTicketStatus = (ticketID:any,status:any,callBack:any) => {
    DB.updateData(
      'UPDATE TICKET SET status=? WHERE ticketId=?',
      [status,ticketID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

  export const SearchTicketUsingDateRange = (date1:any,date2:any,callBack:any) => {
    console.log(" controller data-  " , date1);
    console.log(" controller data-  " , date2);
    DB.searchData(
       'SELECT * FROM TICKET WHERE(startDate >= ? AND startDate <= ?) OR (endDate >= ? AND endDate <= ?)  ',
        [date1,date2,date1,date2],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" filter data using date range-  " , resp);
            
        },
    );
  };


export const updateTicketAttendStatus = (ticketID:any,status:any,callBack:any) => {
    DB.updateData(
      'UPDATE TICKET SET attend_status=? WHERE ticketId=?',
      [status,ticketID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

  //update actual start date
  export const updateActualStartDate = (ticketID:any,Sdate:any,callBack:any) => {
    DB.updateData(
      'UPDATE TICKET SET actualstartDate=? WHERE ticketId=?',
      [Sdate,ticketID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

//update actual end date
export const updateActualendDate = (ticketID:any,Sdate:any,callBack:any) => {
    DB.updateData(
      'UPDATE TICKET SET actualendtDate=? WHERE ticketId=?',
      [Sdate,ticketID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };
  //====================================================
  export const updateSyncServiceTicket = (ticketID:any,callBack:any) => {
    DB.updateData(
      'UPDATE TICKET SET syncStatus=1 WHERE ticketId=?',
      [ticketID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

  export const uplodeCompTicketAync = (ticketID:any,callBack:any) => {
    DB.updateData(
      'UPDATE TICKET SET syncStatus=1 WHERE ticketId=?',
      [ticketID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };
//====================================================
  export const updateTicket = (serviceId:any,startDate:any,endDate:any,itemDescription:any,content:any,assignTo:any,priority:any,attend_status:any,status:any,engRemark:any,cusNic:any,cusRemark:any,signatureStatus:any,ticketId:any,callBack:any) => {
 
 console.log(serviceId,'----',priority);
 
    DB.updateData(
      'UPDATE TICKET SET serviceId=?,startDate=?,endDate=?,itemDescription=?,content=?,assignTo=?,priority=?,attend_status=?,status=?,engRemark=?,cusNic=?,cusRemark=?,signatureStatus=? WHERE ticketId=?',
      [serviceId,startDate,endDate,itemDescription,content,assignTo,priority,attend_status,status,engRemark,cusNic,cusRemark,signatureStatus,ticketId],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };
//======================================================================================================
export const saveTicketSpareparts = (data:any, callBack:any) => {
   
    //console.log("^^^^",JSON.stringify(data));
    for (let i = 0; i < data.length; ++i) {
        DB.insertData(
            [
                {
                    table: 'TICKET_SPARE_PARTS',
                    columns: `SPRequestID,ticketId,name,description,qty,approveStatus,spType_ID,creationdate,isSync`,
                    values: '?,?,?,?,?,?,?,?,?',
                    params: [
                        data[i].SPRequestID,
                        data[i].ticketId,
                        data[i].name,
                        data[i].description,
                        data[i].qty,
                        data[i].approveStatus,
                        data[i].spType_ID,
                        data[i].creationdate,
                        data[i].isSync
                       
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
            (res:any, err:any) => {
                callBack(res, err);
                // console.log("^^saveTicketSpareparts^^",res );
            },
        );
    }
};

export const getALLAdditionalSpareTiketdetasils = (data:any,callBack:any) => {
    
    DB.searchData(
              "select * from TICKET_SPARE_PARTS  where spType_ID='2' and ticketId = ? order by  spId asc",
        [data],
        (resp:any, err:any) => {
            callBack(resp, err);
            
        },
    );

}



export const getALLAInventrySpareTiketdetasils = (data:any,callBack:any) => {
    DB.searchData(
              "select * from TICKET_SPARE_PARTS  where spType_ID='1' AND ticketId=? order by  spId asc",
        [data],
        (resp:any, err:any) => {
            callBack(resp, err);
            
        },
    );

}

export const getAll_Data = (callBack:any) => {
    DB.searchData(
              "select * from TICKET_SPARE_PARTS order by  spId asc",
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
            
        },
    );

}

export const getSearchSparePart = (txt:String, callBack:any) => {
    DB.searchData(
        'select * from TICKET_SPARE_PARTS WHERE (SPRequestID like ?) ',
        [`%${txt}%`],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" service ticket search result---- " , resp);
        },
    );
}


export const getLastRequestId = (callBack:any) => {
    DB.searchData(
      'SELECT spId FROM TICKET_SPARE_PARTS ORDER BY spId DESC LIMIT 1',
      [],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

export const CompleteTicket_Update = (engRemark:any,cusNic:any,cusRemark:any,signatureStatus:any,attend_status:any,ticketId:any,callBack:any) => {
    
    console.log(engRemark,"--",cusNic,"--",cusRemark,"---",signatureStatus,"---",attend_status,"---",ticketId);
    
    DB.updateData(
      'UPDATE TICKET SET engRemark=?,cusNic=?,cusRemark=?,signatureStatus=?,attend_status=? WHERE ticketId=?',
      [engRemark,cusNic,cusRemark,signatureStatus,attend_status,ticketId],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

export const deleteAllSparePartsReleventTickets = (id:any, callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'TICKET_SPARE_PARTS',
                query: 'WHERE spId = ?',
                params: [id],
            },
        ],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );

};


export const getServiceTicketList = (callBack:any) => {
    DB.searchData(
        'SELECT * FROM TICKET',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
            // console.log(" service ticket list select all ...............   " , resp);
        },
    );
}

export const getAllTickets = (callBack:any) =>{

    DB.searchData(
        'SELECT * FROM TICKET WHERE status=1',
        [],
        (resp:any, err:any) => {
          
            callBack(resp, err);
            // console.log(" ************** service ticket ************  " + resp);
        },
    );
    };

    export const getTicketDetailsFromID = (id:any,callBack:any) => {
        DB.searchData(
            'SELECT * FROM TICKET WHERE ticketId=?',
            [id],
            (resp:any, err:any) => {
                callBack(resp, err);
                // console.log(" service ticket using id...............   " , resp);
            },
        );
    }


    export const getSearchTicket = (txt:String, callBack:any) => {
        DB.searchData(
            'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2) AND TICKET.attend_status = 3 AND (ticketId like ?)',
            [`%${txt}%`],
            (resp:any, err:any) => {
                callBack(resp, err);
                // console.log(" service ticket search result---- " , resp);
            },
        );
    }

    export const getSearchTicketByCustomer = (txt:String, callBack:any) => {
        DB.searchData(
            'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE  (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2 ) AND TICKET.attend_status = 3 AND (SERVICE.customer like ?)',
            [`%${txt}%`],
            (resp:any, err:any) => {
                callBack(resp, err);
                // console.log(" service ticket search result---- " , resp);
            },
        );
    }

    export const SearchTicketForSummaryReport = (date1:any,date2:any,callBack:any) => {
         console.log(" controller data-  " , date1);
         console.log(" controller data-  " , date2);
         //
        DB.searchData(
            'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE (SERVICE.Approve_status != 0 OR SERVICE.Approve_status != 2 ) AND TICKET.attend_status != 3 AND(start_date >= ? AND start_date <= ?) OR (end_date >= ? AND end_date <= ?)   ',
            [date1,date2,date1,date2],
            (resp:any, err:any) => {
                callBack(resp, err);
                // console.log(" filter data using date range-  " , resp);
                
            },
        );
      };
    
      export const SearchTicketForCusSummaryReport = (date1:any,date2:any,callBack:any) => {
        // console.log(" controller data-  " , date1);
        // console.log(" controller data-  " , date2);
        DB.searchData(
            'SELECT * FROM TICKET INNER JOIN SERVICE ON SERVICE.serviceId = TICKET.serviceId  WHERE(TICKET.startDate <= ? AND TICKET.endDate >= ?) OR (TICKET.startDate <= ? AND TICKET.endDate >= ?)',
            [date1,date2,date1,date2],
            (resp:any, err:any) => {
                callBack(resp, err);
                // console.log(" filter data using date range-  " , resp);
                
            },
        );
      };

      export const SearchSpairePartByDateRange = (date1:any,date2:any,callBack:any) => {
        // console.log(" controller data-  " , date1);
        // console.log(" controller data-  " , date2);
        DB.searchData(
            'SELECT * FROM TICKET_SPARE_PARTS WHERE creationdate >= ? AND creationdate <= ?',
            [date1,date2],
            (resp:any, err:any) => {
                callBack(resp, err);
                // console.log(" filter data using date range-  " , resp);
                
            },
        );
      };


      export const SearchGetCustomer = (date1:any,date2:any,callBack:any) => {
      
        DB.searchData(
            'SELECT * FROM TICKET_SPARE_PARTS WHERE creationdate => ? AND creationdate <= ?',
            [date1,date2],
            (resp:any, err:any) => {
                callBack(resp, err);
                // console.log(" filter data using date range-  " , resp);
                
            },
        );
      };
      

      /////
      export const getServiceTicketBycustomer = (callBack:any) =>{

        DB.searchData(
            'SELECT * FROM TICKET WHERE status=1',
            [],
            (resp:any, err:any) => {
              
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

        export const getCompliteTicketCount2 = (month:any,callBack:any) => {
      
            DB.searchData(
                "SELECT COUNT(*) FROM TICKET WHERE (strftime('%m', startDate) = ?) AND attend_status = 3",
                [month],
                (resp:any, err:any) => {
                    callBack(resp, err);
                    
                },
            );
          };
          


        export const getAllTicketCount = (callBack:any) => {
            DB.searchData(
                "SELECT COUNT(*) FROM TICKET",
                [],
                (resp:any, err:any) => {
                    callBack(resp, err);
                },
            );
        }


        export const getAllTicketCountNew = (month:any,callBack:any) => {
      
            DB.searchData(
                "SELECT COUNT(*) FROM TICKET WHERE (strftime('%m', startDate) = ?) AND attend_status = 3 OR attend_status = 2 OR attend_status = 1",
                [month],
                (resp:any, err:any) => {
                    callBack(resp, err);
                    
                },
            );
          };