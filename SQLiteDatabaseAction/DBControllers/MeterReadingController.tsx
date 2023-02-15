import * as DB from '../DBService';
import * as DB1 from '../DataBaseMain';


// var db = DB1.DATABASE;



export const saveMeterReading = (data: any, callBack: any) => {

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'METER_READING',
                    columns: `empID,readingType,date,location,value,status,remark`,
                    values: '?,?,?,?,?,?,?',
                    params: [
                        data[i].empID,
                        data[i].readingType,
                        data[i].date,
                        data[i].location,
                        data[i].value,
                        data[i].status,
                        data[i].remark
                    ],
                    primaryKey: 'empID',
                    subQuery: `empID = EXCLUDED.empID,
                    readingType = EXCLUDED.readingType, date = EXCLUDED.date,
                    location = EXCLUDED.location,value = EXCLUDED.value,
                    status = EXCLUDED.status,remark =EXCLUDED.remark`,
                },
            ],
            (res: any, err: any) => {
                console.log("error ............... " + res + "  ,,,,,,,,,,,,,,,  " + err)
                callBack(res, err);
            },
        );
    }
};


// export const saveMeterReading = (data: any, callBack: Function) => {
//     var returnvalue: any;
//     for (let i = 0; i < data.length; ++i) {
//         db.transaction(function (tx: any) {
//             tx.executeSql(
//                 'INSERT INTO senderDetails (mrId,empID,readingType,date,location,value,status) VALUES (?,?,?,?,?,?,?)',
//                 [data[i].id, data[i].TrackingId, data[i].name, data[i].namePickups, data[i].mobile, data[i].address, data[i].status],
//                 (tx: any, results: any) => {
//                     if (results.rowsAffected > 0) {
//                         returnvalue = true;
//                     } else {
//                         returnvalue = false;
//                     }

//                 }
//             );
//         });
//     }
//     callBack(returnvalue);
// }
// 
export const deleteAllMeterReading = (callBack) => {

    DB.deleteData(
        [
            {
                table: 'METER_READING',
                query: '',
                params: [],
            },
        ],
        (resp, err) => {
            callBack(resp, err);
        },
    );

};

export const getALLReadingDetails = (callBack:any) => {
    DB.searchData(
          //   'SELECT * FROM tblUser WHERE Name LIKE ?",[`%${Angel}%`]'
              "select ifnull(readingType,'') as shift,value,strftime('%Y-%m-%d', date) as date,date as intime,'' as overtime,'' as twhour,'' as outremark,remark as inremark , mrId from METER_READING order by  mrId asc",
        [],
        (resp, err) => {
            callBack(resp, err);
            
        },
    );

}

export const getALLReadingDetailsbyDates = (date:any,callBack:any) => {
    DB.searchData(
          //   'SELECT * FROM tblUser WHERE Name LIKE ?",[`%${Angel}%`]'
              "select ifnull(readingType,'') as shift,value,strftime('%Y-%m-%d', date) as date,date as intime,'' as overtime,'' as twhour,'' as outremark,remark as inremark , mrId from METER_READING where date >= ? order by  mrId asc",
        [date],
        (resp, err) => {
            callBack(resp, err);
            
        },
    );

}

export const getALLReadingDetailsbyDateRange = (dateS:any,dateE:any,callBack:any) => {
    DB.searchData(

              "select ifnull(readingType,'') as shift,value,strftime('%Y-%m-%d', date) as date,date as intime,'' as overtime,'' as twhour,'' as outremark, remark as inremark , mrId   from METER_READING where date >= ? AND date <= ? order by  mrId asc",
        [dateS,dateE],
        (resp, err) => {
            callBack(resp, err);
            
        },
    );

}

export const getALLReadingDetailsbyCustome = (date:any,callBack:any) => {
    DB.searchData(
          //   'SELECT * FROM tblUser WHERE Name LIKE ?",[`%${Angel}%`]'
              "select ifnull(readingType,'') as shift,value,strftime('%Y-%m-%d', date) as date,date as intime,'' as overtime,'' as twhour,'' as outremark,remark as inremark , mrId from METER_READING where date = ? order by  mrId asc",
        [date],
        (resp, err) => {
            callBack(resp, err);
            
        },
    );

}

export const getLastMeterReadingValueType = (callBack:any) => {
    DB.searchData(
       "select ifnull(readingType,'')as readingType,value,date, mrId from METER_READING order by  mrId desc LIMIT 1",
        [],
        (resp, err) => {
            callBack(resp, err);
            
        },
    );

}


export const getMeterReadingByUserId = (empID, callBack) => {
    DB.searchData(
        'SELECT * FROM METER_READING WHERE empID=?',
        [empID],
        (resp, err) => {
            callBack(resp, err);
        },
    );
}