import * as DB from '../DBService';

export const saveEmployee = (data, callBack) => {

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'EMPLOYEE',
                    columns: `empId,f_Name,l_Name,contactNo,address,status`,
                    values: '?,?,?,?,?,?',
                    params: [
                        data[i].empId,
                        data[i].f_Name,
                        data[i].l_Name,
                        data[i].contactNo,
                        data[i].address,
                        data[i].status,
                    ],
                    primaryKey: 'empId',
                    subQuery: `f_Name = EXCLUDED.f_Name,
                l_Name = EXCLUDED.l_Name, contactNo = EXCLUDED.contactNo
                address = EXCLUDED.address,status = EXCLUDED.status`,
                },
            ],
            (res, err) => {
                callBack(res, err);
            },
        );
    }
};

export const deleteAllEmployee = (callBack) => {

    DB.deleteData(
        [
            {
                table: 'EMPLOYEE',
                query: '',
                params: [],
            },
        ],
        (resp, err) => {
            callBack(resp, err);
        },
    );

};

export const getEmployeeById = (empId, callBack) => {
    DB.searchData(
        'SELECT * FROM EMPLOYEE WHERE empId=?',
        [empId],
        (resp, err) => {
            callBack(resp, err);
        },
    );
}