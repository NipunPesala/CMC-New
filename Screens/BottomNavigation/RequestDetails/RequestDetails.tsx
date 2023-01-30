/**
* @author Gagana Lakruwan
*/
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation ,useRoute} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ToastAndroid,
    Alert
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
import { getCurrentServiceCallID } from "../../../Constant/AsynStorageFuntion";
import { getTicketByServiceId } from "../../../SQLiteDatabaseAction/DBControllers/TicketController";

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
    var callID: any;
    const routeRequest=useRoute();
    // const navigation = useNavigation();
    const SelectnavigationScreen=()=>{
        if(routeRequest.params.navigateId==1){
            setScreenName('ServiceCall');
           // console.log('Sacrren name'+screenName);
        }else if(routeRequest.params.navigateId==2){
            setScreenName('RouteScreen');
           // console.log(screenName);
        }else{
        console.log('navigation id missing');
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

        

        if(ticketList.length > 0){
            

            console.log("  tickets available ......  " , ticketList.length);

            enableServiceCall(sid, 1, (result: any) => {

                if (result === "success") {
    
                    ToastAndroid.show("Service enable success ", ToastAndroid.SHORT);
    
                    
    
                } else {
    
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
            

        }else{
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

    const getServiceData = (call_id: any) => {

        console.log(call_id, "  ,,,,,,,,,,,,,,,,,,,,,,,, ******************  ");


        try {

            getServiceById(call_id, (result: any) => {

                console.log(call_id, "   ------------------------  ");

                for (let i = 0; i < result.length; ++i) {

                    setCusName(result[i].customer);
                    setContactName(result[i].contact_name);
                    setAddress(result[i].customer_address);
                    setStatus(result[i].status);
                    setSeviceId(result[i].serviceId);
                    setContactNo(result[i].contact_no);
                    // console.log(" result id //////////////////////   ",result[i].serviceId);

                    // AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID,result[i].serviceId);



                    if (result[i].Attend_status === "0") {

                        setStatus("Open");

                    } else if (result[i].Attend_status === "1") {

                        setStatus("Ongoing");

                    } else if (result[i].Attend_status === "2") {

                        setStatus("Hold");

                    }

                    console.log(result[i].Attend_status, " +++++++++++++++++",result[i].status);

                    if (result[i].Attend_status === "0") {

                        setIsServiceActive(true);
                        console.log("false ......");


                    } else if (result[i].Attend_status === "1") {

                        setIsServiceActive(false);
                        console.log("true ......");
                    }
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

    useEffect(() => {
        SelectnavigationScreen();
        getCurrentServiceCallID().then(res => {
            callID = res;
            getServiceData(res);
        })

        BackPressHandler((callback: any) => {

        });

    }, [])

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getCurrentServiceCallID().then(res => {
                callID = res;
                getServiceData(res);
            })
            BackPressHandler((callback: any) => {

            });
        });
        return focusHandler;

    }, [navigation]);


    return (
        <SafeAreaView style={ComStyles.CONTAINER}>
            <Header title="Request Details" isBtn={true} btnOnPress={() => navigation.navigate(screenName)} />
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
                            enableStatusUpdate={!isServiceActive}
                             />
                            :
                            loadScreen == "location" ?
                                <Locations />
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