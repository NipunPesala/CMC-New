import * as DB from '../DBService';

export const saveUser = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'User',
                    columns: `user_id,NIC,userTypeId,name,mobile_number,email,status`,
                    values: '?,?,?,?,?,?,?',
                    params: [
                        // data[i].id,
                        // data[i].NIC,
                        // data[i].userTypeId,
                        // data[i].UserName,
                        // data[i].ContactNumber,
                        // data[i].Email,
                        // data[i].Status,

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
    // callBack(true);
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