import * as DB from '../DBService';

export const saveSpareParts = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'SPARE_PARTS',
                    columns: `spId,SparePartNo,description,stock_qty,Item_Group,Item_Type`,
                    values: '?,?,?,?,?,?',
                    params: [
                        data[i].Id,
                        data[i].ItemCode,
                        data[i].ItemName,
                        data[i].Onhand,
                        data[i].ItmsGrpCod,
                        data[i].ItemType,
                    ],
                    primaryKey: 'spId',
                //     subQuery: `name = EXCLUDED.name,
                // description = EXCLUDED.description, qty = EXCLUDED.qty
                // price = EXCLUDED.price,status = EXCLUDED.status`,
                },
            ],
            (res:any, err:any) => {
                callBack(res, err);
            },
        );
    }
    console.log("spare parts saved ,,,,,,,,,,,,  ");
    callBack(true);
};

export const deleteAllSpareParts = (callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'SPARE_PARTS',
                query: '',
                params: [],
            },
        ],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );

};

export const getSparePartsById = (spId:any, callBack:any) => {
    DB.searchData(
        'SELECT * FROM SPARE_PARTS WHERE spId=?',
        [spId],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}
export const getSparePartsAllData = ( callBack:any) => {
    DB.searchData(
        'SELECT * FROM SPARE_PARTS',
        [],
        (resp:any, err:any) => {
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


export const updateSyncSpareParts= (ticketID:any,callBack:any) => {
    DB.updateData(
      'UPDATE TICKET SET syncStatus=1 WHERE ticketId=?',
      [ticketID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };