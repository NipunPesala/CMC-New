import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text, View,Modal,Alert,ToastAndroid } from "react-native";
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
import { getTicketsForReport } from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import { getSearchTicket,SearchTicketForSummaryReport} from '../../SQLiteDatabaseAction/DBControllers/TicketController';
import { Calendar } from "react-native-calendars";
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";


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
    const start = moment(startDate).format("YYYY-MM-DD");
    console.log('new start'+start);
    const end = moment(endDate).format("YYYY-MM-DD");
    console.log('new end'+end);
    
    const Handleback = () => {
        navigation.navigate('ServiceTicketDetailsScreen');
    }

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

    const handleDateChange = (date) => {
        if (!startDate) {
          setStartDate(date);
          console.log('start date-'+date );
        } else if(date>startDate) {
          setEndDate(date);
          console.log('End date-'+date);
          getDateRangeResult(start,end);
          setShowCalendar(false);
        
        }else{

            ToastAndroid.show("Invalide selected date  ", ToastAndroid.SHORT); 
            setStartDate('');
            setEndDate('');
        }
      //  const start = startDate ? moment(startDate).format("MM/DD/YYYY") : "Not Selected";
      }

    const searchTicket = (text:any) => {

        setSearchText(text);

        getSearchTicket(text , (result:any) => {

            setTicketList(result);
            
        });
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
                    onPress={btnCloseOnpress}
                    style={custem === true ? style.selectedbutton1 : style.defaultbutton1}
                    textStyle={custem === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                />

            </View>

            {showCalendar && (
               <View style={{alignContent:'center', justifyContent: 'center',alignItems:'center'}}>
              
                   <CalendarPicker
                   onDateChange={handleDateChange}
                   selectedStartDate={startDate}
                   selectedEndDate={endDate}
                   />
               </View>
               
               )}
          

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