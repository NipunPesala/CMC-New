import * as DB from '../DBService';
import { getSparePartReqNO } from './SparepartsHeaderController';

export const saveInventrySpareparts = (data:any, type:any,callBack:any) => {
    var response:any;

    if(type == 0){

        for (let i = 0; i < data.length; ++i) {
            DB.indateData(
                [
                    {
                        table: 'Invenrty_Spartpart',
                        columns: `SP_ItemCode,ItemName,Quantity,Spareparts_HeaderID,CreatedBy,CreatedAt,Web_Ref_Id,status,is_Sync`,
                        values: '?,?,?,?,?,?,?,?,?',
                        params: [
                            data[i].SP_ItemCode,
                            data[i].ItemName,
                            data[i].Quantity,
                            data[i].Spareparts_HeaderID,
                            data[i].CreatedBy,
                            data[i].CreatedAt,
                            data[i].Web_Ref_Id,
                            data[i].status,
                            data[i].is_Sync,
                        ],
                        primaryKey: '_Id',
                    },
                ],
                (res:any, err:any) => {
                    if(res === 'success'){
    
                        if( i+1 == data.length){
                            response = 3;
                
                            callBack(response);
                            console.log(" done unaaaaaaaa");
                        }else if(i == 0){
                
                            response =1;
                            callBack(response);
                            console.log(" first time .....");
                        }
        
                       
                    }else{
                        // response =false;
                        response =2;
                        callBack(response);
                    }
                },
            );
        }


    }else if(type == 1){

        for (let i = 0; i < data.length; ++i) {
            DB.indateData(
                [
                    {
                        table: 'Invenrty_Spartpart',
                        columns: `SP_ItemCode,ItemName,Quantity,Spareparts_HeaderID,CreatedBy,CreatedAt,Web_Ref_Id,status,is_Sync`,
                        values: '?,?,?,?,?,?,?,?,?',
                        params: [
                            data[i].ItemCode,
                            data[i].ItemName,
                            data[i].qty,
                            data[i].sparepartsSPReqId,
                            data[i].CreatedBy,
                            data[i].CreatedDate,
                            data[i].Id,
                            0,
                            1
                        ],
                        primaryKey: '_Id',
                    },
                ],
                (res:any, err:any) => {
                    if(res === 'success'){
    
                        if( i+1 == data.length){
                            response = 3;
                
                            callBack(response);
                            console.log(" done unaaaaaaaa");
                        }else if(i == 0){
                
                            response =1;
                            callBack(response);
                            console.log(" first time .....");
                        }
        
                       
                    }else{
                        // response =false;
                        response =2;
                        callBack(response);
                    }
                },
            );


            getSparePartReqNO( data[i].sparepartsSPReqId, (respone:any) => {

                console.log(" spare part no -->>> " , respone);
                

                updateSparePartNo(respone[0].spareparts_No,data[i].Id,(res:any) => {

                });


            });
        }

    }

   
};

export const updateSyncInventrySpareParts = (headerID: any,SP_ItemCode:any, callBack: any) => {
    DB.updateData(
        'UPDATE Invenrty_Spartpart SET is_Sync=1 WHERE Spareparts_HeaderID=? AND SP_ItemCode=?',
        [headerID,SP_ItemCode],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const updateSparePartNo = (No: any,refID:any, callBack: any) => {

console.log(" sp no -->> " , No , "  ref id -->> " , refID);


    DB.updateData(
        'UPDATE Invenrty_Spartpart SET Spareparts_HeaderID=? WHERE Web_Ref_Id=?',
        [No,refID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const getALLAInventrySpare = (data: any, callBack: any) => {
    DB.searchData(
        "SELECT ifnull(Invenrty_Spartpart.SP_ItemCode,'') as SP_ItemCode,"+
        "ifnull(Invenrty_Spartpart.ItemName,'') as ItemName,"+
        "ifnull(Invenrty_Spartpart.Quantity,'') as Quantity "+
        "FROM Invenrty_Spartpart INNER JOIN Spartpart_Header ON Spartpart_Header.spareparts_No = Invenrty_Spartpart.Spareparts_HeaderID  WHERE Spartpart_Header.ticket_ID=? ",
        [data],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}
export const getALL_InventrySpareparts_For_Reports= ( callBack: any) => {
    
    DB.searchData(
        "SELECT _Id, ifnull(Invenrty_Spartpart.ItemName,'') as ItemName,ifnull(Invenrty_Spartpart.Quantity,'') as Quantity,ifnull(Invenrty_Spartpart.Spareparts_HeaderID,'') as Spareparts_HeaderID,ifnull(Invenrty_Spartpart.CreatedAt,'') as CreatedAt FROM Invenrty_Spartpart",
        [],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}
export const getALL_InventrySpareparts_For_Reports_search = (txt: String, callBack: any) => {
    DB.searchData(
        "SELECT _Id, ifnull(Invenrty_Spartpart.ItemName,'') as ItemName,ifnull(Invenrty_Spartpart.Quantity,'') as Quantity,ifnull(Invenrty_Spartpart.Spareparts_HeaderID,'') as Spareparts_HeaderID,ifnull(Invenrty_Spartpart.CreatedAt,'') as CreatedAt FROM Invenrty_Spartpart WHERE (Spareparts_HeaderID like ?) ",
        [`%${txt}%`],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" service ticket search result---- " , resp);
        },
    );
}

export const SearchInventrySpairePartByDateRange = (date1: any, date2: any, callBack: any) => {
    DB.searchData(
        "SELECT _Id, ifnull(Invenrty_Spartpart.ItemName,'') as ItemName,ifnull(Invenrty_Spartpart.Quantity,'') as Quantity,ifnull(Invenrty_Spartpart.Spareparts_HeaderID,'') as Spareparts_HeaderID,ifnull(Invenrty_Spartpart.CreatedAt,'') as CreatedAt FROM Invenrty_Spartpart WHERE CreatedAt >= ? AND CreatedAt <= ?",
        [date1, date2],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" filter data using date range-  " , resp);

        },
    );
};
