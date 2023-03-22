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
import { getServiceById, getServiceCalls, getWebRefIDServiceCAll, saveServiceData, updateServiceCAll } from "../../../SQLiteDatabaseAction/DBControllers/ServiceController";
import ListBox from "../../../Components/ListBox";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../../Constant/AsyncStorageConstants";
import RNRestart from 'react-native-restart';
import { getAllCustomers } from "../../../SQLiteDatabaseAction/DBControllers/CustomerController";
import { getLoginUserName, get_ASYNC_TOCKEN, get_ASYNC_USERID } from "../../../Constant/AsynStorageFuntion";
import moment from "moment";
import { BASE_URL_GET } from "../../../Constant/Commen_API_Url";
import axios from "axios";

let height = Dimensions.get("screen").height;

var UserNameUpload: any;
var UserIdUpload: any;
var TOCKEN_KEY: any;

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
    const [userLavelUpdate, setUserLavelUpdate] = useState(true);
    const [enableUpdate, setenableUpdate] = useState(true);
    const [webRefID, setWebRefID] = useState('');

    const [customerList, setCustomerList] = useState([]);
    const route = useRoute();

    const filterServiceCall = () => {
        if (route.params.filterId == 1) {
            // console.log('this is a confirim service call');
            ConfirmPressed();

        } else if (route.params.filterId == 2) {

            // console.log('this is a recieved service call');
            RecievedPressed();
        } else {
            console.log('error');
        }


    }

    const getLoginUserNameForUplode = () => {
        getLoginUserName().then(res => {
            UserNameUpload = res;
            console.log('user Name --' + UserNameUpload);
        })
        get_ASYNC_USERID().then(res => {
            UserIdUpload = res;
            console.log('user id upload  --' + UserIdUpload);
        })



    }


    const getUserType = async () => {


        await AsyncStorage.getItem('UserType').then((value) => {
            // console.log('this is a user type+++++++++++++', value);
            if (value == 'Technician') {
                setUserLavelUpdate(false);
            } else {

                setUserLavelUpdate(true);

            }

        })
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


        const prams =
        {
            "UserName": UserNameUpload,
            "UserID": UserIdUpload,
            "serviceId": webRefID,
            "Approve_status": status,
            "created_At": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
        }



        console.log(" --- [][][][][][] APPROVE SC JSON --------------  ", prams);



        try {

            updateServiceCAll(serviceID, status, UserIdUpload,(result: any) => {
                // console.log(result, "/////////////......................//////////");

                if (result === "success") {

                    // ----------------- UPLOAD APPROVE STATUS ---------------------------

                    get_ASYNC_TOCKEN().then(res => {
                        // console.log('cus id--' + customerID)
                        TOCKEN_KEY = res;
                        const AuthStr = ` Bearer ${TOCKEN_KEY}`;

                        const headers = {
                            'Authorization': AuthStr
                        }
                        const URL = BASE_URL_GET + "service-call/approve-status";
                        axios.put(URL, prams, {
                            headers: headers
                        })
                            .then((response) => {
                                console.log("[s][t][a][t][u][s][]", response.status);
                                if (response.status == 200) {

                                    console.log('<------  SERVICE CALL APPROVE UPLOAD Method --->', response.data)
                                    // console.log('uplode api response', response.data.ErrorId);
                                    // console.log('web service call id', response.data.UniqueNo);
                                    if (response.data.ErrorId == 0) {
                                        console.log('this is if inside----');
                                        // this use fro update sync flag as 1 
                                        // console.log('this is a web service call id ----', response.data[0].ServiceCallId);

                                    } else {

                                        Alert.alert(response.data.ErrorDescription);

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



                    // ----------------- UPLOAD APPROVE STATUS ---------------------------


                    if (status === 1) {

                        ToastAndroid.show("Accepted Service call ", ToastAndroid.SHORT);

                    } else if (status === 2) {

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


    const handleclicked = async (callID: any) => {

        await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID, callID);
        // console.log("call details check");

        // navigation.navigate('RequestDetails',{navigateId:1});

        navigation.navigate('RequestDetails', { navigateId: 1 })
    };

    const getServiceID = (ID: any) => {

        setSeviceID(ID);
        // console.log(service_id, "  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ");

        getWebRefIDServiceCAll(ID, (res: any) => {
            // console.log("web ref id -------------", res[0].service_web_RefID);
            setWebRefID(res[0].service_web_RefID);

        });


        slideInModal();


    }

    const getServiceCallByStatus = () => {

        console.log("receive  ,,,,,,,,,,  ", recieve, "    confirm ,,,,,,,,,,,,,,,,,,,,,,     ", confirm);


        if (recieve) {

            console.log("received .............");


            getServiceCall(0);

        } else if (confirm) {

            console.log("confirm  .............");

            getServiceCall(1);

        }

    }

    const _handleOnPress = (status: any, customerList: any) => {


        navigation.navigate('NewServiceCall', {
            serviceID: status,
            mode: 1,
            cusList: customerList,
            navigate: 1,
        });
    };

    const getServiceCall = (status: any) => {

        const serviceArray: any[] = [];

        getServiceCalls(status, (result: any) => {
            // setServiceCallList(result);

            // console.log('<<<<<<<<<<<<<', result);


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
            getLoginUserNameForUplode();
            RecievedPressed();
            getCustomers();
            filterServiceCall();
            // getFilterId();
            getUserType();


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
                                                    isUpdate={userLavelUpdate}
                                                    onPressIcon={() => handleclicked(item.serviceId)}
                                                    onPresBtn={() => getServiceID(item.serviceId)}
                                                    onPresBtnupdate={() => _handleOnPress(item.serviceId, customerList)}
                                                    btnTitle="Proceed"
                                                    enableStatusUpdate={item.Attend_status == 0 ? false : true}
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


