/**
* @author Madushika Sewwandi
*/
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions,
    AsyncStorage,
    Animated,
    Alert,
    Keyboard,
    Platform
} from "react-native";
import Header from "../../Components/Header";
import comStyles from "../../Constant/Components.styles";
import style from "./RouteStyle";
import IconA from 'react-native-vector-icons/FontAwesome';
import ListBox from "../../Components/ListBox";
//import { receivedService } from '../../Constant/DummyData'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { RequestBydateRangeRoute, RequestBydateRoute } from "../../SQLiteDatabaseAction/DBControllers/ServiceController";
import AsyncStorageConstants from "../../Constant/AsyncStorageConstants";
import DateRangePicker from "rn-select-date-range";

let height = Dimensions.get("screen").height;

const RouteScreen = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [RouteId, setRouteId] = useState('');
    const [requestRouteList, setRequestRouteList] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [selectedRange, setRange] = useState({});
    const [selectedStartDate, setselectedStartDate] = useState('');
    const [selectedEndDate, setselectedEndDate] = useState('');
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));

    const datesBlacklistFunc = (date) => {
        return date.isoWeekday() === 6; // disable Saturdays
    }
    const getSelectedDate = (date: any) => {

        setSelectedDate(date);


        // let dates = date.format('DD MM YYYY');

        let momentObj = moment(date, 'MMMM Do YYYY')
        let showDate = moment(momentObj).format('YYYY-MM-DD')

        console.log("reformat ........  ", showDate);

        getRequestByDate(showDate);


    }

    const changeRange = (range: any) => {

        setRange(range);

        setselectedStartDate(range.firstDate);
        setselectedEndDate(range.secondDate);

        console.log(selectedEndDate, " ............ ", selectedStartDate);


    }

    const getRequestByDate = (datec: any) => {


        console.log(datec, ' iddddddddddddddddddddddddddd............');


        RequestBydateRoute(datec, (result: any) => {

            console.log("result ***************  ", result);

            setRequestRouteList(result);


        });

    }

    const viewCallDetails = (callID: any) => {

        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID, callID);
        navigation.navigate('RequestDetails', { navigateId: 2 })

    }



    const selectDateRange = () => {

        slideInModal();


    }

    const slideInModal = () => {

        try {

            Animated.timing(modalStyle, {
                toValue: height / 3.2,
                duration: 500,
                useNativeDriver: false,
            }).start();

        } catch (error) {
            Alert.alert(error + "");
        }


    };

    const slideOutModal = () => {


        try {

            Keyboard.dismiss();
            Animated.timing(modalStyle, {
                toValue: height,
                duration: 500,
                useNativeDriver: false,
            }).start();


        } catch (error) {
            Alert.alert(error + "");
        }

    };

    const getRangeData = () => {

        slideOutModal();

        RequestBydateRangeRoute(selectedStartDate,selectedEndDate,(result:any) => {
            setRequestRouteList(result);
        });

    }


    useEffect(() => {

        const focusHandler = navigation.addListener('focus', () => {
            console.log("refresh ******************* ");

            let datec = moment().format('MMMM Do YYYY');

            setSelectedDate(datec);
            getSelectedDate(datec);

        });
        return focusHandler;
    }, [])


    return (

        <SafeAreaView style={comStyles.CONTAINER}>


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
                            paddingTop: 10
                        }
                    })
                }}>



                <View style={style.modalCont}>

                    <DateRangePicker
                        onSelectDateRange={(range) => {
                            // setRange(range);
                            changeRange(range);
                        }}
                        blockSingleDateSelection={true}
                        responseFormat="YYYY-MM-DD"
                        onConfirm={() => getRangeData()}
                        onClear={slideOutModal}
                        font={comStyles.FONT_FAMILY.SEMI_BOLD}
                        confirmBtnTitle="Search"
                    // maxDate={moment()}
                    // minDate={moment().subtract(100, "days")}
                    />

                </View>


            </Animated.View>


            <Header isBtn={true} btnOnPress={() => navigation.navigate('Home')} title={"Planned Routes"} />

            <View style={comStyles.CONTENT}>

                <View style={{ flexDirection: 'row', marginTop: 8, }}>

                    <Text style={style.callText}>{selectedDate}</Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => selectDateRange()}>
                        <IconA name='calendar' size={20} color={comStyles.COLORS.BLACK} />
                    </TouchableOpacity>

                </View>

                <CalendarStrip
                    scrollable={true}
                    scrollerPaging={true}
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: comStyles.COLORS.WHITE }}
                    style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                    onDateSelected={(date) => getSelectedDate(date.format('MMMM Do YYYY'))}
                    // calendarHeaderStyle={{ color: 'black' }}
                    calendarColor={comStyles.COLORS.WHITE}
                    dateNumberStyle={{ color: comStyles.COLORS.BLACK }}
                    dateNameStyle={{ color: comStyles.COLORS.BLACK }}
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


                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={requestRouteList}
                    style={{ marginTop: 5, padding: 5, marginBottom: 70 }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginTop: 10, marginBottom: 10, }}>
                                <ListBox
                                    ticketNo={item.serviceId}
                                    nameAddress={true}
                                    name={item.customer}
                                    address={item.customer_address}
                                    status={item.priority}
                                    isIcon={true}
                                    onPressIcon={() => viewCallDetails(item.serviceId)}
                                />
                            </View>
                        );
                    }}
                    keyExtractor={item => `${item._Id}`}
                />

            </View>

        </SafeAreaView>


    );
}
export default RouteScreen;


