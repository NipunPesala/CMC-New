import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text, View,Modal,Alert ,ToastAndroid,Animated,Dimensions,Keyboard,StyleSheet,Platform } from "react-native";
import Header from "../../Components/Header";
import ComponentsStyles from "../../Constant/Components.styles";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../Components/InputText";
import IconMC from 'react-native-vector-icons/AntDesign';
import { AttendanceDetails } from '../../Constant/DummyData';
import comStyles from "../../Constant/Components.styles";
import style from "./ReportStyle";
import LeftRightArrowbarComponent from "../../Components/LeftRightArrowbarComponent";
import AttendanceTableHeaderComponent from "../../Components/AttendanceTableHeaderComponent";
import AttendanceTableDetailsComponent from "../../Components/AttendanceTableDetailsComponent";
import ActionButton from "../../Components/ActionButton";
import { getTicketsForCustomerReport } from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import { getSearchTicket,SearchTicketForSummaryReport,getSearchTicketByCustomer,SearchTicketForCusSummaryReport,} from '../../SQLiteDatabaseAction/DBControllers/TicketController';
import DateRangePicker from "rn-select-date-range";
import TicketRepart from "../../Components/ReportTableComponent";
let height = Dimensions.get("screen").height;


const ServiceTicketSummaryReportScreen = () => {
    const navigation = useNavigation();
    const [tiketNo, settiketNo] = useState(false);
    const [customer, setcustomer] = useState(false);
    const [custem, setcustem] = useState(false);
    const [ticketID, setTicketID] = useState('');
    const [status, setStatus] = useState('');
    const [serviceID, setServiceID] = useState('');
    const [ticketList, setTicketList] = useState([]);
    const [searchText, setSearchText] = useState();
    const [RecievedserviceCallList, setRecievedServiceCallList]: any[] = useState([]);
    const [selectedDates,setSelectedDates]=useState({});
    const [modalVisible,setModalVisible]=useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedStartDate, setselectedStartDate] = useState('');
    const [selectedEndDate, setselectedEndDate] = useState('');
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [selectedRange, setRange] = useState({});
    const header = [
        {
            "id": 1,
            "title": 'ID',
        },
        {
            "id": 2,
            "title": 'Service Ticket Id',
        },
        {
            "id": 3,
            "title": 'Service Ticket Status',
        },
        {
            "id": 4,
            "title": 'Service Ticket Content',
        }, 
        {
            "id": 5,
            "title": 'Customer ID',
        }, 
        {
            "id": 6,
            "title": 'Customer',
        }, 
        {
            "id": 7,
            "title": 'Contact Name',
        },
        {
            "id": 8,
            "title": 'Contact No',
        },
        {
            "id": 9,
            "title": 'Priority',
        }
     
    
    ];
    // const Handleback = () => {
    //     navigation.navigate('ServiceTicketDetailsScreen');
    // }

    const getTicketCustomerSummary = () =>{

        getTicketsForCustomerReport((result:any) =>{

            console.log("/////////////////",result.length);
            for(const key in result){
                console.log(result[key]);
            }
            restructureSelectedData(result);
           // setTicketList(result)
        
        });
    }


    const restructureSelectedData = (AdditionalSparePart: any) => {

        const StructurerdArray: any[] = [];

       

            for (let i = 0; i < AdditionalSparePart.length; i++) {
                const nullReplacer = (value:any) => (value === null ? 'Null' : value )|| (value === '' ? 'Null' : value );
                StructurerdArray.push(
                    {
                        a_id: i+1,
                        b_ticketId:nullReplacer( AdditionalSparePart[i].ticketId),
                        c_status: nullReplacer(AdditionalSparePart[i].status),
                        d_content: nullReplacer( AdditionalSparePart[i].content),
                        e_customer: nullReplacer( AdditionalSparePart[i].customerID),
                        f_customer: nullReplacer(AdditionalSparePart[i].customer),
                        g_contact_name: nullReplacer(AdditionalSparePart[i].contact_name),
                        h_contact_no:nullReplacer(AdditionalSparePart[i].contact_no),
                        i_priority: nullReplacer(AdditionalSparePart[i].priority),
                
                    }
                );
            }

             console.log('StructurerdArray+++++++++++++++++++++++++', StructurerdArray);
             setTicketList(StructurerdArray);

    }

  
      const btnCloseOnpress=()=>{
        setShowCalendar(!showCalendar);
        setStartDate('');
        setEndDate('');
    
        setcustomer(true);
        setcustem(false);
        
        if(!showCalendar){
            setcustem(true);
            setcustomer(false);
        }
    }
    
    

    const searchTicket = (text:any) => {

        setSearchText(text);

        getSearchTicketByCustomer(text , (result:any) => {
            restructureSelectedData(result);
            //setTicketList(result);
            
        });
    }

   
    
    const selectDateRange = () => {
        setcustomer(false);
        settiketNo(false);
        setcustem(true);
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
    
        SearchTicketForCusSummaryReport(selectedStartDate,selectedEndDate,(result:any) => {
            restructureSelectedData(result);
           // setTicketList(result);
        });
    
    }
    
    const changeRange = (range: any) => {
    
        setRange(range);
    
        setselectedStartDate(range.firstDate);
        setselectedEndDate(range.secondDate);
    
        console.log(selectedEndDate, " ............ ", selectedStartDate);
    
    
    }

    const getDateRangeResult=(DateOne:any,DateTwo:any)=>{
        SearchTicketForCusSummaryReport(DateOne, DateTwo, (result:any) => {
            setTicketList(result);
        });
        
    }

    const handleTicket = () => {
        settiketNo(true);
        setcustomer(false);
        setcustem(false);
        setShowCalendar(false);
        navigation.navigate('ServiceTicketSummaryReportScreen');

    }
    const handlecustomer = () => {
        setShowCalendar(false);
        setcustomer(true);
        settiketNo(false);
        setcustem(false);
        getTicketCustomerSummary();

    }
    useEffect(() => {
        settiketNo(false);
        setcustomer(true);
        setcustem(false);
        getTicketCustomerSummary();

    }, [])

    
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <Header isBtn={true} title="Service Ticket Summary Report" btnOnPress={() =>  navigation.navigate('ReportsScreen')} />
            <View style={style.container}>
                <ActionButton
                    title="Service Ticket No"
                    onPress={handleTicket}
                    style={tiketNo === true ? style.selectedbutton1 : style.defaultbutton1}
                    textStyle={tiketNo === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                />

                <ActionButton
                    title="Customer"
                    onPress={handlecustomer}
                    style={customer === true ? style.selectedbutton1 : style.defaultbutton1}
                    textStyle={customer === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                />
                <ActionButton
                    title="Custom"
                    onPress={selectDateRange}
                    style={custem === true ? style.selectedbutton1 : style.defaultbutton1}
                    textStyle={custem === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                />

            </View>

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
                placeholder="Search by customer"
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
                setState={(newText:any) => searchTicket(newText)}
            />
            <LeftRightArrowbarComponent
                leftarrow="leftcircle"
                rightarrow="rightcircle" />


                <TicketRepart headerTitles={header} rows={ticketList} />

              {/* <AttendanceTableHeaderComponent
                customstyle={style.customStyletableHeader}
                isHeadertitle1={true}
                Headertitle1="Service Ticket ID"
                isHeadertitle2={true}
                Headertitle2="Ticket content"
                isHeadertitle3={true}
                Headertitle3="Ticket status"
                isHeadertitle4={true}
                Headertitle4="Contact No"
                isHeadertitle5={true}
                Headertitle5="Customer"
                isHeadertitle6={false}
                Headertitle6=""

            /> */}
            {/* <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={ticketList}
                style={{ marginTop: 10, marginBottom: 60, }}
                horizontal={false}
                renderItem={({ item }) => {
                    return (

                        <AttendanceTableDetailsComponent
                            isHeadertitle1={true}
                            Headertitle1={item.ticketId}
                            isHeadertitle2={true}
                            Headertitle2={item.content}
                            isHeadertitle3={true}
                            txtstyle={style.textStyle}
                            batchStyle={item.attend_status==0?style.openstyle:item.attend_status==1?style.pendingstyle:item.attend_status==2?style.holdstyle:style.Completestyle}
                            Headertitle3={item.attend_status==0?"Open":item.attend_status==1?"Pending":item.attend_status==2?"Hold":"Completed"}
                            isHeadertitle4={true}
                            Headertitle4={item.outtime}
                            isHeadertitle5={true}
                            Headertitle5={item.customer}
                            isHeadertitle6={false}
                            Headertitle6={""}
                        />

                    );
                }}
                keyExtractor={item => `${item.ticketId}`}
            /> */}
{/* 
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                        data={ticketList}
                        style={{ marginTop: 10, marginBottom: 60, }}
                        horizontal={false}
                        renderItem={({ item }) => {
                            return (

                                <AttendanceTableDetailsComponent
                                    isHeadertitle1={true}
                                    Headertitle1={item.ticketId}
                                    isHeadertitle2={true}
                                    Headertitle2={item.content}
                                    isHeadertitle3={true}
                                    batchStyle={item.attend_status==0?style.openstyle:item.attend_status==1?style.pendingstyle:item.attend_status==2?style.holdstyle:style.Completestyle}
                                    Headertitle3={item.attend_status==0?"Open":item.attend_status==1?"Pending":item.attend_status==2?"Hold":"Completed"}
                                    isHeadertitle4={true}
                                    Headertitle4={item.contact_no}
                                    isHeadertitle5={true}
                                    Headertitle5={item.customer}
                                    isHeadertitle6={false}
                                    Headertitle6={''}
                            
                                />

                            );
                        }}
                        keyExtractor={item => `${item.cusNic}`}
                    /> */}
        </SafeAreaView>
    );
}

export default ServiceTicketSummaryReportScreen;