import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Platform, TouchableOpacity, ToastAndroid, Animated, Dimensions, Keyboard, StyleSheet, Alert } from "react-native";
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
import { getAll_Data, getSearchSparePart, SearchSpairePartByDateRange } from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import CalendarPicker from 'react-native-calendar-picker';
import DateRangePicker from "rn-select-date-range";
import { getALLAdditionalSpare_For_Reports, getALL_AdditionalSpareparts_For_Reports_search, SearchAdditionalSpairePartByDateRange } from "../../SQLiteDatabaseAction/DBControllers/AdditionalSparepartsController";
import { getALL_InventrySpareparts_For_Reports, getALL_InventrySpareparts_For_Reports_search, SearchInventrySpairePartByDateRange } from "../../SQLiteDatabaseAction/DBControllers/InventrySparepartsController";
import TicketRepart from "../../Components/ReportTableComponent";


let height = Dimensions.get("screen").height;
const SparePartsRequest = () => {

    const navigation = useNavigation();
    const [date, setDate] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState('');
    const [sparepartsList, setsparepartsList]: any[] = useState([]);
    const [searchText, setSearchText] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const [Additional, setAdditional] = useState(false);
    const [Inventry, setInventry] = useState(false);
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
            "title": 'Date',
        },
        {
            "id": 3,
            "title": 'Spare Parts Request ID',
        },
        {
            "id": 4,
            "title": 'Description',
        },
        {
            "id": 5,
            "title": 'QTY',
        },
    ];
    const getRequestedSpareParts = () => {

        getAll_Data((result: any) => {

            setsparepartsList(result);

        })


    }




    const btnCloseOnpress = () => {
        setShowCalendar(!showCalendar);
        setStartDate('');
        setEndDate('');
    }

    const searchSpareParts = (text: any) => {

        setSearchText(text);

        if (Additional) {
            console.log("additional", text);
            getALL_AdditionalSpareparts_For_Reports_search(text, (result: any) => {
                restructureSelectedData(result);
               // setsparepartsList(result);

            });

        } else if (Inventry) {
            console.log("Inventry", text);

            getALL_InventrySpareparts_For_Reports_search(text, (result: any) => {
                restructureSelectedData(result);
               // setsparepartsList(result);

            });
        }





    }

    const selectDateRange = () => {

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
        setsparepartsList([]);
        slideOutModal();

        if (Additional) {
            console.log("additional");
            SearchAdditionalSpairePartByDateRange(selectedStartDate, selectedEndDate, (result: any) => {
                restructureSelectedData(result);
                //setsparepartsList(result);
            });

        } else if (Inventry) {
            console.log("Inventry");

            SearchInventrySpairePartByDateRange(selectedStartDate, selectedEndDate, (result: any) => {
                restructureSelectedData(result);
                //setsparepartsList(result);
            });
        }

        // SearchInventrySpairePartByDateRange


    }

    const changeRange = (range: any) => {

        setRange(range);

        setselectedStartDate(range.firstDate);
        setselectedEndDate(range.secondDate);

        console.log(selectedEndDate, " ............ ", selectedStartDate);


    }





    const getDateRangeResult = (DateOne: any, DateTwo: any) => {
        SearchSpairePartByDateRange(DateOne, DateTwo, (result: any) => {

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

    const get_Inventry_Spareparts_Data = () => {
        setsparepartsList([])

        getALL_InventrySpareparts_For_Reports((result: any) => {

            console.log(result, '-------------');

            restructureSelectedData(result);
            //setsparepartsList(result)
        });
    }
    const get_Additional_Spareparts_Data = () => {
        getALLAdditionalSpare_For_Reports((result: any) => {

            console.log(result, '-------------');


            restructureSelectedData(result);
        });
    }

    const restructureSelectedData = (AdditionalSparePart: any) => {

        const StructurerdArray: any[] = [];

       

            for (let i = 0; i < AdditionalSparePart.length; i++) {
                const nullReplacer = (value:any) => (value === null ? 'Null' : value )|| (value === '' ? 'Null' : value );
                StructurerdArray.push(
                    {
                        a_id: nullReplacer(AdditionalSparePart[i]._Id),
                        b_date:nullReplacer(AdditionalSparePart[i].CreatedAt),
                        c_serviceID: nullReplacer(AdditionalSparePart[i].Spareparts_HeaderID),
                        d_description: nullReplacer(AdditionalSparePart[i].ItemName),
                        e_quantity: nullReplacer(AdditionalSparePart[i].Quantity),
                    }
                );
            }

             console.log('StructurerdArray+++++++++++++++++++++++++', StructurerdArray);
             setsparepartsList(StructurerdArray);

    }

    const AdditionalSpareparts = () => {
        setAdditional(true)
        setInventry(false)
        setsparepartsList([])
        get_Additional_Spareparts_Data();
    }
    const InventrySpareparts = () => {
        setAdditional(false)
        setInventry(true)
        get_Inventry_Spareparts_Data();
    }
    const DatePressed = (currentMode: any) => {
        setShow(true);
        setDate(true);
        setDateType(currentMode)
    }

    useEffect(() => {
        setAdditional(true)
        setInventry(false)
        getRequestedSpareParts();

        get_Additional_Spareparts_Data();
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
                        confirmBtnTitle="Search"
                        clearBtnTitle="Clear"
                        font={comStyles.FONT_FAMILY.BOLD}
                    // maxDate={moment()}
                    // minDate={moment().subtract(100, "days")}
                    />

                </View>


            </Animated.View>

            <Header isBtn={true} title="Spare Parts Request" btnOnPress={() => navigation.goBack()} />

            <View style={comStyles.CONTENT}>


                <TouchableOpacity
                    onPress={() => setShowCalendar(!showCalendar)}
                    style={{ justifyContent: 'center', marginTop: 10, height: 75 }}>
                    <ActionButton
                        title="Custom Date Range"
                        onPress={selectDateRange}
                        style={date === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={date === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />
                </TouchableOpacity>



                <InputText
                    placeholder="Search by spare part ID"
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
                    setState={(newText: any) => searchSpareParts(newText)}
                />


                {/* <LeftRightArrowbarComponent
                    leftarrow="leftcircle"
                    rightarrow="rightcircle" /> */}
                <View style={style.containerButton}>
                    <ActionButton
                        title="Additional"
                        onPress={AdditionalSpareparts}
                        style={Additional === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={Additional === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />
                    <ActionButton
                        title="Inventry"
                        onPress={InventrySpareparts}
                        style={Inventry === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={Inventry === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />
                </View>


                {/* <AttendanceTableHeaderComponent
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
                    ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={style.EmptyMassage}>No data found</Text></View>}
                    data={sparepartsList}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (

                            <AttendanceTableDetailsComponent
                                isHeadertitle1={true}
                                Headertitle1={item.CreatedAt}
                                isHeadertitle2={true}
                                Headertitle2={item.Spareparts_HeaderID}
                                isHeadertitle3={true}
                                Headertitle3={item.ItemName}
                                isHeadertitle4={true}
                                Headertitle4={item.Quantity}
                                isHeadertitle5={false}
                                Headertitle5={item.twhour}
                            />

                        );
                    }}
                    keyExtractor={item => `${item.spId}`}
                /> */}


                <TicketRepart headerTitles={header} rows={sparepartsList} />


                {/* <InputText
                    placeholder="Search by spare part ID"
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
                    setState={(newText: any) => searchSpareParts(newText)}
                /> */}

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