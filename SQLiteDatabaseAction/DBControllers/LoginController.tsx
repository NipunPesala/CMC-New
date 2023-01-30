import * as DB from '../DBService';

export const saveLogin = (data, callBack) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'LOGIN',
                    columns: `loginId,userID,date,status`,
                    values: '?,?,?,?',
                    params: [
                        data[i].loginId,
                        data[i].userID,
                        data[i].Date,
                        data[i].status,
                    ],
                    primaryKey: 'loginId',
                    subQuery: `userID = EXCLUDED.userID,
                Date = EXCLUDED.Date,
                status = EXCLUDED.status`,
                },
            ],
            (res, err) => {
                callBack(res, err);
            },
        );
    }
};

export const deleteAllLogin = (callBack) => {

    DB.deleteData(
        [
            {
                table: 'LOGIN',
                query: '',
                params: [],
            },
        ],
        (resp, err) => {
            callBack(resp, err);
        },
    );

};

export const getLoginByUserId = (userID, callBack) => {
    DB.searchData(
        'SELECT * FROM LOGIN WHERE userID=?',
        [userID],
        (resp, err) => {
            callBack(resp, err);
        },
    );
}