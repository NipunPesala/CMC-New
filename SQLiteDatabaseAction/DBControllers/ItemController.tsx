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
                        // data[i].Id,
                        // data[i].itemCode,
                        // data[i].itemName,
                        // data[i].status,
                        data[i].itemID,
                        data[i].itemCode,
                        data[i].description,
                        data[i].status,
                    ],
                    primaryKey: 'itemID',
                    subQuery: `itemCode = EXCLUDED.itemCode,
                    description = EXCLUDED.description,
                    status = EXCLUDED.status`,
                },
            ],
            (res, err) => {
                if(res === 'success'){
                    response =true;
                    console.log("____________Item_______________",response);
    
                   
                }else{
                    response =false;
                }
            },
        );
    }

    callBack(true);
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
        'SELECT itemCode,description,itemID FROM ITEM WHERE status=1',
        [],
        (resp, err) => {
            callBack(resp, err);
        },
    );
}
