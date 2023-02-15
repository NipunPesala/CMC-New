import * as DB from '../DBService';

export const saveVehicle = (data:any, callBack:any) => {
    
    var response:any;

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'Vehicle',
                    columns: `VehicleID,Decription,VehicleType,VehicleCapacity,status`,
                    values: '?,?,?,?,?',
                    params: [
                        data[i].VehicleID,
                        data[i].VehicleDescription,
                        data[i].VehicleType,
                        data[i].VehicleCapacity,
                       1,
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

export const getAllVehicle = (callBack:any) =>{

    DB.searchData(
        'SELECT * FROM Vehicle WHERE  status=1',
        [],
        (resp:any, err:any) => {
          //  console.log(" **************  all customers ************  " + resp);
            callBack(resp, err);
        },
    );
}


export const searchVehicle = (text:any,callBack:any) =>{

    DB.searchData(
        'SELECT * FROM Vehicle WHERE (VehicleID like ? OR Decription like ?) AND  status=1',
        [`%${text}%`,`%${text}%`],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}