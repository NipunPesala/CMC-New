/**
* @author Gagana Lakruwan
*/
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
    Animated,
    Keyboard,
    Platform,
    Alert,
    ToastAndroid,
    useWindowDimensions,
} from "react-native";
import Header from "../../../Components/Header";
import ActionButton from "../../../Components/ActionButton";
import comStyles from "../../../Constant/Components.styles";
import style from "./style";
import { serviceData } from '../../../Constant/DummyData'
import ServiceListComponent from "../../../Components/ServiceListComponent";
import ActinModalCmponent from "../../../Components/ActionModalComponent";
import { getServiceById, getServiceCalls, saveServiceData, updateServiceCAll } from "../../../SQLiteDatabaseAction/DBControllers/ServiceController";
import ListBox from "../../../Components/ListBox";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../../Constant/AsyncStorageConstants";
import RNRestart from 'react-native-restart';
import { getAllCustomers } from "../../../SQLiteDatabaseAction/DBControllers/CustomerController";

let height = Dimensions.get("screen").height;

const ServiceCall = () => {
    const navigation = useNavigation();
    const [isShowSweep, setIsShowSweep] = useState(true);
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [recieve, setRecieve] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [listdata, setlistdata] = useState(serviceData);
    const [serviceID, setSeviceID] = useState();
    const [serviceCallList, setServiceCallList]: any[] = useState([]);


    const [itemCode, setItemCode] = useState([]);
    const [itemDescription, setItemDescription] = useState();
    const [cusAddress, setCusAddress] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectPriority, setSelectPriority] = useState('');
    const [selectServiceType, setSelectServiceType] = useState('');
    const [selectSecretary, setSelectSecretary] = useState('');
    const [selectAssistance, setSelectAssistance] = useState('');
    const [selectTechnician, setSelectTechnician] = useState('');
    const [selectCustomer, setSelectCustomer] = useState('');

    const [customerList, setCustomerList] = useState([]);
    const route=useRoute();

    const filterServiceCall=()=>{
        if(route.params.filterId==1){
                console.log('this is a confirim service call'); 
                ConfirmPressed();
              
        }else if(route.params.filterId==2){

                console.log('this is a recieved service call'); 
                RecievedPressed();
        }else{
                console.log('error');
        }


    }

    const RecievedPressed = () => {
        setRecieve(true);
        setConfirm(false);
        // setlistdata(serviceData);

        getServiceCall(0);
        // navigation.navigate('ServiceCall');
    }
    const ConfirmPressed = () => {
        setRecieve(false);
        setConfirm(true);
        getServiceCall(1);
        // setlistdata(serviceData);
        // navigation.navigate('ServiceCall');
    }

    const slideInModal = () => {
        setIsShowSweep(false);
       // console.log('sampleIn');
        Animated.timing(modalStyle, {
            toValue: height / 1.90,
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

    const acceptServiceCall = (status: any) => {

      //  console.log(serviceID, "  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ");

        // getServiceData();


        // const updateData = [
        //     {
        //         serviceId: serviceID,
        //         item_code: itemCode,
        //         item_description: itemDescription,
        //         customer_address: cusAddress,
        //         contact_name: contactPerson,
        //         contact_no: contactNumber,
        //         subject: subject,
        //         handle_by: selectTechnician,
        //         salesAssistance: selectAssistance,
        //         startDate: startDate,
        //         endDate: endDate,
        //         priority: selectPriority,
        //         type: selectServiceType,
        //         secretary: selectSecretary,
        //         attend_status: '1',
        //         status: 'false',
        //         customer: selectCustomer,
        //         created_by: '1',

        //     }
        // ]


        try {

            updateServiceCAll(serviceID, status, (result: any) => {
               // console.log(result, "/////////////......................//////////");

                if (result === "success") {


                    if(status === 1){

                        ToastAndroid.show("Accepted Service call ", ToastAndroid.SHORT);

                    }else if(status === 2){

                        ToastAndroid.show("Rejected Service call ", ToastAndroid.SHORT);

                    }

                    RecievedPressed();
                    
                    slideOutModal();
                    // navigation.navigate("ServiceCall");
                    
                    


                } else {

                    Alert.alert(
                        "Failed...!",
                        "Service Call Accept Failed.",
                        [
                            {
                                text: "OK", onPress: () => {

                                }
                            }
                        ]
                    );

                }

            });


        } catch (error) {
            console.log(error);
        }

    }


    const handleclicked = (callID:any) => {

        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID,callID);
        console.log("call details check");
        
        // navigation.navigate('RequestDetails',{navigateId:1});
        
        navigation.navigate('RequestDetails',{navigateId:1})
    };

    const getServiceID = (ID: any) => {

        setSeviceID(ID);
        // console.log(service_id, "  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ");


        slideInModal();


    }

    const getServiceCallByStatus = () => {

        console.log("receive  ,,,,,,,,,,  " , recieve , "    confirm ,,,,,,,,,,,,,,,,,,,,,,     " , confirm);
        

        if (recieve) {

            console.log("received .............");
            

            getServiceCall(0);

        } else if (confirm) {

            console.log("confirm  .............");

            getServiceCall(1);

        }

    }
   
    const _handleOnPress = (status:any,customerList:any) => {
       

        navigation.navigate('NewServiceCall', {
            serviceID: status,
            mode:1,
            cusList:customerList,
            navigate:1,
        });
      };

    const getServiceCall = (status: any) => {

        const serviceArray: any[] = [];

        getServiceCalls(status, (result: any) => {
            // setServiceCallList(result);

            console.log('<<<<<<<<<<<<<',result);
            

            try {
                var dateArr: any = [];
                var resArr: any = [];
                result.forEach((element: any) => {
                    dateArr.push(element.start_date);
                });
                dateArr = [... new Set(dateArr)];

             //   console.log("............ ", dateArr);


                let i = 1;
                dateArr.forEach((element: any) => {
                    i++;
                    var obj: any = {};
                    obj.id = i;
                    obj.date = element;
                    obj.details = result.filter((elm: any) => { return elm.start_date == element })
                    resArr.push(obj);
                });

                // console.log(" response array service ,,,,,,,,,,,,,   ",resArr);
                // console.log(" list size ............  ", result.length);

                setServiceCallList(resArr);


            } catch (error) {
                console.log(" push array ,,,,,,,  ", error);

            }

        });

    }

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            console.log("refresh ******************* ");
            RecievedPressed();
            getCustomers();
            filterServiceCall();
           // getFilterId();
           

        });
        return focusHandler;
    }, [])

    const getCustomers = () => {
        getAllCustomers((result: any) => {
          //  console.log("<><><><><><><><>< SERVICE CALL"+ result);
            setCustomerList(result);
        });

    }

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
                            paddingTop: 50
                        }
                    })
                }}>
                <View style={style.modalCont}>
                    {/* <ActinModalCmponent onpress={() => slideOutModal()} /> */}



                    <ActionButton title="Accept" style={modalstyle.ActionButton} onPress={() => acceptServiceCall(1)} />
                    <ActionButton title="Reject" style={modalstyle.rejectBtn} onPress={() => acceptServiceCall(2)} />
                    <ActionButton
                        title="Cancel" style={modalstyle.loginBtn}
                        textStyle={modalstyle.txtStyle}
                        onPress={() => slideOutModal()}
                    />


                </View>
            </Animated.View>

            <Header isBtn={true} title="Service Calls" btnOnPress={() => navigation.goBack()} />
            <View style={comStyles.CONTENT}>
                <View style={style.container}>

                    <ActionButton
                        title="Recieved"
                         onPress={RecievedPressed}
                        style={recieve === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={recieve === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />
                    <ActionButton
                        title="Confirmed"
                        onPress={ConfirmPressed}
                    
                        style={confirm === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={confirm === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />


                </View>

                <FlatList    
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={serviceCallList}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (
                            // <ServiceListComponent
                            //     subList={item.details}
                            //     txtDate={item.date}
                            //     recieve={recieve}
                            //     confirm={confirm}
                            //     btnTxt="Proceed"
                            //     onPresBtn={() => slideInModal()}
                            //     onPressIcon={() => navigation.navigate('RequestDetails')}

                            // />

                            <View style={modalstyle.mainContainer}>

                                <Text style={modalstyle.TextTitle}>{item.date}</Text>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                                    data={item.details}
                                    style={{ marginTop: 10, alignItems: 'center' }}
                                    horizontal={false}
                                 
            
                                    renderItem={({ item }) => {
                                        
                                     //   console.log("_renderItem", item.details);
                                        return (
                                            <View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
                                                <ListBox
                                                    ticketNo={item.serviceId}
                                                    name={item.customer}
                                                    address={item.customer_address}
                                                    status={item.priority}
                                                    nameAddress={true}
                                                    isbtn={recieve}
                                                    isIcon={confirm}
                                                    isUpdate={false}
                                                    onPressIcon={() => handleclicked(item.serviceId)}
                                                    onPresBtn={() => getServiceID(item.serviceId)}
                                                    onPresBtnupdate = {() => _handleOnPress(item.serviceId,customerList)}
                                                    btnTitle="Proceed"
                                                />
                                            </View>
                                        );
                                    }
                                  
                                }
                                    keyExtractor={item => `${item._Id}`}
                                />
                            </View>


                        );
                    }
            }
                    keyExtractor={item => `${item.date}`}
                />

                <View style={{
                    width: '100%',
                    backgroundColor: comStyles.COLORS.WHITE,
                }}>

                    {/* <FlatList
                        showsHorizontalScrollIndicator={false}
                        // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                        data={serviceCallList}
                        // style={{ marginTop: 10, alignItems: 'center' }}
                        style={{ marginTop: 10, marginBottom: 60, }}
                        horizontal={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
                                    <ListBox
                                        ticketNo={item.serviceId.toString()}
                                        name={item.customer}
                                        address={item.address}
                                        status={item.status}
                                        nameAddress={true}
                                        isbtn={recieve}
                                        isIcon={confirm}
                                        // onPressIcon={onPressIcon}
                                        onPresBtn={() => getServiceID(item.serviceId)}
                                        btnTitle={"proceed"}
                                    />
                                </View>
                            );
                        }}
                        keyExtractor={item => `${item.id}`}
                    /> */}
                </View>

            </View>
        </SafeAreaView>
    );
}

const modalstyle = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    loginBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        marginBottom: 10,

    },

    rejectBtn: {
        backgroundColor: comStyles.COLORS.HIGH_BUTTON_RED,
        marginBottom: 30
    },

    ActionButton: {
        marginTop: 10,
        marginBottom: 10
    },

    txtStyle: {
        color: comStyles.COLORS.ICON_BLUE
    },
    mainContainer: {

        width: '100%',
        backgroundColor: comStyles.COLORS.WHITE,
    },

    TextTitle: {
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.HEADER_BLACK,
        fontSize: 16
    },

});
export default ServiceCall;


