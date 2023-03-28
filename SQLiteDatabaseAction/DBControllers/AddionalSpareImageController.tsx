import * as DB from '../DBService';

export const saveImagepathToDB = (data:any,callBack:any) => {
    var response:any;
console.log('inside controller');
        for (let i = 0; i < data.length; ++i) {
            DB.indateData(
                [
                    {
                        table: 'Additional_Spart_Image',
                        columns: `Spareparts_HeaderID,imgPath1,imgPath2,imgPath3,is_Sync`,
                        values: '?,?,?,?,?',
                        params: [
                            data[i].Spareparts_HeaderID,
                            data[i].imgPath1,
                            data[i].imgPath2,
                            data[i].imgPath3,
                            data[i].is_Sync,
                        ],
                        primaryKey: '_Id',
                    },
                ],
                (res:any, err:any) => {
                    console.log('response www_______________',res);
                    // if(res === 'success'){
    
                    //     if( i+1 == data.length){
                    //         response = 3;
                
                    //         callBack(response);
                    //         console.log(" done unaaaaaaaa");
                    //     }else if(i == 0){
                
                    //         response =1;
                    //         callBack(response);
                    //         console.log(" first time .....");
                    //     }
        
                       
                    // }else{
                    //     // response =false;
                    //     response =2;
                    //     callBack(response);
                    // }
                },
            );
        }

    
};






