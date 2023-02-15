/**
* @author Madushika Sewwandi
*/
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import { addNewService } from "../Services/Api/SyncService";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllTypes } from "../SQLiteDatabaseAction/DBControllers/ServiceTypeController";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAllPriority } from "../SQLiteDatabaseAction/DBControllers/PriorityController";
import { getAllCustomerVsItems, getAllItems } from "../SQLiteDatabaseAction/DBControllers/ItemController";
import { getAllCustomers } from "../SQLiteDatabaseAction/DBControllers/CustomerController";
import { getLastServiceId, getServiceById, saveServiceData, updateService, updateSycnServiceCAll } from "../SQLiteDatabaseAction/DBControllers/ServiceController";
import { getAllUserTypes } from "../SQLiteDatabaseAction/DBControllers/Users_TypesController";
import { getAllContactPerson } from "../SQLiteDatabaseAction/DBControllers/ContactPersonController";
import Spinner from 'react-native-loading-spinner-overlay';
import ComponentsStyles from "../Constant/Components.styles";
import { get_ASYNC_TOCKEN, get_ASYNC_USERID } from "../Constant/AsynStorageFuntion";
import axios from "axios";
import { BASE_URL_GET, } from "../Constant/Commen_API_Url";
import { getUserByTypes } from "../SQLiteDatabaseAction/DBControllers/UserController";
import NetInfo from '@react-native-community/netinfo';

let ItemDesc = "";
let serviceid = "";

// const NewServiceCall = ({ onClose }: ParamTypes) => {
const NewServiceCall = (props: any) => {

    const { navigation, route } = props;

    // const [loandingspinner, setloandingspinner] = useState(true);

    const [isFocus, setIsFocus] = useState(false);

    const [priorityList, setPriorityList] = useState([]);
    const [contactPersonList, setContactPersonList] = useState([]);
    const [serviceType, setServiceType] = useState([]);
    const [secretaryItem, setSecretaryItem] = useState([]);
    const [handleBy, setHandleBy] = useState([]);
    const [salesAssistance, setSalesAssistance] = useState([]);


    const [serviceId, setServiceId] = useState('');
    const [itemCode, setItemCode] = useState([]);
    const [itemDescription, setItemDescription] = useState();
    const [customerList, setCustomerList] = useState([]);

    const [cusAddress, setCusAddress] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectPriority, setSelectPriority] = useState(null);
    const [selectServiceType, setSelectServiceType] = useState(null);
    const [selectContactPerson, setSelectContactPerson] = useState(null);
    const [selectSecretary, setSelectSecretary] = useState(null);
    const [selectAssistance, setSelectAssistance] = useState(null);
    const [selectTechnician, setSelectTechnician] = useState(null);
    const [selectCustomer, setSelectCustomer] = useState(null);
    const [selectItemCode, setSelectItemCode] = useState(null);
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState('');
    const [lastServiceID, setLastServiceID] = useState([]);

    const [formHeading, setformHeading] = useState(route?.params?.mode == 1 ? " Update Service Call" : "Add New Service Call");
    const [savebutton, setsavebutton] = useState(route?.params?.mode == 1 ? "Update" : "Add");

    const [itemID, setitemID] = useState(null);
    const [customerID, setcustomerID] = useState(null);
    var TOCKEN_KEY: any;
    const mode = route.params.mode;

    useFocusEffect(
        React.useCallback(() => {
            getServiceCallTypes();
            getCustomers();
            getAllUserTypesData();

            if (route.params.cusList?.length > 0) {
                SetPreviousAddedData(route.params.serviceID);
            } 
            if (mode != 1) {
                generateCallID();
            }

        }, []),
    );

    const saveServiceCall = () => {

        const sendData = [
            {
                ServiceCallId: serviceId,
                item_code: selectItemCode,
                item_description: itemDescription,
                customer_address: cusAddress,
                contact_name: contactPerson,
                contact_no: contactNumber,
                Subject: subject,
                HandledBy: selectTechnician,
                SalesAssistant: selectAssistance,
                PlanedStartDateTime: startDate,
                PlanedEndDateTime: endDate,
                Priority: selectPriority,
                type: selectServiceType,
                Secretary: selectSecretary,
                attend_status: '0',
                Status: '0',
                customer: selectCustomer,
                CreatedBy: "1",
                approve_status: '0',
                createAt: moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                syncstatus: '0',
                itemID: selectItemCode,
                customerID: customerID,

            }
        ]

        //console.log(USERID, '----', USERID);

        try {



            if (selectPriority != null) {
                if (selectServiceType != null || selectServiceType != "") {
                    if (selectItemCode != null || selectItemCode == "") {
                        if (selectCustomer != null || selectCustomer == "") {
                            if (cusAddress != "") {
                                if (contactPerson != "") {
                                    if (contactNumber != "") {
                                        if (subject != "") {
                                            if (selectTechnician != null || selectTechnician != "") {
                                                if (selectSecretary != null || selectSecretary != "") {
                                                    if (selectAssistance != null || selectAssistance != "") {
                                                        if (startDate != "") {
                                                            if (startDate != 'Invalid date') {
                                                                if (endDate != "") {
                                                                    if (endDate != 'Invalid date') {

                                                                        if (contactNumber.length == 10) {

                                                                            if (mode == 1) {
                                                                                Update_serviceCall(sendData);
                                                                            } else {
                                                                                save_serviceCall(sendData);
                                                                            }
                                                                        } else {
                                                                            ToastAndroid.show("Invalid Mobile Number..!  ", ToastAndroid.SHORT);
                                                                        }

                                                                    } else {
                                                                        ToastAndroid.show("Please Select valid End Date..!  ", ToastAndroid.SHORT);
                                                                    }

                                                                } else {
                                                                    ToastAndroid.show("Please Select End Date..!  ", ToastAndroid.SHORT);
                                                                }

                                                            } else {
                                                                ToastAndroid.show("Please Select valid Start Date..!  ", ToastAndroid.SHORT);
                                                            }

                                                        } else {
                                                            ToastAndroid.show("Please Select startDate..!  ", ToastAndroid.SHORT);
                                                        }

                                                    } else {
                                                        ToastAndroid.show("Please Select Assistance..!  ", ToastAndroid.SHORT);
                                                    }
                                                } else {
                                                    ToastAndroid.show("Please Select Secretary..!  ", ToastAndroid.SHORT);
                                                }
                                            } else {
                                                ToastAndroid.show("Please Select Technician..!  ", ToastAndroid.SHORT);
                                            }
                                        } else {
                                            ToastAndroid.show("Please Enter Subject..!  ", ToastAndroid.SHORT);
                                        }
                                    } else {
                                        ToastAndroid.show("Please Enter Contact Number..!  ", ToastAndroid.SHORT);
                                    }
                                } else {
                                    ToastAndroid.show("Please Enter Contact Person..!  ", ToastAndroid.SHORT);
                                }
                            } else {
                                ToastAndroid.show("Please Enter Address..!  ", ToastAndroid.SHORT);
                            }
                        } else {
                            ToastAndroid.show("Please Select Customer..!  ", ToastAndroid.SHORT);
                        }
                    } else {
                        ToastAndroid.show("Please Select Service Item Code..!  ", ToastAndroid.SHORT);
                    }
                } else {
                    ToastAndroid.show("Please Select Service Type..!  ", ToastAndroid.SHORT);
                }

            } else {
                ToastAndroid.show("Please Select Service Call Priority..!  ", ToastAndroid.SHORT);


            }




        } catch (error) {
            console.log(error);
        }

        // saveServiceData()

        // addNewService(sendData).then(
        //     response => {
        //         console.log('reaponse data: ', response);
        //         //saveData in local db with sync status=1
        //     }
        // ).catch(error => {
        //     if (error.message == "Request failed with status code 404") {
        //         //saveData in local db with sync status=0
        //     } else {
        //         //saveData in local db with sync status=0
        //     }
        // })
    }

    const Update_serviceCall = (data: any) => {

        updateService(data[0].priority, data[0].type, data[0].item_code, data[0].item_description, data[0].customer
            , data[0].customer_address, data[0].contact_name, data[0].contact_no, data[0].subject, data[0].handle_by,
            data[0].secretary, data[0].salesAssistance, data[0].startDate, data[0].endDate, data[0].created_by, data[0].approve_status,
            data[0].attend_status, data[0].status, data[0].serviceId, (result: any) => {
                ToastAndroid.show("Service Call Update Success ", ToastAndroid.SHORT);
                navigation.navigate('ServiceCall');
            });
    }
    const save_serviceCall = (data: any) => {
        console.log("**************", data);
        console.log("**************", JSON.stringify(data));
        try {
            saveServiceData(data, (result: any) => {
                console.log(result, "NEWSERVICE_CALL_SAVE");

                if (result === "success") {
                    NetInfo.fetch().then(state => {
                        if (!state.isConnected) {
                            console.log('No internet connection');
                            ToastAndroid.show("Please check your internet connection", ToastAndroid.SHORT);
                        } else {
                            console.log('Connected to the internet');
                            UploadServiceCall();

                            if (mode == 1) {
                                console.log("**************", "NEWSERVICE_CALL_UPDATE");
                                ToastAndroid.show("New Service Call Update Success ", ToastAndroid.SHORT);

                            } else {
                                generateCallID();
                                ToastAndroid.show("New Service Call Create Success ", ToastAndroid.SHORT);
                            }

                            navigation.navigate('Home');

                        }
                    });
                    //need check internet connection true false

                } else {

                    Alert.alert(
                        "Failed...!",
                        "Service Call Save Failed.",
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
    const getServiceCallTypes = () => {
        getAllTypes((result: any) => {
            setServiceType(result)
            console.log(result, '--------------------');
        });

    }

    const UploadServiceCall = () => {
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
                            "serviceId": serviceId,
                            "priority": selectPriority,
                            "service_type": selectServiceType,
                            "item_code": selectItemCode,
                            "itemID": itemID,
                            "customerID": customerID,
                            "customer": selectCustomer,
                            "customer_address": cusAddress,
                            "contact_name": contactPerson,
                            "contact_no": contactNumber,
                            "handle_by": selectTechnician,
                            "secretary": selectSecretary,
                            "sales_assistance": selectAssistance,
                            "start_date": startDate,
                            "end_date": endDate,
                            "created_by": 1, //need to code
                            "active_status": 1,
                            "Approve_status": 0,
                            "Attend_status": 0,
                            "createAt": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                        }
                    ]
                }

                console.log('--NEW SERVICE CALL UPLOAD JSON--', prams);

                const headers = {
                    'Authorization': AuthStr
                }
                const URL = BASE_URL_GET + "service-call";
                axios.post(URL, prams, {
                    headers: headers
                })
                    .then((response) => {
                        console.log("[s][t][a][t][u][s][]", response.status);
                        if (response.status == 200) {

                            console.log('<------ NEW SERVICE CALL UPLOAD Method --->', response.data)
                            console.log(response.data.UniqueNo);

                            if (response.data.ErrorId = 0) {
                                // this use fro update sync flag as 1 
                                updateSycnServiceCAll(response.data.UniqueNo, (result: any) => {

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


    const getItem = (cusCode: any) => {


        getAllCustomerVsItems(cusCode, (result: any) => {
            setItemCode(result);

            console.log(" item count .........  ", result.length)
        });

    }



    const getCustomers = () => {


        getAllCustomers((result: any) => {
            // console.log("<><><><><><><><><cus info2222"+ result);
            setCustomerList(result);
        });

    }


    const onChangePicker = (event: any, type: any) => {

        console.log(type, ">>>>>>>>>>>>>>>>>>>");

        switch (type) {
            case "priority":
                setSelectPriority(event);
            case "serviceType":
                setSelectServiceType(event);
                break;
            case "contactPerson":
                setSelectContactPerson(event);
                break;
            case "secretary":
                setSelectSecretary(event);
                break;
            case "technician":
                setSelectTechnician(event);
                break;
            case "assistance":
                setSelectAssistance(event);
                break;
            default:
                break;
        }
    }

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;

        console.log(currentDate);
        setShow(Platform.OS === 'ios');
        if (dateType == "fromDate") {

            if (endDate != "") {

                if (endDate != 'Invalid date') {


                    if (moment(new Date(currentDate)).format('YYYY-MM-DD') < moment(new Date(endDate)).format('YYYY-MM-DD')) {

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

                    if (moment(new Date(currentDate)).format('YYYY-MM-DD') > moment(new Date(startDate)).format('YYYY-MM-DD')) {

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
    };

    const showDatePicker = (currentMode: any) => {
        setShow(true);
        setDateType(currentMode)
    };

    const changeItemName = (itemName: any) => {
        setItemDescription(itemName)
    };

    const changeCusAddress = (Address: any) => {
        setCusAddress(Address)
    };

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

        setServiceId("SC_" + moment().utcOffset('+05:30').format('YYYY-MM-DD') + "_" + serviceID);
    }



    const getContactPerson = () => {

        getAllContactPerson((result: any) => {
            setContactPersonList(result);
            // setloandingspinner(false);


        });
    }
    const getAllUserTypesData = () => {
        getUserByTypes(3, (result: any) => {
            setSalesAssistance(result);
        });
        getUserByTypes(2, (result: any) => {
            setSecretaryItem(result);
        });
        getUserByTypes(1, (result: any) => {
            setHandleBy(result);
        });
        getAllPriority((result: any) => {
            setPriorityList(result);
        });

    }
    const SetPreviousAddedData = (id: any) => {
        // console.log(route.params.serviceID, "Update mode 2 ", loandingspinner);
        setServiceId(id);

        // setloandingspinner(true);
        // console.log(route.params.serviceID, "Update mode 3 ", loandingspinner);
        try {
            getServiceById(id, (result: any) => {
                console.log('cus list length ----', result);
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

                var Contact: any;
                const data = route.params.cusList?.filter((a) => a.CusName == result[0].customer)[0];
                console.log('<<<<<<<<<<<<<<<', data);

                setSelectCustomer(data.CusName);
                setCusAddress(result[0].customer_address);

                setItemDescription(result[0].item_description);
                // setContactPerson(result[0].contact_name);
                let number = "0" + result[0].contact_no;
                console.log(number.length, '>>>>>>>>>>>>>>>>>>>>>');
                // if(result[0].contact_no.length){
                //     Contact = "0"+result[0].contact_no

                //     console.log(Contact,'>>>>>>>>>>>>2222>>>>>>>>>');

                // }
                setContactNumber(number);
                setSubject(result[0].subject);
                setStartDate(result[0].start_date);
                setEndDate(result[0].end_date);
                setSelectPriority(result[0].priority);


                getAllPriority((result1: any) => {
                    setPriorityList(result1);
                    const data = result1?.filter((a: any) => a.name == result[0].priority)[0];
                    setSelectPriority(data.name);
                });
                getAllTypes((result1: any) => {
                    const data = result1?.filter((a: any) => a.typeName == result[0].service_type)[0];
                    setSelectServiceType(data.typeName);
                });

                getAllItems((result1: any) => {
                    setItemCode(result1);
                    const data = result1?.filter((a: any) => a.itemCode == result[0].item_code)[0];
                    setSelectItemCode(data.itemCode)
                });

                getAllUserTypes("Assistance", (result1: any) => {
                    const data = result1?.filter((a: any) => a.name == result[0].assistance)[0];
                    setSelectAssistance(data.name)

                });
                getAllUserTypes("Secretary", (result1: any) => {
                    const data = result1?.filter((a: any) => a.name == result[0].secretary)[0];
                    setSelectSecretary(data.name);
                });
                getAllUserTypes("Technician", (result1: any) => {
                    const data = result1?.filter((a: any) => a.name == result[0].handle_by)[0];
                    setSelectTechnician(data.name);
                });

                getAllContactPerson((result1: any) => {
                    const data = result1?.filter((a: any) => a.name == result[0].contact_name)[0];
                    setContactPerson(data.name);
                });
            });
            // setloandingspinner(false);
        } catch (error) {
            console.log("NEW SERVICECALL/setPreviousAddedData", error)
            // setloandingspinner(false);
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

    return (

        <SafeAreaView style={comStyles.CONTAINER} >

            <Header title={formHeading} isBtn={true} btnOnPress={() => navigation.goBack()} />
            <View style={{ padding: 5 }} />

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20, padding: 10, }}>

                <ActionButton title="Cancel" style={style.loginBtn} textStyle={style.txtStyle} onPress={cancelAndGoBack} />
                <ActionButton title={savebutton} style={{ flex: 0.5 }} onPress={() => saveServiceCall()} />
            </View>

            <ScrollView style={style.scrollStyle} nestedScrollEnabled={true}>
                <View>

                    <InputText
                        placeholder="Service Call ID"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        stateValue={serviceId}
                        editable={false}
                        style={comStyles.serviceTicketInput}
                    />

                    <View style={{ zIndex: 50 }}>

                        <Dropdown

                            style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={customerList}
                            search
                            maxHeight={300}
                            labelField="CusName"
                            valueField="CusName"
                            placeholder={!isFocus ? 'Select Customer ' : '...'}
                            searchPlaceholder="Search Customer "
                            value={selectCustomer}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                console.log('%%%%-----', item);
                                setSelectCustomer(item.CusName);
                                // changeCusAddress(item.Address);
                                setcustomerID(item.CusID);

                                getItem(item.CusID);

                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={style.icon}
                                    color={isFocus ? comStyles.COLORS.HEADER_BLACK : comStyles.COLORS.HEADER_BLACK}
                                    name="Safety"
                                    size={15}
                                />
                            )}
                        />

                    </View>

                    <View style={{ padding: 5 }} />

                    <InputText
                        placeholder="Customer Address"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={cusAddress}


                        setState={setCusAddress}
                    />


                    <View style={{ zIndex: 100 }}>

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
                            placeholder={!isFocus ? 'Service Call Priority' : '...'}
                            searchPlaceholder="Search Service Call Priority"
                            value={selectPriority}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                console.log(item.name);

                                // setValue(item.description);

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
                    <View style={{ padding: 15 }} />
                    <View style={{ zIndex: 50 }}>

                        <Dropdown
                            style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={serviceType}
                            search
                            maxHeight={300}
                            labelField="typeName"
                            valueField="typeName"
                            placeholder={!isFocus ? 'Select Service Type' : '...'}
                            searchPlaceholder="Search Service Type"
                            value={selectServiceType}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                console.log(item.typeName);

                                // setValue(item.description);

                                setSelectServiceType(item.typeName);
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
                    <View style={{ padding: 8 }} />

                    <View style={{ zIndex: 50 }}>

                        <Dropdown
                            style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={itemCode}
                            search
                            maxHeight={300}
                            labelField="ItemCode"
                            valueField="ItemCode"
                            placeholder={!isFocus ? 'Select Item Code ' : '...'}
                            searchPlaceholder="Search Item Code"
                            value={selectItemCode}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {

                                // setValue(item.description);
                                setSelectItemCode(item.ItemCode);
                                setitemID(item.itemID);

                                changeItemName(item.ItemName);
                                ItemDesc = item.ItemName;
                                console.log(ItemDesc + "  .................... ");


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


                    <View style={{ padding: 5 }} />

                    <InputText
                        placeholder="Item Description"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={itemDescription}
                        editable={false}
                        max={50}

                    />

                    <InputText
                        placeholder="Contact Person"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={String(contactPerson)}
                        max={10}
                        setState={setContactPerson}
                    />


                    <InputText
                        placeholder="Contact No"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={String(contactNumber)}
                        max={10}
                        setState={setContactNumber}
                    />



                    <InputText
                        placeholder="Subject"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={subject}
                        setState={setSubject}
                        max={50}
                    />

                    <View style={{ zIndex: 50 }}>
                        {/* error */}
                        <Dropdown
                            style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={handleBy}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="name"
                            placeholder={!isFocus ? 'Handled By ' : '...'}
                            searchPlaceholder="Search Technician "
                            value={selectTechnician}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {

                                // setValue(item.description);
                                setSelectTechnician(item.name);

                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={style.icon}
                                    color={isFocus ? comStyles.COLORS.HEADER_BLACK : comStyles.COLORS.HEADER_BLACK}
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
                            data={secretaryItem}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="name"
                            placeholder={!isFocus ? 'Secretary ' : '...'}
                            searchPlaceholder="Search Secretary "
                            value={selectSecretary}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {


                                setSelectSecretary(item.name);


                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={style.icon}
                                    color={isFocus ? comStyles.COLORS.HEADER_BLACK : comStyles.COLORS.HEADER_BLACK}
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
                            data={salesAssistance}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="name"
                            placeholder={!isFocus ? 'Select Sales Assistance ' : '...'}
                            searchPlaceholder="Search Sales Assistance "
                            value={selectAssistance}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {

                               
                                setSelectAssistance(item.name);

                            


                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={style.icon}
                                    color={isFocus ? comStyles.COLORS.HEADER_BLACK : comStyles.COLORS.HEADER_BLACK}
                                    name="Safety"
                                    size={15}
                                />
                            )}
                        />

                    </View>

                    <View style={{ padding: 10 }} />

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
                            setState={setStartDate}
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
                            setState={setEndDate}
                        />
                    </TouchableOpacity>

                </View>
            </ScrollView>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <View style={{ padding: 30 }} />
            {/* <Spinner
                visible={loandingspinner}
                color={ComponentsStyles.COLORS.WHITE}
                size="large"
                textContent={'Loading...'}
            /> */}
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
export default NewServiceCall;