/**
 * @author Gagana Lakruwan
 */
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Animated,
  Keyboard,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import Header from '../../../Components/Header';
import comStyles from '../../../Constant/Components.styles';
import IconA from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import Spinner from 'react-native-loading-spinner-overlay';
import style from './style';
import ListBox from '../../../Components/ListBox';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ActionButton from '../../../Components/ActionButton';
import {
  getServiceById,
  getServiceCalls,
} from '../../../SQLiteDatabaseAction/DBControllers/ServiceController';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageConstants from '../../../Constant/AsyncStorageConstants';
import {
  getTicketsForInprogress,
  getTicketsForReport,
} from '../../../SQLiteDatabaseAction/DBControllers/TicketController';
import axios from 'axios';
import * as DB_Customer from '../../../SQLiteDatabaseAction/DBControllers/CustomerController';
import ComponentsStyles from '../../../Constant/Components.styles';
import { getLoginUserName } from '../../../Constant/AsynStorageFuntion';
import PushNotification from "react-native-push-notification";
import { saveServiceData } from "../../../SQLiteDatabaseAction/DBControllers/ServiceController";

const SyncArray1: any[] = [];
let arrayindex = 0;
var loginUser: any;

const Home = () => {
  const [loandingspinner, setloandingspinner] = useState(false);
  const refRBSheet = useRef();
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [isShowSweep, setIsShowSweep] = useState(true);
  const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
  const [meterValue, setMeterValue] = useState('');
  const [ImgStatus, setImgStatus] = useState(false);
  const [image, setImage] = useState();
  const [syncStatusValue, setsyncStatusValue] = useState('');
  const [RecievedserviceCallList, setRecievedServiceCallList] = useState([]);
  const [confirmedserviceCallList, setConfirmededServiceCallList] = useState([],);
  const [serviceTicketList, setServiceTicketList]: any[] = useState([]);

  const [inprogresticketList, setInprogresticketList]: any[] = useState([]);

  const [SyncArray, setSyncArray]: any[] = useState([]);
  const [loginUser1, setloginUser1] = useState('');

  const [hourTime, setCurrentTime] = useState(0);
  const [minute, setCurrentmin] = useState(0);
  const [wellComeTitle, setwellComeTitle] = useState('');

  const navigation = useNavigation();
  const isVisible = useIsFocused();
  const save_serviceCall = (data: any) => {
    console.log("**************", data);
    console.log("**************", JSON.stringify(data));
    try {
      saveServiceData(data, (result: any) => {
        console.log(result, "NEWSERVICE_CALL_SAVE");

      });
    } catch (error) {
      console.log(error);
    }
  }
  //////////////////////////////////////////////

  const handleslideInModal = () => {
    console.log(SyncArray, '>>>>>>>>>>>>>1');

    setSyncArray([]);
    slideInModal();
    SyncArray.splice();
    console.log(SyncArray, '>>>>>>>>>>>>>2');
  };
  const LogoutFuntion = () => {
    Alert.alert('LogOut', 'Are you sure LogOut', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => logout() },
    ]);
  };
  const logout = () => {
    navigation.navigate('Login');
  };
  const logoutsheet = () => {
    refRBSheet.current.open();
  };

  const slideInModal = () => {
    setIsShowSweep(false);
    console.log('sampleIn');

    Animated.timing(modalStyle, {
      toValue: height / 3.2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  //#endregion

  //#region SlideOutModal

  const slideOutModal = () => {
    setIsShowSweep(true);
    Keyboard.dismiss();
    Animated.timing(modalStyle, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  //handle notifications
  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: "test_channel", // (required)
      title: "Notification title",
      message: "Hiii this is a test notification",
    });
  }

  const getWellcomeNote = () => {
    var hourTime = new Date().getHours();
    var minutes = new Date().getMinutes();
    // var hourTime = 12;
    // var minutes =1;
    if (wellComeTitle === '') {
      console.log('hour' + hourTime);
      console.log('min' + minute);
      if (hourTime == 0) {
        if (minutes > 0) {
          setwellComeTitle('Good Morning');
        } else if (minutes == 0) {
          setwellComeTitle('Good Night');
        }
      } else if (hourTime > 0 && hourTime < 12) {
        setwellComeTitle('Good Morning');
      } else if (hourTime == 12) {
        if (minutes > 0) {
          setwellComeTitle('Good Afternoon');
        } else {
          setwellComeTitle('Good Morning!');
        }
      } else if (hourTime > 12 && hourTime < 16) {
        setwellComeTitle('Good Afternoon');
      } else if (hourTime == 16) {
        if (minutes > 0) {
          setwellComeTitle('Good Evening');
        } else {
          setwellComeTitle('Good Afternoon');
        }
      } else if (hourTime > 16 && hourTime < 18) {
        setwellComeTitle('Good Evening');
      } else if (hourTime == 18) {
        if (minutes > 0) {
          setwellComeTitle('Good Night');
        } else {
          setwellComeTitle('Good Evening');
        }
      } else if (hourTime > 18 && hourTime <= 23) {
        setwellComeTitle('Good Night');
      }
    } else {
      console.log('Hello');
    }
  };

  const getTickets = () => {
    getTicketsForReport((result: any) => {
      setServiceTicketList(result);
      console.log('ticket for Repaort--' + result);
    });
  };

  const getInprogressTicket = () => {
    getTicketsForInprogress((result: any) => {
      setInprogresticketList(result);
    });
  };

  const getRecievedServiceCall = (status: any) => {
    getServiceCalls(status, (result: any) => {
      setRecievedServiceCallList(result);
      // const serviceArray: any[] = [];
      // console.log(" list size ............  ", result.length);

      // for (let i = 0; i < result.length; ++i) {

      //     serviceArray.push(
      //         {
      //             id: result[i]._Id,
      //             customer: result[i].customer,
      //             address: result[i].customer_address,
      //             status: result[i].priority,
      //             serviceId: result[i].serviceId,
      //         }
      //     );

      // }

      // setRecievedServiceCallList(serviceArray);
      // console.log(RecievedserviceCallList);

      // navigation.navigate('RequestDetails')
    });

    // try {

    //     // getConfirmedServiceCall(1);

    // } catch (error) {
    //     console.log(error);

    // }
  };

  const getAllServiceCall = () => { };

  const getConfirmedServiceCall = (status: any) => {
    getServiceCalls(status, (result: any) => {
      setConfirmededServiceCallList(result);

      // const serviceArray: any[] = [];
      // console.log(" list size ............  ", result.length);

      // for (let i = 0; i < result.length; ++i) {

      //     serviceArray.push(
      //         {
      //             id: result[i]._Id,
      //             customer: result[i].customer,
      //             address: result[i].customer_address,
      //             status: result[i].priority,
      //             serviceId: result[i].serviceId,
      //         }
      //     );

      // }

      // setConfirmededServiceCallList(serviceArray);
      // console.log(confirmedserviceCallList);

      // navigation.navigate('RequestDetails')
    });
  };

  // const getServiceTickets = () => {

  //     getServiceTicket(result: any) => {

  //         const serviceArray: any[] = [];
  //         console.log(" list size ............  ", result.length);

  //         for (let i = 0; i < result.length; ++i) {

  //             serviceArray.push(
  //                 {
  //                     id: result[i]._Id,
  //                     customer: result[i].customer,
  //                     address: result[i].customer_address,
  //                     status: result[i].priority,
  //                     serviceId: result[i].serviceId,
  //                 }
  //             );

  //         }

  //         setRecievedServiceCallList(serviceArray);
  //         console.log(RecievedserviceCallList);

  //         // navigation.navigate('RequestDetails')
  //     });

  // }

  const handleAttendance = () => {
    //handleNotification();
    navigation.navigate('AttendanceScreen');
  };

  const handleclicked = (callID: any) => {
    getServiceById(callID, (result: any) => {
      const sts = result[0].Approve_status;

      if (sts != '1') {
        Alert.alert('Not Approved', ' Please Approve the Service Call!', [
          {
            text: 'OK',
            onPress: () => { },
          },
        ]);
      } else {
        AsyncStorage.setItem(
          AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID,
          callID,
        );
        navigation.navigate('RequestDetails', {
          callID: callID,
        });
      }
    });
  };

  const Handlesyncprogress = () => {
    setSyncArray([]);

    try {
      // const AuthStr = 'Bearer '.concat(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_ACCESS_TOKEN);
      const URL = 'http://124.43.13.162:3000/mobile/customers';
      // console.log("+++++ APPROVE SCREEN", URL);
      axios
        .get(URL)
        .then(response => {
          if (response.status === 200) {
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<');

            DB_Customer.saveCustomer(response.data, (res: any) => {
              console.log(res, '?????????????');

              if ((res = true)) {
                arrayindex++;
                console.log('okkkkkkk', SyncArray);

                SyncArray1.push({
                  name: 'Customer Download Sucsessfully...',
                  id: arrayindex,
                });
                setSyncArray(SyncArray1);
              } else {
                console.log('errrrrrroooooooooooooo');
                SyncArray1.push({
                  name: 'Customer Save Failed...',
                  id: arrayindex,
                });
                setSyncArray(SyncArray1);
              }
            });
          } else {
            console.log('fails');

            SyncArray1.push({
              name: 'Customer Download Failed...',
              id: arrayindex,
            });
            setSyncArray(SyncArray1);
          }
        })
        .catch(error => {
          // alert(error);
          console.log(error);
          SyncArray1.push({ name: error, id: arrayindex });
          setSyncArray(SyncArray1);
        });
    } catch (error) {
      console.log(error);
      SyncArray1.push({ name: error, id: arrayindex });
      setSyncArray(SyncArray1);
    }
  };



  const navigatoTicket = async (ticketID: any, CallID: any) => {

    console.log(ticketID, "     >>>>>>>>>>>>>>>>>>>>>>>>>>    ", CallID);



    getServiceById(CallID, async (result: any) => {

      const sts = result[0].Approve_status;

      if (sts != '1') {
        Alert.alert('Not Approved', ' Please Approve the Service Call!', [
          {
            text: 'OK',
            onPress: () => { },
          },
        ]);

      } else {

        await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID, CallID);

        navigation.navigate('TicketDetails', {
          ticketID: ticketID,
        });

      }
    });


  }

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      setloandingspinner(true);
      getWellcomeNote();

      getLoginUserName().then(res => {
        console.log(res, '++++++++++++++++++++++++++++++++++++++++++++++++');
        loginUser = 'Test';
        setloginUser1(loginUser1);
        // setTicketID(id);

        console.log(
          loginUser,
          '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
          loginUser1,
        );
      });
      // Alert.alert('Refreshed');
      getRecievedServiceCall('0');
      getServiceCalls('1', (result: any) => {
        setConfirmededServiceCallList(result);
      });

      getTickets();
      getInprogressTicket();
      // AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID,'');

      // BackPressHandler((callback: any) => {

      // });

      setloandingspinner(false);
    });
    return focusHandler;
  }, []);

  return (
    <SafeAreaView style={comStyles.CONTAINER}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: modalStyle,
          backgroundColor: '#fff',
          zIndex: 20,
          borderRadius: 10,
          elevation: 20,
          paddingTop: 10,
          paddingBottom: 10,
          marginLeft: 0,
          ...Platform.select({
            ios: {
              paddingTop: 10,
            },
          }),
        }}>
        <View style={style.modalCont}>
          <View style={{ height: 300, marginBottom: 5 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
              data={SyncArray}
              style={{ marginTop: 10 }}
              renderItem={({ item }) => {
                return (
                  <View style={{ height: 25, flexDirection: 'row' }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: ComponentsStyles.COLORS.DASH_COLOR,
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={item => `${item.id}`}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, padding: 3 }}>
              <ActionButton title="Sync" onPress={Handlesyncprogress} />
            </View>
            <View style={{ flex: 1, padding: 3 }}>
              <ActionButton title="Cancel" onPress={slideOutModal} />
            </View>
          </View>
        </View>
      </Animated.View>
      <Header
        isIcon={false}
        title={wellComeTitle}
        IconUserOnPress={logoutsheet}
      />
      <ScrollView
        style={comStyles.CONTENT}
        showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={style.callText}>Confirmed Service Calls</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate('ServiceCall', { filterId: 1 })}>
            <Text style={style.seeAllText}>
              See All{' '}
              <IconA
                name="angle-double-right"
                size={20}
                color={comStyles.COLORS.ICON_BLUE}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
          data={confirmedserviceCallList}
          style={{ marginTop: 10 }}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View style={{ width: width - 70, padding: 5 }}>
                <ListBox
                  ticketNo={item.serviceId}
                  headerType="Request No : "
                  nameAddress={true}
                  name={item.customer}
                  address={item.customer_address}
                  status={item.priority}
                  isIcon={true}
                  onPressIcon={() => handleclicked(item.serviceId)}
                />

                {/* <Text>{item.serviceId}</Text> */}
              </View>
            );
          }}
          keyExtractor={item => `${item._Id}`}
        />

        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={style.callText}>Recieved Service Calls</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate('ServiceCall', { filterId: 2 })}>
            <Text style={style.seeAllText}>
              See All{' '}
              <IconA
                name="angle-double-right"
                size={20}
                color={comStyles.COLORS.ICON_BLUE}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
          data={RecievedserviceCallList}
          style={{ marginTop: 10 }}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View style={{ width: width - 70, padding: 5 }}>
                <ListBox
                  ticketNo={item.serviceId}
                  headerType="Request No : "
                  nameAddress={true}
                  name={item.customer}
                  address={item.customer_address}
                  status={item.priority}
                  isIcon={true}
                  onPressIcon={() => handleclicked(item.serviceId)}
                />
              </View>
            );
          }}
          keyExtractor={item => `${item._Id}`}
        />

        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={style.callText}>Service Tickets</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate('ServiceTicketList')}>
            <Text style={style.seeAllText}>
              See All{' '}
              <IconA
                name="angle-double-right"
                size={20}
                color={comStyles.COLORS.ICON_BLUE}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
          data={serviceTicketList}
          style={{ marginTop: 10 }}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View style={{ width: width - 70, padding: 5 }}>
                <ListBox
                  ticketNo={item.ticketId}
                  headerType="Ticket No : "
                  nameAddress={false}
                  name={item.assignTo}
                  status={item.priority}
                  isIcon={true}
                  onPressIcon={() => navigatoTicket(item.ticketId, item.serviceId)}
                />
              </View>
            );
          }}
          keyExtractor={item => `${item.ticketId}`}
        />

        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={style.callText}>Tasks In Progress</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('InprogressTask')}>
            <Text style={style.seeAllText}>
              See All{' '}
              <IconA
                name="angle-double-right"
                size={20}
                color={comStyles.COLORS.ICON_BLUE}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}

          // {"signatureStatus":"1","cusRemark":"","engRemark":"","startDate":"10-11-2022",
          // "status":"0","attend_status":"3","itemDescription":"car","cusNic":"",
          // "ticketId":"SCT_2022-11-10_1","_Id":1,"endDate":"10-11-2022",
          // "priority":"High","assignTo":"Ashen","serviceId":"SC_2022-11-10_1","content":"car"}

          data={inprogresticketList}
          style={{ marginTop: 10 }}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <View style={{ width: width - 70, padding: 5 }}>
                <ListBox
                  ticketNo={item.ticketId.toString()}
                  headerType="Ticket No : "
                  nameAddress={false}
                  name={item.serviceId}
                  address={item.itemDescription}
                  status={item.priority}
                  isIcon={true}
                  onPressIcon={() => navigatoTicket(item.ticketId)}
                />
              </View>
            );
          }}
          keyExtractor={item => `${item._Id}`}
        />

        <View style={style.container}>
          <ActionButton
            homeStyle={style.homebuttonStyle}
            title="Reservation"
            style={style.defaultbutton}
            textStyle={style.defaultBUTTON_TEXT}
            is_icon={true}
            icon_name="inbox"
            iconColor={comStyles.COLORS.ICON_BLUE}
            onPress={() => navigation.navigate('ResourcesScreen')}
          />

          <ActionButton
            homeStyle={style.homebuttonStyle}
            title="Attendance"
            style={style.defaultbutton}
            textStyle={style.defaultBUTTON_TEXT}
            is_icon={true}
            onPress={handleAttendance}
            icon_name="note"
            iconColor={comStyles.COLORS.ICON_BLUE}
          />
        </View>

        <View style={style.container}>
          <ActionButton
            homeStyle={style.homebuttonStyle}
            title="Spare Parts"
            style={style.defaultbutton}
            textStyle={style.defaultBUTTON_TEXT}
            is_icon={true}
            icon_name="tools"
            iconColor={comStyles.COLORS.ICON_BLUE}
            onPress={() => navigation.navigate('SparePartsScreen')}
          />

          <ActionButton
            homeStyle={style.homebuttonStyle}
            title="Reports"
            style={style.defaultbutton}
            textStyle={style.defaultBUTTON_TEXT}
            is_icon={true}
            icon_name="book"
            iconColor={comStyles.COLORS.ICON_BLUE}
            onPress={() => navigation.navigate('ReportsScreen')}
          />
        </View>

        <View style={style.container}>
          <ActionButton
            homeStyle={style.homebuttonStyle}
            title="Customers"
            style={style.defaultbuttonwidthChange}
            textStyle={style.defaultBUTTON_TEXT}
            is_icon={true}
            icon_name="people"
            iconColor={comStyles.COLORS.ICON_BLUE}
            onPress={() => navigation.navigate('Customers')}
          />
          <ActionButton
            homeStyle={style.homebuttonStyle}
            title="Sync"
            style={style.defaultbuttonwidthChange}
            textStyle={style.defaultBUTTON_TEXT}
            is_icon={true}
            icon_name="sync"
            iconColor={comStyles.COLORS.ICON_BLUE}
            onPress={() => navigation.navigate('SyncScreen', { LoginStatus: "SECOND", })}
          />
        </View>
        <View style={{ padding: 30 }} />
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            height: 60,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: '15%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderWidth: 1,
            borderColor: ComponentsStyles.COLORS.ICON_BLUE,
          },
        }}>
        <View>
          <ActionButton
            title="LOGOUT"
            style={style.bottomActionBtn}
            onPress={LogoutFuntion}
          />
        </View>
      </RBSheet>
      <Spinner
        visible={loandingspinner}
        color={ComponentsStyles.COLORS.WHITE}
        size="large"
        textContent={'Loading...'}
      />
    </SafeAreaView>
  );
};
export default Home;
