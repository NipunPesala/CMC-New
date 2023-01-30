import * as DB from '../DBService';

export const saveContactPerson = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'Contact_Person',
                    columns: `Id,name,description,status`,
                    values: '?,?,?,?',
                    params: [
                        data[i].Id,
                        data[i].name,
                        data[i].description,
                        data[i].status,
                    ],
                    primaryKey: 'Id',
                    subQuery: `name = EXCLUDED.name,
                description = EXCLUDED.description, status = EXCLUDED.status`,
                },
            ],
            (res:any, err:any) => {
                callBack(res, err);
            },
        );
    }
};

export const deleteAllExpencesType = (Id:any,callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'Contact_Person',
                query: 'WHERE Id =?',
                params: [Id],
            },
        ],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );

};

export const getAllContactPerson = (callBack:any) => {
    DB.searchData(
        'SELECT * FROM Contact_Person',
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}
export const getAllExpencesType = (callBack:any) => {
    DB.searchData(
      'SELECT expTypeId,name FROM EXPENCES_TYPE WHERE status=?',
      [1],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };