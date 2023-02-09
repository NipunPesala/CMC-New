import * as DB from '../DBService';

export const savePriority = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'PRIORITY_LIST',
                    columns: `Id,name,status`,
                    values: '?,?,?',
                    params: [
                        data[i].Id,
                        data[i].name,
                        data[i].status,
                    ],
                    primaryKey: 'Id',
                    subQuery: `name = EXCLUDED.name, status = EXCLUDED.status`,
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
};

export const getAllPriority = (callBack:any) =>{

    DB.searchData(
        'SELECT * FROM PRIORITY_LIST WHERE status=1',
        [],
        (resp, err) => {
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
