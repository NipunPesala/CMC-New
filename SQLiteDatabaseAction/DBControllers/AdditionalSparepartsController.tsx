import * as DB from '../DBService';
import { getSparePartReqNO } from './SparepartsHeaderController';

export const saveAdditionalSpareparts = (data:any, type:any,callBack:any) => {
    var response:any;


    if(type == 0){

        for (let i = 0; i < data.length; ++i) {
            DB.indateData(
                [
                    {
                        table: 'Additional_Spartpart',
                        columns: `Description,Quantity,Spareparts_HeaderID,CreatedBy,CreatedAt,Web_Ref_Id,status,is_Sync`,
                        values: '?,?,?,?,?,?,?,?',
                        params: [
                            data[i].Description,
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
                        table: 'Additional_Spartpart',
                        columns: `Description,Quantity,Spareparts_HeaderID,CreatedBy,CreatedAt,Web_Ref_Id,status,is_Sync`,
                        values: '?,?,?,?,?,?,?,?',
                        params: [
                            data[i].Description,
                            data[i].Quantity,
                            data[i].sparepartsSPReqId,
                            data[i].CreatedBy,
                            data[i].CreatedDate,
                            data[i].Id,
                            data[i].IsActive,
                            1,
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

                updateMobileSparePartNo(respone[0].spareparts_No,data[i].Id,(res:any) => {

                });


            });
        }


    }

  

    
};


export const getALLAdditionalSpareTiketdetasilsNew = (data: any, callBack: any) => {

    console.log('----==-=-=-=-=',data);
    

    DB.searchData(
        "select * from Additional_Spartpart  where Spareparts_HeaderID = ? ",
        [data],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}

export const getSpesificData = (_id:any, callBack: any) => {

    console.log('))))))))))))))))))',_id);
    
    DB.searchData(
        'SELECT * FROM Additional_Spartpart WHERE _Id=?',
        [_id],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};


export const updateMobileSparePartNo = (No: any,refID:any, callBack: any) => {
    DB.updateData(
        'UPDATE Additional_Spartpart SET Spareparts_HeaderID=? WHERE Web_Ref_Id=?',
        [No,refID],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

export const deleteAllSpareParts = (id: any, callBack: any) => {

    console.log("--------------==========---------",id);
    
    DB.deleteData(
        [
            {
                table: 'Additional_Spartpart',
                query: 'WHERE _Id = ?',
                params: [id],
            },
        ],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );

};

///////////////////////////////////////////////////////////////////
export const getALLAdditionalSpare = (data: any, callBack: any) => {
    console.log(data,'=======================');
    
    DB.searchData(
        "SELECT ifnull(Additional_Spartpart.Description,'') as ItemName,ifnull(Additional_Spartpart.Quantity,'') as Quantity ,ifnull(Additional_Spartpart._Id,'') as Id FROM Additional_Spartpart INNER JOIN Spartpart_Header ON Spartpart_Header.spareparts_No = Additional_Spartpart.Spareparts_HeaderID  WHERE Spartpart_Header.ticket_ID=? ",
        [data],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}
export const getALLAdditionalSpare_For_Reports= ( callBack: any) => {
    
    DB.searchData(
        "SELECT ifnull(Additional_Spartpart.Description,'') as ItemName,ifnull(Additional_Spartpart.Quantity,'') as Quantity,ifnull(Additional_Spartpart.Spareparts_HeaderID,'') as Spareparts_HeaderID,ifnull(Additional_Spartpart.CreatedAt,'') as CreatedAt FROM Additional_Spartpart",
        [],
        (resp: any, err: any) => {
            callBack(resp, err);

        },
    );

}
export const getALL_AdditionalSpareparts_For_Reports_search = (txt: String, callBack: any) => {
    DB.searchData(
        'select * from Additional_Spartpart WHERE (Spareparts_HeaderID like ?) ',
        [`%${txt}%`],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" service ticket search result---- " , resp);
        },
    );
}
export const SearchAdditionalSpairePartByDateRange = (date1: any, date2: any, callBack: any) => {
    DB.searchData(
        'SELECT * FROM Additional_Spartpart WHERE CreatedAt >= ? AND CreatedAt <= ?',
        [date1, date2],
        (resp: any, err: any) => {
            callBack(resp, err);
            // console.log(" filter data using date range-  " , resp);

        },
    );
};

//update sync spare part sync state
// export const updateSycncSparepart = (ticketID: any, callBack: any) => {
  
//     DB.updateData(
//       'UPDATE TICKET_SPARE_PARTS SET isSync=2 WHERE ticketId=?',
//       [ticketID],
//       (resp: any, err: any) => {
//         callBack(resp, err);
//       },
//     );
//   }