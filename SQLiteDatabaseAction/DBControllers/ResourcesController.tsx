import * as DB from '../DBService';

export const saveResources = (data, callBack) => {
    
    var response:any;

    for (let i = 0; i < data.length; ++i) {

        DB.indateData(
            [
                {
                    table: 'Resources',
                    columns: `ResourcesID,Decription,R_Type,Type,status`,
                    values: '?,?,?,?,?',
                    params: [
                        data[i].ResourcesID,
                        data[i].Decription,
                        data[i].R_Type,
                        data[i].Type,
                        data[i].status,
                    ],
                    primaryKey: 'ResourcesID',
                    subQuery: `Decription = EXCLUDED.Decription,
                    R_Type = EXCLUDED.R_Type, Type = EXCLUDED.Type,
                    status = EXCLUDED.status`,
                },
            ],
            (res, err) => {
                // console.log(res,'+++++++++++++++++++++');
                if(res === 'success'){
                    response =true;
                    // console.log("___________________________",response);
    
                   
                }else{
                    response ==false;
                }
                
            },
        );
    }
    console.log(' resources save ...........   ',response);
    
    callBack(response);
};

export const getTypeviseResouces = (Type, callBack) =>{

    DB.searchData(
        'SELECT * FROM Resources WHERE R_Type=? and  status=1',
        [Type],
        (resp, err) => {
          //  console.log(" **************  all customers ************  " + resp);
            callBack(resp, err);
        },
    );
}

export const getTypeviseResoucesSearch = (Type:any, text:any,callBack:any) =>{

    DB.searchData(
        'SELECT * FROM Resources WHERE R_Type=? AND (ResourcesID like ? OR Decription like ?) AND  status=1',
        [Type,`%${text}%`,`%${text}%`],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
}