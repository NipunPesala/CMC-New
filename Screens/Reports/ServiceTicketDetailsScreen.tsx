import React,{useState,useEffect} from "react";
import { FlatList, SafeAreaView, Text, View,Modal,Alert,ToastAndroid} from "react-native";
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
import {getServiceTicketForReport,getSearchServiceTicket,SearchTicketUsingDateRange} from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import { Calendar } from "react-native-calendars";
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";
const ServiceTicketDetailsScreen = () => {
    const navigation = useNavigation();
    const [tiketNo, settiketNo] = useState(false);
    const [custome, setcustome] = useState(false);
    const [serviceTicketDetail, setServiceTicketDetail] = useState();
    const [searchText, setSearchText] = useState();
    const [selectedDates,setSelectedDates]=useState({});
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const start = moment(startDate).format("YYYY-MM-DD");
    console.log('new start'+start);
    const end = moment(endDate).format("YYYY-MM-DD");
    console.log('new end'+end);

    const Handleback = () => {
        navigation.navigate('ServiceTicketDetailsScreen');
    }
    const handleTicket = () => {
        settiketNo(true);
        setcustome(false);
        setShowCalendar(false);
       
    }
    const handlecustome = () => {
        setcustome(true);
        settiketNo(false);

       
    }

    const handleDateChange = (date) => {
        if (!startDate) {
          setStartDate(date);
          console.log('start date-'+date );

        }else if(date>startDate) {
            setEndDate(date);
            console.log('End date-'+date);
            getDateRangeResult(start,end);
            setShowCalendar(false);
          
        }else{
            ToastAndroid.show("Invalide selected date  ", ToastAndroid.SHORT); 
        }
      //  const start = startDate ? moment(startDate).format("MM/DD/YYYY") : "Not Selected";
           
      }

  

    const getDerviceTiket=()=>{

        getServiceTicketForReport((result:any) =>{

            console.log("/////////////////",result.length);
            setServiceTicketDetail(result)
          
        });
    }

    const searchTicket = (text:any) => {

        setSearchText(text);

        getSearchServiceTicket(text , (result:any) => {

            setServiceTicketDetail(result);
            
        });
    }

const onGetDatePress=(day)=>{
    if (Object.keys(selectedDates).length <=2) {
        setSelectedDates({...selectedDates, [day.dateString]: {selected: true}});
        // Object.keys(selectedDates).forEach(date=>{
        //     console.log('day 1-'+date);
        // })
        // storeDatsToState();
      } else {
        Alert.alert('Failed...!', 'You can only select two days', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
      }

}



const getDateRangeResult=(DateOne:any,DateTwo:any)=>{
    SearchTicketUsingDateRange(DateOne, DateTwo, (result:any) => {

        setServiceTicketDetail(result);
        
    });
    
}
const btnCloseOnpress=()=>{
    setShowCalendar(!showCalendar);
    setStartDate('');
    setEndDate('');
}



    useEffect(() => {
        settiketNo(true);
        setcustome(false);
        getDerviceTiket();

    }, [])
    return (
        <SafeAreaView style={ComponentsStyles.CONTAINER}>
            <Header isBtn={true} title= "Service Ticket Details" btnOnPress={() => navigation.goBack()} />
            <View style={style.container}>
                    <ActionButton
                        title="Service Ticket No1"
                        onPress={handleTicket}
                        style={tiketNo === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={tiketNo === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />

                    <ActionButton
                        title="Custom"
                        onPress={btnCloseOnpress}
                        style={custome === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={custome === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
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
                Headertitle2="Assing to"
                isHeadertitle3={true}
                Headertitle3="Ticket Status"
                isHeadertitle4={false}
                Headertitle4="Ticket Content"
                isHeadertitle5={true}
                Headertitle5=" Ticket Content"
                isHeadertitle6={true}
                Headertitle6="Service Call Id"

            />
             <FlatList
                        showsHorizontalScrollIndicator={false}
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
                                    batchStyle={item.status==0?style.openstyle:item.status==1?style.pendingstyle:item.status==2?style.holdstyle:style.Completestyle}
                                    Headertitle3={item.status==0?"Open":item.status==1?"Pending":item.status==2?"Hold":"Completed"}
                                    isHeadertitle4={true}
                                    Headertitle4={item.content}
                                    isHeadertitle6={true}
                                    Headertitle6={item.serviceId}
                            
                                />

                            );
                        }}
                        keyExtractor={item => `${item._Id}`}
                    />
        </SafeAreaView>
    );
}

export default ServiceTicketDetailsScreen;