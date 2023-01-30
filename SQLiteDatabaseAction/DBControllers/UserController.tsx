import * as DB from '../DBService';

export const saveUser = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'User',
                    columns: `user_id,NIC,userTypeId,name,mobile_number,email,status`,
                    values: '?,?,?,?,?,?,?',
                    params: [
                        data[i].id,
                        data[i].NIC,
                        data[i].userTypeId,
                        data[i].UserName,
                        data[i].ContactNumber,
                        data[i].Email,
                        data[i].Status,
                    ],
                    primaryKey: 'user_id',
                   
                },
            ],
            (res:any, err:any) => {
                console.log(err , " ___________________ " , res);
                
                
            },
        );
    }
    callBack(true);
};


export const getUserByTypes = (type:any,callBack:any) =>{

    DB.searchData(
        'SELECT * FROM User  WHERE status=1 AND userTypeId=?',
        [type],
        (resp:any, err:any) => {
          //  console.log(" **************  all customers ************  " + resp);
            callBack(resp, err);
        },
    );
    };