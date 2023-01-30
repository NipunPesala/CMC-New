import * as DB from '../DBService';

export const saveCustomerItems = (data:any, callBack:any) => {
    var response:any;

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'Customer_Items',
                    columns: `ItemId,ItemCode,ItemName,Customer,CustomerName,status`,
                    values: '?,?,?,?,?,?',
                    params: [
                        data[i].Id,
                        data[i].itemCode,
                        data[i].itemName,
                        data[i].customer,
                        data[i].custmrName,
                        data[i].Status,
                    ],
                },
            ],
            (res:any, err:any) => {
                if(res === 'success'){
                    response =true;
                    console.log("___________CustomerItems________________",response);
    
                   
                }else{
                    response =false;
                }
                
            },
        );
        
    }
    console.log(response,"=========================");
    callBack(true);
    
};
