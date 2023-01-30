import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated,
    Keyboard,
    Platform,
    StyleSheet,
    FlatList
} from "react-native";
import Header from "../../Components/Header";
import ComStyles from "../../Constant/Components.styles";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../Components/InputText";
import ActionButton from "../../Components/ActionButton";
import style from "./Stylecv";
import IconA from 'react-native-vector-icons/FontAwesome';
import CalendarStrip from "react-native-calendar-strip";
import ResoucesCalendar from "../../Components/ResourcesCalendar";
import ResourcesRequestComponent from "../../Components/ResourcesRequestComponent";
import moment from "moment";
import { getCurrentDate, getCurrentTime } from "../../Constant/CommonFunctions";
import { RequestBydate } from "../../SQLiteDatabaseAction/DBControllers/ResourceRequestController";
import ListBox from "../../Components/ListBox";
import { getRESOURCE_ID } from "../../Constant/AsynStorageFuntion";

let height = Dimensions.get("screen").height;
var resourceID: any;
const VehicleCalendar = () => {

    const navigation = useNavigation();

    const [isShowSweep, setIsShowSweep] = useState(true);
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [selectedDate, setSelectedDate] = useState('');
    const [requestList, setRequestList] = useState([]);
    const [ResourceID, setResourceID] = useState('');


    const gotoNavigate = () => {

        navigation.navigate('ResourcesRequestComponent', {
            requestType: 'Vehical',
        });
    }
    const slideInModal = () => {
        setIsShowSweep(false);
        console.log('sampleIn');
        Animated.timing(modalStyle, {
            toValue: height / 8,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };
    //#endregion

    //#region SlideOutModal

    const slideOutModal = () => {

        console.log('out');
        setIsShowSweep(true);
        Keyboard.dismiss();
        Animated.timing(modalStyle, {
            toValue: height,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const getSelectedDate = (date:any,id:any) => {

        setSelectedDate(date);
        setResourceID(id);

        // let dates = date.format('DD MM YYYY');

        let momentObj = moment(date, 'MMMM Do YYYY')
        let showDate = moment(momentObj).format('YYYY-MM-DD')

        console.log("reformat ........  ", id);

        getRequestByDate(showDate,id);


    }

    const getRequestByDate = (datec: any,ID:any) => {

       
        console.log(ID, datec,' iddddddddddddddddddddddddddd............');


        RequestBydate(datec, ID, (result: any) => {

            console.log("result ***************  ", result);

            setRequestList(result);


        });

    }

    useEffect(() => {

        const focusHandler = navigation.addListener('focus', () => {
            console.log("refresh ******************* ");

            let datec = moment().format('MMMM Do YYYY');


            // getCurrentDate((result:any) => {

            // });

            // console.log("date .................  ", datec);

            setSelectedDate(datec);


            getRESOURCE_ID().then(res => {
                resourceID = res;
                console.log(resourceID, '+++++++++++++++++++++');
                setResourceID(resourceID)
                console.log("res id ............  " , ResourceID);

                getSelectedDate(datec,resourceID)
                
                // getRequestByDate(datec,resourceID);

            });
    

           
        });
        return focusHandler;
    }, [])

    return (
        <SafeAreaView style={ComStyles.CONTAINER}>

            <Animated.View
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
                <View style={style.modalCont}>


                </View>
            </Animated.View>

            <Header isBtn={true} title="Vehicle Calendar" btnOnPress={() => navigation.goBack()} />

            <View style={ComStyles.CONTENT}>

                <View style={{ flexDirection: 'row', marginTop: 8, }}>
                    <Text style={style.callText}>{selectedDate}</Text>
                    <View style={{ flex: 1 }} />
                    {/* <TouchableOpacity>
                        <IconA name='calendar' size={20} color={ComStyles.COLORS.BLACK} />
                    </TouchableOpacity> */}
                </View>

                <CalendarStrip
                    scrollable={true}
                    scrollerPaging={true}
                    onDateSelected={(date) => getSelectedDate(date.format('MMMM Do YYYY'),ResourceID)}
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: ComStyles.COLORS.WHITE }}
                    style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                    // calendarHeaderStyle={{ color: 'black' }}
                    calendarColor={ComStyles.COLORS.WHITE}
                    dateNumberStyle={{ color: ComStyles.COLORS.BLACK }}
                    dateNameStyle={{ color: ComStyles.COLORS.BLACK }}
                    highlightDateNumberStyle={{ color: 'red' }}
                    highlightDateNameStyle={{ color: 'red' }}
                    disabledDateNameStyle={{ color: 'grey' }}
                    disabledDateNumberStyle={{ color: 'grey' }}
                    // datesWhitelist={datesWhitelist}
                    // datesBlacklist={datesBlacklist}
                    // iconLeft={require('./img/left-arrow.png')}
                    // iconRight={require('./img/right-arrow.png')}
                    iconContainer={{ flex: 0.1 }}
                    selectedDate={moment()}
                />

                {/* <ResoucesCalendar /> */}

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={requestList}
                    style={{ marginTop: 10, marginBottom: 125, }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ padding: 5, marginBottom: 5 }}>
                               <ListBox
                                    ticketNo={item.RequestID}
                                    headerType="Resources Request ID :"
                                    isCreatedBy={true}
                                    createdBy="Service Ticket ID :  : "
                                    value1={item.RequestID}
                                    isserviceTicketID={true}
                                    serviceTicketID="Customer : "
                                    value2={item.customer}
                                    isCusAddress={true}
                                    addressheader="Address : "
                                    value3={item.customer_address}
                                />
                            </View>
                        );
                    }}
                    keyExtractor={item => `${item._Id}`}
                />

            </View>

            <View style={{ marginLeft: 13, marginRight: 13, }}>
                <ActionButton
                    title="Create Vehicle Request"
                    style={{
                        marginBottom: 70,
                    }}
                    is_icon={true}
                    icon_name="diff-added"
                    iconColor={ComStyles.COLORS.WHITE}
                    onPress={gotoNavigate}
                />
            </View>
        </SafeAreaView>
    );

}
export default VehicleCalendar;