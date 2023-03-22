/**
* @author Gagana Lakruwan
*/
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Animated,
    Keyboard,
    Platform,
    ToastAndroid,
    Alert,
} from "react-native";
import { cleanSingle } from "react-native-image-crop-picker";
import ActionButton from "../../../Components/ActionButton";
import AddAdditionalSpareParts from "../../../Components/AddAdditionalSpareParts";
import AddSparePartsComponent from "../../../Components/AddSparePartsComponent";
import CompleteTicket from "../../../Components/CompleteTicket";
import Expences from "../../../Components/Expences";
import Header from "../../../Components/Header";
import Locations from "../../../Components/Locations";
import MoreInfo from "../../../Components/MoreInfo";
import RequestBottomSheet from "../../../Components/RequestBottomSheet";
import ServiceCustomerDetails from "../../../Components/ServiceCustomerDetails";
import ServiceHistory from "../../../Components/ServiceHistory";
import SpareParts from "../../../Components/SpareParts";
import TicketDocuments from "../../../Components/TicketDocuments";
import TicketMoreInfo from "../../../Components/TicketMoreInfo";
import Tickets from "../../../Components/Tickets";
import TicketsHistory from "../../../Components/TicketsHistory";
import AsyncStorageConstants from "../../../Constant/AsyncStorageConstants";
import { getCurrentServiceCallID, getLoginUserName, get_ASYNC_TOCKEN, get_ASYNC_USERID } from "../../../Constant/AsynStorageFuntion";
import ComStyles from "../../../Constant/Components.styles";
import { getServiceById } from "../../../SQLiteDatabaseAction/DBControllers/ServiceController";
import { getSparePartsAllData } from "../../../SQLiteDatabaseAction/DBControllers/SparePartsController";
import { getTicketById, updateTicketAttendStatus, updateTicketStatus, getServiceTicketForReport, updateActualStartDate, getALLAInventrySpareTiketdetasils, getALLTicketById } from "../../../SQLiteDatabaseAction/DBControllers/TicketController";
import style from "./style";
import moment from 'moment';
import { BASE_URL_GET } from "../../../Constant/Commen_API_Url";
import axios from "axios";
const currentstsartDate = moment().format('YYYY-MM-DD HH:mm:ss');
console.log('this is a currnt start date=====' + currentstsartDate);
let height = Dimensions.get("screen").height;

var UserNameUpload: any;
var UserIdUpload: any;
var TOCKEN_KEY: any;

const TicketDetails = (props: any) => {

    const {
        navigation, route
    } = props;

    const [loadScreen, setLoadScreen] = useState('moreInfo');
    const [isServiceActive, setIsServiceActive] = useState(true);
    // const navigation = useNavigation();
    const [ticketID, setTicketID] = useState('');
    const [isShowSweep, setIsShowSweep] = useState(true);
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [isSparepart, setIsSparepart] = useState(true);
    const [isAdditional, setIsAdditional] = useState(true);
    const [customer, setCustomer] = useState('');
    const [status, setStatus] = useState('');
    const [technician, setTechnician] = useState('');
    const [location, setLocation] = useState('');
    const [contact_no, setContactNo] = useState('');
    const [serviceCall_ID, setServiceCall_ID] = useState('');
    const [callDetailList, setCallDetailList]: any[] = useState([]);
    const [SparePartList, setSparePartList]: any[] = useState([]);
    const currentstsartDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const [webRefCallID, setSwebRefCallID] = useState('');
    const [webRefTicketID, setwebRefTicketID] = useState('');

    // console.log('this is a currnt start date=====' + currentstsartDate);

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

    const getServiceCallDetails = (SID: any) => {

        // console.log("service id of ticket id ....... ********** ", SID);

        getServiceById(SID, (result: any) => {

            setCallDetailList(result);

            setSwebRefCallID(result[0].service_web_RefID);
            // console.log("=========================  ", result);
            // console.log("=========================  ", result[0].service_web_RefID);
            // console.log(result, "   call details ..........   ", callDetailList);


        });


    }

    const getSpareParts = () => {

        // getALLAInventrySpareTiketdetasils(ticketID,(response:any) => {

        //     setSparePartList(response);
        // });


        getSparePartsAllData((result: any) => {
            setSparePartList(result);



            // console.log(" Spare Parts  ................  " , result );

        });
    }
    //checck table update

    const checktable = () => {

        getServiceTicketForReport((result: any) => {

            // console.log("/////////////////***" + result);


        });


    }

    const enableServiceTicket = (ticket_id: any) => {

        if (!isServiceActive) {
            // ToastAndroid.show("Ticket Completed ", ToastAndroid.SHORT);
            navigation.navigate("CompleteTicket")

        } else {



            getServiceById(serviceCall_ID, async (result: any) => {

                const sts = result[0].Approve_status;

                if (sts != 1) {

                    Alert.alert('Service Call Not Approved', ' Please Approve the Service Call First!', [
                        {
                            text: 'OK',
                            onPress: () => { },
                        },
                    ]);

                } else {

                    setIsServiceActive(!isServiceActive);
                    // console.log(isServiceActive);
                    updateActualStartDate(ticket_id, currentstsartDate, (result: any) => {
                        // console.log('Hii this is update actual start date *********' + result);

                    });

                    updateTicketAttendStatus(ticket_id, 1, async (result: any) => {

                        if (result === "success") {


                            await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID, ticket_id);

                            UploadTicketAttendStatus();

                            ToastAndroid.show("Ticket Started ", ToastAndroid.SHORT);
                            setStatus("Pending");

                        } else {

                            Alert.alert(
                                "Failed...!",
                                "Ticket Start Failed.",
                                [
                                    {
                                        text: "OK", onPress: () => {

                                        }
                                    }
                                ]
                            );

                        }

                    });


                }
            });


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


    const UploadTicketAttendStatus = () => {

        // 0 - Pending  1 - Ongoing  2 - Hold 3 - Completed

        const params =
        {
            "UserID": UserIdUpload,
            "ticketId": webRefTicketID,
            "serviceId": webRefCallID,
            "attend_status": "Ongoing",
            "created_At": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
        }

        console.log(" =========== [][][][][] TICKET START UPLOAD JSON ============  ",params);
        

        get_ASYNC_TOCKEN().then(res => {
            // console.log('cus id--' + customerID)
            TOCKEN_KEY = res;
            const AuthStr = ` Bearer ${TOCKEN_KEY}`;

            const headers = {
                'Authorization': AuthStr
            }
            const URL = BASE_URL_GET + "service-ticket/status";
            axios.put(URL, params, {
                headers: headers
            })
                .then((response) => {
                    console.log("[s][t][a][t][u][s][]", response.status);
                    if (response.status == 200) {

                        console.log('<------  SERVICE CALL START UPLOAD Method --->', response.data)
                        // console.log('uplode api response', response.data.ErrorId);
                        // console.log('web service call id', response.data.UniqueNo);
                        if (response.data.ErrorId == 0) {
                            console.log('SERVICE CALL START UPLOAD Method SUCCESS----');
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

    const getTicketDetails = (ticketId: any) => {

        // console.log("TICKET ID ,,,,,,,,,, ", ticketId);


        getTicketById(ticketId, (result: any) => {

            console.log(" TICKET DETAILS *********  " , result);
            
            for (let i = 0; i < result.length; ++i) {

               
                setCustomer(result[i].customer);
                setTechnician(result[i].assignTo);
                setLocation(result[i].customer_address);
                setContactNo(result[i].contact_no);
                setServiceCall_ID(result[i].serviceId);
                setwebRefTicketID(result[i].Ticket_web_RefID);

                // console.log("^^^^^^^^^^^^^^^^^^^^^^^    "  , result[i].serviceId,   " ...........  " ,serviceCall_ID);

                getServiceCallDetails(result[i].serviceId);

                if (result[i].attend_status === 0) {

                    setStatus("Open");
                    setIsServiceActive(true);

                } else if (result[i].attend_status === 1) {

                    setStatus("Pending");
                    setIsServiceActive(false);

                } else if (result[i].attend_status === 2) {

                    setStatus("Hold");
                    setIsServiceActive(true);

                } else if (result[i].attend_status === 3) {
                    setStatus("Completed");
                    setIsServiceActive(false);
                }

            }

        });

        // updateTicketStatus(ticketId,1,(result:any) =>{



        // })
    }


    const setectSparePart = async () => {
        // selection("spareparts");
        // getSpareParts();

        // console.log("Ticket id ........ " , ticketID);

        
        await AsyncStorage.setItem(AsyncStorageConstants.SELECT_TICKET, 'false');
        navigation.navigate("RequestBottomSheet");



        // getALLTicketById(ticketID, async (result: any) => {

        //     // console.log("db result " ,  result[0].attend_status);


        //     if (result[0].attend_status == 1) {

        //         // console.log("awaaaaaaaaaaa");


        //         await AsyncStorage.setItem(AsyncStorageConstants.SELECT_TICKET, 'false');
        //         navigation.navigate("RequestBottomSheet");

        //     } else {

        //         Alert.alert(
        //             "Failed...!",
        //             "Please start ticket..",
        //             [
        //                 {
        //                     text: "OK", onPress: () => {

        //                     }
        //                 }
        //             ]
        //         );


        //     }

        // });
    }

    useFocusEffect(

        React.useCallback(() => {

            checktable();
            if (route.params.tab == 'Expences') {

                selection("documents");

            }
            setTicketID(route.params.ticketID);
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID, route.params.ticketID);
            getTicketDetails(route.params.ticketID);
            getLoginUserNameForUplode();

        }, []),
    );


    // useEffect(() => {
    //     checktable();
    //     if (route.params.tab == 'Expences') {

    //         selection("documents");

    //     }
    //     setTicketID(route.params.ticketID);
    //     AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID, route.params.ticketID);
    //     getTicketDetails(route.params.ticketID);
    //     getSpareParts();

    // }, [])


    // useEffect(() => {
    //     const focusHandler = navigation.addListener('focus', () => {

    //         if (route.params.tab == 'Expences') {

    //             selection("documents");

    //         }
    //         setTicketID(route.params.ticketID);
    //         AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID, route.params.ticketID);
    //         getTicketDetails(route.params.ticketID);
    //         getSpareParts();

    //     });
    //     return focusHandler;
    // }, [navigation])


    return (
        <SafeAreaView style={ComStyles.CONTAINER}>

            {/* <Animated.View
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
                <View style={style.modalCont}> */}

            {/* {isSparepart ?
                        <RequestBottomSheet
                            onpressicon={() => slideOutModal()}
                            addAdditional={() => setIsAdditional(false)}
                            addOnpress={() => setIsSparepart(false)}
                        />
                        :
                        <AddSparePartsComponent
                            onpressicon={() => slideOutModal()}
                            onpress={() => setIsSparepart(true)}
                        />


                    } */}

            {/* <CompleteTicket
                        onpressicon={() => slideOutModal()}
                    /> */}

            {/* {isAdditional ?

                        <RequestBottomSheet
                            onpressicon={() => slideOutModal()}
                            addAdditional={() => setIsAdditional(false)}
                            addOnpress={() => setIsSparepart(false)}
                        />
                        :

                        <AddAdditionalSpareParts
                            onpressicon={() => slideOutModal()}
                            onpress={() => setIsAdditional(true)}
                        />
                    } */}

            {/* </View>
            </Animated.View> */}


            <Header title="Tickets Details" isBtn={true} btnOnPress={() => navigation.goBack()} />
            <View style={ComStyles.CONTENT}>
                <View style={{ padding: 10 }} />
                <ServiceCustomerDetails
                    customer={customer}
                    reqNo={ticketID}
                    isService={false}
                    contactPerson={technician}
                    contactNo={contact_no}
                    location={location}
                    status={status}
                    btnTite={isServiceActive ? "Start Ticket" : "Complete Tickets"}
                    onPress={() => { enableServiceTicket(ticketID) }}
                    typeNo="Ticket No"
                    btnStyle={!isServiceActive ? { backgroundColor: ComStyles.COLORS.LOW_BUTTON_GREEN } : ""} />

                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <ActionButton title="More Info"
                        style={loadScreen == "moreInfo" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "moreInfo" ? style.activeText : style.deActiveText}
                        onPress={() => selection("moreInfo")} />

                    <ActionButton title="Spare Parts"
                        style={loadScreen == "spareparts" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "spareparts" ? style.activeText : style.deActiveText}
                        onPress={() => setectSparePart()} />

                    <ActionButton title="Call Details"
                        style={loadScreen == "serviceH" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "serviceH" ? style.activeText : style.deActiveText}
                        onPress={() => selection("serviceH")} />

                    <ActionButton title="Expences"
                        style={loadScreen == "documents" ? style.activeBtn : style.deActiveBtn}
                        textStyle={loadScreen == "documents" ? style.activeText : style.deActiveText}
                        onPress={() => selection("documents")} />
                </View>

                <View style={{ flex: 1 }}>
                    {
                        loadScreen == "moreInfo" ?
                           
                            <TicketMoreInfo
                             ID={route.params.ticketID} 
                             />
                            :
                            loadScreen == "spareparts" ?
                                <SpareParts
                                    sparePartList={SparePartList}
                                    isActive={isServiceActive}
                                    ticketID={ticketID}

                                />

                                :
                                loadScreen == "serviceH" ?

                                <MoreInfo />
                                    // <TicketsHistory />
                                    :
                                    <Expences
                                        isActive={isServiceActive} />



                    }

                </View>
            </View>
        </SafeAreaView>
    );
}
export default TicketDetails;


const styles = StyleSheet.create({
    container: {}
});