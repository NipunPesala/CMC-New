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
import { useNavigation } from "@react-navigation/native";
import InputText from "./InputText";
import IconA from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import { deleteAllSparePartsReleventTickets, getALLAdditionalSpareTiketdetasils, saveTicketSpareparts } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import ListBox from "./ListBox";
import { getASYNC_CURRENT_SP_REQUEST_ID, getASYNC_CURRENT_TICKET_ID } from "../Constant/AsynStorageFuntion"
import Header from "./Header";
import { Colors } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import base64 from 'base64-js';

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
    const [cameraCaptureImg, setCameraCaptureImg] = useState();
    const [base64Img, setBase64Img] = useState();

var id:any;
    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
           
            getASYNC_CURRENT_TICKET_ID().then(res => {
                console.log(res);
                 id = res;
                 setTicketID(id);
                console.log(id,"=====================================");
                getAllSavedTicketSpareParts(res);
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


    const saveTickrSpareParts = () => {

        if (descriptionvalue && enterQty != "") {
            try {

                let data = [
                    {

                        SPRequestID:requestID,
                        ticketId: ticketID,
                        name: "",
                        description: descriptionvalue,
                        qty: enterQty,
                        approveStatus: "1",
                        spType_ID: 2, //Additional :2 inventory :1
                        creationdate: moment().utcOffset('+05:30').format('YYYY-MM-DD'),
                        isSync: "true",

                    }
                ]

                saveTicketSpareparts(data, (result: any) => {
                    console.log(result, "/ADD_ADDITIONAL_SPARE_PARTS SAVE");

                    if (result === "success") {
                        ToastAndroid.show("Additional Spare Parts saved success ", ToastAndroid.SHORT);
                        slideOutModal();
                        getAllSavedTicketSpareParts(ticketID);

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

        console.log("L " + result);
        deleteAllSparePartsReleventTickets(result, result);
        getAllSavedTicketSpareParts(ticketID);
    };


    const getAllSavedTicketSpareParts = (data:any) => {
        try {

            getALLAdditionalSpareTiketdetasils(data,(result: any) => {
                setlistdata(result);
            });
        } catch (error) {
            console.log("AddAdditionalSpareParts GET ALL " + error);
        }
    };

    const close = () => {

        slideOutModal();
        getAllSavedTicketSpareParts(ticketID);
    }

    const takePhotoFromCamera=()=>{
        console.log('check camera button')
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
          }).then(image => {
            //console.log(image);
            setCameraCaptureImg(image.path);
            setBase64Img(image.data);
            const Base64String=image.data;
            console.log('Base 64 image-'+Base64String);


          });

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
                            id={item.spId}
                            description={item.description}
                            quantity={item.qty}
                            is_icon={true}
                            onPressIcon={() => deleteItem(item.spId)}
                        />

                        // <AdditionalSparepartsItem
                        //     id={item.spId}
                        //     description={item.description}
                        //     quantity={item.qty}
                        //     is_icon={true}
                        // />

                    );





                }}

                keyExtractor={item => `${item.id}`}
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
                        <InputText
                            style={styles.inputTextStyle}
                            placeholder="Enter Description"
                            max={30}
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

                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center",marginBottom: 10}}>
                        <ActionButton title="Capture image"
                                onPress={() => takePhotoFromCamera()}
                                style={{ flex: 0.5 , backgroundColor: "#17A2B8",}} />    
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
                        
                            <Image
                                style={{width: 225, height: 175,}}
                                //source={require('../assets/images/out24.png')}
                                source={{
                                    uri:cameraCaptureImg,
                                }}
                                 
                                
                            /> 
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
                        <View style={{ padding:30 }} />
                        


                    </View>


                    {/* ........................................ add new prodcut  modal end.......................................... */}

              
                </View>

                </ScrollView>
            </Animated.View>

            <View style={{ padding:30 }} />
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
    cameraBtn:{
       // backgroundColor: '#17A2B8',
       color: comStyles.COLORS.RED_COLOR,
       margin:"2"
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