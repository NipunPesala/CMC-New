/**
* @author Gagana Lakruwan
*/
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions
} from "react-native";
import AsyncStorageConstants from "../Constant/AsyncStorageConstants";
import { getCurrentServiceCallID } from "../Constant/AsynStorageFuntion";
import { serviceTicket } from "../Constant/DummyData";
import { getTicketByServiceId, updateTicketStatus } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import ListBox from "./ListBox";

type ParamTypes = {
    btnEnable: boolean;
    enableStatusUpdate: boolean;
}
let serviceID: any;
var checkstatus = false;
var checkstatusNum: any;
const Tickets = ({ btnEnable,enableStatusUpdate }: ParamTypes) => {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    const navigation = useNavigation();



    const [ticketList, setTicketList]: any[] = useState([]);
    const [att_status, setatt_status] = useState('');

    const UpdateHandle = async (ticketID: any) => {
        navigation.navigate('NewServiceTicket', {
            mode: "1",
            ID: ticketID,
        });
    }
    const HandleIcon = async (ticketID: any) => {
        await navigation.navigate('TicketDetails', {
            ticketID: ticketID,
        });
    }
    const navigatoTicket = async (ticketID: any) => {
        console.log(serviceID, "go .......", ticketID, '--------', checkstatusNum);
        navigation.navigate('TicketDetails', {
            ticketID: ticketID,
        });
       

        // AsyncStorage.setItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID,ticketID);

        // await navigation.navigate('TicketDetails');


    }

    const getTicketList = (id: any) => {

        getTicketByServiceId(id, (result: any) => {

            const ticketArray: any[] = [];

            for (let i = 0; i < result.length; ++i) {


                checkstatusNum == result[i].status
                if (result[i].status == 0) {
                    checkstatus = true;
                } else {
                    checkstatus = false;
                }
                ticketArray.push(
                    {
                        id: result[i].ticketId,
                        cusName: result[i].content,
                        address: result[i].itemDescription,
                        status: result[i].status,
                        priority: result[i].priority,
                        date: result[i].startDate,
                        attend_status: result[i].attend_status,
                        attend_statusStr: result[i].attend_statusStr,//hold or pending

                    }
                );

            }

            setTicketList(ticketArray);

            console.log("***** ", ticketList)


        });


    }

    useFocusEffect(
        React.useCallback(() => {
           
            getCurrentServiceCallID().then(res => {


                serviceID = res;
                getTicketList(serviceID);
    
                // console.log(" async data ........... ",btnEnable);
    
            })

        }, []),
    );

    // useEffect(() => {

    //     console.log(" async data ........... ", btnEnable);

    //     getCurrentServiceCallID().then(res => {


    //         serviceID = res;
    //         getTicketList(serviceID);

    //         // console.log(" async data ........... ",btnEnable);

    //     })

    // }, [])


    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={ticketList}
                style={{ marginTop: 10, marginBottom: 75, }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ padding: 5, }}>
                            <ListBox
                                ticketNo={item.id.toString()}
                                name={"Ticket Content: " + item.cusName}
                                address={item.address}
                                date={"Date:" + item.date}

                                ticketStatus={"Status:" + item.attend_statusStr}
                                status={item.priority}
                                isbtn={item.status == "1" ? false : true}
                                isIcon={item.status == "0" ? false : true}
                                // isUpdate={item.status == "1" ? false : true}
                                nameAddress={true}
                                enableStatus={btnEnable}
                                onPressIcon={() => HandleIcon(item.id)}
                                onPresBtn={() => navigatoTicket(item.id)}
                                onPresBtnupdate={() => UpdateHandle(item.id)}
                                headerType="Ticket No  :"
                                ticketError={item.error}
                                btnTitle="Proceed"
                                enableStatusUpdate={enableStatusUpdate}
                            />
                        </View>
                    );
                }}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    );
}
export default Tickets;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
});