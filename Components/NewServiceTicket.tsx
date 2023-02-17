/**
* @author Madushika Sewwandi
*/
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
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
} from "react-native";
import comStyles from "../Constant/Components.styles";
import Header from "./Header";
import ActionButton from "./ActionButton";
import InputText from "./InputText";
import DropDownPicker from 'react-native-dropdown-picker';
import { addNewTicket } from "../Services/Api/SyncService";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { getCallDates, getServiceCallCustomer, getServiceId } from "../SQLiteDatabaseAction/DBControllers/ServiceController";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getLastTicketId, saveTicket, getALLTicketById, updateTicket, updateSyncServiceTicket } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import { getAllPriority } from "../SQLiteDatabaseAction/DBControllers/PriorityController";
import { getAllUserTypes } from "../SQLiteDatabaseAction/DBControllers/Users_TypesController";
import Toast from 'react-native-toast-message';
import { getCustomerIDAsyncStorage, get_ASYNC_TOCKEN } from "../Constant/AsynStorageFuntion";
import { getCalendarDateString } from "react-native-calendars/src/services";
import axios from "axios";
import { getTicketDetailsFromID } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import { BASE_URL_GET } from "../Constant/Commen_API_Url";
import { getUserByTypes } from "../SQLiteDatabaseAction/DBControllers/UserController";


var selectMode: any
var TiketID: any
var prority: any
var Assistance: any
// const NewServiceTicket = ({ onClose, onpressclose }: ParamTypes) => {
const NewServiceTicket = (props: any) => {
    const { navigation, route } = props;
    // const clostModalc = onClose.bind(this);
    const [openPriority, setOpenPriority] = useState(false);
    const [openAssignPerson, setOpenAssignPerson] = useState(false);
    const [openSeriviceCallID, setopenSeriviceCallID] = useState(false);
    const [priorityList, setPriorityList] = useState([]);
    const [assignPersonList, setAssignPersonList] = useState([]);
    const [serviceCallIdList, setserviceCallIdList] = useState([]);
    const [selectAssignPerson, setSelectAssignPerson] = useState(null);
    const [selectPriority, setSelectPriority] = useState(null);
    const [selectServiceCallID, setselectServiceCallID] = useState(null);
    const [lastTicketID, setLastTicketID]: any[] = useState([]);
    const [TicketID, setTicketID] = useState('');
    const [TextHeader, setTextHeader] = useState('');
    const [ButtonTitle, setButtonTitle] = useState('');
    const [content, setContent] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [Customer, setCustomer] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [callStartDate, setCallStartDate] = useState('');
    const [callEndDate, setCallEndDate] = useState('');
    const routeNav = useRoute();
    var TOCKEN_KEY: any;
    const onChangePicker = (event, type) => {
        switch (type) {
            case "serviceCallId":
                setselectServiceCallID(event);
            case "priority":
                setSelectPriority(event);
            case "assign":
                setSelectAssignPerson(event);
                break;
            default:
                break;
        }
    }
    const sendData = () => {



        const jsonData = [
            {
                ticketId: TicketID,
                serviceId: selectServiceCallID,
                content: content,
                itemDescription: "sample",
                startDate: startDate,
                endDate: endDate,
                priority: selectPriority,
                assignTo: selectAssignPerson,
                attend_status: "0",
                status: '0',
                engRemark: '',
                cusNic: '',
                cusRemark: '',
                signatureStatus: '',
                syncStatus: 'true',
                actualstartDate: '',
                actualendtDate: '',
            }
        ]
        if (selectServiceCallID != null) {
            if (selectPriority != null) {
                if (selectAssignPerson != null) {
                    if (content != "") {
                        if (startDate != "") {
                            if (endDate != "") {
                                if (startDate != 'Invalid date') {
                                    if (endDate != 'Invalid date') {

                                        if (selectMode == 0) {
                                            console.log('add');
                                            save_data(jsonData);
                                        } else {
                                            console.log('Update');
                                            update_data(jsonData);
                                        }

                                    } else {
                                        ToastAndroid.show("Please Select Valid End Date..!  ", ToastAndroid.SHORT);
                                    }
                                } else {
                                    ToastAndroid.show("Please Select Valid Start Date..!  ", ToastAndroid.SHORT);
                                }

                            } else {
                                ToastAndroid.show("Please Select End Date..!  ", ToastAndroid.SHORT);
                            }
                        } else {
                            ToastAndroid.show("Please Select Start Date..!  ", ToastAndroid.SHORT);
                        }
                    } else {
                        ToastAndroid.show("Please Enter Content..!  ", ToastAndroid.SHORT);
                    }

                } else {
                    ToastAndroid.show("Please Select Technician..!  ", ToastAndroid.SHORT);
                }

            } else {
                ToastAndroid.show("Please Select Ticket Priority..!  ", ToastAndroid.SHORT);
            }

        } else {
            ToastAndroid.show("Please Select Service Call..!  ", ToastAndroid.SHORT);
        }
    }
    const update_data = (data: any) => {
        updateTicket(data[0].serviceCallId, startDate, endDate, "sample", content, data[0].assignPerson, data[0].priority, "0", "0", "", "", "", "", TicketID, (result: any) => {
            ToastAndroid.show("Ticket Update Success ", ToastAndroid.SHORT);
            navigation.navigate('ServiceTicketList');
        });
    }
    const save_data = (data: any) => {
        try {
            saveTicket(data, (result: any) => {
                if (result === "success") {

                    //need check internet connection true false
                    //  UploadServiceTicket();

                    ToastAndroid.show("New Service Ticket Create Success ", ToastAndroid.SHORT);
                    navigation.navigate('Home');
                } else {
                    Alert.alert(
                        "Failed...!",
                        "Service Ticket Save Failed.",
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
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        console.log(currentDate, "  ,,,,,,,,,,,,,,,,,,  ", endDate);
        setShow(Platform.OS === 'ios');


        if (selectServiceCallID != null) {

            if (dateType == "fromDate") {

                if (endDate != "") {

                    if (endDate != 'Invalid date') {


                        if (moment(new Date(currentDate)).format('YYYY-MM-DD') <= moment(new Date(endDate)).format('YYYY-MM-DD')) {

                            setStartDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))

                        } else {

                            ToastAndroid.show("The Start date must be less than the end date ", ToastAndroid.SHORT);

                        }


                    } else {

                        setStartDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))

                    }

                } else {

                    setStartDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))

                }

            } else {
                if (startDate != "") {

                    if (startDate != 'Invalid date') {

                        console.log(" .................   ", startDate, moment(new Date(currentDate)).format('YYYY-MM-DD'));

                        if (moment(new Date(currentDate)).format('YYYY-MM-DD') >= moment(new Date(startDate)).format('YYYY-MM-DD')) {

                            setEndDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))


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



        } else {

            ToastAndroid.show("Please Select Service Call ", ToastAndroid.SHORT);

        }



    };
    const showDatePicker = (currentMode: any) => {
        setShow(true);
        setDateType(currentMode)
    };
    const getServiceCallIDUpdate = () => {
        getServiceId((result: any) => {
            setserviceCallIdList(result);
            getCustomer(result[0].serviceId);
            getALLTicketById(TiketID, (result: any) => {
                for (let i = 0; i < result.length; ++i) {
                    setselectServiceCallID(result[i].serviceId)
                    prority = result[i].priority;
                    Assistance = result[i].assignTo;
                    setTicketID(result[i].ticketId);
                    setContent(result[i].content);
                    setStartDate(result[i].startDate);
                    setEndDate(result[i].endDate);
                    // setselectServiceCallID(result?.filter((a: any) => a.serviceId == result[i].serviceId)[0]);
                    const data = result?.filter((a: any) => a.serviceId == result[i].serviceId)[0];
                    setselectServiceCallID(data.serviceId);
                    setSelectPriority(prority);
                    setSelectAssignPerson(Assistance)
                }
            });
            getAllPriority((result: any) => {
                setPriorityList(result);
                const data = result?.filter((a: any) => a.name == prority)[0];
                setSelectPriority(data.name);
            });

            getUserByTypes(3, (result: any) => {
                setAssignPersonList(result);
                const data = result?.filter((a: any) => a.name == Assistance)[0];
                setSelectAssignPerson(data.name);
            });
        });
    }
    const getServiceCallID = () => {
        getServiceId((result: any) => {
            setserviceCallIdList(result);
        });
    }
    const generateCallID = () => {
        getLastTicketId((result: any) => {
            setLastTicketID(result);
            const uniqueID: any[] = [];
            if (result.length == 0) {
                GetLastID(0);
            } else {
                for (let i = 0; i < result.length; ++i) {
                    GetLastID(result[i]._Id);
                }
            }
        });
    };
    const getCustomer = (SID: any) => {

        getServiceCallCustomer(SID, (result: any) => {
            setCustomer(result[0].customer);
            setCallStartDate(result[0].start_date);
            setCallEndDate(result[0].end_date);


        });

        // console.log(" start date ..........  " , callStartDate , " End Date ........  " , callEndDate); 

    }
    const getTicketData = (data: any) => {
    }
    const backPress = () => {
        if (selectMode == 0) {
            navigation.navigate('Home');
        } else {
            navigation.navigate('RequestDetails');
        }
    }


    const cancelAndGoBack = () => {
        Alert.alert('Cancle', 'Are you sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => navigation.goBack(), }
        ]);
    }
    const getAllPriorityList = () => {
        getAllPriority((result: any) => {
            setPriorityList(result);
        });
        getUserByTypes(3, (result: any) => {
            setAssignPersonList(result);
        });
    }



    const UploadServiceTicket = () => {
        try {

            get_ASYNC_TOCKEN().then(res => {
                TOCKEN_KEY = res;
                const AuthStr = 'Bearer '.concat(TOCKEN_KEY);

                // console.log( 'AuthStr####3%%%%%%%%%%%%%',AuthStr);

                const prams = {
                    "UserName": "",
                    "objServiceCallList": [
                        {
                            "UserID": 1,  //need to code
                            "ticketId": TicketID,
                            "serviceId": selectServiceCallID,
                            "startDate": startDate,
                            "itemDescription": "",
                            "endDate": endDate,
                            "content": content,
                            "assignTo": selectAssignPerson,
                            "attend_status": 0,
                            "priority": selectPriority,
                            "createAt": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                        }
                    ]
                }

                console.log('--NEW SERVICE TICKET UPLOAD JSON--', prams);

                const headers = {
                    'Authorization': AuthStr
                }
                const URL = BASE_URL_GET + "service-ticket";
                axios.post(URL, prams, {
                    headers: headers
                })
                    .then((response) => {
                        console.log("[s][t][a][t][u][s][]", response.status);
                        if (response.status == 200) {

                            console.log('<------ NEW SERVICE TICKET UPLOAD Method --->', response.data)
                            console.log(response.data.UniqueNo);

                            if (response.data.ErrorId = 0) {
                                // this use fro update sync flag as 1 
                                updateSyncServiceTicket(response.data.UniqueNo, (result: any) => {

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


    const GetLastID = (id: any) => {
        var ticketID = parseInt(id) + 1;
        setTicketID("SCT_" + moment().utcOffset('+05:30').format('YYYY-MM-DD') + "_" + ticketID);
    }
    useEffect(() => {
        selectMode = route.params.mode;
        TiketID = route.params.ID;
        let date = moment().utcOffset('+05:30').format('YYYY-MM-DD')
        if (route.params.mode == 0) {
            setTextHeader('Add New Service Ticket')
            setButtonTitle('Add')
            getServiceCallID();
            generateCallID();
            getAllPriorityList();
            setCallStartDate(date);
            setCallEndDate(date);
        } else {
            setTextHeader('Update Service Ticket')
            setButtonTitle('Update')
            getServiceCallIDUpdate();
        }


    }, [])
    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {

            selectMode == route.params.mode;
            TiketID = route.params.ID;
            let date = moment().utcOffset('+05:30').format('YYYY-MM-DD')

            if (route.params.mode == 0) {

                setTextHeader('Add New Service Ticket')
                setButtonTitle('Add')
                getServiceCallID();
                generateCallID();
                getAllPriorityList();
                setCallStartDate(date);
                setCallEndDate(date);

            } else {

                getServiceCallIDUpdate();
                setTextHeader('Update Service Ticket')
                setButtonTitle('Update')
                // console.log('-----service ticeket check-------');
                // console.log('-----Ticket id is -------'+routeNav.params.ticketID);
                // console.log('-----Ticket list length-------'+routeNav.params.tickList[0]);
                if (route.params.tickList?.length > 0) {
                    console.log('-----service length check-----');
                    SetPreviousAddedData(routeNav.params.ticketID);
                } else {

                }
            }

        });
        return focusHandler;
    }, [navigation]);


    // useFocusEffect(
    //     React.useCallback(() => {

    //         selectMode == route.params.mode;
    //         TiketID = route.params.ID;
    //         let date = moment().utcOffset('+05:30').format('YYYY-MM-DD')

    //         if (route.params.mode == 0) {

    //             setTextHeader('Add New Service Ticket')
    //             setButtonTitle('Add')
    //             getServiceCallID();
    //             generateCallID();
    //             getAllPriorityList();
    //             setCallStartDate(date);
    //             setCallEndDate(date);

    //         } else {

    //             getServiceCallIDUpdate();
    //             setTextHeader('Update Service Ticket')
    //             setButtonTitle('Update')
    //             // console.log('-----service ticeket check-------');
    //             // console.log('-----Ticket id is -------'+routeNav.params.ticketID);
    //             // console.log('-----Ticket list length-------'+routeNav.params.tickList[0]);
    //             if (route.params.tickList?.length > 0) {
    //                 console.log('-----service length check-----');
    //                 SetPreviousAddedData(routeNav.params.ticketID);
    //             } else {

    //             }
    //         }

    //     }, []),
    // );


    const SetPreviousAddedData2 = (id: any) => {

        setTicketID(id);
        //      const data = routeNav.params.tickList?.filter()[0];
        //   console.log('check filter data --'+data);

    }

    const SetPreviousAddedData = (id: any) => {

        setTicketID(id);
        try {
            getTicketDetailsFromID(id, (result: any) => {
                console.log('update service list length ----', result);
                // console.log("####", serviceType);

                //  [{"Approve_status": "0", "Attend_status": "0", "_Id": 1, "assistance": "2", 
                // "contact_name": "gayan", "contact_no": 769968772, "created_by": "1",
                //  "customer": "Pathfinder Advisory Services Pvt Ltd", 
                // "customer_address": "10 1/3 First Floor", "end_date": "31-10-2022",
                //   "handle_by": "2", "item_code": "SHINI/BH90115000050", "item_description": 
                // "EGO ASSEMBLE (FOR SCD-400U CLAIM)", "priority": "Medium", "secretary": "2", 
                // "serviceId": "SC_2022-10-31_1", "service_type": "1",
                //  "start_date": "31-10-2022", "status": "0", "subject": "car"}]

                //  [{"typeId": 1, "typeName": "Mechanical"}, {"typeId": 2, "typeName": "Electrical"}, {"typeId": 3, "typeName": "Replacement"},
                // {"typeId": 4, "typeName": "Service"}, {"typeId": 5, "typeName": "Other"}]

                // console.log('cus list length ----', route.params.cusList.length);
                // console.log('*******',customerList?.filter(a => a.CusName == result[0].customer),);
                //setSelectCustomer(customerList?.filter((a)=> a.CusName == result[0].customer)[0]);

                const data = result[0];
                console.log('<<<<<<<<<<<<<<< show data --', data.assignTo);
                setselectServiceCallID(data.serviceId);
                setSelectPriority(data.priority);
                setSelectAssignPerson(data.assignTo);
                setContent(data.content);
                setStartDate(data.startDate);
                //setCustomer();
                setEndDate(data.endDate);


                // setSelectCustomer(data.CusName);
                // setCusAddress(result[0].customer_address);

                // setItemDescription(result[0].item_description);

                // let number = "0" + result[0].contact_no;
                // console.log(number.length, '>>>>>>>>>>>>>>>>>>>>>');

                // setContactNumber(number);
                // setSubject(result[0].subject);
                // setStartDate(result[0].start_date);
                // setEndDate(result[0].end_date);
                // setSelectPriority(result[0].priority);









            });

        } catch (error) {
            console.log("NEW SERVICECALL/setPreviousAddedData", error);

        }
    }


    return (

        <SafeAreaView style={comStyles.CONTAINER}>
            {/* <TouchableOpacity style={style.dashStyle} /> */}
            <Header title={TextHeader} isBtn={true} btnOnPress={() => navigation.goBack()} />
            <View style={{ padding: 5 }} />
            {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                <Text style={style.maintxt} onPress={backPress}>{TextHeader}</Text>
            </View> */}
            <View style={style.buttonView} >
                <ActionButton title="Cancel" style={style.loginBtn} textStyle={style.txtStyle} onPress={cancelAndGoBack} />
                <ActionButton title={ButtonTitle} style={{ flex: 0.5 }} onPress={() => sendData()} />
            </View>
            <ScrollView style={style.scrollStyle}>

                <InputText
                    placeholder="Ticket ID"
                    placeholderColor={comStyles.COLORS.HEADER_BLACK}
                    style={comStyles.serviceTicketInput}
                    stateValue={TicketID}
                    editable={false}
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
                        labelField="serviceId"
                        valueField="serviceId"
                        placeholder={!isFocus ? 'Select Service Call ID' : '...'}
                        searchPlaceholder="Search Service Call ID "
                        value={selectServiceCallID}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            // console.log(item.serviceId);

                            setselectServiceCallID(item.serviceId);
                            setIsFocus(false);
                            getCustomer(item.serviceId);
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
                    placeholder="Customer"
                    placeholderColor={comStyles.COLORS.HEADER_BLACK}
                    style={comStyles.serviceTicketInput}
                    stateValue={Customer}
                    setState={setCustomer}
                    editable={false}
                />


                <View style={{ zIndex: 50 }}>

                    <Dropdown
                        style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={priorityList}
                        search
                        maxHeight={300}
                        labelField="name"
                        valueField="name"
                        placeholder={!isFocus ? 'Service Ticket Priority' : '...'}
                        searchPlaceholder="Search Priority "
                        value={selectPriority}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log(item.name);

                            setSelectPriority(item.name);
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

                <View style={{ padding: 10 }} />

                <View style={{ zIndex: 50 }}>

                    <Dropdown
                        style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={assignPersonList}
                        search
                        maxHeight={300}
                        labelField="name"
                        valueField="name"
                        placeholder={!isFocus ? 'Assigned to' : '...'}
                        searchPlaceholder="Search Technician "
                        value={selectAssignPerson}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            // console.log(item.serviceId);

                            setSelectAssignPerson(item.name);
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

                <View style={{ padding: 10 }} />

                <InputText
                    placeholder="Content"
                    placeholderColor={comStyles.COLORS.HEADER_BLACK}
                    style={comStyles.serviceTicketInput}
                    stateValue={content}
                    setState={setContent}
                    max={100}
                />



                {/* <DropDownPicker
                    open={openAssignPerson}
                    items={assignPersonList}
                    placeholder="Service Call Priority"
                    placeholderStyle={{
                        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
                        fontSize: 12,
                    }}
                    style={comStyles.dropdownBox}
                    setOpen={setOpenAssignPerson}
                    containerStyle={{ height: 40 }}
                    dropDownStyle={{ backgroundColor: 'white' }}
                    dropDownMaxHeight={'100%'}
                    labelStyle={{ fontSize: 14 }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownContainerStyle={{ backgroundColor: 'white', elevation: 1, borderColor: comStyles.COLORS.BORDER_COLOR }}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                        nestedScrollEnabled: true,
                    }}
                    value={selectAssignPerson}
                    setValue={(e) => onChangePicker(e, "assign")}
                /> */}
                {/* <View style={{ padding: 10 }} /> */}
                <TouchableOpacity onPress={() => showDatePicker("fromDate")}>

                    <InputText
                        placeholder="Planned Start Date"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        is_back_icon={true}
                        back_icon_name="calendar"
                        editable={false}
                        backiconClr={comStyles.COLORS.BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={startDate}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => showDatePicker("toDate")}>
                    <InputText
                        placeholder="Planned End Date"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        is_back_icon={true}
                        back_icon_name="calendar"
                        editable={false}
                        backiconClr={comStyles.COLORS.BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={endDate}
                    />
                </TouchableOpacity>
            </ScrollView>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    minimumDate={new Date(callStartDate)}
                    maximumDate={new Date(callEndDate)}
                    onChange={onChange}
                />
            )}

            <View style={{ padding: 30 }} />
        </SafeAreaView >
    );
}

const style = StyleSheet.create({
    txtStyle: {
        color: comStyles.COLORS.ICON_BLUE
    },
    loginBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
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
        backgroundColor: comStyles.COLORS.DASH_COLOR,
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'center'
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 5,
        padding: 10
    },
    maintxt: {
        color: comStyles.COLORS.BLACK,
        fontSize: 18,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 5,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
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
        color: comStyles.COLORS.HEADER_BLACK,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
        color: comStyles.COLORS.BLACK,
        fontFamily: comStyles.FONT_FAMILY.REGULAR,
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
});
export default NewServiceTicket;