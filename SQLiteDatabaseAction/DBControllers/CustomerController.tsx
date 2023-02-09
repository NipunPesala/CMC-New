import * as DB from '../DBService';

export const saveCustomer = (data:any, callBack:any) => {
    var response:any;

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'CUSTOMER',
                    columns: `CusID,CusCode,CusName,Address,status`,
                    values: '?,?,?,?,?',
                    params: [
                        data[i].customer,
                        data[i].customer,
                        data[i].custmrName,
                        data[i].Address,
                        data[i].status,
                        // data[i].CusID,
                        // data[i].CusCode,
                        // data[i].CusName,
                        // data[i].Address,
                        // data[i].status,
                    ],
                    primaryKey: 'CusID',
                    subQuery: `CusCode = EXCLUDED.CusCode,
                    CusName = EXCLUDED.CusName, Address = EXCLUDED.Address,
                    status = EXCLUDED.status`,
                },
            ],
            (res:any, err:any) => {
                if(res === 'success'){
                    // response =true;
                    console.log("___________Customer________________",response);

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
    // console.log(response,"========================= customer");
    // callBack(true);
    
};

export const getAllCustomers = (callBack:any) =>{

    DB.searchData(
        'SELECT CusName,Address,CusID FROM CUSTOMER',
        [],
        (resp:any, err:any) => {
           console.log("************** all customers ************  " + resp.length);
            callBack(resp, err);
        },
    );
    };
    export const getAllCustomerINFO = (callBack:any) =>{

        DB.searchData(
            'SELECT * FROM CUSTOMER',
            [],
            (resp:any, err:any) => {
              //  console.log(" **************  all customers ************  " + resp);
                callBack(resp, err);
            },
        );
}
