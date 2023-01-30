import * as DB from '../DBService';

export const savePriority = (data:any, callBack:any) => {
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
                callBack(res, err);
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
