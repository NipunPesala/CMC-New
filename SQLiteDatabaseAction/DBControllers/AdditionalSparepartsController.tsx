import * as DB from '../DBService';

export const saveAdditionalSpareparts = (data:any, callBack:any) => {
    var response:any;
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

