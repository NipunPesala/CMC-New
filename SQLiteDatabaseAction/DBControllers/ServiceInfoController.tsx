import * as DB from '../DBService';

export const saveServiceInfo = (data, serviceId, callBack) => {

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {

                    table: 'SERVICE_INFO',
                    columns: `serviceId,content,plannedToStart,plannedToEnd,createdBy,remarks,itemCode,mFRSerialNo,itemDescription,itemGroup`,
                    values: '?,?,?,?,?,?,?,?,?,?',
                    params: [
                        serviceId,
                        data[i].Content,
                        data[i].Planned_To_Start,
                        data[i].Planned_To_End,
                        data[i].Created_By,
                        data[i].Remarks,
                        data[i].Item_Code,
                        data[i].MFR_Serial_No,
                        data[i].Item_Description,
                        data[i].Item_Group,
                    ],
                    primaryKey: 'serviceId',
                    subQuery: `content = EXCLUDED.content, plannedToStart = EXCLUDED.plannedToStart, plannedToEnd = EXCLUDED.plannedToEnd, createdBy = EXCLUDED.createdBy,
                remarks = EXCLUDED.remarks,itemCode = EXCLUDED.itemCode,mFRSerialNo = EXCLUDED.mFRSerialNo`,
                },
            ],
            (res, err) => {
                callBack(res, err);
            },
        );
    }
};

export const deleteAllServiceInfo = (callBack) => {

    DB.deleteData(
        [
            {
                table: 'SERVICE_INFO',
                query: '',
                params: [],
            },
        ],
        (resp, err) => {
            callBack(resp, err);
        },
    );

};

export const getServiceIndoByServiceId = (serviceId, callBack) => {
    DB.searchData(
        'SELECT * FROM SERVICE_INFO WHERE serviceId=?',
        [serviceId],
        (resp, err) => {
            callBack(resp, err);
        },
    );
}