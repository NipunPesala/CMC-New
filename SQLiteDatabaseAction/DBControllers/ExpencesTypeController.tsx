import * as DB from '../DBService';

export const saveExpencesType = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'EXPENCES_TYPE',
                    columns: `expTypeId,name,description,status`,
                    values: '?,?,?,?',
                    params: [
                        data[i].expTypeId,
                        data[i].name,
                        data[i].description,
                        data[i].status,
                    ],
                    primaryKey: 'expTypeId',
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

export const deleteAllExpencesType = (callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'EXPENCES_TYPE',
                query: '',
                params: [],
            },
        ],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );

};

export const getExpencesTypeById = (expTypeId:any, callBack:any) => {
    DB.searchData(
        'SELECT * FROM EXPENCES_TYPE WHERE expTypeId=?',
        [expTypeId],
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