import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text, View,Modal,Alert,ToastAndroid,Animated,Dimensions,Keyboard,StyleSheet,Platform } from "react-native";
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
import { getTicketsForReport } from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import { getSearchTicket,SearchTicketForSummaryReport} from '../../SQLiteDatabaseAction/DBControllers/TicketController';
import DateRangePicker from "rn-select-date-range";

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
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedStartDate, setselectedStartDate] = useState('');
    const [selectedEndDate, setselectedEndDate] = useState('');
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [selectedRange, setRange] = useState({});
    

    const getTicketSummaryDetails = () =>{

        getTicketsForReport((result:any) =>{

            console.log("/////////////////",result.length);
            for(const key in result){
                console.log(result[key]);
            }
            setTicketList(result);
           
            // try {

            //     const resArr: any[] = [];

            //     for (let i = 0; i < result.length; ++i) {

            //         if (result[i].attend_status === "0") {
    
            //             setStatus("Open");
                       
            //         } else if (result[i].attend_status === "1") {
    
            //             setStatus("Pending");
                        
            //         } else if (result[i].attend_status === "2") {
    
            //             setStatus("Hold");
                        
            //         } else if (result[i].attend_status === "3") {
            //             setStatus("Completed");
                        
            //         }

                    

            //         resArr.push(
            //             {
            //                 tid:result[i].ticketId,
            //                 sid:result[i].serviceId,
            //                 status:1,
            //             }
            //         );

            //         console.log(resArr);
                    
                    
                       
    
            //     }

            //     setRecievedServiceCallList.push(resArr);

            //     // setAttendanceList.push(resArr); 
                
            // } catch (error) {
            //     console.log(error);
                
            // }

          
        });


    }


    const searchTicket = (text:any) => {

        setSearchText(text);

        getSearchTicket(text , (result:any) => {

            setTicketList(result);
            console.log(" serch size .....................  " , result.length);
            
            
        });
    }

    

   
    const selectDateRange = () => {
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
    
        SearchTicketForSummaryReport(selectedStartDate,selectedEndDate,(result:any) => {
            setTicketList(result);
        });
    
    }
    
    const changeRange = (range: any) => {
    
        setRange(range);
    
        setselectedStartDate(range.firstDate);
        setselectedEndDate(range.secondDate);
    
        console.log(selectedEndDate, " ............ ", selectedStartDate);
    
    
    }

    const getDateRangeResult=(DateOne:any,DateTwo:any)=>{
        SearchTicketForSummaryReport(DateOne, DateTwo, (result:any) => {
            setTicketList(result);
        });
        
    }

    const btnCloseOnpress=()=>{
        setShowCalendar(!showCalendar);
        setStartDate('');
        setEndDate('');

        settiketNo(true);
        setcustem(false);
            
            if(!showCalendar){
                settiketNo(false);
                setcustem(true);
            }
    }
    
    

    const handleTicket = () => {
        settiketNo(true);
        setcustomer(false);
        setcustem(false);
        setShowCalendar(false);

    }
    const handlecustomer = () => {
        setShowCalendar(false);
        setcustomer(true);
        settiketNo(false);
        setcustem(false);
        navigation.navigate('CusTicketSummary');
        setcustomer(false);
        settiketNo(true);
    }
    const handlecustm = () => {
        setModalVisible(true);
        setcustomer(false);
        settiketNo(false);
        setcustem(true);
        

    }
    useEffect(() => {
        settiketNo(true);
        setcustomer(false);
        setcustem(false);
        getTicketSummaryDetails();

    }, [])
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <Header isBtn={true} title="Service Ticket Summary Report" btnOnPress={() => navigation.goBack()} />
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
                setState={(newText:any) => searchTicket(newText)}
            />
            <LeftRightArrowbarComponent
                leftarrow="leftcircle"
                rightarrow="rightcircle" />

            <AttendanceTableHeaderComponent
                customstyle={style.customStyletableHeader}
                isHeadertitle1={true}
                Headertitle1="Service Ticket ID"
                isHeadertitle2={true}
                Headertitle2="Assing To"
                isHeadertitle3={true}
                Headertitle3="Service Ticket Status"
                isHeadertitle4={false}
                Headertitle4="OutTime"
                isHeadertitle5={false}
                Headertitle5="TotHours"
            />
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
                            Headertitle2={item.assignTo}
                            isHeadertitle3={true}
                            txtstyle={style.textStyle}
                            batchStyle={item.attend_status==0?style.openstyle:item.attend_status==1?style.pendingstyle:item.attend_status==2?style.holdstyle:style.Completestyle}
                            Headertitle3={item.attend_status==0?"Open":item.attend_status==1?"Pending":item.attend_status==2?"Hold":"Completed"}
                            isHeadertitle4={false}
                            Headertitle4={item.outtime}
                            isHeadertitle5={false}
                            Headertitle5={item.twhour}
                        />

                    );
                }}
                keyExtractor={item => `${item.ticketId}`}
            />
        </SafeAreaView>
    );
}

export default ServiceTicketSummaryReportScreen;