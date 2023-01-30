import { CALLBACK_TYPE } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import { err } from 'react-native-svg/lib/typescript/xml';
import * as DB from '../DBService';

export const saveServiceType = (data, callBack) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'SERVICE_TYPE',
                    columns: `typeId,typeName,description,status`,
                    values: '?,?,?,?',
                    params: [
                        // data[i].ProblemTypeCode,
                        // data[i].ProblemTypeName,
                        // data[i].ProblemTypeValue,
                        // data[i].Status,
                        data[i].typeId,
                        data[i].typeName,
                        data[i].description,
                        data[i].status,
                    ],
                    primaryKey: 'typeId',
                    subQuery: `typeName = EXCLUDED.typeName,
                description = EXCLUDED.description,
                status = EXCLUDED.status`,
                },
            ],
            (res, err) => {
                if(res === 'success'){
                    response =true;
                    console.log("___________Customer________________",response);
    
                   
                }else{
                    response =false;
                }
              
            },
        );
    }
    callBack(true);
};

export const deleteAllSeviceType = (callBack) => {

    DB.deleteData(
        [
            {
                table: 'SERVICE_TYPE',
                query: '',
                params: [],
            },
        ],
        (resp, err) => {
            callBack(resp, err);
        },
    );

};

export const getServiceTypeById = (typeId, callBack) => {
    DB.searchData(
        'SELECT * FROM SERVICE_TYPE WHERE typeId=?',
        [typeId],
        (resp, err) => {
            callBack(resp, err);
        },
    );
};

export const getAllTypes = (callBack) => {

    DB.searchData(
        'SELECT typeName,typeId FROM SERVICE_TYPE WHERE status=1',
        [],
        (resp, err) => {
            callBack(resp, err);
            return callBack;
        },
    );
}
