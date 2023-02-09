import * as DB from '../DBService';

export const saveCustomerItems = (data: any, callBack: any) => {
    var response: any;

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'Customer_Items',
                    columns: `ItemId,ItemCode,ItemName,CustomerCode,CustomerName,status`,
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

            },
        );

    }
    // console.log(response, "========================= customer items saved");
    // callBack(true);

};
