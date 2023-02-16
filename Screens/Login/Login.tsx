/**
* @author Gagana Lakruwan
*/
import React, { useState } from "react";
import { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Image,
    Animated,
    Keyboard,
    Dimensions,
    TouchableOpacity,
    Platform,
    Alert,
    ScrollView,
} from "react-native";
//import AsyncStorage from '@react-native-async-storage/async-storage';

import ActionButton from "../../Components/ActionButton";
import InputText from "../../Components/InputText";
import comStyles from "../../Constant/Components.styles";
import { useNavigation } from "@react-navigation/native";
import ModalComponent from "../../Components/ModalComponent";
import style from "./style";
import IconA from 'react-native-vector-icons/Ionicons';
import ActinModalCmponent from "../../Components/ActionModalComponent";
import { requestPermission } from "../../Services/permissionServise";
import * as DB_Service from '../../SQLiteDatabaseAction/DBControllers/ServiceController';
import * as DB_Service_MoreInfo from '../../SQLiteDatabaseAction/DBControllers/ServiceInfoController';
import * as DB_Ticket from '../../SQLiteDatabaseAction/DBControllers/TicketController';
import * as DB_TicketSpareparts from '../../SQLiteDatabaseAction/DBControllers/SparePartsController';
import * as DB from '../../SQLiteDatabaseAction/DBService';
// import { userLogin } from "../../Services/Api/USerAuthService";
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import moment from "moment";
import { getLastMeterReadingValueType, saveMeterReading } from "../../SQLiteDatabaseAction/DBControllers/MeterReadingController";
import { Service_types, spareparts, Items, Customer, ExpencesType, Resources, USER_TYPES, priorityListInitial, ContactPerson, USER } from "../../Constant/DummyData";
import * as DB_ServiceType from '../../SQLiteDatabaseAction/DBControllers/ServiceTypeController';
import * as DB_Item from '../../SQLiteDatabaseAction/DBControllers/ItemController';
import * as DB_Customer from '../../SQLiteDatabaseAction/DBControllers/CustomerController';
import * as DB_SpareParts from '../../SQLiteDatabaseAction/DBControllers/SparePartsController';
import * as DB_Expences_Type from '../../SQLiteDatabaseAction/DBControllers/ExpencesTypeController';
import * as DB_Resources from '../../SQLiteDatabaseAction/DBControllers/ResourcesController';
import * as DB_UserTypes from '../../SQLiteDatabaseAction/DBControllers/Users_TypesController';
import * as DB_Priority from '../../SQLiteDatabaseAction/DBControllers/PriorityController';
import * as DB_ContactPerson from '../../SQLiteDatabaseAction/DBControllers/ContactPersonController';
import * as DB_User from '../../SQLiteDatabaseAction/DBControllers/UserController';
import AsyncStorageConstants from "../../Constant/AsyncStorageConstants";
import AsyncStorage from '@react-native-community/async-storage';
import queryString from 'query-string';
import axios from 'axios';
import ComponentsStyles from "../../Constant/Components.styles";
import PushNotification from "react-native-push-notification";
import { userLogin } from "../../Services/Api/UserAuthService";
//import {Permission,PERMISSION_TYPE}from '../../Constant/AppPermission';
let height = Dimensions.get("screen").height;
requestPermission();
//Permission.checkPermission();
var login_Status: any;
const Login = () => {

    const [uName, setuName] = useState('');
    const [pword, setPword] = useState('');
    const [meterValue, setMeterValue] = useState('');
    const [remark, setremark] = useState('');
    const [isShowSweep, setIsShowSweep] = useState(true);
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [ImgStatus, setImgStatus] = useState(false);
    const [image, setImage] = useState();

    const [lastMeterReadervalue, setlastMeterReadervalue] = useState([]);
    const [readingType, setreadingType] = useState('');
    const [date, setDate] = useState('');

    const mainObject = require("../../Constant/MainObject.json");
    const navigation = useNavigation();
    //let LoginHeading='LOGIN TO START THE DATE';
    const [LoginHeading, setLoginHeading] = useState('');
    const [ShowQuckAcess, setShowQuckAcess] = useState(false);
    const [loginarray, setloginarray]: any[] = useState([]);
    const [loginStatus, setLoginStatus] = useState(false);
    const [loandingspinner, setloandingspinner] = useState(false);

    const getLastReadervalue = () => {

        try {

            //  console.log("LOGIN <>1<>","getLastReadervalue");
            getLastMeterReadingValueType((result: any) => {
                for (let i = 0; i < result.length; ++i) {
                    setlastMeterReadervalue(result[i].value);
                    setreadingType(result[i].readingType);
                    setDate(result[i].date);

                }

                if (result.length > 0) {

                    setLoginStatus(true);
                    console.log("second");
                    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_LOGIN_STATUS, "SECOND");
                    login_Status = "SECOND"
                } else if (result.length == 0) {
                    console.log("first");
                    AsyncStorage.setItem(AsyncStorageConstants.ASYNC_LOGIN_STATUS, "FIRST");
                    setLoginStatus(false);
                    login_Status = "FIRST"
                }

            });
            console.log("LOGIN <>1$$<>", readingType);
            if (readingType == "OUT" || readingType == "") {
                setLoginHeading("LOGIN TO START THE DATE");
                setShowQuckAcess(false);
            } else {
                setLoginHeading("LOGIN");
                setShowQuckAcess(true);
            }




        } catch (error) {
            console.log(error);
        }

    }

    const createChannels = () => {

        PushNotification.createChannel(
            {
                channelId: "test_channel", // (required)
                channelName: "Test Channel", // (required)
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            })
    }

    const insertServiceData = () => {

        // console.log(mainObject);

        //Here not add boolean flag maintain. after create api we have to add it

        DB_SpareParts.saveSpareParts(spareparts, (res: any, error: any) => {
            console.log("Add Spareparts", res);
        })

        DB_ServiceType.saveServiceType(Service_types, (res: any, error: any) => {
            console.log("Add Service Types ", res);
        })

        DB_Item.saveItem(Items, (res: any, error: any) => {
            console.log("Add Items ", res);
        })

        DB_Customer.saveCustomer(Customer, (res: any, error: any) => {
            console.log("Add Customer ", res);
        })

        DB_Expences_Type.saveExpencesType(ExpencesType, (res: any, error: any) => {
            console.log("Add ExpencesType --------", res);
        })

        DB_Resources.saveResources(Resources, (res: any, error: any) => {
            console.log("Add Resources --------", res);
        })
        DB_UserTypes.saveTechnitian(USER_TYPES, (res: any, error: any) => {
            console.log("Add technitianList --------", res);
        })
        DB_Priority.savePriority(priorityListInitial, (res: any, error: any) => {
            console.log("Add PriorityList --------", res);
        })
        DB_ContactPerson.saveContactPerson(ContactPerson, (res: any, error: any) => {
            console.log("save ContactPerson--------", res);
        })
        DB_User.saveUser(USER, (res: any, error: any) => {
            console.log("save User--------", res);
        })

        // mainObject.ServiceHeaderList_Object.forEach(data => {

        //     DB_Service.saveServiceData(data, (res: any, error: any) => {
        //         console.log("Service", res);

        //     })

        //     DB_Service_MoreInfo.saveServiceInfo(data.service_more_info_Object, data.service_Id, (res: any, error: any) => {
        //         console.log("add more Info", res);
        //     })

        //     data.service_history_Object.forEach(historyData => {
        //         DB_Service.saveServiceHistoryData(historyData, data.service_Id, (res: any, error: any) => {
        //             console.log("Add History", res);
        //         })
        //     });

        //     // console.log('...........0',data.service_tickets_Object);

        //     data.service_tickets_Object.forEach(ticketData => {
        //         DB_Ticket.saveTicket(ticketData, (res: any, error: any) => {
        //             console.log("Add Ticket", res);
        //         })

        //         // DB_Ticket.deleteAllSparePartsReleventTickets(ticketData.ticketId, (res: any, error: any) => {
        //         //     console.log("Delete Ticket SpareParts", res);
        //         //     // console.log("Delete Ticket SpareParts", error);
        //         // })

        //         // DB_Ticket.saveTicket(ticketData.ticket_more_info_Object, (res: any, error: any) => {
        //         //     console.log(res);
        //         // })

        //         ticketData.ticket_spareparts_Object.forEach(spareparts => {
        //             DB_Ticket.saveTicketSpareparts(spareparts, ticketData.ticketId, "1", (res: any, error: any) => {
        //                 console.log("Add Spareparts", res);
        //             })
        //         });

        //     });

        // });
    }

    const login = () => {

        console.log(uName, '--', pword);

        //........................................................

        // insertServiceData();
        // setLoginHeading("LOGIN");
        // setShowQuckAcess(true);
        // navigation.navigate("BottomNavi");

        // ..............................................................



        if (uName == "" || pword == "") {
            const sendData = {
                username: uName,
                pasword: pword
            }

            console.log("empty");

            Alert.alert(
                "Empty Fields Found!",
                "Please Enter Username and Password",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

        }

        else {

            Get_Login_API_Data();
            //  navigation.navigate("BottomNavi");
        }



    };

    const firstTimeLogingsync = () => {
        navigation.navigate("AddExpencesNew");

    }

    const Get_Login_API_Data = () => {

        let data = {
            password: pword,
            username: uName
        }

        userLogin(data)
            .then(async(response: any) => {
                console.log(response.data);
                if (response.data.ResponseDescription == "Login Successful") {
                    await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_NAME, response.data.Username);
                    await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_TOCKEN, response.data.Data[0].Token);
                    // AsyncStorage.setItem(AsyncStorageConstants.ASYNC_LOGIN_USERID, response.data.Data[0].UserId);
                    // AsyncStorage.setItem(AsyncStorageConstants.ASYNC_TOCKEN, response.data.token);
                    await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_LOGIN_USERID, "1");
                    if (readingType == "OUT" || readingType == "") {
                        // last record has day end .so need to add day statrt
                        setLoginHeading("LOGIN TO START THE DATE");
                        setShowQuckAcess(false);
                        slideInModal();
                        // firstTimeLogingsync();
                    } else {
                        // insertServiceData();
                        setLoginHeading("LOGIN");
                        setShowQuckAcess(true);
                        navigation.navigate("BottomNavi");


                    }
                    // navigation.navigate("BottomNavi");
                } else {

                    Alert.alert(
                        "Invalid Details!",
                        response.data.ResponseDescription,
                        [
                            { text: "OK", onPress: () => console.log(response.data.ResponseDescription) }
                        ]
                    );
                }
            })
            .catch((err: any) => {
                console.log("....................", err);
            });

    }
    const slideInModal = () => {

        try {

            setIsShowSweep(false);
            console.log('sampleIn');

            Animated.timing(modalStyle, {
                toValue: height / 3.2,
                duration: 500,
                useNativeDriver: false,
            }).start();

        } catch (error) {
            Alert.alert(error + "");
        }


    };
    //#endregion

    //#region SlideOutModal

    const slideOutModal = () => {


        try {


            setIsShowSweep(true);
            Keyboard.dismiss();
            Animated.timing(modalStyle, {
                toValue: height,
                duration: 500,
                useNativeDriver: false,
            }).start();


        } catch (error) {
            Alert.alert(error + "");
        }

    };

    const insertMeterReading = () => {

        // console.log("awaaaaaa")

        if (ImgStatus || meterValue != "") {

            if (ImgStatus && meterValue != "") {

                try {

                    // console.log(meterValue);
                    let mValue = parseFloat(meterValue);

                    let data = [
                        {
                            //mrId: 1,
                            empID: 1,
                            readingType: "IN",
                            date: moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                            location: "horana",
                            value: mValue,
                            status: "1",
                            remark: remark
                        }
                    ]

                    console.log('--------------this is a  insertMeterReading------------');



                    saveMeterReading(data, (result: any) => {
                        // console.log(result, "/////////////......................//////////");

                        if (result === "success") {
                            // firstTimeLogingsync();
                            console.log('*************this is a check sync navigation*****');
                            //firstTimeLogingsync()
                            navigation.navigate("BottomNavi");

                        } else {

                            Alert.alert(
                                "Failed...!",
                                "Meter Reading Save Failed.",
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



            } else if (ImgStatus) {

                navigation.navigate("BottomNavi");



            } else if (meterValue != "") {

                try {

                    // console.log(meterValue);
                    let mValue = parseFloat(meterValue);

                    let data = [
                        {
                            //  mrId: 1,
                            empID: 1,
                            readingType: "IN",
                            date: moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                            location: "horana",
                            value: mValue,
                            status: "1",
                            remark: remark
                        }
                    ]

                    //  console.log(data.mrId);



                    saveMeterReading(data, (result: any) => {
                        // console.log(result, "/////////////......................//////////");

                        if (result === "success") {

                            console.log(login_Status, '>>>>>>>>>>>');

                            slideOutModal();
                            navigation.navigate('SyncScreen', {
                                LoginStatus: login_Status,
                            });

                            // navigation.navigate("BottomNavi");

                        } else {

                            Alert.alert(
                                "Failed...!",
                                "Meter Reading Save Failed.",
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


        } else {


            Alert.alert(
                "Warning...!",
                "Please Enter Meter Value or Submit a Photo of meter.",
                [
                    {
                        text: "OK", onPress: () => {

                        }
                    }
                ]
            );

        }

    }


    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
        }).then(image => {

            console.log(image.path);
            setImage(image.path);
            setImgStatus(true);

        }).catch((error) => {

            Alert.alert(
                "Warning...!",
                "Permission Denied...Please get Permission from manually in setting",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {

                        }
                    }
                ]
            );
        });
    }


    useEffect(() => {
        DB.createTables();
        DB.tableIndexKey();
        getLastReadervalue();
        createChannels();

        // const IMEI = require('...react-native-imei');
        // IMEI.getImei().then(imeiList => {
        //     console.log(imeiList)
        // });

    }, [])

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
                            paddingTop: 10
                        }
                    })
                }}>



                <View style={style.modalCont}>

                    {/* ........................................ meter reading modal start.......................................... */}


                    <View style={styles.modalMainContainer}>

                        <View style={styles.modalSubContainer}>
                            <IconA name='location-outline' size={20} />
                            <Text style={styles.modalRegularTitle}>Location: </Text>
                            <Text style={styles.modalTitle}>Colombo 05</Text>
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 10 }}>
                            <IconA name='time-outline' size={20} />
                            <Text style={styles.modalRegularTitle}>Time: </Text>
                            <Text style={styles.modalTitle}>{moment().utcOffset('+05:30').format(' hh:mm a')}</Text>
                        </View>

                        <View style={styles.modalMainContainer}>
                            <Text style={{ fontFamily: comStyles.FONT_FAMILY.BOLD, color: comStyles.COLORS.HEADER_BLACK, fontSize: 15, marginTop: 10 }}>Add the meter you are starting from</Text>
                        </View>
                        <InputText
                            style={styles.inputTextStyle}
                            placeholder="125KM"
                            stateValue={meterValue}
                            keyType='numeric'
                            setState={
                                (meterValue) => setMeterValue(meterValue)}
                        />
                        <InputText
                            style={styles.inputTextStyle}
                            placeholder="Enter Remark"
                            stateValue={remark}
                            setState={
                                (remark) => setremark(remark)}
                        />
                        <Text style={style.subtxt}>OR</Text>

                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
                            <Text style={styles.modalTitle}>Update the photo of the meter</Text>
                            <Text style={styles.modalTitle}>time you are starting from</Text>
                        </View>

                        <View style={styles.txtUpload}>
                            {
                                image ?

                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ fontFamily: comStyles.FONT_FAMILY.BOLD, color: comStyles.COLORS.ORANGE, fontSize: 18, marginRight: 5 }}>Image Uploaded</Text>
                                        <IconA name='ios-checkmark-circle' size={20} color={comStyles.COLORS.LOW_BUTTON_GREEN} style={{ marginRight: 5 }} />
                                    </View>
                                    :
                                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", }} onPress={() => openCamera()}>
                                        <IconA name='cloud-upload' size={20} color={comStyles.COLORS.ICON_BLUE} style={{ marginRight: 5 }} />
                                        <Text style={{ fontFamily: comStyles.FONT_FAMILY.BOLD, color: comStyles.COLORS.ICON_BLUE, fontSize: 18, marginRight: 5 }}>Photo of Meter*</Text>
                                    </TouchableOpacity>
                            }
                        </View>

                        <ActionButton
                            title="Let's Get Start"
                            style={style.ActionButton}
                            onPress={() => insertMeterReading()}

                        />

                    </View>


                    {/* ........................................ meter reading modal end.......................................... */}


                </View>


            </Animated.View>

            <ImageBackground source={require('../../assets/images/loginBackground.png')} style={comStyles.CONTAINER}>
                <ScrollView
                    style={comStyles.CONTENTLOG}
                    showsVerticalScrollIndicator={true}>
                    <View style={comStyles.CONTENTLOG2}>
                        <View style={style.box3}>
                            <Image source={require('../../assets/images/image007Main.png')} style={style.logoMain} />
                        </View>
                        <View style={style.box1}>
                        </View>

                        <View style={style.box2}>
                            <InputText is_icon={true}
                                icon_name="user"
                                editable={true}
                                placeholder="ENTER USER NAME"
                                stateValue={uName}
                                setState={(val: any) => setuName(val)}
                                placeholderColor={comStyles.COLORS.ICON_BLUE}
                            />
                            <InputText is_icon={true}
                                icon_name="lock"
                                editable={true}
                                stateValue={pword}
                                setState={(val: any) => setPword(val)}
                                placeholder="ENTER PASSWORD"
                                secureTextEntry={true}
                                placeholderColor={comStyles.COLORS.ICON_BLUE}
                            />

                            <View style={comStyles.separateLine} />
                            <ActionButton title={LoginHeading}
                                onPress={() => login()} style={style.ActionButton} />
                            <Text style={style.subtxt}>or</Text>



                            <ActionButton title="LOGIN TO QUICK ACCESS"
                                onPress={() => navigation.navigate("BottomNavi")}
                                style={loginStatus === true ? style.loginBtn : style.loginBtndesable}
                                disabled={!loginStatus}
                                textStyle={loginStatus === false ? style.desable_BUTTON_TEXT : null}

                            />

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                                <Text style={style.footer}>Powered by</Text>
                                <Image source={require('../../assets/images/logo.png')} style={style.logo} />


                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
            {/* <OrientationLoadingOverlay
                visible={loandingspinner}
                color={ComponentsStyles.COLORS.WHITE}
                indicatorSize="large"
                messageFontSize={16}
                message="Loading..."
            /> */}

        </SafeAreaView >
    );
}
export default Login;

const styles = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    modalSubContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 5

    },

    modalRegularTitle: {
        fontFamily: comStyles.FONT_FAMILY.REGULAR,
        color: comStyles.COLORS.HEADER_BLACK,
        fontSize: 15,
        marginRight: 5
    },

    modalTitle: {

        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.HEADER_BLACK,
        fontSize: 15

    },
    txtUpload: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderStyle: "dashed",
        width: '100%',
        marginTop: 25,

    },
    subtxt: {
        color: comStyles.COLORS.BLACK,
        fontSize: 13,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 10
    },
    ActionButton: {
        marginTop: 20,
        marginBottom: 10
    },

    inputTextStyle: {
        borderWidth: 0,
        paddingLeft: 0,
        marginLeft: 0,
        width: '100%',
        fontSize: 20,
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.HEADER_BLACK,
        borderBottomWidth: 0.5,
        borderColor: comStyles.COLORS.HEADER_BLACK,
        borderStyle: "dashed",
        textAlign: "center",
        margin: 5,
        borderRadius: 0,
    }
});

