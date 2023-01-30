import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Platform, TouchableOpacity,ToastAndroid } from "react-native";
import ActionButton from "../../Components/ActionButton";
import Header from "../../Components/Header";
import comStyles from "../../Constant/Components.styles";
import style from "./ReportStyle";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../Components/InputText";
import LeftRightArrowbarComponent from "../../Components/LeftRightArrowbarComponent";
import AttendanceTableHeaderComponent from "../../Components/AttendanceTableHeaderComponent";
import AttendanceTableDetailsComponent from "../../Components/AttendanceTableDetailsComponent";
import { AttendanceDetails } from '../../Constant/DummyData';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { getSparePartsAllData } from "../../SQLiteDatabaseAction/DBControllers/SparePartsController";
import { getAll_Data ,getSearchSparePart,SearchSpairePartByDateRange} from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import CalendarPicker from 'react-native-calendar-picker';
const SparePartsRequest = () => {

    const navigation = useNavigation();
    const [date, setDate] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState('');
    const [sparepartsList, setsparepartsList]:any[] = useState([]);
    const [searchText, setSearchText] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const start = moment(startDate).format("YYYY-MM-DD");
        console.log('new start'+start);
    const end = moment(endDate).format("YYYY-MM-DD");
        console.log('new end'+end);


    const getRequestedSpareParts = () =>{

        getAll_Data((result:any) =>{

            setsparepartsList(result);
            
        })


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


      const btnCloseOnpress=()=>{
        setShowCalendar(!showCalendar);
        setStartDate('');
        setEndDate('');
    }

    const searchSpareParts = (text:any) => {

        setSearchText(text);

        getSearchSparePart(text , (result:any) => {

            setsparepartsList(result);
            
        });
        


    }

    const getDateRangeResult=(DateOne:any,DateTwo:any)=>{
        SearchSpairePartByDateRange(DateOne, DateTwo, (result:any) => {
    
            setsparepartsList(result);
            
        });
        
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        if (dateType == "fromDate") {
            setStartDate(moment(new Date(currentDate)).format('DD-MM-YYYY'))
        } else {
            setEndDate(moment(new Date(currentDate)).format('DD-MM-YYYY'))
        }
    };

    const showDatePicker = (currentMode: any) => {
        setShow(true);
        setDate(true);
        setDateType(currentMode)
    };

    const DatePressed = (currentMode: any) => {
        setShow(true);
        setDate(true);
        setDateType(currentMode)
    }

    useEffect(() => {
        
        getRequestedSpareParts();
    }, [])

    return (

        <SafeAreaView style={comStyles.CONTAINER}>

            <Header isBtn={true} title="Spare Parts Request" btnOnPress={() => navigation.goBack()} />

            <View style={comStyles.CONTENT}>


                <TouchableOpacity
                    onPress={() => setShowCalendar(!showCalendar)}
                    style={{ justifyContent: 'center', marginTop: 10, height: 60 }}>
                    <ActionButton
                        title="Custom Date Range"
                        onPress={btnCloseOnpress}
                        style={date === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={date === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />
                </TouchableOpacity>
                <View style={{alignContent:'center', justifyContent: 'center',alignItems:'center'}}>
                {showCalendar && (
                    <CalendarPicker
                    onDateChange={handleDateChange}
                    selectedStartDate={startDate}
                    selectedEndDate={endDate}
                    />
                   
                )}

               
                </View>

                <InputText
                    placeholder="Search by spare part"
                    is_clr_icon={true}
                    icon_name1="search1"
                    iconClr='rgba(60, 60, 67, 0.6)'
                    style={{
                        marginTop: 5,
                        paddingLeft: 50,


                    }}
                    imgStyle={{
                        paddingTop: 10,
                        left: 20,
                    }}

                    stateValue={searchText}
                    setState={(newText:any) => searchSpareParts(newText)}
                />


                <LeftRightArrowbarComponent
                    leftarrow="leftcircle"
                    rightarrow="rightcircle" />

                <AttendanceTableHeaderComponent
                    customstyle={style.customStyletableHeader}
                    isHeadertitle1={true}
                    Headertitle1="Date"
                    isHeadertitle2={true}
                    Headertitle2="Spare Parts Request ID"
                    isHeadertitle3={true}
                    Headertitle3="Description"
                    isHeadertitle4={false}
                    Headertitle4="Qty"
                    isHeadertitle5={true}
                    Headertitle5="Qty"
                />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={sparepartsList}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <AttendanceTableDetailsComponent
                                isHeadertitle1={true}
                                Headertitle1={item.creationdate}
                                isHeadertitle2={true}
                                Headertitle2={item.SPRequestID}
                                isHeadertitle3={true}
                                Headertitle3={item.description}
                                isHeadertitle4={true}
                                Headertitle4={item.qty}
                                isHeadertitle5={false}
                                Headertitle5={item.twhour}
                            />

                        );
                    }}
                    keyExtractor={item => `${item.spId}`}
                />


            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

        </SafeAreaView>

    );

}
export default SparePartsRequest;