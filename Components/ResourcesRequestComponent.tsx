import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Platform, ToastAndroid, Alert
} from "react-native";
import ActionButton from "./ActionButton";
import comStyles from "../Constant/Components.styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import InputText from "./InputText";
import AdditionalSparepartsItem from "../SubComponents/AdditionalSparePartItem";
import ServiceCallItem from "../SubComponents/ServiceCallItem";
import { Tool, Vehicle } from "../Constant/DummyData";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getServiceId } from "../SQLiteDatabaseAction/DBControllers/ServiceController";
import { getLastServiceId, saveResourceRequest, getAllResource, DeleteResource, DeleteBackResource, RequestBydate, UpdateSavedToSubmitResource, isAddedTickets } from "../SQLiteDatabaseAction/DBControllers/ResourceRequestController";
import { getRESOURCE_ID, getRESOURCE_Type } from "../Constant/AsynStorageFuntion";
import { getServiceTicketID } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import Headernav from "./Header";
import { getCustomerIDAsyncStorage, get_ASYNC_TOCKEN } from "../Constant/AsynStorageFuntion";
import { BASE_URL_GET } from "../Constant/Commen_API_Url";
import axios from "axios";
import { updateSyncResourceRequest } from '../SQLiteDatabaseAction/DBControllers/ResourceRequestController';
var resourceID: any;
var Type: any;
var TOCKEN_KEY: any;
const ResourcesRequestComponent = (props: any) => {
    const { navigation, route } = props;
    const [startDate, setStartDate] = useState('');
    const [startDateValidate, setStartDateValidate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [ResourceID, setResourceID] = useState('');
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState('');
    const [remark, setRemark] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [serviceCallIdList, setserviceCallIdList] = useState([]);
    const [selectServiceCallID, setselectServiceCallID] = useState(null);
    const [lastServiceID, setLastServiceID] = useState([]);
    const [ListResourceData, setListResourceData] = useState([]);
    const [ListResResultData, setListResResultData] = useState([]);
    const [serviceId, setServiceId] = useState('');
    const [Header, setHeader] = useState('');
    const [btnHeader, setbtnHeader] = useState('');
    const [resouceType, setResouceType] = useState('');

    const AddVehicle = () => {
        console.log(selectServiceCallID);
        if (startDate != "") {
            if (endDate != "") {
                if (selectServiceCallID != null || selectServiceCallID == "") {

                    SaveDatabase();
                } else {
                    ToastAndroid.show("Please Select Service Ticket..!  ", ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show("Please Select Handover Date..!  ", ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show("Please Select Request Date..!  ", ToastAndroid.SHORT);
        }

    }
    const SaveDatabase = () => {
        console.log(remark);


        // isAddedTickets();

        var datec = moment().format('YYYY-MM-DD');
        const jsonData = [
            {

                RequestDate: startDate,
                HandoverDate: endDate,
                ServiceCall_id: selectServiceCallID,
                ResourceType: Type,
                Remark: remark,
                RequestID: serviceId,
                ResourceID: ResourceID,
                CreatedDate: datec,
                status: "0",

            }
        ]

        // console.log(jsonData, "????????????????????????????????????");


        isAddedTickets(serviceId, ResourceID, selectServiceCallID, (result: any) => {

            // console.log(" count ..........  " , result);

            if (result[0].count > 0) {

                Alert.alert(
                    "Already Reserved !",
                    "This Resource is already reserved for selected ticket.",
                    [
                        {
                            text: "OK", onPress: () => {

                            }
                        }
                    ]);

            } else {

                saveResourceRequest(jsonData, (result: any) => {
                    console.log(result, "request save");
                    GelAllResource();

                });
            }
        });




    }

    // uplode funtion 

    const UploadResourcesRequest = () => {
        try {

            var datec = moment().format('YYYY-MM-DD');

            get_ASYNC_TOCKEN().then(res => {
                TOCKEN_KEY = res;
                const AuthStr = 'Bearer '.concat(TOCKEN_KEY);

                // console.log( 'AuthStr####3%%%%%%%%%%%%%',AuthStr);

                const prams = {
                    "objSparePartList": [
                        {
                            "ResorceRequestID": ResourceID,  //need to code
                            "ticketId": selectServiceCallID,
                            "resourceID": serviceId,
                            "ResourceType": Type,
                            "request_Date": startDate,
                            "handover_Date": endDate,
                            "Remark": remark,
                            "created_At": datec,


                        }
                    ]
                }

                console.log('--NEW resources  UPLOAD JSON--', prams);

                const headers = {
                    'Authorization': AuthStr
                }
                const URL = BASE_URL_GET + "resource";
                axios.post(URL, prams, {
                    headers: headers
                })
                    .then((response) => {
                        console.log("[s][t][a][t][u][s][]", response.status);
                        if (response.status == 200) {

                            console.log('<------ SpareParts UPLOAD Method --->', response.data)
                            console.log(response.data.UniqueNo);

                            if (response.data.ErrorId = 0) {
                                // this use fro update sync flag as 1 
                                updateSyncResourceRequest(response.data.UniqueNo, (result: any) => {

                                });
                                ToastAndroid.show(response.data.ErrorDescription, ToastAndroid.LONG);
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

                    })

            })
        } catch (error) {
            console.log(">>>>>>>>>>>>", error);

        }
    }
    const generateCallID = () => {

        //console.log(" generate ********************");

        getLastServiceId((result: any) => {
            // let serviceID = result + 1;
            setLastServiceID(result);

            const uniqueID: any[] = [];

            if (result.length == 0) {
                GetLastID(0);
            } else {

                for (let i = 0; i < result.length; ++i) {

                    GetLastID(result[i]._Id);

                }

            }



            // lastServiceID.map(sid => {
            //     if(uniqueID.indexOf(sid._Id) === -1){

            //         GetLastID(sid._Id);
            //     }
            // });

        });
    };
    const GetLastID = (id: any) => {

        var serviceID = parseInt(id) + 1;
        console.log(serviceID, "  ///////////////////////////////////////   ");

        setServiceId("SR_" + moment().utcOffset('+05:30').format('YYYY-MM-DD') + "_" + serviceID);
    }


    const submitRequest = () => {

        console.log(ListResourceData.length);

        UpdateSavedToSubmitResource(serviceId, (result: any) => {

            if (ListResourceData.length > 0) {
                // navigation.navigate('VehicleCalendar');
                if (Type === "Vehicle") {
                    ToastAndroid.show(" Vehicle reserved success  ", ToastAndroid.SHORT);
                    navigation.navigate('VehicleCalendar');
                } else if (Type === "Tool") {
                    ToastAndroid.show(" Tool reserved success   ", ToastAndroid.SHORT);
                    navigation.navigate('ToolCalendar');
                }
            } else {
                ToastAndroid.show("Please Select Service Call..!  ", ToastAndroid.SHORT);
            }

        });




    };

    useEffect(() => {


        generateCallID();
        console.log("<<<<<<<<<<<<<<<<<<<<<<");
        getRESOURCE_ID().then(res => {
            resourceID = res;
            console.log(res, '+++++++++++++++++++++');
            setResourceID(resourceID)
        });

        getRESOURCE_Type().then(res => {
            Type = res;
            if (Type === "Vehicle") {
                console.log("***************************VEHI");
                setbtnHeader('Submit Vehicle Request')
                setHeader('Request Vehicle')
            } else if (Type === "Tool") {
                console.log("***************************TOOL");
                setHeader('Request Tool')
                setbtnHeader('Submit Tool Request')
            }
            console.log(Type, '+++++++++65541651651++++++++++++');

        });

        getServiceCallID();


        GelAllResource();
    }, [])


    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;

        setShow(Platform.OS === 'ios');

        RequestBydate(moment(new Date(currentDate)).format('YYYY-MM-DD'), ResourceID, (result: any) => {


            // setListResResultData(result);

            if (result != "") {


                console.log("result ***************  ", result);
                // already booked

                Alert.alert(
                    "Already Reserved !",
                    "This Resource is already reserved for selected date.",
                    [
                        {
                            text: "OK", onPress: () => {

                            }
                        }
                    ]);


            } else {

                // ............................................

                if (dateType == "fromDate") {

                    if (endDate != "") {

                        if (endDate != 'Invalid date') {


                            if (moment(new Date(currentDate)).format('YYYY-MM-DD') < moment(new Date(endDate)).format('YYYY-MM-DD')) {

                                setStartDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))
                                setStartDateValidate(moment(new Date(currentDate)).format('YYYY, MM, DD'))

                            } else {

                                ToastAndroid.show("The Start date must be less than the end date ", ToastAndroid.SHORT);

                            }


                        } else {

                            setStartDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))
                            setStartDateValidate(moment(new Date(currentDate)).format('YYYY, MM, DD'))

                        }

                    } else {

                        setStartDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))
                        setStartDateValidate(moment(new Date(currentDate)).format('YYYY, MM, DD'))
                    }



                } else {

                    if (startDate != "") {

                        if (startDate != 'Invalid date') {

                            console.log(" .................   ", startDate, moment(new Date(currentDate)).format('YYYY-MM-DD'));

                            if (moment(new Date(currentDate)).format('YYYY-MM-DD') > moment(new Date(startDate)).format('YYYY-MM-DD')) {

                                setEndDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))

                                RequestBydate(endDate, ResourceID, (result: any) => {

                                    console.log("result ***************  ", result);
                                    setListResResultData(result);


                                });


                            } else {

                                ToastAndroid.show("The End date must be greater than the start date ", ToastAndroid.SHORT);

                            }


                        } else {

                            ToastAndroid.show("Please Select Start Date ", ToastAndroid.SHORT);

                        }

                    } else {

                        ToastAndroid.show("Please Select Start Date ", ToastAndroid.SHORT);

                    }


                }


            }


        });




        console.log(startDateValidate);
    };

    const GelAllResource = () => {
        getAllResource(serviceId, (result: any) => {

            console.log(result);
            setListResourceData(result)

        });
    }
    const HandleDelete = (data: any) => {
        console.log(data);
        Alert.alert(
            "Remove",
            "Are you sure Remove Item",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => RemoveItem(data) }
            ]);

    }
    const RemoveItem = (data: any) => {
        DeleteResource(data, (result: any) => {

            ToastAndroid.show("Deleted ", ToastAndroid.SHORT);
            GelAllResource();
        });

    }
    const showDatePicker = (currentMode: any) => {
        setShow(true);
        setDateType(currentMode)
    };

    const backFuntion = () => {
        Alert.alert(
            "Discard",
            "Are you sure Discard Request",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => backFuntionData() }
            ]);

    }
    const backFuntionData = () => {


        DeleteBackResource(0, (result: any) => {

            navigation.goBack()
        });

    }
    const getServiceCallID = () => {


        // getServiceId((result: any) => {

        //     setserviceCallIdList(result);


        // });

        getServiceTicketID((result: any) => {
            setserviceCallIdList(result);

        });


    }
    return (
        <SafeAreaView style={comStyles.CONTAINER} >
            <Headernav title={Header} isBtn={true} btnOnPress={() => navigation.goBack()} />
            <View style={comStyles.CONTENT}>
                <FlatList
                    ListHeaderComponent={
                        <View>

                            <ActionButton
                                title={serviceId}
                                disabled={true}
                                style={style.subTitle}
                                textStyle={style.textStyle}
                            />

                            <ActionButton
                                title={ResourceID}
                                disabled={true}
                                style={style.subTitle}
                                textStyle={style.textStyle}
                            />

                            <TouchableOpacity onPress={() => showDatePicker("fromDate")}>
                                <InputText
                                    placeholder="Request Date *"
                                    placeholderColor={comStyles.COLORS.HEADER_BLACK}
                                    is_back_icon={true}
                                    back_icon_name="calendar"
                                    editable={false}
                                    backiconClr={comStyles.COLORS.WHITE}
                                    style={comStyles.serviceTicketInput}
                                    stateValue={startDate}
                                    setState={setStartDate}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => showDatePicker("toDate")}>
                                <InputText
                                    placeholder="Handover Date *"
                                    placeholderColor={comStyles.COLORS.HEADER_BLACK}
                                    is_back_icon={true}
                                    back_icon_name="calendar"
                                    editable={false}
                                    backiconClr={comStyles.COLORS.WHITE}
                                    style={comStyles.serviceTicketInput}
                                    stateValue={endDate}
                                    setState={setEndDate}
                                />
                            </TouchableOpacity>

                            <InputText
                                placeholder="Remarks"
                                placeholderColor={comStyles.COLORS.HEADER_BLACK}
                                style={comStyles.serviceTicketInput}
                                stateValue={remark}
                                setState={setRemark}
                                max={150}
                            />
                            <View style={{ zIndex: 50 }}>

                                <Dropdown
                                    style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                                    placeholderStyle={style.placeholderStyle}
                                    selectedTextStyle={style.selectedTextStyle}
                                    inputSearchStyle={style.inputSearchStyle}
                                    iconStyle={style.iconStyle}
                                    data={serviceCallIdList}
                                    search
                                    maxHeight={300}
                                    labelField="ticketId"
                                    valueField="_Id"
                                    placeholder={!isFocus ? 'Select Service Ticket ID' : '...'}
                                    searchPlaceholder="Search Service Ticket ID "
                                    value={serviceCallIdList}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        // console.log(item.serviceId);

                                        setselectServiceCallID(item.ticketId);
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
                            <ActionButton
                                title="Add"
                                style={style.partsBtn}
                                textStyle={{ color: comStyles.COLORS.ICON_BLUE, }}
                                is_icon={true}
                                onPress={AddVehicle}
                                iconColor={comStyles.COLORS.ICON_BLUE}
                                icon_name="diff-added"
                            />
                            <View style={{ alignContent: "flex-start" }}>
                                <Text style={style.textStyle}>Added Service Tickets</Text>
                            </View>

                            <View style={{ flexDirection: 'row', backgroundColor: comStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
                                <Text style={{ flex: 1, textAlign: "left" }}>Service Ticket ID</Text>
                                <Text style={{ flex: 2, textAlign: "left" }}>Content</Text>
                                <Text style={{ flex: 0, textAlign: "right" }}></Text>
                            </View>

                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    ListEmptyComponent={<View style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontWeight: '700', color: 'red' }}>No data Available</Text></View>}
                    data={ListResourceData}
                    style={{ marginTop: 5, marginBottom: 5, flex: 2 }}
                    renderItem={({ item }) => {
                        return (

                            <ServiceCallItem
                                id={item._Id}
                                iconPress={() => HandleDelete(item._Id)}
                                description={item.ServiceCall_id}
                                quantity={item.content}
                                is_icon={true} />
                        );
                    }}
                    keyExtractor={item => `${item._Id}`}
                />

                {/* <ActionButton
                title="Add Another Service Call"
                style={style.partsBtn}
                textStyle={{ color: comStyles.COLORS.ICON_BLUE, }}
                is_icon={true}
                iconColor={comStyles.COLORS.ICON_BLUE}
                icon_name="diff-added"
            /> */}

                <ActionButton
                    title={btnHeader}
                    style={{ marginBottom: 70 }}
                    onPress={submitRequest}
                />

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    // minimumDate={new Date(2022, 11, 20)}
                    />
                )}

            </View>

        </SafeAreaView >
    );

}

const style = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: 8,
    },

    modalSubContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 5

    },
    placeholderStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: comStyles.COLORS.BLACK
    },
    selectedTextStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: comStyles.COLORS.ICON_BLUE
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
    icon: {
        marginRight: 5,
        color: comStyles.COLORS.HEADER_BLACK,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    modalRegularTitle: {
        fontFamily: comStyles.FONT_FAMILY.REGULAR,
        color: comStyles.COLORS.HEADER_BLACK,
        fontSize: 15,
        marginRight: 5
    },

    modalTitle: {

        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
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
        color: comStyles.COLORS.WHITE,
        fontSize: 15,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 10
    },
    ActionButton: {
        marginTop: 20,
        marginBottom: 10
    },
    maintxt: {
        color: comStyles.COLORS.BLACK,
        fontSize: 18,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 15,
        alignSelf: "center"
    },
    subTitle: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderColor: '#dcdcdc',
        borderWidth: 1,
        textAlignVertical: "center",
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 10
    },
    btn: {
        backgroundColor: comStyles.COLORS.ICON_BLUE,
        color: comStyles.COLORS.WHITE
    },
    iconBtn: {
        marginTop: 10,
        backgroundColor: comStyles.COLORS.ICON_BLUE,
        color: comStyles.COLORS.WHITE

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
        marginTop: 5,
        marginBottom: 15,
        alignSelf: "center"
    },
    partsBtn: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderColor: comStyles.COLORS.WHITE,
        borderWidth: 1,
        textAlignVertical: "center",
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 10,
        color: comStyles.COLORS.ICON_BLUE,

    }


});

export default ResourcesRequestComponent;