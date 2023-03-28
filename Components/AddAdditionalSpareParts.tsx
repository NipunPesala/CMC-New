import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Animated,
    Keyboard,
    SafeAreaView,
    Alert,
    ToastAndroid,
    Image,
    ScrollView,
} from "react-native";
import ActionButton from "./ActionButton";
import comStyles from "../Constant/Components.styles";
//import { spareparts, additionalSpareParts } from "../Constant/DummyData";
import AdditionalSparepartsItem from "../SubComponents/AdditionalSparePartItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputText from "./InputText";
import IconA from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import { deleteAllSparePartsReleventTickets, getALLAdditionalSpareTiketdetasils, saveTicketSpareparts, getWebRefIdByServiceId, updateSycncSparepart, updateTicketSpare_webRef, getSparePart_Remove_web_ref } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import ListBox from "./ListBox";
import { getASYNC_CURRENT_SP_REQUEST_ID, get_ASYNC_TOCKEN, get_ASYNC_USERID, getASYNC_CURRENT_TICKET_ID } from "../Constant/AsynStorageFuntion"
import Header from "./Header";
import { Colors } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import base64 from 'base64-js';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

import { BASE_URL_GET, } from "../Constant/Commen_API_Url";
import axios from "axios";
import { checkSparpartsHeader, saveSparepartsHeader } from "../SQLiteDatabaseAction/DBControllers/SparepartsHeaderController";
import { deleteAllSpareParts, getALLAdditionalSpareTiketdetasilsNew, getSpesificData, saveAdditionalSpareparts } from "../SQLiteDatabaseAction/DBControllers/AdditionalSparepartsController";
import { saveImagepathToDB, } from "../SQLiteDatabaseAction/DBControllers/AddionalSpareImageController";

var imagePath = '';
type CustomPropTypes = {
    placeholder?: string;
    style?: any;
    textstyle?: any;
    placeholderColor?: string;
    onpressicon?: Function;
    onpress?: Function;
    icon_name?: string;
}
var reqID: any;
var TOCKEN_KEY: any;
var TicketIdNav: any;
var SparePartIdNav: any;
var UserIdUpload: any;
var TicketWebRefId: any;
var deleteWebRefId: any;
var descUpdate: any;
var qtyUpdate: any;

const AddAdditionalSpareParts = () => {

    const navigation = useNavigation();
    let height = Dimensions.get("screen").height;
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [isShowSweep, setIsShowSweep] = useState(true)
    const [descriptionvalue, setdescriptionvalue] = useState('');
    const [enterQty, setenterQty] = useState('');
    const [listdata, setlistdata] = useState("");
    const [ticketID, setTicketID] = useState("");
    const [requestID, setRequestID] = useState("");
    const width = Dimensions.get('screen').width;
    const [cameraCaptureImg, setCameraCaptureImg] = useState(null);
    const [cameraCaptureImg2, setCameraCaptureImg2] = useState(null);
    const [cameraCaptureImg3, setCameraCaptureImg3] = useState(null);
    const [base64Img, setBase64Img] = useState();
    const routeNav = useRoute();

    var id: any;
    useEffect(() => {
        TicketIdNav = routeNav.params.ticketIdNav;
        SparePartIdNav = routeNav.params.sparePartIdNav;
        getserviceTiketWebID();
        get_ASYNC_USERID().then(res => {
            UserIdUpload = res;
            console.log('user id upload  --' + UserIdUpload);
        });
        const focusHandler = navigation.addListener('focus', () => {

            getASYNC_CURRENT_TICKET_ID().then(res => {
                console.log(res);
                id = res;
                setTicketID(id);
                console.log(id, "=====================================");
                getAllSavedTicketSpareParts(SparePartIdNav);
                // setTicketID(id);

            });

            getASYNC_CURRENT_SP_REQUEST_ID().then(res => {
                reqID = res;
                setRequestID(reqID);
            });
        });
        return focusHandler;
    }, []);


    const slideInModal = () => {
        setIsShowSweep(false);
        Animated.timing(modalStyle, {
            toValue: height / 8,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const slideOutModal = () => {
        setdescriptionvalue('');
        setenterQty('');
        getAllSavedTicketSpareParts(id);

        setIsShowSweep(true);
        Keyboard.dismiss();
        Animated.timing(modalStyle, {
            toValue: height,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    // const encodeImage = async (filePath) => {
    //     try {
    //       const encoded = await RNFS.readFile(filePath, 'base64');
    //       const base64Image = `data:image/png;base64,${encoded}`;
    //     console.log('encoded image-'+base64Image);
    //       return base64Image;
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };

    const getserviceTiketWebID = () => {

        getWebRefIdByServiceId(TicketIdNav, (result: any) => {
            console.log('get web ref idd=======================', result);
            TicketWebRefId = result[0].Ticket_web_RefID;
            console.log('get web ref idd variable =======================', TicketWebRefId);
            // setlistdata(result);
        });
    }

    const saveTickrSpareParts = () => {

        if (descriptionvalue && enterQty != "") {
            try {

                // let data = [
                //     {

                //         SPRequestID: requestID,
                //         ticketId: ticketID,
                //         name: "",
                //         description: descriptionvalue,
                //         qty: enterQty,
                //         approveStatus: "1",
                //         spType_ID: 2, //Additional :2 inventory :1
                //         SPartID: 0,
                //         creationdate: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                //         isSync: "0",
                //         TickSpare_web_RefID:0

                //     }
                // ]


                // saveTicketSpareparts(data, (result: any) => {
                //     console.log(result, "/ADD_ADDITIONAL_SPARE_PARTS SAVE");

                //     if (result === "success") {
                //         console.log("inside if++++++");
                //         UploadAdditionalSparePart();
                //        // CameraRoll.save(imagePath);
                //         ToastAndroid.show("Additional Spare Parts saved success ", ToastAndroid.SHORT);
                //         close();
                //         getAllSavedTicketSpareParts(ticketID);

                //     } else {

                //         Alert.alert(
                //             "Failed...!",
                //             " Save Failed.",
                //             [
                //                 {
                //                     text: "OK", onPress: () => {

                //                     }
                //                 }
                //             ]
                //         );

                //     }

                // });
                get_ASYNC_USERID().then(res => {
                    UserIdUpload = res;
                })
                let HederData = [
                    {

                        spareparts_No: requestID,
                        ticket_ID: ticketID,
                        CreatedBy: UserIdUpload,
                        CreatedAt: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                        Web_Ref_Id: TicketWebRefId,
                        status: 0,
                        is_Sync: 0,

                    }
                ]
                checkSparpartsHeader(requestID, (result1: any) => {
                    console.log('get web ref idd=======================', result1);

                    if (result1.length > 0) {
                        console.log("avalable--------------------", requestID);
                        saveImagepathTodb();
                        savedataDetails_Line(requestID, UserIdUpload);
                       
                    } else {
                        console.log('not Avalable------------------------');
                        saveSparepartsHeader(HederData, 0, (result: any) => {

                            savedataDetails_Line(requestID, UserIdUpload);
                            saveImagepathTodb();
                        });


                    }

                    // console.log('this is file pathe befor save to gallary+++++++++++++', cameraCaptureImg);
                    // CameraRoll.save(cameraCaptureImg);
                    // setCameraCaptureImg(null);

                    // setlistdata(result);
                });

            } catch (error) {

                console.log("ADD_ADDITIONAL_SPARE_PARTS SAVE " + error);
            }


        } else {


            Alert.alert(
                "Warning...!",
                "Please Enter Description  or qty ",
                [
                    {
                        text: "OK", onPress: () => {

                        }
                    }
                ]
            );

        }
    };


    const savedataDetails_Line = (spareparts_No: any, UserIdUpload1: any) => {
        console.log('detai------------------s', spareparts_No, '--------,', UserIdUpload1);
        let DetailsData = [
            {

                Description: descriptionvalue,
                Quantity: enterQty,
                Spareparts_HeaderID: spareparts_No,
                CreatedBy: UserIdUpload1,
                CreatedAt: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                Web_Ref_Id: TicketWebRefId,
                status: 0,
                is_Sync: 0,

            }
        ]

        saveAdditionalSpareparts(DetailsData, 0, (result2: any) => {


            if (result2 == 3) {
                console.log('----------awa------------------');
                close();
                getAllSavedTicketSpareParts(spareparts_No);
                UploadAdditionalSparePart();
            }
        });
        console.log(DetailsData, '=====3333=========');
    }
    //   const onpressDelete = (data: any) => {

    //     Alert.alert(
    //         "Approved",
    //         "Are you sure delete",
    //         [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => {

    //                 }
    //                 // console.log("Cancel Pressed"),
    //                 // style: "cancel"
    //             },
    //             {
    //                 text: "OK", onPress: () => {

    //                     console.log("L "+data);
    //                     deleteAllSparePartsReleventTickets(data,data);
    //                     getAllSavedTicketSpareParts();


    //                 }
    //             }
    //         ]
    //     );

    // }

    const deleteItem = (result: any) => {


        getSpesificData(result, (result1: any) => {
            console.log('web ref delete -+++++++++++++++++++++++++------', result);
            deleteWebRefId = result1[0].Web_Ref_Id;
            descUpdate = result1[0].Description;
            qtyUpdate = result1[0].Quantity;
            console.log('web ref delete -------', deleteWebRefId);
            UploadUpdatesRemoveSpare();
        });


        console.log("L ------------------" + result);
        deleteAllSpareParts(result, result);
        // // getAllSavedTicketSpareParts(ticketID);
        getAllSavedTicketSpareParts(SparePartIdNav);

    };


    const getAllSavedTicketSpareParts = (data: any) => {
        try {

            console.log('thusoi------------', data);

            getALLAdditionalSpareTiketdetasilsNew(data, (result: any) => {
                setlistdata(result);
                console.log('ticket spare part table-------', result);
            });
        } catch (error) {
            console.log("AddAdditionalSpareParts GET ALL " + error);
        }
    };

    const close = () => {
     
        slideOutModal();
        console.log('check close button ticket id------',ticketID);
        getAllSavedTicketSpareParts(ticketID);
        setCameraCaptureImg(null);
        setCameraCaptureImg2(null);
        setCameraCaptureImg3(null);
    }

    const takePhotoFromCamera = async () => {
        console.log('check camera button')
        try {
            const imageC = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true,
            }).then(image => {
                //capture multiple images
                if (cameraCaptureImg == null) {
                    setCameraCaptureImg(image.path);
                    CameraRoll.save(image.path);
                
                } else if (cameraCaptureImg != null && cameraCaptureImg2 == null && cameraCaptureImg3== null ) {
                    setCameraCaptureImg2(image.path);
                    CameraRoll.save(image.path);
                   // CameraRoll.save(cameraCaptureImg2);

                } else if(cameraCaptureImg != null && cameraCaptureImg2!= null && cameraCaptureImg3== null){
                    CameraRoll.save(image.path);
                    setCameraCaptureImg3(image.path);
                 
                
                }else if (cameraCaptureImg != null && cameraCaptureImg2!= null && cameraCaptureImg3!= null){

                    Alert.alert(
                        "Warning!",
                        "you can capture maximum three images",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }

                setBase64Img(image.data);
                const Base64String = image.data;
                //console.log('Base 64 image-' + Base64String);
                imagePath = image.path;
                // CameraRoll.save(cameraCaptureImg);
                // slideOutModal();
            });

            console.log('file path state-', imagePath);
        } catch (error) {

            console.log('image_error+++++++++++++++++', error);
        }
    }

    const saveImagepathTodb=()=>{
        
        let imagepathData = [
            {

                Spareparts_HeaderID:requestID,
                imgPath1: cameraCaptureImg,
                imgPath2: cameraCaptureImg2,
                imgPath3: cameraCaptureImg3,
                is_Sync: 0,

            }
        ]
              

        console.log('save db data',imagepathData);
          saveImagepathToDB(imagepathData, (result2: any) => {
                console.log('save image path____________',result2);
                if(result2=='success') {
                    console.log('Save before image++++++++++++++++++++++++++++++');
                   
                }
               
        });

        setCameraCaptureImg(null);
        setCameraCaptureImg2(null);
        setCameraCaptureImg3(null);
    }

    const remove_image = () => {
        if(cameraCaptureImg != null && cameraCaptureImg2!= null && cameraCaptureImg3!= null){
            setCameraCaptureImg3(null);
        }else if(cameraCaptureImg != null && cameraCaptureImg2!= null && cameraCaptureImg3== null){
            setCameraCaptureImg3(null);
            setCameraCaptureImg2(null);
        }else if(cameraCaptureImg != null && cameraCaptureImg2== null && cameraCaptureImg3== null){
            setCameraCaptureImg3(null);
            setCameraCaptureImg2(null);
            setCameraCaptureImg(null);
        }else{
            setCameraCaptureImg3(null);
            setCameraCaptureImg2(null);
            setCameraCaptureImg(null);
        }
     
    }



    const UploadAdditionalSparePart = () => {
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

                            ],
                            "additional": [
                                {
                                    "description": descriptionvalue,// done
                                    "remark": "",
                                    "qty": enterQty,
                                    "createdBy": UserIdUpload,
                                    "createdAt": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss') //done
                                }
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
                                console.log("additinal id-------------------- ", response.data[0].Additional[0].AdditionalId);
                                updateSycncSparepart(TicketIdNav, (result: any) => {
                                    console.log("additinal spare part sync status--------- ", result);

                                });
                                updateTicketSpare_webRef(TicketIdNav, response.data[0].Additional[0].AdditionalId, (result: any) => {
                                    console.log("additinal spare part Uodate web ref id--------- ", result);

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





    const UploadUpdatesRemoveSpare = () => {
        console.log('spare part id', deleteWebRefId);
        console.log('user id uplode', UserIdUpload);

        try {

            const prams = [{

                "additionalId": deleteWebRefId,
                "description": descUpdate,
                "remark": "reem",
                "qty": qtyUpdate,
                "isActive": 0,
                "modifiedBy": 473762,
                "modifiedAt": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss')

            }]

            console.log('-----Update delete spare part-- ----   ', prams);


            get_ASYNC_TOCKEN().then(res => {
                // console.log('cus id--' + customerID)
                TOCKEN_KEY = res;
                // const AuthStr = 'Bearer '.concat(TOCKEN_KEY);
                const AuthStr = ` Bearer ${TOCKEN_KEY}`;

                const headers = {
                    'Authorization': AuthStr
                }
                const URL = BASE_URL_GET + "spare-parts/additional";
                axios.put(URL, prams, {
                    headers: headers
                })
                    .then((response) => {
                        console.log("[s][t][a][t][u][s][]", response.status);
                        if (response.status == 200) {

                            console.log('<------ NEW Deleted spare part  UPLOAD Method --->', response.data)

                            if (response.data.ErrorId == 0) {
                                console.log('this is if inside----');
                                // this use fro update sync flag as 1 
                                // console.log('this is a web service call id ----', response.data[0].ServiceCallId);
                                // updateSycnServiceCAll(serviceId, (result: any) => {

                                // });

                            } else {

                                //  Alert.alert(response.ErrorDescription);

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
        <SafeAreaView style={comStyles.CONTAINER}>
            <Header title="Additional Spare Parts" isBtn={true} btnOnPress={() => navigation.goBack()} />
            <View style={{ padding: 5 }} />
            <View style={comStyles.CONTAINER}>

                {/* <TouchableOpacity style={style.dashStyle} onPress={() => navigation.navigate("RequestBottomSheet")} /> */}

                {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, }}>

                <ActionButton title="Cancel" style={style.loginBtn} textStyle={style.txtStyle} onPress={() => navigation.navigate("RequestBottomSheet")} />


                <ActionButton title="Accept" style={{ flex: 0.5 }} /> 
                </View>
                */}



                <View style={{ flexDirection: 'row', backgroundColor: comStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
                    <Text style={{ flex: 2, textAlign: "left" }}>Description</Text>
                    <Text style={{ flex: 1, textAlign: "left" }}>Req Qty</Text>
                    <Text style={{ flex: 1, textAlign: "right" }}></Text>
                </View>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={listdata}
                    style={{ marginTop: 5, marginBottom: 5, flex: 2 }}
                    renderItem={({ item }) => {

                        return (

                            <AdditionalSparepartsItem
                                id={item._Id}
                                description={item.Description}
                                quantity={item.Quantity}
                                is_icon={true}
                                onPressIcon={() => deleteItem(item._Id)}
                            />

                            // <AdditionalSparepartsItem
                            //     id={item.spId}
                            //     description={item.description}
                            //     quantity={item.qty}
                            //     is_icon={true}
                            // />

                        );





                    }}

                    keyExtractor={item => `${item._Id}`}
                />

                <ActionButton
                    title="Add Another Product"
                    style={style.partsBtn}
                    onPress={() => slideInModal()}
                    textStyle={{ color: comStyles.COLORS.ICON_BLUE, }}
                />


                {/* ........................................ add new prodcut modal start.......................................... */}

                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        top: modalStyle,
                        backgroundColor: '#fff',
                        zIndex: 20,
                        borderRadius: 10,
                        elevation: 20,
                        paddingTop: 10,
                        paddingBottom: 20,
                        marginLeft: 0,
                        ...Platform.select({
                            ios: {
                                paddingTop: 50
                            }
                        })
                    }}>
                    <ScrollView style={style.scrollStyle} nestedScrollEnabled={true}>
                        <View style={styles.modalCont}>



                            <View style={styles.modalMainContainer}>

                                <View style={styles.modalMainContainer}>
                                    <Text style={{
                                        fontFamily: comStyles.FONT_FAMILY.BOLD,
                                        color: comStyles.COLORS.HEADER_BLACK, fontSize: 15, marginTop: 10
                                    }
                                    }>Add the description and qty</Text>
                                </View>
                                <View style={{ marginLeft: 60, marginRight: 60 }}>
                                    <InputText
                                        style={styles.inputTextStyle}
                                        placeholder="Enter Description"
                                        max={50}
                                        stateValue={descriptionvalue}
                                        setState={
                                            (descriptionvalue) => setdescriptionvalue(descriptionvalue)
                                        }
                                    />
                                    <InputText
                                        style={styles.inputTextStyle}
                                        placeholder="Enter Qty"
                                        stateValue={enterQty}
                                        keyType='numeric'
                                        max={8}
                                        setState={
                                            (enterQty) => setenterQty(enterQty)}
                                    />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
                                    <ActionButton title="Capture image"
                                        onPress={() => takePhotoFromCamera()}
                                        style={{ flex: 0.5, backgroundColor: "#17A2B8", marginRight: 10 }} />
                                    <ActionButton title="Remove image"
                                        onPress={() => remove_image()}
                                        //onPress={() => saveImagepathTodb()}
                                        style={{ flex: 0.5, backgroundColor: "#FE6464", }} />
                                </View>

                                <View style={{ flexDirection: "row", }}>
                                    <View style={{ marginLeft:5  }}>
                                        <Image
                                            style={{ width: 100, height: 100, }}
                                            //source={require('../assets/images/out24.png')}
                                            source={{
                                                uri: cameraCaptureImg,
                                            }}
                                        />
                                    </View>

                                    <View style={{marginLeft:5 }}>
                                        <Image
                                            style={{ width: 100, height: 100, }}
                                            //source={require('../assets/images/out24.png')}
                                            source={{
                                                uri: cameraCaptureImg2,
                                            }}
                                        />
                                    </View>
                                    <View style={{ marginLeft:5  }}>
                                        <Image
                                            style={{ width: 100, height: 100, }}
                                            source={{
                                                uri: cameraCaptureImg3,
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, }}>

                                    <ActionButton title="Cancel"
                                        style={style.loginBtn}
                                        textStyle={style.txtStyle}
                                        onPress={() => close()} />


                                    <ActionButton title="Add"
                                        onPress={() => saveTickrSpareParts()}
                                        style={{ flex: 0.5 }} />

                                </View>
                                <View style={{ padding: 30 }} />



                            </View>


                            {/* ........................................ add new prodcut  modal end.......................................... */}


                        </View>

                    </ScrollView>
                </Animated.View>

                <View style={{ padding: 30 }} />
            </View>
        </SafeAreaView>

    );

}
export default AddAdditionalSpareParts;

const style = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: 10
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
    cameraBtn: {
        // backgroundColor: '#17A2B8',
        color: comStyles.COLORS.RED_COLOR,
        margin: "2"
    },
    partsBtn: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderColor: comStyles.COLORS.ICON_BLUE,
        borderWidth: 1,
        textAlignVertical: "center",
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 10,
        color: comStyles.COLORS.ICON_BLUE,

    }

});

const styles = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    modalSubContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 2

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
        marginBottom: 5
    },

    inputTextStyle: {
        borderWidth: 0,
        paddingLeft: 0,
        marginLeft: 0,
        width: '100%',
        fontSize: 15,
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