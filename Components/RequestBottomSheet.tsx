import React, { useState, useEffect, useRef } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ScrollView,
} from "react-native";
import ActionButton from "./ActionButton";
import comStyles from "../Constant/Components.styles";
import { FlatList } from "react-native-gesture-handler";
import SparepartsItem from "../SubComponents/SparepartsItem";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Header from "./Header";
import { getALLAInventrySpareTiketdetasils, getALLAdditionalSpareTiketdetasils, getLastRequestId, getTicketsForInprogress, getSparepartDetailsForEmail, getServiceTicketID } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import { getASYNC_CURRENT_TICKET_ID, getASYNC_SELECT_TICKET } from "../Constant/AsynStorageFuntion"
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../Constant/AsyncStorageConstants";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from "react-native-element-dropdown";
import DialogInput from 'react-native-dialog-input';
import Mailer from 'react-native-mail';
import { getALLAInventrySpare } from "../SQLiteDatabaseAction/DBControllers/InventrySparepartsController";
import { getALLAdditionalSpare } from "../SQLiteDatabaseAction/DBControllers/AdditionalSparepartsController";

var id: any;
const RequestBottomSheet = () => {
    const navigation = useNavigation();
    const [AddInventorySpareParts, setAddInventorySpareParts] = useState(false);
    const [AddAdditionalSpareParts, setAddAdditionalSpareParts] = useState(false);
    const [sparepartsList, setsparepartsList] = useState([]);
    const [Invenrty, setInvenrty] = useState('');
    const [TicketID, setTicketID] = useState('');
    const [RequestID, setRequestID] = useState('');
    const [isSelectTicket, setIsSelectTicket] = useState(true);   // dashborad spare part  = true
    const [ticketList, setTicketList] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isDialog, setisDialog] = useState(false);
    const [sendEmailDetails, setSendEmailDetails] = useState([]);
    var emaildetailArray: any[] = [];
    let dropDownAlertRef = useRef();


    const handle_AddInventorySpareParts = () => {

        console.log(" request bottom sheet  ,,,,,,,,,,,,,,,,,,,,, ", isSelectTicket);

        if (isSelectTicket == true) {

            if (TicketID != "") {

                setAddInventorySpareParts(true);
                setAddAdditionalSpareParts(false);
                setInvenrty("1");
                getALlDatainventy(TicketID);

            } else {

                Alert.alert(
                    "Failed...!",
                    "Service Ticket not selected.",
                    [
                        {
                            text: "OK", onPress: () => {

                            }
                        }
                    ]
                );

            }


        } else {

            setAddInventorySpareParts(true);
            setAddAdditionalSpareParts(false);
            setInvenrty("1");
            getALlDatainventy(TicketID);


        }



    };
    const handale_AddAdditionalSpareParts = () => {
        console.log(" ,,,,,,,,,,,,,,,,,,,,, ", isSelectTicket);

        if (isSelectTicket == true) {


            if (TicketID != "") {

                setAddInventorySpareParts(false);
                setAddAdditionalSpareParts(true);
                setInvenrty("2");
                getALlDatAdditional(TicketID);
                // getLastReadervalue();
                // getAllAttendanceDetails();

            } else {

                Alert.alert(
                    "Failed...!",
                    "Service Ticket not selected.",
                    [
                        {
                            text: "OK", onPress: () => {

                            }
                        }
                    ]
                );

            }


        } else {

            setAddInventorySpareParts(false);
            setAddAdditionalSpareParts(true);
            setInvenrty("2");
            getALlDatAdditional(TicketID);

        }






    };


    const AddInventory = () => {

        if (isSelectTicket == true) {

            if (TicketID != "") {

                navigation.navigate("AddSparePartsComponent",{ ticketIdNav: TicketID,sparePartIdNav:RequestID });

            } else {

                Alert.alert(
                    "Failed...!",
                    "Service Ticket not selected.",
                    [
                        {
                            text: "OK", onPress: () => {

                            }
                        }
                    ]
                );
            }


        } else {

            navigation.navigate("AddSparePartsComponent",{ ticketIdNav: TicketID,sparePartIdNav:RequestID });

        }


    }


    const AddAdditional = () => {


        if (isSelectTicket == true) {

            if (TicketID != "") {

                navigation.navigate("AddAdditionalSpareParts",{ ticketIdNav: TicketID,sparePartIdNav:RequestID })

            } else {

                Alert.alert(
                    "Failed...!",
                    "Service Ticket not selected.",
                    [
                        {
                            text: "OK", onPress: () => {

                            }
                        }
                    ]
                );



            }


        } else {

            navigation.navigate("AddAdditionalSpareParts",{ ticketIdNav: TicketID,sparePartIdNav:RequestID })

        }


    }

    const generateRequestID = () => {

        // console.log(route.params.status);

        getLastRequestId((result: any) => {


            if (result.length == 0) {
                GetLastID(0);
            } else {

                for (let i = 0; i < result.length; ++i) {

                    GetLastID(result[i].spId);

                }

            }


        })

    };

    const getTicketList = () => {


        getServiceTicketID((result: any) => {
            setTicketList(result);

            //console.log("^^==================^",JSON.stringify(result));
        });

    };

    const GetLastID = (id: any) => {

        var requestID = parseInt(id) + 1;
        console.log(requestID, "  ///////////////////////////////////////   ");

        const rid = "STR_" + moment().utcOffset('+05:30').format('YYYY-MM-DD') + "_" + requestID;

        setRequestID(rid);
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SP_REQUEST_ID, rid);
    };

    useFocusEffect(
        React.useCallback(() => {

            setisDialog(false);
            setAddInventorySpareParts(true);
            setAddAdditionalSpareParts(false);
            setInvenrty("1");


            getASYNC_SELECT_TICKET().then(res => {

                if (res == 'true') {
                    setIsSelectTicket(true);
                    getTicketList();
                    // handle_AddInventorySpareParts();

                } else {
                    setIsSelectTicket(false);

                    getASYNC_CURRENT_TICKET_ID().then(res => {
                        console.log(res);
                        id = res;

                        setTicketID(id);
                        getALlDatainventy(res);
                    });
                }


            });

            generateRequestID();


        }, []),
    );


    // useEffect(() => {

    //     const focusHandler = navigation.addListener('focus', () => {
    //         setAddInventorySpareParts(true);
    //         setAddAdditionalSpareParts(false);
    //         setInvenrty("1");


    //         getASYNC_SELECT_TICKET().then(res => {

    //             if (res == 'true') {
    //                 setIsSelectTicket(true);
    //                 getTicketList();

    //             } else {
    //                 setIsSelectTicket(false);

    //                 getASYNC_CURRENT_TICKET_ID().then(res => {
    //                     console.log(res);
    //                     id = res;

    //                     setTicketID(id);
    //                     getALlDatainventy(res);
    //                 });
    //             }


    //         });

    //         generateRequestID();
    //         handle_AddInventorySpareParts();

    //     });

    //     return focusHandler;
    // }, [navigation]);

    // useEffect(() => {


    //     setAddInventorySpareParts(true);
    //     setAddAdditionalSpareParts(false);
    //     setInvenrty("1");



    //     getASYNC_CURRENT_TICKET_ID().then(res => {
    //         console.log(res);
    //         id = res;

    //         setTicketID(id);
    //         getALlDatainventy(res);
    //     });


    //     generateRequestID();

    // }, []);

    const getALlDatainventy = (data: any) => {
        getALLAInventrySpare(data, (result: any) => {


            console.log("++++++++++++,",result);
            
            setsparepartsList(result);


        });
    }
    const getALlDatAdditional = (data: any) => {

        console.log(TicketID, "----44--");

        getALLAdditionalSpare(TicketID, (result: any) => {


            setsparepartsList(result);
            console.log(sparepartsList, "---------1111------");

        });
    }


    const onPressGetEmail = (emailAddtrss: any) => {
        if (sparepartsList.length == 0) {
            // dropDownAlertRef.alertWithType('error', 'Error', 'No spare parts to send email..!');
            Alert.alert('Failed...!', 'No spare parts to send email..!', [
                {
                    text: 'OK',
                    onPress: () => { closeDialog() },
                },
            ]);
        } else {
            handleEmail1(emailAddtrss);
        }

    }

    const createEmailbody = (serviceRequestsxx: any) => {

        let body = '';
        serviceRequestsxx.forEach((emaildetailArray) => {
            for (const key in emaildetailArray) {
                if (emaildetailArray.hasOwnProperty(key)) {
                    body += `${key}:- ${emaildetailArray[key]}<br/>`;
                }
            }
            body += '<br/>';
        });
        return body;

    }


    const handleEmail1 = (email: any) => {

        getSparepartDetailsForEmail(TicketID, (result: any) => {
            setSendEmailDetails(result);
            for (var i = 0; i < result.length; i++) {
                emaildetailArray.push(result[i]);
            }
            const body1 = createEmailbody(emaildetailArray);
            Mailer.mail({
                subject: 'Request Sapare Parts',
                recipients: [email],
                body: body1,
                // customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
                isHTML: true,
            }, (error, event) => {
                console.log(error);
            });
        });
    }


    const onpressEmailBtn = () => {
        // emailValidation.alertWithType('error', 'Error', 'No spare parts to send email..!');
        setisDialog(true);

    }

    const closeDialog = () => {
        setisDialog(false)
    }
    return (
        <SafeAreaView style={comStyles.CONTAINER}>

            <Header title="Request Spare Parts" isBtn={true} btnOnPress={() => navigation.goBack()} />
            <View style={{ padding: 5 }} />
            {/* <Header title="Request Spare Parts" isBtn={true} btnOnPress={() => navigation.goBack()} /> */}

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 5, }}>

                <View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
                    <Text style={style.maintxtmain}>Spare Part Request ID</Text>
                    <Text style={style.maintxtsub}>{RequestID}</Text>
                </View>

                <View>
                    {isSelectTicket ?


                        // <View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
                        <View>
                            <Text style={style.maintxtmain}>Select Service Ticket ID</Text>
                            <Dropdown
                                style={[
                                    style.dropdown,
                                    isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR },
                                ]}
                                placeholderStyle={style.placeholderStyle}
                                selectedTextStyle={style.selectedTextStyle}
                                inputSearchStyle={style.inputSearchStyle}
                                iconStyle={style.iconStyle}
                                data={ticketList}
                                search
                                maxHeight={300}
                                labelField="ticketId"
                                valueField="ticketId"
                                placeholder={!isFocus ? 'Select Ticket ID ' : '...'}
                                searchPlaceholder="Search Ticket"
                                value={TicketID}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {

                                    setTicketID(item.ticketId);
                                    getALlDatainventy(item.ticketId);

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


                        :

                        <View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", }}>
                            <Text style={style.maintxtmain}>Service Ticket ID</Text>
                            <Text style={style.maintxtsub}>{TicketID}</Text>
                        </View>


                    }


                </View>


            </View>
            <ScrollView style={style.scrollStyle} nestedScrollEnabled={true}>
                <View style={style.container}>
                    <ActionButton
                        title="Inventory Spare Parts"
                        onPress={handle_AddInventorySpareParts}
                        style={AddInventorySpareParts === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={AddInventorySpareParts === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />

                    <ActionButton
                        title="Additional Spare Parts"
                        onPress={handale_AddAdditionalSpareParts}
                        style={AddAdditionalSpareParts === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={AddAdditionalSpareParts === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />

                </View>

                <View>
                    {AddInventorySpareParts ?
                        <View>
                            <ActionButton
                                title="Add Inventory Spare Parts"
                                is_icon={true}
                                icon_name="diff-added"
                                onPress={() => AddInventory()}
                                iconColor={comStyles.COLORS.ICON_BLUE}
                                style={style.partsBtn}
                                textStyle={{ color: comStyles.COLORS.ICON_BLUE, }}
                            />
                            <View style={{ flexDirection: 'row', backgroundColor: comStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
                                <View style={{ flex: 1,alignItems:'center',justifyContent:'center'}}><Text>ID</Text></View>
                                <View style={{ flex: 2,alignItems:'center',justifyContent:'center'}}><Text>Description</Text></View>
                                <View style={{ flex: 0.6,alignItems:'center',justifyContent:'center'}}><Text>Req.Qty</Text></View>
                            </View>

                        </View>

                        :
                        <View>
                            <ActionButton
                                title="Add Additional Spare Parts"
                                is_icon={true}
                                icon_name="diff-added"
                                onPress={() => AddAdditional()}
                                iconColor={comStyles.COLORS.ICON_BLUE}
                                style={style.partsBtn}
                                textStyle={{ color: comStyles.COLORS.ICON_BLUE, }}
                            />

                            <View style={{ flexDirection: 'row', backgroundColor: comStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, margin: 5, }}>

                                <Text style={{ flex: 2 }}>Description</Text>
                                <Text style={{ flex: 1 }}>Requested Qty</Text>
                            </View>
                        </View>

                    }

                </View>
                <View >
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ width: '95%', height: '95%', marginLeft: 15, marginRight: 15 }}>
                        <FlatList
                            // showsHorizontalScrollIndicator={false}
                            // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                            data={sparepartsList}
                            scrollEnabled={true}
                            style={{ marginTop: 5, marginBottom: 5, }}
                            renderItem={({ item }) => {
                                return (
                                    <SparepartsItem
                                        is_editinput={true}
                                        is_additional={AddInventorySpareParts}
                                        id={item.SP_ItemCode}
                                        description={item.ItemName}
                                        quantity={item.Quantity}


                                    />
                                );
                            }}
                            keyExtractor={item => `${item.Id}`}

                        />
                    </ScrollView>
                </View>

            </ScrollView>

            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <ActionButton
                    title="Send Email"
                    onPress={onpressEmailBtn}

                // iconColor={ComStyles.COLORS.WHITE}
                />
            </View>
            <View style={{ marginBottom: 50 }} />
            <View style={{ padding: 15 }} />



            <DialogInput
                isDialogVisible={isDialog}
                title={"Add Email Address"}
                hintInput={"Email Address"}
                submitInput={(inputText) => {
                    onPressGetEmail(inputText);
                    closeDialog();
                }}
                closeDialog={() => { closeDialog() }}

            >
            </DialogInput>
        </SafeAreaView>
        // <View style={style.modalMainContainer}>

        //     <TouchableOpacity style={style.dashStyle} onPress={() => navigation.navigate('TicketDetails')} />



        //     <ActionButton
        //         title="Service Ticket ID"
        //         disabled={true}
        //         style={style.subTitle}
        //         textStyle={style.textStyle}
        //     />

        //     <ActionButton
        //         title="Add Inventory Spare Parts"
        //         is_icon={true}
        //         icon_name="diff-added"
        //         onPress={() => navigation.navigate('AddSparePartsComponent')}
        //         iconColor={comStyles.COLORS.ICON_BLUE}
        //         style={style.partsBtn}
        //         textStyle={{ color: comStyles.COLORS.ICON_BLUE, }}
        //     />

        // <View style={{ flexDirection: 'row', backgroundColor: comStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
        //     <Text style={{ flex: 1 }}>ID</Text>
        //     <Text style={{ flex: 2 }}>Description</Text>
        //     <Text style={{ flex: 1 }}>Requested Qty</Text>
        // </View>

        //     <FlatList
        //         showsHorizontalScrollIndicator={false}
        //         // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
        //         data={spareparts}
        //         style={{ marginTop: 5, marginBottom: 5, flex: 2 }}
        //         renderItem={({ item }) => {
        //             return (
        //                 <SparepartsItem
        //                     id={item.id}
        //                     description={item.description}
        //                     quantity={item.quantity}
        //                 />
        //             );
        //         }}
        //         keyExtractor={item => `${item.id}`}
        //     />

        //     <ActionButton
        //         title="Add Additional Spare Parts"
        //         is_icon={true}
        //         icon_name="diff-added"
        //         onPress={() => navigation.navigate("AddAdditionalSpareParts")}
        //         iconColor={comStyles.COLORS.ICON_BLUE}
        //         style={style.partsBtn}
        //         textStyle={{ color: comStyles.COLORS.ICON_BLUE, }}
        //     />

        //     <View style={{ flexDirection: 'row', backgroundColor: comStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
        //         <Text style={{ flex: 2 }}>Description</Text>
        //         <Text style={{ flex: 1 }}>Requested Qty</Text>
        //     </View>

        //     <FlatList
        //         showsHorizontalScrollIndicator={false}
        //         // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
        //         data={additionalSpareParts}
        //         style={{ marginTop: 5, marginBottom: 5, flex: 2 }}
        //         renderItem={({ item }) => {
        //             return (
        //                 <AdditionalSparepartsItem
        //                     id={item.id}
        //                     description={item.description}
        //                     quantity={item.quantity}

        //                 />
        //             );
        //         }}
        //         keyExtractor={item => `${item.id}`}
        //     />
        //     <ActionButton
        //         title="Submit Spare Parts Request"
        //         style={{ marginBottom: 58 }}
        //     />
        //     <View style={{padding:5}}/>
        // </View>
    );

}

export default RequestBottomSheet;


const style = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },

    modalSubContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
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
    maintxtmain: {

        color: comStyles.COLORS.BLACK,
        fontSize: 18,
        marginLeft: 5,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 5,
    },
    maintxtsub: {

        color: comStyles.COLORS.ICON_BLUE,
        fontSize: 16,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 5,
        marginLeft: 15
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
        justifyContent: "center",
        alignItems: "center"
    },
    partsBtn: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderColor: comStyles.COLORS.ICON_BLUE,
        borderWidth: 1,
        textAlignVertical: "center",
        borderRadius: 4,
        margin: 5,
        color: comStyles.COLORS.ICON_BLUE,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: comStyles.COLORS.BLACK,
    },
    selectedTextStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: comStyles.COLORS.ICON_BLUE,
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
    scrollStyle: {
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
    },

});


