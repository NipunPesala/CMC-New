import * as DB from '../DBService';

export const saveTechnitian = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'User_Type',
                    columns: `type_id,description,status`,
                    values: '?,?,?',
                    params: [
                        data[i].Id,
                        data[i].Description,
                        data[i].Status,
                        // data[i].Id,
                        // data[i].type_name,
                        // data[i].status,
                    ],
                    primaryKey: 'Id',
                    subQuery: `description = EXCLUDED.Description,
                     status = EXCLUDED.status`,
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

export const getAllUserTypes = (type:any,callBack:any) =>{

    DB.searchData(
        'SELECT * FROM USER_TYPES WHERE status=1 AND type_name=?',
        [type],
        (resp:any, err:any) => {
          //  console.log(" **************  all customers ************  " + resp);
            callBack(resp, err);
        },
    );
    };
    export const getAllCustomerINFO = (callBack:any) =>{

        DB.searchData(
            'SELECT * FROM CUSTOMER WHERE status=1',
            [],
            (resp, err) => {
              //  console.log(" **************  all customers ************  " + resp);
                callBack(resp, err);
            },
        );
}
