/**
* @author Gagana Lakruwan
*/
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ToastAndroid,
    Alert,
    Platform,
    Linking
} from "react-native";
import ActionButton from "../../../Components/ActionButton";
import Header from "../../../Components/Header";
import Locations from "../../../Components/Locations";
import MoreInfo from "../../../Components/MoreInfo";
import ServiceCustomerDetails from "../../../Components/ServiceCustomerDetails";
import ServiceHistory from "../../../Components/ServiceHistory";
import Tickets from "../../../Components/Tickets";
import AsyncStorageConstants from "../../../Constant/AsyncStorageConstants";
import { BackPressHandler } from "../../../Constant/CommonFunctions";
import ComStyles from "../../../Constant/Components.styles";
import { enableServiceCall, getServiceById } from "../../../SQLiteDatabaseAction/DBControllers/ServiceController";
import style from "./style";
import { getCurrentServiceCallID, getLoginUserName, get_ASYNC_TOCKEN, get_ASYNC_USERID } from "../../../Constant/AsynStorageFuntion";
import { getTicketByServiceId } from "../../../SQLiteDatabaseAction/DBControllers/TicketController";
import { BASE_URL_GET } from "../../../Constant/Commen_API_Url";
import axios from "axios";
import moment from "moment";

let changetitle = 0;

var UserNameUpload: any;
var UserIdUpload: any;
var TOCKEN_KEY: any;

const RequestDetails = (props: any) => {
    const { navigation, route } = props;
    const [loadScreen, setLoadScreen] = useState('ticket');
    const [isServiceActive, setIsServiceActive] = useState(true);
    const [cusName, setCusName] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [status, setStatus] = useState('');
    const [address, setAddress] = useState('');
    const [serviceId, setSeviceId] = useState('');
    const [btnEnable, setButtonEnable] = useState(true);
    const [ticketList, setTicketList] = useState([]);
    const [screenName, setScreenName] = useState('null');
    const [webRefCallID, setSwebRefCallID] = useState('');
    const [webRefTicketID, setwebRefTicketID] = useState('');

    //Location 
    const [btnTitle, setBtnTitle] = useState('');
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [isStarted, setIsStarted] = useState(false);


    var callID: any;
    const routeRequest = useRoute();
    // const navigation = useNavigation();
    const SelectnavigationScreen = () => {

        if (routeRequest.params.navigateId == 1) {

            setScreenName('ServiceCall');

            navigation.navigate("ServiceCall");
            // console.log('Sacrren name'+screenName);

        } else if (routeRequest.params.navigateId == 2) {

            setScreenName("RouteScreen");
            // console.log(screenName);

            navigation.navigate("RouteScreen");

        } else {

            console.log('navigation id missing');
            setScreenName("Home");

            navigation.navigate("Home");
        }
        //console.log('Navigate id -'+routeRequest.params.navigateId);
    }

    const selection = (screen: string) => {
        if (screen == "ticket") {
            setLoadScreen(screen);
        } else if (screen == "location") {
            setLoadScreen(screen);
        } else if (screen == "serviceH") {
            setLoadScreen(screen);
        } else {
            setLoadScreen(screen);
        }
    }

    const enableService = (sid: any) => {



        if (ticketList.length > 0) {


            console.log("  tickets available ......  ", ticketList.length);




            enableServiceCall(sid, 1, (result: any) => {


                // console.log('---------------------', result);


                if (result === "success") {

                    // ToastAndroid.show("Service enable success ", ToastAndroid.SHORT);
                    setIsServiceActive(false);

                    UploadAttendStatus();


                } else {
                    setIsServiceActive(true);

                    Alert.alert(
                        "Failed...!",
                        "Service enable Failed.",
                        [
                            {
                                text: "OK", onPress: () => {

                                }
                            }
                        ]
                    );

                }

            });


        } else {
            console.log("  tickets not available ......  ");

            Alert.alert(
                "Failed...!",
                "No Available Tickets.",
                [
                    {
                        text: "OK", onPress: () => {

                        }
                    }
                ]
            );

        }



        getServiceData(sid);
        console.log(isServiceActive);

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

    const getServiceData = (call_id: any) => {

        console.log(call_id, "  ,,,,,,,,,,,,,,,,,,,,,,,, ******************  ");


        try {

            getServiceById(call_id, (result: any) => {

                console.log(result, "   ------------------------  ");

                for (let i = 0; i < result.length; ++i) {

                    setCusName(result[i].customer);
                    setContactName(result[i].contact_name);
                    setAddress(result[i].customer_address);
                    // setStatus(result[i].status);
                    setSeviceId(result[i].serviceId);
                    setContactNo(result[i].contact_no);
                    setLatitude(result[i].Latitude);
                    setLongitude(result[i].Longitude);
                    setSwebRefCallID(result[i].service_web_RefID);
                    // console.log(" result id //////////////////////   ",result[i].serviceId);

                    // AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID,result[i].serviceId);


                    console.log(" result id //////////////////////   ", result[i].Attend_status);
                    if (result[i].Attend_status === 0) {

                        setStatus("Open");
                        setIsServiceActive(true);

                    } else if (result[i].Attend_status === 1) {

                        setStatus("Pending");
                        setIsServiceActive(false);

                    } else if (result[i].Attend_status === 2) {

                        setStatus("Hold");
                        setIsServiceActive(true);

                    }

                    // console.log(result[i].Attend_status, " +++++++++++++++++", result[i].status);

                    // if (result[i].Attend_status === "0") {

                    //     setIsServiceActive(true);
                    //     console.log("false ......");


                    // } else if (result[i].Attend_status === "1") {

                    //     setIsServiceActive(false);
                    //     console.log("true ......");
                    // }
                }

                console.log(" active status ,,,,,,,,,,,,,,,,,,,,,,, ", isServiceActive);




            });

        } catch (error) {
            console.log(" service data serach ,,,,,,,,  ", error);

        }


        getTicketByServiceId(call_id, (result: any) => {

            setTicketList(result);

        });

    }

    const StartJourney = () => {


        if (isStarted) {
            setIsStarted(false);
        } else {
            setIsStarted(true);
        }


        selection("location")

        const maplatitude = parseFloat(latitude); // latitude of your desire location
        const maplongitude = parseFloat(longitude); // longitude of your desire location

        const scheme = Platform.select({
            ios: "maps:0,0?q=",  // if device is ios 
            android: "geo:0,0?q=", // if device is android 
        });
        const latLng = `${maplatitude},${maplongitude}`;
        const label = cusName;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        });

        Linking.openURL(url);


    }


    const UploadAttendStatus = () => {

        // 0 - Pending  1 - Ongoing  2 - Hold 3 - Completed

        const params =
        {
            "UserName": UserNameUpload,
            "UserID": UserIdUpload,
            "serviceId": webRefCallID,
            "Attend_status": "Ongoing",
            "created_At": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),

        }

        console.log(" =========== [][][][][] ============  ", params);


        get_ASYNC_TOCKEN().then(res => {
            // console.log('cus id--' + customerID)
            TOCKEN_KEY = res;
            const AuthStr = ` Bearer ${TOCKEN_KEY}`;

            const headers = {
                'Authorization': AuthStr
            }
            const URL = BASE_URL_GET + "service-call/attend-status";
            axios.put(URL, params, {
                headers: headers
            })
                .then((response) => {
                    console.log("[s][t][a][t][u][s][]", response.status);
                    if (response.status == 200) {

                        console.log('<------  SERVICE CALL ATTEND UPLOAD Method --->', response.data)
                        // console.log('uplode api response', response.data.ErrorId);
                        // console.log('web service call id', response.data.UniqueNo);
                        if (response.data.ErrorId == 0) {
                            console.log('SERVICE CALL ATTEND UPLOAD Method SUCCESS----');
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


    }

    const ViewLocation = () => {

        selection("location")

        const maplatitude = parseFloat(latitude); // latitude of your desire location
        const maplongitude = parseFloat(longitude); // longitude of your desire location

        const scheme = Platform.select({
            ios: "maps:0,0?q=",  // if device is ios 
            android: "geo:0,0?q=", // if device is android 
        });
        const latLng = `${maplatitude},${maplongitude}`;
        const label = cusName;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        });

        Linking.openURL(url);

    }

    // useEffect(() => {

    //     // SelectnavigationScreen();
    //     getCurrentServiceCallID().then(res => {
    //         callID = res;
    //         getServiceData(res);

    //         console.log(" not navigation ........  " , callID);
    //     })

    //     BackPressHandler((callback: any) => {

    //     });

    // }, [])

    // useEffect(() => {
    //     const focusHandler = navigation.addListener('focus', () => {
    //         getCurrentServiceCallID().then(res => {
    //             callID = res;
    //             getServiceData(res);

    //             console.log(" navigation ........  " , callID);
    //         })
    //         BackPressHandler((callback: any) => {

    //         });
    //     });
    //     return focusHandler;

    // }, [navigation]);



    useFocusEffect(
        React.useCallback(() => {
            getCurrentServiceCallID().then(res => {
                callID = res;
                getLoginUserNameForUplode();
                getServiceData(res);

                // console.log(" navigation ........  " , callID);
            })

        }, []),
    );

    return (
        <SafeAreaView style={ComStyles.CONTAINER}>
            <Header title="Request Details" isBtn={true} btnOnPress={() => SelectnavigationScreen()} />
            <View style={ComStyles.CONTENT}>
                <View style={{ padding: 10 }} />
                <ServiceCustomerDetails
                    customer={cusName}
                    reqNo={serviceId}
                    isService={true}
                    contactPerson={contactName}
                    contactNo={contactNo}
                    location={address}
                    status={status}
                    btnTite="Attend Service Request"
                    enable={!isServiceActive}
                    onPress={() => { enableService(serviceId) }}
                    typeNo="Request No" />

                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <ActionButton title="Tickets"
                        style={loadScreen == "ticket" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "ticket" ? style.activeText : style.deActiveText}
                        onPress={() => selection("ticket")} />

                    <ActionButton title="Locaton"
                        style={loadScreen == "location" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "location" ? style.activeText : style.deActiveText}
                        onPress={() => selection("location")} />

                    <ActionButton title="Service History"
                        style={loadScreen == "serviceH" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "serviceH" ? style.activeText : style.deActiveText}
                        onPress={() => selection("serviceH")} />

                    <ActionButton title="More Info"
                        style={loadScreen == "moreInfo" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "moreInfo" ? style.activeText : style.deActiveText}
                        onPress={() => selection("moreInfo")} />
                </View>

                <View style={{ flex: 1 }}>
                    {
                        loadScreen == "ticket" ?

                            <Tickets
                                btnEnable={isServiceActive}


                            />
                            :
                            loadScreen == "location" ?
                                <Locations
                                    btnTitle={isStarted ? "End Travel" : "Start Travel"}
                                    pressbtn={() => StartJourney()}
                                    btnTitle1={"View Location"}
                                    pressbtn1={() => ViewLocation()}
                                />

                                // <></>

                                :
                                loadScreen == "serviceH" ?
                                    <ServiceHistory />
                                    :
                                    <MoreInfo />

                    }

                </View>
            </View>
        </SafeAreaView>
    );
}
export default RequestDetails;