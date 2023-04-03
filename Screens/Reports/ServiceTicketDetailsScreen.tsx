import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text, View, Modal, Alert, ToastAndroid, Animated, Dimensions, StyleSheet, Platform, Keyboard, ScrollView } from "react-native";
import Header from "../../Components/Header";
import ComponentsStyles from "../../Constant/Components.styles";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../Components/InputText";
import IconMC from 'react-native-vector-icons/AntDesign';
import { AttendanceDetails } from '../../Constant/DummyData';
import style from "./ReportStyle";
import LeftRightArrowbarComponent from "../../Components/LeftRightArrowbarComponent";
import TicketRepart from "../../Components/ReportTableComponent";
import AttendanceTableHeaderComponent from "../../Components/AttendanceTableHeaderComponent";
import AttendanceTableDetailsComponent from "../../Components/AttendanceTableDetailsComponent";
import ActionButton from "../../Components/ActionButton";
import { getDetailsForReportUp, getSearchServiceTicket, SearchTicketUsingDateRange } from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import { Calendar } from "react-native-calendars";
import DateRangePicker from "rn-select-date-range";
import comStyles from "../../Constant/Components.styles";

const header = [
    {
        "id": 1,
        "title": 'ID',
    },
    {
        "id": 2,
        "title": 'Service Ticket ID',
    },
    {
        "id": 3,
        "title": 'Service ID',
    },
    {
        "id": 4,
        "title": 'Service Ticket Status',
    },
    {
        "id": 5,
        "title": 'Service Ticket Content',
    },
    {
        "id": 6,
        "title": 'Service Call Type',
    },
    {
        "id": 7,
        "title": 'Customer Name',
    },
    {
        "id": 8,
        "title": 'Assign To',
    },
    {
        "id": 9,
        "title": 'Contact No',
    },
    {
        "id": 10,
        "title": 'Priority',
    },
    {
        "id": 11,
        "title": 'Planned Start Date',
    },
    {
        "id": 12,
        "title": 'Planned End Date',
    },
    {
        "id": 13,
        "title": 'Actual Start Date',
    },
    {
        "id": 14,
        "title": 'Actual End Date',
    },
    {
        "id": 15,
        "title": 'Engineers Remark',
    },
    {
        "id": 16,
        "title": 'Customer Remark',
    },
    {
        "id": 17,
        "title": 'Customer NIC',
    },
];
let height = Dimensions.get("screen").height;
const ServiceTicketDetailsScreen = () => {
    const navigation = useNavigation();
    const [tiketNo, settiketNo] = useState(false);
    const [custome, setcustome] = useState(false);
    const [serviceTicketDetail, setServiceTicketDetail] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedDates, setSelectedDates] = useState({});
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedRange, setRange] = useState({});
    const [selectedStartDate, setselectedStartDate] = useState('');
    const [selectedEndDate, setselectedEndDate] = useState('');
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [serviceType, setServiceType] = useState('');


    const handleTicket = () => {
        settiketNo(true);
        setcustome(false);
        setShowCalendar(false);
        getDerviceTiket();
    }




    const getDerviceTiket = () => {

        getDetailsForReportUp((result: any) => {

            // console.log("/////////////////**********", result);
            setServiceTicketDetail(result)
            restructureSelectedData(result);
        });


    }
    // restructure data for report table
    const restructureSelectedData = (serviceTicketDetail: any) => {

        const StructurerdArray: any[] = [];


        for (let i = 0; i < serviceTicketDetail.length; i++) {
       
            let serviceTypeValue = 'test';
            console.log('test service type',serviceTicketDetail[i].service_type);
            if (serviceTicketDetail[i].service_type == 1) {
                serviceTypeValue = 'Technical';
            } else if (serviceTicketDetail[i].service_type == 2) {
                serviceTypeValue = 'Replacement';
            }else if (serviceTicketDetail[i].service_type == 3){
                serviceTypeValue = 'Repair';
            }else if (serviceTicketDetail[i].service_type == 4){
                serviceTypeValue = 'Mechanical Problem';
            }else{
                serviceTypeValue = 'Null';
            }
              // Replace any null values with the string 'Null'
        const nullReplacer = (value:any) => (value === null ? 'Null' : value )|| (value === '' ? 'Null' : value );
            StructurerdArray.push(
                {
                    a_id: i+1,
                    b_ticketID: nullReplacer(serviceTicketDetail[i].ticketId),
                    c_serviceID: nullReplacer(serviceTicketDetail[i].serviceId),
                    d_status: nullReplacer(serviceTicketDetail[i].status),
                    e_content: nullReplacer(serviceTicketDetail[i].content),
                   // f_service_type: serviceTicketDetail[i].service_type,
                   f_service_type: serviceTypeValue,
                    g_customer: nullReplacer(serviceTicketDetail[i].customer),
                    h_assignTo:nullReplacer(serviceTicketDetail[i].assignTo),
                    i_contact_no:nullReplacer(serviceTicketDetail[i].contact_no),
                    j_priority: nullReplacer(serviceTicketDetail[i].priority),
                    k_start_date:nullReplacer( serviceTicketDetail[i].start_date),
                    l_end_date: nullReplacer(serviceTicketDetail[i].end_date),
                    m_actualstartDate: nullReplacer(serviceTicketDetail[i].actualstartDate),
                    n_actualendtDate: nullReplacer(serviceTicketDetail[i].actualendtDate),
                    o_engRemark: nullReplacer(serviceTicketDetail[i].engRemark),
                    p_cusRemark: nullReplacer(serviceTicketDetail[i].cusRemark),
                    q_cusNic: nullReplacer(serviceTicketDetail[i].cusNic)
                }
            );
        }

        console.log('StructurerdArray+++++++++++++++++++++++++', StructurerdArray);
        setServiceTicketDetail(StructurerdArray);

    }

    const searchTicket = (text: any) => {

        setSearchText(text);

        getSearchServiceTicket(text, (result: any) => {
            restructureSelectedSearchData(result)
            //setServiceTicketDetail(result);

        });
    }



    const restructureSelectedSearchData = (serviceTicketDetail: any) => {

        const StructurerdArray: any[] = [];


        for (let i = 0; i < serviceTicketDetail.length; i++) {

            let serviceTypeValue = 'test';
            console.log('test service type',serviceTicketDetail[i].service_type);
            if (serviceTicketDetail[i].service_type == 1) {
                serviceTypeValue = 'Technical';
            } else if (serviceTicketDetail[i].service_type == 2) {
                serviceTypeValue = 'Replacement';
            }else if (serviceTicketDetail[i].service_type == 3){
                serviceTypeValue = 'Repair';
            }else if (serviceTicketDetail[i].service_type == 4){
                serviceTypeValue = 'Mechanical Problem';
            }else{
                serviceTypeValue = 'Null';
            }
              // Replace any null values with the string 'Null'
        const nullReplacer = (value:any) => (value === null ? 'Null' : value )|| (value === '' ? 'Null' : value );
        
            StructurerdArray.push(
                {
                    a_id: i+1,
                    b_ticketID: nullReplacer(serviceTicketDetail[i].ticketId),
                    c_serviceID: nullReplacer(serviceTicketDetail[i].serviceId),
                    d_status: nullReplacer(serviceTicketDetail[i].status),
                    e_content: nullReplacer(serviceTicketDetail[i].content),
                   // f_service_type: serviceTicketDetail[i].service_type,
                   f_service_type: serviceTypeValue,
                    g_customer: nullReplacer(serviceTicketDetail[i].customer),
                    h_assignTo:nullReplacer(serviceTicketDetail[i].assignTo),
                    i_contact_no:nullReplacer(serviceTicketDetail[i].contact_no),
                    j_priority: nullReplacer(serviceTicketDetail[i].priority),
                    k_start_date:nullReplacer( serviceTicketDetail[i].start_date),
                    l_end_date: nullReplacer(serviceTicketDetail[i].end_date),
                    m_actualstartDate: nullReplacer(serviceTicketDetail[i].actualstartDate),
                    n_actualendtDate: nullReplacer(serviceTicketDetail[i].actualendtDate),
                    o_engRemark: nullReplacer(serviceTicketDetail[i].engRemark),
                    p_cusRemark: nullReplacer(serviceTicketDetail[i].cusRemark),
                    q_cusNic: nullReplacer(serviceTicketDetail[i].cusNic)
                }
            );
        }
        // console.log('StructurerdArray+++++++++++++++++++++++++', StructurerdArray);
        setServiceTicketDetail(StructurerdArray);
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
            console.log('date range result---------' + result.length);
            restructureSelectedSearchData(result);
            //setServiceTicketDetail(result);
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

            {/* <View style={{ flex: 1  }}>
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
                isHeadertitle5={false}
                Headertitle5=""
                isHeadertitle6={true}
                Headertitle6="Service call ID"

            />
            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={serviceTicketDetail}
                style={{ marginTop: 10, marginBottom: 60}}
                horizontal={false}
                renderItem={({ item }) => {
                    return (

                        <AttendanceTableDetailsComponent
                            isHeadertitle1={true}
                            Headertitle1={item.ticketId}
                            isHeadertitle2={true}
                            Headertitle2={item.assignTo}
                            isHeadertitle3={true}
                            batchStyle={item.attend_status == 0 ? style.openstyle : item.attend_status == 1 ? style.pendingstyle : item.attend_status == 2 ? style.holdstyle : style.Completestyle}
                            Headertitle3={item.attend_status == 0 ? "Open" : item.attend_status == 1 ? "Pending" : item.attend_status == 2 ? "Hold" : "Completed"}
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
            </View> */}

            <TicketRepart headerTitles={header} rows={serviceTicketDetail} />

        </SafeAreaView>
    );
}

export default ServiceTicketDetailsScreen;