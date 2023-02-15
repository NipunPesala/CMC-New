import * as DB from '../DBService';

export const saveTool = (data:any, callBack:any) => {
    
    var response:any;

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'Tool',
                    columns: `ItemCode,ItemName,ItemType,status`,
                    values: '?,?,?,?',
                    params: [
                        data[i].ItemCode,
                        data[i].ItemName,
                        data[i].ItemType,
                        1
                    ],
                    
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

export const getAllTools = (callBack:any) =>{

    DB.searchData(
        'SELECT * FROM Tool WHERE  status=1',
        [],
        (resp:any, err:any) => {
          //  console.log(" **************  all customers ************  " + resp);
            callBack(resp, err);
        },
    );
}

export const searchTool = (text:any,callBack:any) =>{

    DB.searchData(
        'SELECT * FROM Tool WHERE (ItemCode like ? OR ItemName like ?) AND  status=1',
        [`%${text}%`,`%${text}%`],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}