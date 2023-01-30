import React, { useEffect, useState,useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, StyleSheet } from "react-native";
import comStyles from "../../Constant/Components.styles";
import Header from "../../Components/Header";
import { useNavigation } from "@react-navigation/native";
import ServiceListComponent from "../../Components/ServiceListComponent";
import { serviceData } from '../../Constant/DummyData'
import { getTicketsForInprogress } from '../../SQLiteDatabaseAction/DBControllers/TicketController';
import ListBox from '../../Components/ListBox';

const InprogressTask = () => {

    const navigation = useNavigation();
    const [inprogresticketList, setInprogresticketList]: any[] = useState([]);


    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getInprogressTicket();
        });
        return focusHandler;

    }, [])

    const getInprogressTicket=()=>{
        
        getTicketsForInprogress((result: any) => {
          //  console.log("^^========Inprogress view==========^",JSON.stringify(result));
                    
            try {
                var dateArr: any = [];
                var resArr: any = [];
                result.forEach((element: any) => {
                    dateArr.push(element.startDate);
                });
                dateArr = [... new Set(dateArr)];

             //   console.log("............ ", dateArr);


                let i = 1;
                dateArr.forEach((element: any) => {
                    i++;
                    var obj: any = {};
                    obj.id = i;
                    obj.date = element;
                    obj.details = result.filter((elm: any) => { return elm.startDate == element })
                    resArr.push(obj);
                });

               // [{"date": "10-11-2022", "details": [[Object], [Object], [Object], [Object]], "id": 2}]
                 console.log(" response array service ,,,,,,,,,,,,,   ",resArr);
                 console.log(" list size ............  ", result.length);

                setInprogresticketList(resArr);


            } catch (error) {
                console.log(" push array ,,,,,,,  ", error);

            }

           // setInprogresticketList(result);

           

            
        });
    }


    const navigatoTicket = async (ticketID: any) => {

        console.log(ticketID , "     >>>>>>>>>>>>>>>>>>>>>>>>>>    ");
        
        navigation.navigate('TicketDetails', {
            ticketID: ticketID,
        });
       

    }


    
    return (

        <SafeAreaView style={comStyles.CONTAINER}>
            <Header isBtn={true} title="Tasks In Progress" btnOnPress={() => navigation.goBack()} />

            <View style={comStyles.CONTENT}>
                { <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={inprogresticketList}
                    style={{ marginTop: 10, marginBottom: 60, }}
                    horizontal={false}
                    renderItem={({ item }) => {
                        return (
                            // <ServiceListComponent
                            //     subList={item.deatil}
                            //     txtDate={item.date}
                            //     recieve={true}
                            //     btnTxt="View Details"
                            //    // onPresBtn={() => navigation.navigate('Customers')}
                            // />

                            <View style={modalstyle.mainContainer}>

                            <Text style={modalstyle.TextTitle}>{item.date}</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={item.details}
                                style={{ marginTop: 10, alignItems: 'center' }}
                                horizontal={false}
                             
        
                                renderItem={({ item }) => {
                                    
                                   // {"signatureStatus":"1","cusRemark":"","engRemark":"","startDate":"10-11-2022",
                    // "status":"0","attend_status":"3","itemDescription":"car","cusNic":"",
                    // "ticketId":"SCT_2022-11-10_1","_Id":1,"endDate":"10-11-2022",
                    // "priority":"High","assignTo":"Ashen","serviceId":"SC_2022-11-10_1","content":"car"}
                                    return (
                                        <View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
                                            <ListBox
                                                ticketNo={"Ticket ID: "+item.ticketId}
                                                name={"Service Call ID: "+item.serviceId}
                                               // address={"Item Description :"+item.itemDescription}
                                                address ={"Assing to "+item.assignTo}
                                                date={"End Date "+ item.endDate}
                                                status={item.priority}
                                                nameAddress={true}
                                                isbtn={true}
                                                isIcon={false}
                                                btnTitle="View Details"
                                                onPresBtn={() => navigatoTicket(item.ticketId)}
                                            
                                            />
                                    
                                         
                                        </View>
                                         



                                    );
                                }
                              
                            }
                                keyExtractor={item => `${item._Id}`}
                            />
                        </View>


                
                        );
                    }
                }
                    keyExtractor={item => `${item.date}`}
                /> }
            </View>

        </SafeAreaView>

    );

}


const modalstyle = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    loginBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        marginBottom: 10,

    },

    rejectBtn: {
        backgroundColor: comStyles.COLORS.HIGH_BUTTON_RED,
        marginBottom: 30
    },

    ActionButton: {
        marginTop: 10,
        marginBottom: 10
    },

    txtStyle: {
        color: comStyles.COLORS.ICON_BLUE
    },
    mainContainer: {

        width: '100%',
        backgroundColor: comStyles.COLORS.WHITE,
    },

    TextTitle: {
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.HEADER_BLACK,
        fontSize: 16
    },

});
export default InprogressTask;