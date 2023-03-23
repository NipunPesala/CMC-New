/**
* @author Madushika Sewwandi
*/
import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet, ToastAndroid, Alert
} from "react-native";
import ActionButton from "./ActionButton";
import ComStyles from "../Constant/Components.styles";
import { FlatList } from "react-native-gesture-handler";
import { getAllExpences, DeleteExpences, getSyncExpences,DeleteExpencesnew,getExpenWebIdForUpdate } from "../SQLiteDatabaseAction/DBControllers/ExpencesController"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ListBox from "./ListBox";
import { Text } from "react-native-paper";
import AntDesign from 'react-native-vector-icons/AntDesign';
import ComponentsStyles from "../Constant/Components.styles";
import { getLoginUserName, getASYNC_CURRENT_TICKET_ID, get_ASYNC_USERID,get_ASYNC_TOCKEN } from "../Constant/AsynStorageFuntion"
import { BASE_URL_GET } from "../Constant/Commen_API_Url";
import axios from "axios";
import moment from 'moment';
var ticketID:any;
var TOCKEN_KEY: any;
var Amount:any;
var remark:any;
var createdBy:any;
var expenseType:any;
var dateExpire:any;
var expenceId:any;
const Expences = (isActive:any) => {
    const navigation = useNavigation();
    const [ExList, setExList] = useState([]);


    // useEffect(() => {     
    //     getASYNC_CURRENT_TICKET_ID().then(res => {
    //         ticketID =res;
    //         Load_All_Expences(res);
    //     }); 
            
    //         console.log("fffffffffffff");
            
    // }, []);

    // useEffect(() => {
    //     const focusHandler = navigation.addListener('focus', () => {
    //         getASYNC_CURRENT_TICKET_ID().then(res => {
    //             ticketID =res;
    //             Load_All_Expences(res);
    //         }); 
    //     });
    //     return focusHandler;

    // }, [navigation]);


    useFocusEffect(
        React.useCallback(() => {

            getASYNC_CURRENT_TICKET_ID().then(res => {
                ticketID =res;
                
                Load_All_Expences(res);
            }); 

        },[])
    );


    const DeleteEx = (data: any) => {
        Alert.alert(
            "Delete",
            "Are you sure delete expences",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteExpencesUpdateState(data) }
            ]);

    }
    // chane state after delete expences
const deleteExpencesUpdateState=(expenId:any)=>{
    console.log('**************check expences request id +++++++++++',expenId);

    DeleteExpencesnew(expenId, (result: any) => {
        Load_All_Expences(ticketID);
    });

    getExpenWebIdForUpdate(expenId, (result2: any) => {
      console.log('get uplode details ++++++++++++',result2[0]);
      Amount=result2[0].Amount;
      remark=result2[0].Remark;
      createdBy=result2[0].CreatedBy;
      expenseType=result2[0].ExpenseTypeID;
      dateExpire=result2[0].RelaventDate;
      expenceId=result2[0].ExpencesWebRefId;
      UploadUpdatesExpences();
    });
   

}

const UploadUpdatesExpences= () => {
  
    try {
  
        const prams = [
          {
              "expenceId":expenceId,
              "dateExpire":dateExpire ,
              "expenseType": expenseType,
              "createdBy":createdBy,
              "amount": Amount,
              "remark":remark,
              "status":1,
              "createdAt": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss')
          }
      ]
        console.log('----- SERVICE CALL UPDATE UPLOAD JSON-- ----   ', prams);
  
  
        get_ASYNC_TOCKEN().then(res => {
            // console.log('cus id--' + customerID)
            TOCKEN_KEY = res;
            // const AuthStr = 'Bearer '.concat(TOCKEN_KEY);
            const AuthStr = ` Bearer ${TOCKEN_KEY}`;
  
            const headers = {
                'Authorization': AuthStr
            }
            const URL = BASE_URL_GET + "expence";
            axios.put(URL, prams, {
                headers: headers
            })
                .then((response) => {
                    console.log("[s][t][a][t][u][s][]", response.status);
                    if (response.status == 200) {
  
                        console.log('<------ NEW SERVICE CALL UPLOAD Method --->', response.data)
                        console.log('<------ NEW SERVICE error id --->', response.data[0].ErrorId)
                        if (response.data[0].ErrorId == 0) {
                    
                            // this use fro update sync flag as 1 
                            // console.log('this is a web service call id ----', response.data[0].ServiceCallId);
                            // updateSycnServiceCAll(serviceId, (result: any) => {
  
                            // });
  
  
                        } else {
                          Alert.alert(
                            "Axios upload error",
                            "Bad Request",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
  
                        }
  
                    } else {
                        Alert.alert(
                            "Invalid Details!",
                            "Bad Request",
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
  
                    }
  
                })
                .catch((error) => {
                    Alert.alert('error', error.response)
                    console.log('error+++++', error);
  
                })
  
        })
    } catch (error) {
        console.log(">>>>>>>>>>>>", error);
  
    }
  
  }



    const deletefuntion = (data: any) => {
        DeleteExpences(data, (result: any) => {

            ToastAndroid.show("Expences Deleted ", ToastAndroid.SHORT);
            Load_All_Expences(ticketID);
        });

    }
    const EditEx = (data:any) => { 
        Alert.alert(
            "Update",
            "Are you sure Update expences",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => Updatefuntion(data) }
            ]);
       
    }
    const Updatefuntion = (data:any) => {
        navigation.navigate('AddExpencesNew', {
            type: "1",
            exid:data,
        });
    }
    const Load_All_Expences = (id:any) => {
        console.log("REFRESHHHHHHHHHHHHHHHHHHHHHHHH",);
        
        getAllExpences(id,(result: any) => {
            // setServiceCallList(result);
            console.log(result, ">>>>>>vnnnnnnnnnnnnnnnnnnn>>>>>>>>");
            setExList(result)

        });
    }
    const onPress = () => {

        // console.log("  expences active ticket >>>>>>>>>>>>>>>>>>  ", isActive);

        navigation.navigate('AddExpencesNew', {
            type: "0",
        });
        

        // if(isActive.isActive){

        //     Alert.alert(
        //         "Failed...!",
        //         "Please start ticket..",
        //         [
        //             {
        //                 text: "OK", onPress: () => {

        //                 }
        //             }
        //         ]
        //     );



        // }else{
        //     navigation.navigate('AddExpencesNew', {
        //         type: "0",
        //     });
        // }
       
    }


    return (
        <View style={styles.container}>

            <View style={{ flex: 0.75 }}>
                <FlatList
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={ExList}
                    style={{ marginTop: 10 }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flexDirection: 'row', backgroundColor: ComponentsStyles.COLORS.WHITE, margin: 5, elevation: 10, borderRadius: 8 }}>
                                <View style={{ flex: 4, margin: 3 }}>
                                <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: "bold" }}>Expense ID :</Text>
                                        <Text style={{ marginLeft: 10,fontWeight: "bold" }}>{item.ExpenseRequestID}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: "bold" }}>Create Date :</Text>
                                        <Text style={{ marginLeft: 10 }}>{item.CreateDate}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: "bold" }}>Expense Type :</Text>
                                        <Text style={{ marginLeft: 10 }}>{item.ExpencesType}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: "bold" }}>Amount : </Text>
                                        <Text style={{ marginLeft: 10,color:'blue' }}>{item.Amount}</Text>
                                    </View>

                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'column', margin: 5 }}>
                                        <AntDesign name="delete"
                                            size={20}
                                            onPress={() => DeleteEx(item.ExpenseRequestID)}
                                            color={ComponentsStyles.COLORS.RED_COLOR} />

                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <AntDesign name="edit"
                                            size={20}
                                            onPress={() => EditEx(item.ExId)}
                                            color={ComponentsStyles.COLORS.ICON_BLUE} />

                                    </View>
                                </View>

                            </View>

                        );
                    }}
                    keyExtractor={item => `${item.ExId}`}
                />
            </View>

            <View style={{ position: 'absolute', width: '100%', bottom: 70, }}>

                <ActionButton
                    title="Add Expences"
                    is_icon={true}
                    icon_name="diff-added"
                    onPress={onPress}
                    iconColor={ComStyles.COLORS.WHITE}
                />

            </View>

            {/* <View style={{ padding: 20 }} /> */}

        </View>
    );
}
export default Expences;


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});




  