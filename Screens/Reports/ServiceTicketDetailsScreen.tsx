import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text, View, Modal, Alert, ToastAndroid, Animated, Dimensions, StyleSheet, Platform, Keyboard } from "react-native";
import Header from "../../Components/Header";
import ComponentsStyles from "../../Constant/Components.styles";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../Components/InputText";
import IconMC from 'react-native-vector-icons/AntDesign';
import { AttendanceDetails } from '../../Constant/DummyData';
import style from "./ReportStyle";
import LeftRightArrowbarComponent from "../../Components/LeftRightArrowbarComponent";
import AttendanceTableHeaderComponent from "../../Components/AttendanceTableHeaderComponent";
import AttendanceTableDetailsComponent from "../../Components/AttendanceTableDetailsComponent";
import ActionButton from "../../Components/ActionButton";
import { getServiceTicketForReport, getSearchServiceTicket, SearchTicketUsingDateRange } from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import { Calendar } from "react-native-calendars";
import DateRangePicker from "rn-select-date-range";
import comStyles from "../../Constant/Components.styles";

let height = Dimensions.get("screen").height;
const ServiceTicketDetailsScreen = () => {
    const navigation = useNavigation();
    const [tiketNo, settiketNo] = useState(false);
    const [custome, setcustome] = useState(false);
    const [serviceTicketDetail, setServiceTicketDetail] = useState();
    const [searchText, setSearchText] = useState();
    const [selectedDates, setSelectedDates] = useState({});
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedRange, setRange] = useState({});
    const [selectedStartDate, setselectedStartDate] = useState('');
    const [selectedEndDate, setselectedEndDate] = useState('');
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));


    const handleTicket = () => {
        settiketNo(true);
        setcustome(false);
        setShowCalendar(false);

    }




    const getDerviceTiket = () => {

        getServiceTicketForReport((result: any) => {

            console.log("/////////////////", result.length);
            setServiceTicketDetail(result)

        });
    }

    const searchTicket = (text: any) => {

        setSearchText(text);

        getSearchServiceTicket(text, (result: any) => {

            setServiceTicketDetail(result);

        });
    }

    const onGetDatePress = (day) => {
        if (Object.keys(selectedDates).length <= 2) {
            setSelectedDates({ ...selectedDates, [day.dateString]: { selected: true } });
            // Object.keys(selectedDates).forEach(date=>{
            //     console.log('day 1-'+date);
            // })
            // storeDatsToState();
        } else {
            Alert.alert('Failed...!', 'You can only select two days', [
                {
                    text: 'OK',
                    onPress: () => { },
                },
            ]);
        }

    }
    const selectDateRange = () => {
        settiketNo(false);
        setcustome(true);
        slideInModal();


    }
    const slideInModal = () => {

        try {

            Animated.timing(modalStyle, {
                toValue: height / 4,
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

        SearchTicketUsingDateRange(selectedStartDate, selectedEndDate, (result: any) => {
            console.log('date range result---------'+result.length);
            setServiceTicketDetail(result);
        });

    }

    const changeRange = (range: any) => {

        setRange(range);

        setselectedStartDate(range.firstDate);
        setselectedEndDate(range.secondDate);

        console.log(selectedEndDate, " ............ ", selectedStartDate);


    }

    const getDateRangeResult = (DateOne: any, DateTwo: any) => {
        SearchTicketUsingDateRange(DateOne, DateTwo, (result: any) => {

            setServiceTicketDetail(result);

        });

    }




    useEffect(() => {
        settiketNo(true);
        setcustome(false);
        getDerviceTiket();

    }, [])
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <Header isBtn={true} title="Service Ticket Details" btnOnPress={() => navigation.goBack()} />
            <View style={style.container}>
                <ActionButton
                    title="Service Ticket No"
                    onPress={handleTicket}
                    style={tiketNo === true ? style.selectedbutton : style.defaultbutton}
                    textStyle={tiketNo === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                />

                <ActionButton
                    title="Custom"
                    onPress={selectDateRange}
                    style={custome === true ? style.selectedbutton : style.defaultbutton}
                    textStyle={custome === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                />

            </View>
            {/* {showCalendar && (
               <View style={{alignContent:'center', justifyContent: 'center',alignItems:'center'}}>
              
                   <CalendarPicker
                   onDateChange={handleDateChange}
                   selectedStartDate={startDate}
                   selectedEndDate={endDate}
                   />
               </View>
               )} */}

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
                        confirmBtnTitle="Search"
                        clearBtnTitle="Clear"
                        font={comStyles.FONT_FAMILY.BOLD}
                        
                    // maxDate={moment()}
                    // minDate={moment().subtract(100, "days")}
                    />

                </View>


            </Animated.View>
            <InputText
                placeholder="Search by Service Ticket Number"
                is_clr_icon={true}
                icon_name1="search1"
                iconClr='rgba(60, 60, 67, 0.6)'
                style={{
                    marginTop: 5,
                    marginLeft: 5,
                    marginRight: 5,
                    paddingLeft: 50,
                }}
                imgStyle={{
                    paddingTop: 10,
                    left: 20,
                }}

                stateValue={searchText}
                setState={(newText: any) => searchTicket(newText)}
            />
            <LeftRightArrowbarComponent
                leftarrow="leftcircle"
                rightarrow="rightcircle" />

            <AttendanceTableHeaderComponent
                customstyle={style.customStyletableHeader}
                isHeadertitle1={true}
                Headertitle1="Service Ticket ID"
                isHeadertitle2={true}
                Headertitle2="Assing to"
                isHeadertitle3={true}
                Headertitle3="Service status"
                isHeadertitle4={true}
                Headertitle4="Ticket Content"
                isHeadertitle5={true}
                Headertitle5=" Ticket Content"
                isHeadertitle6={true}
                Headertitle6="Service call ID"

            />
            <FlatList
                showsHorizontalScrollIndicator={true}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={serviceTicketDetail}
                style={{ marginTop: 10, marginBottom: 60, }}
                horizontal={false}
                renderItem={({ item }) => {
                    return (

                        <AttendanceTableDetailsComponent
                            isHeadertitle1={true}
                            Headertitle1={item.ticketId}
                            isHeadertitle2={true}
                            Headertitle2={item.assignTo}
                            isHeadertitle3={true}
                            batchStyle={item.status == 0 ? style.openstyle : item.status == 1 ? style.pendingstyle : item.status == 2 ? style.holdstyle : style.Completestyle}
                            Headertitle3={item.status == 0 ? "Open" : item.status == 1 ? "Pending" : item.status == 2 ? "Hold" : "Completed"}
                            isHeadertitle4={true}
                            Headertitle4={item.content}
                            isHeadertitle5={true}
                            Headertitle5={item.serviceId}
                            isHeadertitle6={false}
                            Headertitle6={""}

                        />

                    );
                }}
                keyExtractor={item => `${item._Id}`}
            />
        </SafeAreaView>
    );
}

export default ServiceTicketDetailsScreen;