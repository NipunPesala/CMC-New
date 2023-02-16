import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  ToastAndroid,
  Animated,
  Dimensions,
} from 'react-native';

import ActionButton from './ActionButton';
import comStyles from '../Constant/Components.styles';
import CheckBox from '@react-native-community/checkbox';
import InputText from './InputText';
import {useNavigation} from '@react-navigation/native';
import SignatureCapture from 'react-native-signature-capture';
import {CompleteTicket_Update,updateActualendDate} from '../SQLiteDatabaseAction/DBControllers/TicketController';
import ComStyles from "../Constant/Components.styles";
import Header from "../Components/Header";
import {
  getASYNC_CURRENT_TICKET_ID,
  getCurrentServiceCallID,
} from '../Constant/AsynStorageFuntion';
import { get_ASYNC_TOCKEN } from "../Constant/AsynStorageFuntion";
import email from 'react-native-email';
import { getDataForEmail } from "../SQLiteDatabaseAction/DBControllers/ServiceController";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageConstants from '../Constant/AsyncStorageConstants';
import axios from "axios";
import { BASE_URL_GET } from "../Constant/Commen_API_Url";
let height = Dimensions.get("screen").height;
import moment from 'moment';
import {uplodeCompTicketAync} from "../SQLiteDatabaseAction/DBControllers/TicketController";
import Mailer from 'react-native-mail';
var id: any;
var serviceID: any;
var TOCKEN_KEY: any;
const CompleteTicket = () => {
  const [pending, setPending] = useState(false);
  const [hold, setHold] = useState(false);
  const [complete, setComplete] = useState(false);
  const [EngeneerRemark, setEngeneerRemark] = useState('');
  const [nic, setnic] = useState('');
  const [CusRemark, setCusRemark] = useState('');
  const [signature, setsignature] = useState('');
  const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
  const [attend_status, setattend_status] = useState('');
  const [emailDetails, setEmailDetails] = useState([]);
  const currentendDate=moment().format('YYYY-MM-DD HH:mm:ss');
  console.log('this is a currnt end date====='+currentendDate);
  const navigation = useNavigation();
  const sign = createRef();

  const resetSign = () => {
    sign.current.resetImage();
  };
  const saveSign = () => {
    sign.current.saveImage();
    console.log(sign);
    navigation.navigate('PickupandDelevaryScreen');
  };


  // const handleEmail = () => {
  //   const to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
  //   email(to, {
  //       // Optional additional arguments
  //       cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
  //       bcc: 'mee@mee.com', // string or array of email addresses
  //       subject: 'Test mail',
  //       body: '<p>This is <b>html</b> body</p>',
  //       checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
  //   }).catch(console.error)
  // }

  const getCompleteTicketDetails = (serviceID: any) => {

    console.log(serviceID,' iddddddddddddddddddddddddddd............');

    getDataForEmail(serviceID, (result: any) => {

        console.log("result *************** email  ",result);

        setEmailDetails(result);
        console.log('save state details',emailDetails);
        console.log('save state priority',emailDetails[0].priority);
        
    });

}

 const handleEmail1 = () => {
    Mailer.mail({
      subject: 'Service Ticket Completed',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: 'Service ticket ID- '+serviceID+'<br/>Customer -'+emailDetails[0].customer+'<br/>Item code-'+emailDetails[0].itemID+'<br/>Handle by-'+emailDetails[0].handle_by+'<br/>Ticket status -Completed '+'<br/>Start Date-'+emailDetails[0].start_date+'<br/>End Date-'+emailDetails[0].start_date+'<br/>Subject-'+emailDetails[0].subject+'',
      customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
      isHTML: true,
    }, (error, event) => {
   console.log(error);
    });
  }


  const handleComplete = () => {
    console.log(pending, '---', hold, '---', complete);

    //NEW ticket=1
    // hold=2
    //complete=3
    //peniding =0
    // if (!(/^[^!-\/:-@\[-`{-~]+$/.test(nic))) {
    //    console.log('check input11')
    //    Alert.alert('Failed...!', ' xxxxx.', [
    //     {
    //       text: 'OK',
    //       onPress: () => {},
    //     },
    //   ]);
    //   }

    if (complete == true || pending == true || hold == true) {
      console.log('!!!!!!!!!!!!!!!', EngeneerRemark);

      if (EngeneerRemark != null && EngeneerRemark != '') {
        if (nic != null && nic != '') {
          if (!/^[^!-\/:-@\[-`{-~]+$/.test(nic)) {
            Alert.alert('Failed...!', 'do not enter special characters', [
              {
                text: 'OK',
                onPress: () => {},
              },
            ]);
          } else {
            if (CusRemark != null && CusRemark != '') {
              if (signature != null) {
                try {

                  CompleteTicket_Update(
                    EngeneerRemark,
                    nic,
                    CusRemark,
                    '1',
                    attend_status,
                    id,
                    (result: any) => {
                      if (result === 'success') {

                        updateActualendDate(id, currentendDate, (result: any) => {
                          console.log('Hii this is update actual end date'+result);
                         
                      });

                        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID, '');
                        ToastAndroid.show(
                          'Complete success ',
                          ToastAndroid.SHORT,
                        );

                        handleEmail1();

                      AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID, serviceID);
                      navigation.navigate('RequestDetails', {
                          callID: serviceID,
                      });

                     // handleEmail1();
                        // navigation.navigate('ServiceCall');
                      } else {
                        Alert.alert('Failed...!', ' Save Failed.', [
                          {
                            text: 'OK',
                            onPress: () => {},
                          },
                        ]);
                      }
                    },
                  );
                  
                } catch (error) {
                  console.log(error);
                }
              } else {
                Alert.alert('Failed...!', ' Enter Customer Signature', [
                  {
                    text: 'OK',
                    onPress: () => {},
                  },
                ]);
              }
            } else {
              Alert.alert('Failed...!', ' Enter Customer Remark', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
            }
          }
        } else {
          Alert.alert('Failed...!', ' Enter National ID', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
        }
      } else {
        Alert.alert('Failed...!', ' Enter Engineer Remark', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }
      console.log(EngeneerRemark, '--', nic, '--', CusRemark, '--', signature);
    } else {
      Alert.alert('Failed...!', ' Select Service Ticket Status.!', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
  };

  useEffect(() => {
    getASYNC_CURRENT_TICKET_ID().then(res => {
      console.log(res);
      id = res;
      //console.log(id, "=====================================");

      // setTicketID(id);
    });

    getCurrentServiceCallID().then(res => {
      console.log(res);
      serviceID = res;
       console.log(serviceID, "============serviceID=========================");

      // setTicketID(id);
      getCompleteTicketDetails(serviceID);
    });

    

  
  }, []);

  const handlePendingChange = () => {
    setHold(false);
    setComplete(false);
    setattend_status('1');
    //  console.log("COMPLETE_TICKET","Pendig click");
  };

  const handleHoldChange = () => {
    setPending(false);
    setComplete(false);
    setattend_status('2');
  };

  const handleCompleteChange = () => {
    setHold(false);
    setPending(false);
    setattend_status('3');
  };

  
  const UploadServiceCall = () => {
    try {

      get_ASYNC_TOCKEN().then(res => {
        TOCKEN_KEY = res;
        const AuthStr = 'Bearer '.concat(TOCKEN_KEY);
       
     // console.log( 'AuthStr####3%%%%%%%%%%%%%',AuthStr);

    const prams= {
          "UserName": "",
          "UserID": 1,  //need to code
          "serviceId": id,
          "Attend_status": attend_status,
          "created_At": "",
  
    }
     
     console.log('--NEW  Complite ticket JSON--', prams);

      const headers = {
        'Authorization': AuthStr
      }
      const URL = BASE_URL_GET+"service-ticket/status";
      axios.post(URL, prams, {
        headers: headers
      })
        .then((response) => {
            console.log("[s][t][a][t][u][s][]",response.status);
            if (response.status == 200) {

           console.log('<------ NEW complite ticket UPLOAD Method --->', response.data)
           console.log(response.data.UniqueNo);
           
           if(response.data.ErrorId=0){
            // this use fro update sync flag as 1 
            uplodeCompTicketAync(response.data.UniqueNo, (result: any) => {

            });
            ToastAndroid.show(response.data.ErrorDescription, ToastAndroid.LONG);
           }
           
        }else{
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

        })

   })
    } catch (error) {
      console.log(">>>>>>>>>>>>", error);

    }
  }

  return (
    <SafeAreaView style={ComStyles.CONTAINER}>
  
      <Header title="Complete Ticket" isBtn={true} btnOnPress={() => navigation.goBack()} />
      <View style={{ padding: 5 }} />

      <View style={{flexDirection: 'row', marginTop: 10 ,paddingLeft:10,paddingRight:10}}>
        <ActionButton
          title="Cancel"
          style={style.loginBtn}
          textStyle={style.txtStyle}
          onPress={() => navigation.navigate('TicketDetails')}
        // onPress={handleEmail1}
        />

        <ActionButton
          title="Complete"
          style={{flex: 0.5}}
          onPress={handleComplete}
        />
      </View>

      <View style={{ marginTop: 5 ,paddingLeft:10,paddingRight:10,alignItems:'center'}}>
      <Text style={style.maintxt}>Complete Ticket</Text>
      <Text style={style.modalTitle}>Select Service Ticket Status</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <CheckBox
          value={pending}
          onValueChange={() => setPending(!pending)}
          onChange={() => {
            handlePendingChange();
          }}
          onCheckColor={comStyles.COLORS.ORANGE}
          onFillColor={comStyles.COLORS.ORANGE}
        />
        <Text style={style.label1}>Pending</Text>

        <CheckBox
          value={hold}
          onValueChange={() => setHold(!hold)}
          onChange={() => {
            handleHoldChange();
          }}
          onCheckColor={comStyles.COLORS.HIGH_BUTTON_RED}
          onFillColor={comStyles.COLORS.HIGH_BUTTON_RED}
        />
        <Text style={style.label2}>Hold</Text>

        <CheckBox
          value={complete}
          onValueChange={() => setComplete(!complete)}
          onChange={() => {
            handleCompleteChange();
          }}
          onCheckColor={comStyles.COLORS.LOW_BUTTON_GREEN}
          onFillColor={comStyles.COLORS.LOW_BUTTON_GREEN}
        />
        <Text style={style.label3}>Complete</Text>
      </View>

      <ScrollView
        style={comStyles.CONTENT}
        showsVerticalScrollIndicator={false}>
        <View>
          <InputText
            placeholder="Service Engineer Remarks*"
            placeholderColor={comStyles.COLORS.HEADER_BLACK}
            style={{
              borderColor: '#cfcccc',
              paddingLeft: 5,
              fontSize: 12,
            }}
            bdrStyle={{
              paddingTop: 5,
              paddingBottom: 0,
            }}
            stateValue={EngeneerRemark}
            setState={(val: any) => setEngeneerRemark(val)}
            max={25}
          />
          <InputText
            placeholder="Customer NIC*"
            placeholderColor={comStyles.COLORS.HEADER_BLACK}
            style={{
              borderColor: '#cfcccc',
              paddingLeft: 5,
              fontSize: 12,
            }}
            bdrStyle={{
              paddingTop: 5,
              paddingBottom: 0,
            }}
            stateValue={nic}
            setState={(val: any) => setnic(val)}
            max={12}
          />
          <InputText
            placeholder="Customer Remarks*"
            placeholderColor={comStyles.COLORS.HEADER_BLACK}
            multiline={true}
            style={{
              height: 80,
              borderColor: '#cfcccc',
              paddingLeft: 5,
              fontSize: 12,
            }}
            bdrStyle={{
              paddingTop: 5,
              paddingBottom: 0,
            }}
            stateValue={CusRemark}
            setState={(val: any) => setCusRemark(val)}
            max={25}
          />
          <View style={{ marginTop: 20}}></View>
          <View
            style={{
              height: '50%',
              width: 400,
              margin: 5,
              marginTop: 20,
              borderColor: 'black',
              borderWidth: 2,
            }}>
            
            <SignatureCapture
              style={style.signature}
              ref={sign}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={'portrait'}
            />
          </View>
        </View>
      </ScrollView>

      {/* <View>
                

            </View>
            <View>

                
            </View> */}
 
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  modalMainContainer: {
    // justifyContent: "center",
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    width: '100%',
    height: 400,
  },
  modalSubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
  },

  modalRegularTitle: {
    fontFamily: comStyles.FONT_FAMILY.REGULAR,
    color: comStyles.COLORS.HEADER_BLACK,
    fontSize: 15,
    marginRight: 5,
  },

  modalTitle: {
    fontFamily: comStyles.FONT_FAMILY.REGULAR,
    color: comStyles.COLORS.HEADER_BLACK,
    fontSize: 14,
  },
  txtUpload: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderStyle: 'dashed',
    width: '100%',
    marginTop: 25,
  },
  subtxt: {
    color: comStyles.COLORS.WHITE,
    fontSize: 15,
    fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
    marginBottom: 10,
  },
  ActionButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  maintxt: {
    color: comStyles.COLORS.BLACK,
    fontSize: 18,
    fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
    marginBottom: 10,
    marginTop: 10,
  },
  subTitle: {
    backgroundColor: comStyles.COLORS.WHITE,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    textAlignVertical: 'center',
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: comStyles.COLORS.ICON_BLUE,
    color: comStyles.COLORS.WHITE,
  },
  iconBtn: {
    marginTop: 10,
    backgroundColor: comStyles.COLORS.ICON_BLUE,
    color: comStyles.COLORS.WHITE,
  },
  textStyle: {
    color: comStyles.COLORS.HEADER_BLACK,
    fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
  },
  dashStyle: {
    width: 50,
    height: 5,
    backgroundColor: comStyles.COLORS.DASH_COLOR,
    borderRadius: 20,
    marginTop: 10,
  },
  txtStyle: {
    color: comStyles.COLORS.ICON_BLUE,
  },
  loginBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: comStyles.COLORS.ICON_BLUE,
    flex: 0.5,
    marginRight: 10,
  },

  selectedbutton: {
    backgroundColor: comStyles.COLORS.ICON_BLUE,
    flex: 0.5,
    borderRadius: 5,
  },
  selectedBUTTON_TEXT: {
    color: comStyles.COLORS.WHITE,
  },
  defaultbutton: {
    backgroundColor: comStyles.COLORS.WHITE,
    borderWidth: 1,
    borderColor: comStyles.COLORS.ICON_BLUE,
    justifyContent: 'center',
    borderRadius: 5,
    flex: 0.5,
  },
  defaultBUTTON_TEXT: {
    color: comStyles.COLORS.REQUEST_DETAILS_ASH,
  },
  label1: {
    color: comStyles.COLORS.ORANGE,
    marginRight: 10,
  },
  label2: {
    color: comStyles.COLORS.HIGH_BUTTON_RED,
    marginRight: 10,
  },
  label3: {
    color: comStyles.COLORS.LOW_BUTTON_GREEN,
  },
});
export default CompleteTicket;