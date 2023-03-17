/**
* @author Madushika Sewwandi
*/
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
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
import { SearchTicketBYItemCode } from "../SQLiteDatabaseAction/DBControllers/ItemSerialNoController";
import { getLastServiceId, getServiceById, saveServiceData, updateService, updateSycnServiceCAll, Update_webRefId } from "../SQLiteDatabaseAction/DBControllers/ServiceController";
import { getAllUserTypes } from "../SQLiteDatabaseAction/DBControllers/Users_TypesController";
import { getAllContactPerson } from "../SQLiteDatabaseAction/DBControllers/ContactPersonController";
import Spinner from 'react-native-loading-spinner-overlay';
import ComponentsStyles from "../Constant/Components.styles";
import { get_ASYNC_TOCKEN, get_ASYNC_USERID, getLoginUserName } from "../Constant/AsynStorageFuntion";
import axios from "axios";
import { BASE_URL_GET, } from "../Constant/Commen_API_Url";
import { getUserByTypes } from "../SQLiteDatabaseAction/DBControllers/UserController";
import DropdownAlert from 'react-native-dropdownalert';
import { isNetworkAvailable } from "../Constant/CommonFunctions";
import NetInfo from '@react-native-community/netinfo';

let ItemDesc = "";
let serviceid = "";
var TOCKEN_KEY: any;
var UserNameUpload: any;
var UserIdUpload: any;
// const NewServiceCall = ({ onClose }: ParamTypes) => {
const NewServiceCall = (props: any) => {

    const { navigation, route } = props;

    // const [loandingspinner, setloandingspinner] = useState(true);
    let dropDownAlertRef = useRef();
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
    const [serialNumList, setSerialNumList] = useState([]);

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

    const [servicetypeID, setServiceTypeID] = useState('');
    const [secretaryID, setSecretaryID] = useState('');
    const [AssistanceID, setAssisstanceID] = useState('');
    const [TechnicianID, setTechnicianID] = useState('');

    const [formHeading, setformHeading] = useState(route?.params?.mode == 1 ? " Update Service Call" : "Add New Service Call");
    const [savebutton, setsavebutton] = useState(route?.params?.mode == 1 ? "Update" : "Add");

    const [itemID, setitemID] = useState(0);
    const [customerID, setcustomerID] = useState(null);
    const [selectSerialNum, setSelectSerialNum] = useState(null);
    const [attendStatus, setAttendStatus] = useState(0);
    const [approveStatus, setApproveStatus] = useState(0);
    const [IsDesable, setIsDesable] = useState(false);
    const [webRefID, setWebRefID] = useState(0);

    const mode = route.params.mode;

    useFocusEffect(

        React.useCallback(() => {
            getLoginUserNameForUplode();
            getServiceCallTypes();
            getCustomers();
            getAllUserTypesData();

            if (route.params.cusList?.length > 0) {
                SetPreviousAddedData(route.params.serviceID);
                setIsDesable(true);
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
                attend_status: attendStatus,
                Status: '0',
                customer: selectCustomer,
                CreatedBy: UserIdUpload,
                approve_status: approveStatus,
                createAt: moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                syncstatus: '0',
                itemID: itemID,
                customerID: customerID,
                TechnicianID: parseInt(TechnicianID),
                SecretaryID: secretaryID,
                AssisstanceID: AssistanceID,
                serialNumber: selectSerialNum,
                service_web_RefID: 0,
                service_typeID: servicetypeID

            }
        ]

        //console.log(USERID, '----', USERID);

        try {


            if (selectSerialNum != null || selectSerialNum == "") {
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
                                                                                    // UploadServiceCall();
                                                                                }
                                                                            } else {
                                                                                dropDownAlertRef.alertWithType('error', 'Error', 'Invalid Mobile Number..!');
                                                                            }

                                                                        } else {
                                                                            dropDownAlertRef.alertWithType('error', 'Error', 'Please Select valid End Date..!');
                                                                        }

                                                                    } else {
                                                                        dropDownAlertRef.alertWithType('error', 'Error', 'Please Select End Date..!');
                                                                    }

                                                                } else {
                                                                    dropDownAlertRef.alertWithType('error', 'Error', 'Please Select valid Start Date..!');
                                                                }

                                                            } else {
                                                                dropDownAlertRef.alertWithType('error', 'Error', 'Please Select startDate..!');
                                                            }

                                                        } else {
                                                            dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Assistance..!');
                                                        }
                                                    } else {
                                                        dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Secretary..! ');
                                                    }
                                                } else {
                                                    dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Technician..! ');
                                                }
                                            } else {
                                                dropDownAlertRef.alertWithType('error', 'Error', 'Please Enter Subject..!');
                                            }
                                        } else {
                                            dropDownAlertRef.alertWithType('error', 'Error', 'Please Enter Contact Number..!');
                                        }
                                    } else {
                                        dropDownAlertRef.alertWithType('error', 'Error', 'Please Enter Contact Person..!');
                                    }
                                } else {
                                    dropDownAlertRef.alertWithType('error', 'Error', 'Please Enter Address..!');
                                }
                            } else {
                                dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Customer..! ');
                            }
                        } else {
                            dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Service Item Code..!');
                        }
                    } else {
                        dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Service Type..!');
                    }

                } else {
                    dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Service Call Priority..! ');

                }
            } else {
                dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Serial Number..! ');

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

        console.log(data, '---------------------');

        updateService(data, (result: any) => {
            // ToastAndroid.show("Service Call Update Success ", ToastAndroid.SHORT);

            if (result === "success") {

                NetInfo.fetch().then(state => {

                    if (state.isInternetReachable) {

                        console.log(" connected ********  ");

                        UploadUpdates();
                        
                    }

                });

                navigation.navigate('ServiceCall');

            } else {

                Alert.alert(
                    "Failed...!",
                    "Service Call Update Failed.",
                    [
                        {
                            text: "OK", onPress: () => {
                                navigation.navigate('ServiceCall');
                            }
                        }
                    ]
                );
            }


        });
    }


    const save_serviceCall = (data: any) => {
        // console.log("**************", data);
        // console.log("**************", JSON.stringify(data));
        try {
            saveServiceData(data,0, (result: any) => {
                // console.log(result, "NEWSERVICE_CALL_SAVE");

                if (result === "success") {

                
                    NetInfo.fetch().then(state => {

                        if (state.isInternetReachable) {

                            console.log(" connected ********  ");


                            UploadServiceCall();

                        }

                    });

                    navigation.navigate('NewServiceTicket', { serviceCallNav: serviceId,mode:0 });

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

    const UploadServiceCall = () => {
        // console.log('contact num-'+servicetypeID);
        // console.log('user name '+UserNameUpload);
        // console.log('user id -'+UserIdUpload);



        try {

            const prams = {
                "UserName": UserNameUpload,
                "objServiceCallList": [
                    {
                        "UserID": UserIdUpload,
                        "problem_type": servicetypeID,
                        "serviceId": serviceId,
                        "priority": selectPriority,
                        "service_type": selectServiceType,
                        "item_code": selectItemCode,
                        "itemID": itemID, // String Item id
                        "customerID": customerID, // string cus id //Liptom
                        "customer": selectCustomer,
                        "customer_address": cusAddress,
                        "contact_name": contactPerson,
                        "contact_no": contactNumber, //contactNumber.toString(),// "0769968773"
                        "handle_by": parseInt(TechnicianID),
                        "secretary": parseInt(secretaryID),
                        "sales_assistance": parseInt(AssistanceID),
                        "start_date": startDate,
                        "end_date": endDate,
                        "created_by": UserNameUpload,
                        "active_status": 1,
                        "Approve_status": approveStatus,
                        "Attend_status": attendStatus,
                        "created_At": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                        "handledByHandledByCode": parseInt(TechnicianID),
                        "originsDropDownOriginCode": 1,
                        "problemTypesDropDownProblemTypeCode": parseInt(servicetypeID),
                        "clusterHeadClusterHeadCode": parseInt(TechnicianID),
                        "secretaryDBSecretaryCode": parseInt(secretaryID),
                        "salesAssistantDBSalesAssistantCode": parseInt(AssistanceID),
                        "inquiryType": "new",
                        "subject": subject

                    }
                ]
            }

            console.log('--NEW SERVICE CALL UPLOAD JSON--', prams);


            get_ASYNC_TOCKEN().then(res => {
                console.log('cus id--' + customerID)
                TOCKEN_KEY = res;
                // const AuthStr = 'Bearer '.concat(TOCKEN_KEY);
                const AuthStr = ` Bearer ${TOCKEN_KEY}`;

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
                            console.log('uplode api response', response.data[0].ErrorId);
                            console.log('web service call id', response.data[0].ServiceCallId);
                            if (response.data[0].ErrorId == 0) {
                                console.log('this is if inside----');
                                // this use fro update sync flag as 1 
                                console.log('this is a web service call id ----', response.data[0].ServiceCallId);
                                updateSycnServiceCAll(response.data[0].UniqueNo, (result: any) => {

                                });
                                Update_webRefId(response.data[0].ServiceCallId, serviceId, (result: any) => {
                                    console.log('web ref update_____' + result)
                                });
                            } else {

                                Alert.alert(response.ErrorDescription);

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
        } catch (error) {
            console.log(">>>>>>>>>>>>", error);

        }
    }


    const getItem = (cusCode: any) => {


        getAllCustomerVsItems(cusCode, (result: any) => {
            setItemCode(result);

            console.log(" item count .........  ", result)
        });

    }



    const getCustomers = () => {


        getAllCustomers((result: any) => {
            // console.log("<><><><><><><><><cus info2222"+ result);
            setCustomerList(result);
        });

    }

    const getSerialNumbers = (testitemCode1: any) => {


        // getSerialNumber((result: any) => {
        //     setSerialNumList(result);
        // });
        console.log('hii this is serch item code ---' + testitemCode1);

        //const testitemCode=16;
        SearchTicketBYItemCode(testitemCode1, (result: any) => {

            setSerialNumList(result);

        });
        //  console.log()
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


                    if (moment(new Date(currentDate)).format('YYYY-MM-DD') <= moment(new Date(endDate)).format('YYYY-MM-DD')) {

                        setStartDate(moment(new Date(currentDate)).format('YYYY-MM-DD'))

                    } else {

                        dropDownAlertRef.alertWithType('error', 'Error', 'The Start date must be equal or less than the end date..! ');

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


                        dropDownAlertRef.alertWithType('error', 'Error', 'The End date must be equal or greater than the start date..! ');
                    }


                } else {
                    dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Start Date..! ');

                }

            } else {
                dropDownAlertRef.alertWithType('error', 'Error', 'Please Select Start Date..! ');

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
        var randomNum = Math.floor(Math.random() * 1000) + 1;
        //setServiceId("SC_" + moment().utcOffset('+05:30').format('YYYY-MM-DD') + "_" + serviceID);
        setServiceId("SC_" + UserIdUpload + "_" + randomNum + "_" + serviceID + "_M");
    }



    const getContactPerson = () => {

        getAllContactPerson((result: any) => {
            setContactPersonList(result);
            // setloandingspinner(false);


        });
    }
    const getAllUserTypesData = () => {
        getUserByTypes("Sales Executive", (result: any) => {
            setSalesAssistance(result);
        });
        getUserByTypes("Admin", (result: any) => {
            setSecretaryItem(result);
        });
        getUserByTypes("Technician", (result: any) => {
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
                console.log('cus list length ---------------', result);
                console.log('ITEM NAME [][][][][] ---------------', result[0].item_description);

                let number = "0" + result[0].contact_no;
                setContactNumber(number);
                setSubject(result[0].subject);
                setStartDate(result[0].start_date);
                setEndDate(result[0].end_date);
                setSelectPriority(result[0].priority);
                setContactPerson(result[0].contact_name);
                setAttendStatus(result[0].Attend_status);
                setApproveStatus(result[0].Approve_status);
                setServiceTypeID(result[0].service_typeID);

                setWebRefID(result[0].service_web_RefID);

                setCusAddress(result[0].customer_address);

                setItemDescription(result[0].item_description);
                // setContactPerson(result[0].contact_name);
              
                console.log(number.length, '>>>>>>>>>>>>>>>>>>>>>');
        
              
                getUserByTypes("Sales Executive", (resultAssisstance: any) => {

                    console.log("set assisstanceee ............ ", resultAssisstance);

                    setSalesAssistance(resultAssisstance);
                    const data = resultAssisstance?.filter((a: any) => a.user_id == result[0].AssisstanceID)[0];
                    setSelectAssistance(data.name);
                    setAssisstanceID(data.user_id);
                    console.log(" assisstance .........  ", data.name)

                });


                getAllPriority((result1: any) => {
                    setPriorityList(result1);
                    const data = result1?.filter((a: any) => a.name == result[0].priority)[0];
                    setSelectPriority(data.name);
                });
                getAllTypes((result1: any) => {
                    const data = result1?.filter((a: any) => a.typeId == result[0].service_typeID)[0];
                    setSelectServiceType(data.typeName);
                });

                // getAllItems((result1: any) => {
                //     setItemCode(result1);
                //     const data = result1?.filter((a: any) => a.itemCode == result[0].item_code)[0];
                //     setSelectItemCode(data.itemCode)


                // });

              


                getUserByTypes("Admin", (resultSecretary: any) => {
                    setSecretaryItem(resultSecretary);
                    const data = resultSecretary?.filter((a: any) => a.user_id == result[0].SecretaryID)[0];
                    setSelectSecretary(data.name);
                    setSecretaryID(data.user_id)
                    console.log(" isecretary .........  ", data.name)
                });


                SearchTicketBYItemCode(result[0].item_code, (resultSerial: any) => {

                    setSerialNumList(resultSerial);
                    const data = resultSerial?.filter((a: any) => a.msnfSN == result[0].serialNumber)[0];
                    console.log("serial number ---------" , result[0].item_code);
                    
                    setSelectSerialNum(data.msnfSN);
                });

                getUserByTypes("Technician", (resultTech: any) => {
                    setHandleBy(resultTech);
                    const data = resultTech?.filter((a: any) => a.user_id == result[0].TechnicianID)[0];
                    setSelectTechnician(data.name);
                    setTechnicianID(data.user_id);
                    console.log(" handleby .........  ", data.name)
                });


                const data = route.params.cusList?.filter((a) => a.CusID == result[0].customerID)[0];

                console.log(" item count ....1111111.....", data.CusID)
                console.log(" customer item count ....1111111.....", result[0].item_code)
                getAllCustomerVsItems(data.CusID, (resultitem: any) => {
                    console.log(" result items list ------  ", resultitem);
                    
                    setItemCode(resultitem);
                    const data = resultitem?.filter((a: any) => a.ItemCode == result[0].item_code)[0];
                    setSelectItemCode(data.ItemCode)
                    // console.log(" item count .........  ", data.ItemCode)
                });

                setSelectCustomer(data.CusName);
            
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
            // { text: 'OK', onPress: () => UploadServiceCall(), }

        ]);
    }

    const UploadUpdates = () => {


        try {

            const prams = {
                        "problem_type": servicetypeID,
                        "serviceId": webRefID,
                        "priority": selectPriority,
                        "service_type": selectServiceType,
                        "contact_name": contactPerson,
                        "contact_no": contactNumber, //contactNumber.toString(),// "0769968773"
                        "handle_by": parseInt(TechnicianID),
                        "secretary": parseInt(secretaryID),
                        "sales_assistance": parseInt(AssistanceID),
                        "start_date": startDate,
                        "end_date": endDate,
                        "update_by": UserNameUpload,
                        "Update_At": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'),
                        "handledByHandledByCode": parseInt(TechnicianID),
                        "problemTypesDropDownProblemTypeCode": parseInt(servicetypeID),
                        "secretaryDBSecretaryCode": parseInt(secretaryID),
                        "salesAssistantDBSalesAssistantCode": parseInt(AssistanceID),
                        "subject": subject
            }

            console.log('----- SERVICE CALL UPDATE UPLOAD JSON-- ----   ', prams);


            get_ASYNC_TOCKEN().then(res => {
                // console.log('cus id--' + customerID)
                TOCKEN_KEY = res;
                // const AuthStr = 'Bearer '.concat(TOCKEN_KEY);
                const AuthStr = ` Bearer ${TOCKEN_KEY}`;

                const headers = {
                    'Authorization': AuthStr
                }
                const URL = BASE_URL_GET + "service-call";
                axios.put(URL, prams, {
                    headers: headers
                })
                    .then((response) => {
                        console.log("[s][t][a][t][u][s][]", response.status);
                        if (response.status == 200) {

                            console.log('<------ NEW SERVICE CALL UPLOAD Method --->', response.data)
                            console.log('uplode api response', response.data.ErrorId);
                            console.log('web service call id', response.data.UniqueNo);
                            if (response.data.ErrorId == 0) {
                                console.log('this is if inside----');
                                // this use fro update sync flag as 1 
                                // console.log('this is a web service call id ----', response.data[0].ServiceCallId);
                                updateSycnServiceCAll(serviceId, (result: any) => {

                                });

                            } else {

                                Alert.alert(response.ErrorDescription);

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
        } catch (error) {
            console.log(">>>>>>>>>>>>", error);

        }

    }

    return (

        <SafeAreaView style={comStyles.CONTAINER} >

            <Header title={formHeading} isBtn={true} btnOnPress={() => navigation.goBack()} />

            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
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
                            disable={IsDesable}
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
                                changeCusAddress(item.Address);
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
                                setServiceTypeID(item.typeId);
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
                            disable={IsDesable}
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
                                setitemID(item.ItemId);

                                changeItemName(item.ItemName);
                                ItemDesc = item.ItemName;
                                console.log(item.itemId + " item iddddd .................... ");
                                getSerialNumbers(item.ItemCode);

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

                    <InputText

                        placeholder="Item Name"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={itemDescription}
                        editable={false}
                        max={50}

                    />
                    {/* for serial number */}
                    <View style={{ zIndex: 50 }}>
                        <Dropdown

                            style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                            placeholderStyle={style.placeholderStyle}
                            selectedTextStyle={style.selectedTextStyle}
                            inputSearchStyle={style.inputSearchStyle}
                            iconStyle={style.iconStyle}
                            data={serialNumList}
                            disable={IsDesable}
                            search
                            maxHeight={300}
                            labelField="msnfSN"
                            valueField="msnfSN"
                            placeholder={!isFocus ? 'Select Serial number ' : '...'}
                            searchPlaceholder="Search serial number "
                            value={selectSerialNum}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                console.log('%%%%-----', item);
                                setSelectSerialNum(item.msnfSN);
                                //changeCusAddress(item.Address);
                                //setcustomerID(item.CusID);

                                //getItem(item.CusID);

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
                        placeholder="Contact Person"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={String(contactPerson)}
                        max={30}
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
                                setTechnicianID(item.user_id);
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
                                setSecretaryID(item.user_id);

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
                                setAssisstanceID(item.user_id);



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