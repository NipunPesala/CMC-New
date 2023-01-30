/**
* @author Madushika Sewwandi
*/
import React,{ useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions
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
import { RequestBydateRoute } from "../../SQLiteDatabaseAction/DBControllers/ServiceController";


const RouteScreen = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [RouteId, setRouteId] = useState('');
    const [requestRouteList, setRequestRouteList] = useState([]);


    const datesBlacklistFunc = (date) => {
        return date.isoWeekday() === 6; // disable Saturdays
    }
    const getSelectedDate = (date:any) => {

        setSelectedDate(date);
       

        // let dates = date.format('DD MM YYYY');

        let momentObj = moment(date, 'MMMM Do YYYY')
        let showDate = moment(momentObj).format('YYYY-MM-DD')

        console.log("reformat ........  ",showDate);

       getRequestByDate(showDate);


    }

    const getRequestByDate = (datec: any) => {

       
        console.log(datec,' iddddddddddddddddddddddddddd............');


        RequestBydateRoute(datec, (result: any) => {

            console.log("result ***************  ", result);

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
            <Header isBtn={true} btnOnPress={() => navigation.navigate('Home')} title={"Planned Routes"} />

            <View style={comStyles.CONTENT}>

                <View style={{ flexDirection: 'row', marginTop: 8, }}>

                    <Text style={style.callText}>{selectedDate}</Text>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('ServiceCall')}>
                        <IconA name='calendar' size={20} color={comStyles.COLORS.BLACK} />
                    </TouchableOpacity>

                </View>
                {/* 
                <Calendar

                /> */}

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
                                    onPressIcon={() => navigation.navigate('RequestDetails',{navigateId:2})}
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


