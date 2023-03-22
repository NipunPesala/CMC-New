import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity, BackHandler, Alert, ToastAndroid
} from "react-native";
import ActionButton from "./ActionButton";
import comStyles from "../Constant/Components.styles";
import { TextInput } from "react-native";
import IconA from 'react-native-vector-icons/MaterialCommunityIcons';
import InputText from "./InputText";
import { FlatList } from "react-native-gesture-handler";
import SparepartsItem from "../SubComponents/SparepartsItem";
import { spareparts, additionalSpareParts } from "../Constant/DummyData";
import AdditionalSparepartsItem from "../SubComponents/AdditionalSparePartItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getSparePartsAllData } from "../SQLiteDatabaseAction/DBControllers/SparePartsController";
import ComponentsStyles from "../Constant/Components.styles";
import CheckBox from '@react-native-community/checkbox';
import SparepartsItem1 from "../SubComponents/SparepartsItem1";
import DialogInput from 'react-native-dialog-input';
import moment from "moment";
import { saveTicketSpareparts } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import { getASYNC_CURRENT_SP_REQUEST_ID, getASYNC_CURRENT_TICKET_ID, get_ASYNC_USERID } from "../Constant/AsynStorageFuntion";
import { getSearchSpareParts, updateSyncSpareParts } from '../SQLiteDatabaseAction/DBControllers/SparePartsController';
import Header from "./Header";
import { BASE_URL_GET } from "../Constant/Commen_API_Url";
import { getCustomerIDAsyncStorage, get_ASYNC_TOCKEN } from "../Constant/AsynStorageFuntion";
import { getWebRefIdByServiceId} from "../SQLiteDatabaseAction/DBControllers/TicketController";
import axios from "axios";
var spareID: any;
var id: any;
var reqID: any;
var TOCKEN_KEY: any;
var TicketIdNavIn: any;
var SparePartIdNav: any;
var UserIdUpload: any;
var TicketWebRefId: any;

const AddSparePartsComponent = () => {

    const [recent, setRecent] = useState(false);
    const [Value, setvalue] = useState('');
    const [mostUsed, setMostused] = useState(false);
    const [sparepartsList, setsparepartsList] = useState([]);
    const [selectcbx, setSelect] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const navigation = useNavigation();
    const [isDialog, setisDialog] = useState(false);
    const [spareID1, setspareID1] = useState('');
    const [Description, setDescription] = useState('');
    const [TicketID, setTicketID] = useState("");
    const [requestID, setRequestID] = useState("");
    const [searchText, setSearchText] = useState('');
    const [sparePartID, setsparePartID] = useState('');
    const [SparePartList, setSparePartList] = useState([]);
    // const [listdata, setlistdata] = useState(serviceData);
    const routeNav = useRoute();
    let SPqty: 0;
    const RecievedPressed = () => {
        setRecent(true);
        setMostused(false);
        // setlistdata(serviceData);
    }
    const ConfirmPressed = () => {
        setRecent(false);
        setMostused(true);
        // setlistdata(serviceData);
    }

    const onpressaddqty = (qty: any) => {
        console.log(qty, '========', spareID, '=====', spareID1, "-----------", id);

        if (qty && spareID != "") {

            SPqty = qty;

            try {

                let data = [
                    {

                        SPRequestID: requestID,
                        ticketId: TicketID,
                        name: "",
                        description: Description,
                        qty: qty,
                        approveStatus: "1",
                        spType_ID: 1, //Additional :2 inventory :1
                        SPartID: spareID1,
                        creationdate: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                        isSync: "true",

                    }
                ]

                saveTicketSpareparts(data, (result: any) => {


                    if (result === "success") {
                        ToastAndroid.show("Additional Spare Parts saved success ", ToastAndroid.SHORT);
                        UploadInventrySparePart(qty);
                        closeDialog();

                    } else {

                        Alert.alert(
                            "Failed...!",
                            " Save Failed.",
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

                console.log("ADD_ADDITIONAL_SPARE_PARTS SAVE " + error);
            }


        } else {
            Alert.alert(
                "Warning...!",
                "Please Enter  qty ",
                [
                    {
                        text: "OK", onPress: () => {

                        }
                    }
                ]
            );
        }



    }

    const getserviceTiketWebID = () => {

        getWebRefIdByServiceId(TicketIdNavIn, (result: any) => {
            console.log('get web ref idd=======================', result);
            TicketWebRefId = result[0].Ticket_web_RefID;
            console.log('get web ref idd variable =======================', TicketWebRefId);
            // setlistdata(result);
        });
    }

    const UploadInventrySparePart = (qty: any) => {
        // console.log('this is user ID --------------',UserIdKey);
        try {

            get_ASYNC_TOCKEN().then(res => {
                TOCKEN_KEY = res;
                const AuthStr = 'Bearer '.concat(TOCKEN_KEY);


                const prams = {

                    "objSparePartList": [
                        {
                            "sparePartCode": SparePartIdNav,// done
                            "remark": "",
                            "content": "",
                            "secretary": "",
                            "createdBy": UserIdUpload,// done
                            "ticketId": TicketWebRefId,
                            "createdAt": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'), // done
                            "inventory": [
                                {
                                    "itemCode": spareID1,
                                    "itemName": Description,
                                    "itemType": "itItems",
                                    "qty": qty,
                                    "createdBy": UserIdUpload,
                                    "createdAt": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss')
                                    // "itemCode": "GY/600B/SFSSR",
                                    // "itemName": "Torque Adjustable Hand Capping Machine",
                                    // "itemType": "itItems",
                                    // "qty": 2,
                                    // "createdBy": 473762,
                                    // "createdAt": "2022-12-29 10:38:59"
                                }
                            ],
                            "additional": [

                            ]

                        }
                    ]
                }

                console.log('--Sparew part UPLOAD JSON--', prams);

                const headers = {
                    'Authorization': AuthStr
                }
                const URL = BASE_URL_GET + "spare-parts";
                axios.post(URL, prams, {
                    headers: headers
                })
                    .then((response) => {
                        console.log("[s][t][a][t][u][s][]", response.status);
                        if (response.status == 200) {

                            console.log('<------ Spare parts UPLOAD Method --->', response.data)
                            console.log('<------ Spare parts UPLOAD Method --->', response.data[0].inventory)
                            console.log(response.data[0].UniqueNo);

                            if (response.data[0].ErrorId == 0) {
                                // this use fro update sync flag as 1 

                                updateSyncSpareParts(TicketIdNavIn,(result: any) => {
                                     console.log("inventory spare part sync status--------- ", result);

                                 });
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
                        console.log("error .........", error);

                        Alert.alert('error', error)

                    })

            })
        } catch (error) {
            console.log(">>>>>>>>>>>>", error);

        }
    }

    //  const UploadSpareParts = () => {
    //         try {

    //           get_ASYNC_TOCKEN().then(res => {
    //             TOCKEN_KEY = res;
    //             const AuthStr = 'Bearer '.concat(TOCKEN_KEY);

    //          // console.log( 'AuthStr####3%%%%%%%%%%%%%',AuthStr);

    //         const prams= {
    //           "objSparePartList": [
    //             {
    //               "spId": requestID,  //need to code
    //               "SparePartNo": TicketID,
    //               "description": Description,
    //               "stock_qty": SPqty,
    //               "Item_Group":"",
    //               "department":"",
    //               "BrandName":"",
    //               "status":0,


    //               }
    //           ]
    //         }

    //          console.log('--NEW SpareParts  UPLOAD JSON--', prams);

    //           const headers = {
    //             'Authorization': AuthStr
    //           }
    //           const URL = BASE_URL_GET+"spare-parts";
    //           axios.post(URL, prams, {
    //             headers: headers
    //           })
    //             .then((response) => {
    //                 console.log("[s][t][a][t][u][s][]",response.status);
    //                 if (response.status == 200) {

    //                console.log('<------ SpareParts UPLOAD Method --->', response.data)
    //                console.log(response.data.UniqueNo);

    //                if(response.data.ErrorId=0){
    //                 // this use fro update sync flag as 1 
    //                 updateSyncSpareParts(response.data.UniqueNo, (result: any) => {

    //                 });
    //                 ToastAndroid.show(response.data.ErrorDescription, ToastAndroid.LONG);
    //                }

    //             }else{
    //                 Alert.alert(
    //                     "Invalid Details!",
    //                     "Bad Request",
    //                     [
    //                         { text: "OK", onPress: () => console.log("OK Pressed") }
    //                     ]
    //                 );

    //                 }

    //             })
    //             .catch((error) => {
    //               Alert.alert('error', error.response)

    //             })

    //        })
    //         } catch (error) {
    //           console.log(">>>>>>>>>>>>", error);

    //         }
    //       }



    const showDialog = (data: any) => {

        // console.log(data.SparePartNo,"------------------",data.description);

        setisDialog(true)
        spareID = data;
        setspareID1(data.SparePartNo)
        setDescription(data.description)
        // console.log(data);

    }
    const closeDialog = () => {
        setisDialog(false)
    }
    const confirmbtn = (data: any) => {

    }


    useEffect(() => {
        setRecent(false);
        setMostused(true);
        TicketIdNavIn = routeNav.params.ticketIdNav;
        SparePartIdNav = routeNav.params.sparePartIdNav;
        console.log('ticket id nav++++++++++++', TicketIdNavIn);
        console.log('Spare part  nav++++++++++++', SparePartIdNav);
        getserviceTiketWebID();
        get_ASYNC_USERID().then(res => {
            UserIdUpload = res;
            console.log('user id upload  --' + UserIdUpload);
        });
        getASYNC_CURRENT_TICKET_ID().then(res => {
            console.log(res);
            id = res;
            setTicketID(id);
            console.log(id, "=====================================");

            // setTicketID(id);

        });

        getASYNC_CURRENT_SP_REQUEST_ID().then(res => {
            reqID = res;
            setRequestID(reqID);
        });

        getSparePartsAllData((result: any) => {
            setSparePartList(result);
            // console.log("All spare part===================",result);
        });
        const backAction = () => {

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

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
    const searchSpareParts = (text: any) => {

        setSearchText(text);

        getSearchSpareParts(text, (result: any) => {

            setSparePartList(result);

        });



    }

    return (
        <SafeAreaView style={comStyles.CONTAINER}>
            <Header title="Inventory Spare Parts" isBtn={true} btnOnPress={() => navigation.goBack()} />
            {/* <View style={{ padding: 5 }} /> */}

            <View style={style.modalMainContainer}>

                {/* <TouchableOpacity style={style.dashStyle} onPress={() => navigation.navigate("RequestBottomSheet")} /> */}

                {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, margin:10}}>

                <ActionButton title="Cancel" style={style.loginBtn} textStyle={style.txtStyle} onPress={cancelAndGoBack
                } />
                <ActionButton title="Add" style={{ flex: 0.5 }} />

            </View> */}

                <InputText
                    placeholder="Search Spare Parts"
                    is_clr_icon={true}
                    icon_name1="search1"
                    iconClr="rgba(60, 60, 67, 0.6)"
                    style={{
                        marginTop: 5,
                        paddingLeft: 50,
                        margin: 10,
                    }}
                    imgStyle={{
                        paddingTop: 10,
                        left: 20,
                    }}
                    stateValue={searchText}
                    setState={(newText: any) => searchSpareParts(newText)}
                />
                <View style={{ margin: 10 }}>
                    <View style={style.container}>

                        <ActionButton
                            title="Recent"
                            onPress={ConfirmPressed}
                            style={mostUsed === true ? style.selectedbutton : style.defaultbutton}
                            textStyle={mostUsed === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                        />

                        <ActionButton
                            title="Most used"
                            onPress={RecievedPressed}
                            style={recent === true ? style.selectedbutton : style.defaultbutton}
                            textStyle={recent === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                        />
                    </View>
                </View>


                <View style={{ flexDirection: 'row', backgroundColor: comStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
                    <Text style={{ flex: 0.5 }}>ID</Text>
                    <Text style={{ flex: 2 }}>Description</Text>
                    <Text style={{ flex: 0.6 }}>Av:Qty</Text>
                </View>

                <FlatList
                    // showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={SparePartList}
                    style={{ marginTop: 5, marginBottom: 5, }}
                    renderItem={({ item }) => {
                        return (
                            <SparepartsItem1
                                is_editinput={true}
                                id={item.SparePartNo}
                                description={item.description}
                                quantity={item.stock_qty}
                                MinonPress={() => { showDialog(item) }}
                            />
                        );
                    }}
                    keyExtractor={item => `${item._Id}`}
                />
                <View style={{ padding: 15 }} />
                <DialogInput
                    isDialogVisible={isDialog}
                    title={"Add Quntity"}
                    hintInput={"Enter Quntity"}
                    submitInput={(inputText) => {
                        onpressaddqty(inputText)
                    }}
                    closeDialog={() => { closeDialog() }}

                >
                </DialogInput>

            </View>

        </SafeAreaView>
    );

}

export default AddSparePartsComponent;


const style = StyleSheet.create({

    modalMainContainer: {
        flex: 1
    },

    modalSubContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 5

    },
    checkbox: {
        alignSelf: "center",
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 5
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
    },
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

    selectedbutton: {
        backgroundColor: comStyles.COLORS.ICON_BLUE,
        flex: 0.5,
        borderRadius: 5,
    },
    selectedBUTTON_TEXT: {
        color: comStyles.COLORS.WHITE,
    },
    defaultbutton: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        justifyContent: 'center',
        borderRadius: 5,
        flex: 0.5
    },
    defaultBUTTON_TEXT: {
        color: comStyles.COLORS.REQUEST_DETAILS_ASH,
    },
    containerflatlist: {
        flexDirection: 'row',
        height: 40,

    },
    inputTextStyle: {
        borderWidth: 1,
        paddingLeft: 0,
        marginLeft: 0,
        fontSize: 16,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        // borde: 1,
        borderColor: ComponentsStyles.COLORS.HEADER_BLACK,
        // borderStyle: "dashed",
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 0,
        height: 30
    },
    boraderstyle: {
        textAlign: 'center'
    }



});


