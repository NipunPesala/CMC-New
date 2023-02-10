import * as DB from '../DBService';

export const saveItem = (data, callBack) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'ITEM',
                    columns: `itemID,itemCode,description,status`,
                    values: '?,?,?,?',
                    params: [
                        data[i].Id,
                        data[i].itemCode,
                        data[i].itemName,
                        data[i].Status,
                        // data[i].itemID,
                        // data[i].itemCode,
                        // data[i].description,
                        // data[i].status,
                    ],
                    primaryKey: 'itemID',
                    subQuery: `itemCode = EXCLUDED.itemCode,
                    description = EXCLUDED.description,
                    status = EXCLUDED.status`,
                },
            ],
            (res:any, err:any) => {
                if(res === 'success'){

                    console.log(i,"___________Item________________",response);

                    if( i+1 == data.length){
                        response = 3;
            
                        callBack(response);
                        console.log(" item iwara unaaaaaaaa");

                    }else if(i == 0){
            
                        response =1;
                        callBack(response);
                        console.log(" item first time .....");
                    }
    
                   
                }else{
                    // response =false;
                    response =2;
                    callBack(response);
                }
            },
        );
    }

    // console.log(" item saves finished ............. ")
    // callBack(true);
};

export const deleteItem = (callBack) => {

    DB.deleteData(
        [
            {
                table: 'ITEM',
                query: '',
                params: [],
            },
        ],
        (resp, err) => {
            callBack(resp, err);
        },
    );

};

export const getServiceTypeById = (itemID, callBack) => {
    DB.searchData(
        'SELECT * FROM ITEM WHERE itemID=?',
        [itemID],
        (resp, err) => {
            callBack(resp, err);
        },
    );
};

export const getAllItems = (callBack:any) =>{

    DB.searchData(
        'SELECT itemCode,description,itemID FROM ITEM WHERE status=sns_Active',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}

export const getAllCustomerVsItems = (cusID:any,callBack:any) =>{

    DB.searchData(
        'SELECT itemCode,ItemName,itemID FROM Customer_Items WHERE CustomerCode=?',
        [cusID],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}
