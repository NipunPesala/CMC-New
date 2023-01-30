import * as DB from '../DBService';

export const saveSpareParts = (data, callBack) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'SPARE_PARTS',
                    columns: `spId,SparePartNo,description,stock_qty,Item_Group,department,BrandName,status`,
                    values: '?,?,?,?,?,?,?,?',
                    params: [
                        data[i].spId,
                        data[i].SparePartNo,
                        data[i].description,
                        data[i].stock_qty,
                        data[i].Item_Group,
                        data[i].department,
                        data[i].BrandName,
                        data[i].status,
                    ],
                    primaryKey: 'spId',
                //     subQuery: `name = EXCLUDED.name,
                // description = EXCLUDED.description, qty = EXCLUDED.qty
                // price = EXCLUDED.price,status = EXCLUDED.status`,
                },
            ],
            (res, err) => {
                callBack(res, err);
            },
        );
    }
};

export const deleteAllSpareParts = (callBack) => {

    DB.deleteData(
        [
            {
                table: 'SPARE_PARTS',
                query: '',
                params: [],
            },
        ],
        (resp, err) => {
            callBack(resp, err);
        },
    );

};

export const getSparePartsById = (spId, callBack) => {
    DB.searchData(
        'SELECT * FROM SPARE_PARTS WHERE spId=?',
        [spId],
        (resp, err) => {
            callBack(resp, err);
        },
    );
}
export const getSparePartsAllData = ( callBack:any) => {
    DB.searchData(
        'SELECT * FROM SPARE_PARTS',
        [],
        (resp, err) => {
            callBack(resp, err);
        },
    );
}

export const getSearchSpareParts = (txt:String, callBack:any) => {
    DB.searchData(
        'SELECT * FROM SPARE_PARTS WHERE (SparePartNo like ? OR description like ?) AND  status=1',
        [`%${txt}%`,`%${txt}%`],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}