import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform, ToastAndroid, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import ComponentsStyles from '../Constant/Components.styles';
import ActionButton from './ActionButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import InputText from './InputText';
import moment from 'moment';
import {
  getLoginUserName,
  getASYNC_CURRENT_TICKET_ID,
} from '../Constant/AsynStorageFuntion';
import {
  saveExpences,
  getExpenceById,
  updateExpences,
  updateNewSyncExpences,
  getLastExpRequestId,
  getSyncExpences,
  Update_Expences_webRefId,
  getExpenWebIdForUpdate
} from '../SQLiteDatabaseAction/DBControllers/ExpencesController';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAllExpencesType } from '../SQLiteDatabaseAction/DBControllers/ExpencesTypeController';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from './Header';
import { get_ASYNC_TOCKEN, get_ASYNC_USERID } from "../Constant/AsynStorageFuntion";
import { BASE_URL_GET } from "../Constant/Commen_API_Url";
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageConstants from '../Constant/AsyncStorageConstants';
import { getTicketDates,getWebRefIdByServiceId } from '../SQLiteDatabaseAction/DBControllers/TicketController';
import DropdownAlert from 'react-native-dropdownalert';
var id: any;
var loginUser: any;
var type: any;
var exid: any;
var UserNameUpload: any;
var UserIdUpload: any;
var M_TicketID:any
var TicketWebRefId:any;
var updateWebRefId:any;

const AddExpencesNew = (props: any) => {
  const { navigation, route } = props;
  let dropDownAlertRef = useRef();
  const [isFocus, setIsFocus] = useState(false);

  const [craeteDate, setCreateDate] = useState('');
  const [TicketID, setTicketID] = useState('');
  const [loginUser1, setloginUser1] = useState('');
  const [ExTypeList, setExTypeList] = useState([]);
  const [amount, setamount] = useState('');
  const [remark, setremark] = useState('');
  const [expencesTypeId, setexpencesTypeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [show, setShow] = useState(false);
  const [dateType, setDateType] = useState('');
  const [title, settitle] = useState('');
  const [btntitle, setbtntitle] = useState('');
  const [ExpID, setExpenseID] = useState('');
  const [ticketStartDate, setTicketStartDate] = useState('');
  const [ticketEndDate, setTicketEndDate] = useState('');
  var TOCKEN_KEY: any;

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    if (dateType == 'fromDate') {
      setStartDate(moment(new Date(currentDate)).format('YYYY-MM-DD'));
    } else {
    }
  };

  const showDatePicker = (currentMode: any) => {
    // console.log('awaaaaaaaaaaaaaaaa..................');

    setShow(true);
    setDateType(currentMode);
  };


  const saveExpencesData = () => {
    const sendData = [
      {
        ExpenseRequestID: ExpID,
        ServiceCall_ID: TicketID,
        ExpenseTypeID: expencesTypeId,
        Amount: amount,
        Remark: remark,
        CreatedBy: loginUser,
        CreateDate: craeteDate,
        RelaventDate: startDate,
        status: 0,
        isSync: "0",
        ExpencesWebRefId:0
      },
    ];
    // if(!/^[0-9]+$/.test(amount)){
    //     ToastAndroid.show("Please Enter only  numeric characters..  ", ToastAndroid.SHORT);
    // }else{

    // }

    if (TicketID != null) {
      if (expencesTypeId != '') {
        if (amount != '') {
          if (!/^[0-9]+$/.test(amount)) {
            dropDownAlertRef.alertWithType('error', 'Error', 'Please Enter only numeric characters..!');
          } else {
            if (startDate != '') {
              if (type == '1') {
                UpdateData();
              } else if (type === '0') {
                SaveData(sendData);
              }
            } else {
              dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Relevent Date..!');
            }
          }
        } else {
          dropDownAlertRef.alertWithType('error', 'Error', 'Please Enter Amount..!');
        }
      } else {
        dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Expences Type..!');
      }
    } else {
      dropDownAlertRef.alertWithType('error', 'Error', 'Please Check Service ID..! ..!');
    }
  };

  const UpdateData = () => {
    updateExpences(
      TicketID,
      expencesTypeId,
      amount,
      remark,
      loginUser,
      craeteDate,
      startDate,
      '0',
      exid,
      "0",
      (result: any) => {
        // console.log(result, '!!!!!!!!!!!!!!!!!!!!');
        // ToastAndroid.show('Expences Save Success ', ToastAndroid.SHORT);
        if (result === 'success') {
          UploadUpdatesExpences();
          navigation.goBack();
        } else {
          Alert.alert('Failed...!', 'Expences Save Failed.', [
            {
              text: 'OK',
              onPress: () => { },
            },
          ]);
        }

        
      },
    );
  };

  const SaveData = (data: any) => {

    console.log(data);
    
    try {
      saveExpences(data, (result: any) => {
        // console.log(result, 'saveExpences');

        if (result === 'success') {
          UploadServiceCall();
          // navigation.goBack();
          uploadExpences(TicketID);

          navigation.navigate('TicketDetails', {
            tab: 'Expences',
          });
          // ToastAndroid.show('Expences Save Success ', ToastAndroid.SHORT);
        } else {
          Alert.alert('Failed...!', 'Expences Save Failed.', [
            {
              text: 'OK',
              onPress: () => { },
            },
          ]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAndGoBack = () => {
    Alert.alert('Cancle', 'Are you sure ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
   // UploadUpdatesExpences();
  };

  const getStartEndDate = (ticketID: any) => {

    getTicketDates(ticketID, (result: any) => {

      // console.log(" ticket dates ......  " , result);

      setTicketStartDate(result[0].startDate);
      setTicketEndDate(result[0].endDate);
    });

  }

  // useEffect(() => {
  //   type = route.params.type;

  //   if (type == '1') {
  //     settitle('Update Expences');
  //     setbtntitle('Update');
  //     exid = route.params.exid;

  //     load_UpdateOldData(exid);
  //   } else if (type === '0') {
  //     settitle('Add New Expences');
  //     setbtntitle('Add');
  //   }

  //   console.log('------------------------', type);

  //   getAllExpencesType((result: any) => {
  //     // setServiceCallList(result);
  //     console.log(result);
  //     setExTypeList(result);
  //   });

  //   getASYNC_CURRENT_TICKET_ID().then(res => {
  //     console.log(res);
  //     id = res;
  //     setTicketID(id);
  //     console.log(
  //       res,
  //       '+++++++++++++++++++++33333333333333+++++++++++++++++++++++++++',
  //     );
  //   });
  //   getLoginUserName().then(res => {
  //     console.log(res, '++++++++++++++++++++++++++++++++++++++++++++++++');
  //     loginUser = res;
  //     setloginUser1(loginUser);
  //     // setTicketID(id);

  //     console.log(
  //       loginUser,
  //       '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
  //       loginUser1,
  //     );
  //   });
  //   setCreateDate(moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'));
  // }, []);

  useFocusEffect(
   
    React.useCallback(() => {

      type = route.params.type;
      getLoginUserNameForUplode();

      if (type == '1') {

        settitle('Update Expences');
        setbtntitle('Update');

        exid = route.params.exid;

        load_UpdateOldData(exid);
        

      } else if (type === '0') {

        settitle('Add New Expences');
        setbtntitle('Add');
      }

      // console.log('------------------------', type);

      getAllExpencesType((result: any) => {
        // setServiceCallList(result);
        // console.log(result);
        setExTypeList(result);
      });

      getASYNC_CURRENT_TICKET_ID().then(res => {
        // console.log(res);
        id = res;
        setTicketID(id);
        M_TicketID=id;
        getStartEndDate(res);
    
      });
      getLoginUserName().then(res => {
        
        loginUser = res;
        setloginUser1(loginUser);
        // setTicketID(id);

      });

      setCreateDate(moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'));
      generateRequestID();
      getTicketWebrefId();
    }, []),
  );

  const load_UpdateOldData = (id: any) => {
    getExpenceById(id, (result: any) => {
      var amount = result[0].Amount;

      console.log(result, '^^^^^^^^^^^666666666^^^^^^^^^^^^^^');
      setamount(result[0].Amount + '');
      setremark(result[0].Remark);
      setStartDate(result[0].RelaventDate);
      get_expencesWebRef(result[0].ExpenseRequestID);
      getAllExpencesType((result1: any) => {
        console.log('************', result1);

        // setServiceCallList(result);
        const data = result1?.filter(
          (a: any) => a.name == result[0].ExpenseTypeID,
        )[0];
        // setSelectAssistance(data.name)
        console.log(data.name, '------------------------------');
        setexpencesTypeId(data.name);
      });
    });
  };

  const getTicketWebrefId = ()=>{
    console.log('ticket id-=-------------',M_TicketID)
    getWebRefIdByServiceId(M_TicketID, (result: any) => {
      console.log('get web ref idd=======================', result);
      TicketWebRefId = result[0].Ticket_web_RefID;
      console.log('get web ref idd variable =======================', TicketWebRefId);
      // setlistdata(result);
  });
  }

  const UploadServiceCall = () => {

    try {

        const prams ={
          "objExpenceList": [
              {
                  // "dateExpire": startDate,
                  // "expenseType": expencesTypeId,
                  // "createdBy": UserIdUpload,
                  // "amount" : amount,
                  // "remark" : remark,
                  // "ticketId": 974135,
                  // "expenceCode":"exp_0001",
                  // "createdAt": "2022-12-29 10:38:59"

                  "dateExpire": startDate,
                  "expenseType":expencesTypeId,
                  "createdBy": UserIdUpload,
                  "amount" : amount,
                  "remark" : remark,
                  "ticketId": TicketWebRefId,
                  "expenceCode":ExpID,
                  "createdAt":  moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss')
              }
          ]
      }


        console.log("--EXPENCES UPLODE JSON--", prams);

        get_ASYNC_TOCKEN().then(res => {
            TOCKEN_KEY = res;
            const AuthStr = ` Bearer ${TOCKEN_KEY}`;

            const headers = {
                'Authorization': AuthStr
            }
            const URL = BASE_URL_GET + "expence";

            console.log("--EXPENCES UPLODE JSON--", prams);
            axios.post(URL, prams, {
                headers: headers
            })
                .then((response) => {
                    console.log("[s][t][a][t][u][s][]", response.status);
                    if (response.status == 200) {

                        console.log('<------ NEW SERVICE CALL UPLOAD Method --->', response.data)
                        console.log('uplode api response', response.data[0].ErrorId);
                        if (response.data[0].ErrorId == 0) {
                            console.log('this is if inside----',M_TicketID);
                            // this use fro update sync flag as 1 
                            //console.log('this is a web service call id ----', response.data[0].ServiceCallId);
                            updateNewSyncExpences(M_TicketID, (result: any) => {

                           });
                           console.log('web ref expences uplode id+++++++++++++' + response.data[0].ExpenceId);
                           console.log('web ref expences expencesTypeId+++++++++++++' + ExpID);
                           Update_Expences_webRefId(response.data[0].ExpenceId, ExpID, (result: any) => {
                                console.log('web ref expences update_____' + result)
                            });
                        } else {

                            //Alert.alert(response.ErrorDescription);

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

// get expences web ref id for update uplode 
const get_expencesWebRef=(expReqId:any)=>{
  getExpenWebIdForUpdate(expReqId, (result: any) => {
      console.log('get web ref 444+++++++++++++'+result[0].ExpencesWebRefId);
      updateWebRefId=result[0].ExpencesWebRefId;
      console.log('check expencess web ref id++++++++++++++'+updateWebRefId);
  });


}


const UploadUpdatesExpences= () => {


  console.log('check expencess web ref id 22 ++++++++++++++'+updateWebRefId);


  try {

      const prams = [
        {
            "expenceId":updateWebRefId,
            "dateExpire":startDate ,
            "expenseType": expencesTypeId,
            "createdBy":UserIdUpload,
            "amount": amount,
            "remark":remark,
            "status":0,
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

  const generateRequestID = () => {

    // console.log(route.params.status);

    getLastExpRequestId((result: any) => {


      if (result.length == 0) {
        GetLastID(0);
      } else {

        for (let i = 0; i < result.length; ++i) {

          GetLastID(result[i]._Id);

        }

      }


    })

  };

  const GetLastID = async (id: any) => {

    var requestID = parseInt(id) + 1;
    console.log(requestID, "  ///////////////////////////////////////   ");
    var randomNum = Math.floor(Math.random() * 1000) + 1;
    const rid = "EXP_" +UserIdUpload+ "_"+ randomNum + "_" + requestID;

    setExpenseID(rid);
    await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_EXP_REQUEST_ID, rid);
  };



  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>
      {/* <TouchableOpacity style={style.dashStyle} onPress={() => navigation.goBack()} /> */}
      <Header title={title} isBtn={true} btnOnPress={() => navigation.goBack()} />
      <View style={{ padding: 5 }} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          padding: 10,
        }}>
        {/* <ActionButton title="Cancel" style={style.loginBtn} textStyle={style.txtStyle} onPress={() => { closeModal(false) }} /> */}
        <ActionButton
          title="Cancel"
          style={style.loginBtn}
          textStyle={style.txtStyle}
          onPress={cancelAndGoBack}
        />
        <ActionButton
          title={btntitle}
          style={{ flex: 0.5 }}
          onPress={() => saveExpencesData()}
        />
      </View>

      <ScrollView style={style.scrollStyle} nestedScrollEnabled={true}>
        <View>
          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Expense Request ID"
            stateValue={ExpID}
            editable={false}
            style={ComponentsStyles.serviceTicketInput}
          />
          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Service ID"
            stateValue={TicketID}
            editable={false}
            style={ComponentsStyles.serviceTicketInput}
          />
          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Create Date"
            stateValue={loginUser1}
            editable={false}
            style={ComponentsStyles.serviceTicketInput}
          />
          <View style={{ zIndex: 50 }}>
            <Dropdown
              style={[
                style.dropdown,
                isFocus && { borderColor: ComponentsStyles.COLORS.BORDER_COLOR },
              ]}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              iconStyle={style.iconStyle}
              data={ExTypeList}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={!isFocus ? 'Select Expences type ' : '...'}
              searchPlaceholder="Search Expences type"
              value={expencesTypeId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                // setValue(item.description);
                // setSelectItemCode(item.itemCode);

                // changeItemName(item.description);
                // ItemDesc = item.description;
                console.log(item.expTypeId + '  .................... ');
                setexpencesTypeId(item.name);

                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={style.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={15}
                />
              )}
            />
          </View>

          <View style={{ padding: 5 }} />
          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Enter Amount"
            stateValue={amount}
            setState={setamount}
            editable={true}
            style={ComponentsStyles.serviceTicketInput}
            max={8}
            keyType={"number-pad"}
          />

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              <InputText
                placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
                placeholder="Date relevent to Expences"
                stateValue={startDate}
                setState={setStartDate}
                editable={false}
                style={ComponentsStyles.serviceTicketInput}
              />
            </View>
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign
                name="calendar"
                size={30}
                onPress={() => showDatePicker('fromDate')}
                color={ComponentsStyles.COLORS.BLACK}
              />
            </View>
          </View>

          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Enter Remark"
            stateValue={remark}
            editable={true}
            setState={setremark}
            max={35}
            style={ComponentsStyles.serviceTicketInput}
          />
        </View>
      </ScrollView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display={
            Platform.OS === "ios" ? "spinner" : "default"
          }
          minimumDate={new Date(ticketStartDate)}
          maximumDate={new Date(ticketEndDate)}
          onChange={onChange}
        />
      )}
      <View style={{ padding: 30 }} />
    </SafeAreaView>
  );
};
export default AddExpencesNew;

const style = StyleSheet.create({
  txtStyle: {
    color: ComponentsStyles.COLORS.ICON_BLUE,
  },
  loginBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: ComponentsStyles.COLORS.ICON_BLUE,
    flex: 0.5,
    marginRight: 10,
  },
  scrollStyle: {
    marginBottom: 0,
    marginLeft: 13,
    marginRight: 13,
  },
  dashStyle: {
    width: 50,
    height: 5,
    backgroundColor: ComponentsStyles.COLORS.DASH_COLOR,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  maintxt: {
    color: ComponentsStyles.COLORS.BLACK,
    fontSize: 18,
    fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: ComponentsStyles.COLORS.HEADER_BLACK,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    color: ComponentsStyles.COLORS.BLACK,
    fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
  },
  placeholderStyle: {
    fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
    fontSize: 12,
    color: ComponentsStyles.COLORS.BLACK,
  },
  selectedTextStyle: {
    fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
    fontSize: 12,
    color: ComponentsStyles.COLORS.ICON_BLUE,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});

export  const getLoginUserNameForUplode = () => {
  getLoginUserName().then(res => {
    UserNameUpload = res;
    console.log('user Name --' + UserNameUpload);
  })
  get_ASYNC_USERID().then(res => {
    UserIdUpload = res;
    console.log('user id upload  --' + UserIdUpload);
  })

}

export const uploadExpences = (TicketID:any) => {

  try {

    getSyncExpences(TicketID, (response: any) => {

      console.log(" sync expenses -----------   ", response);

      const objExpenceList: any[] = [];

      for (let i = 0; i < response.length; ++i) {

        const params = {
          "expenceId": response[i].ExpenseRequestID,
          "dateExpire": response[i].RelaventDate,
          "expenseType": response[i].ExpenseTypeID,
          "createdBy": UserIdUpload,
          "amount": parseFloat(response[i].Amount),
          "remark": response[i].Remark,
          "ticketId": response[i].Ticket_web_RefID,
          "expenceCode": response[i].ExpenseRequestID,
          "createdAt" : response[i].CreateDate
        }

        objExpenceList.push(params);


      }
      const paramarray = {
        objExpenceList
      }

      console.log(" upload EXPENSEC JSON === ", paramarray);


    });

  } catch (error: any) {
    Alert.alert(" Error", error);
  }



}