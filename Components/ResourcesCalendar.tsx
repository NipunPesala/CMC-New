import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";
import { Tool } from "../Constant/DummyData";
import ListBox from "./ListBox";

const ResoucesCalendar = () => {

    return (
        <View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={Tool}
                style={{ marginTop: 10, marginBottom: 125, }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ padding: 5, marginBottom: 5 }}>
                            <ListBox
                                ticketNo={item.RequestID}
                                headerType="Resources Request :"
                                isCreatedBy={true}
                                createdBy="Created By : "
                                value1="Name of creator"
                                isserviceTicketID={true}
                                serviceTicketID="Service Call ID : "
                                value2={item.ServiceCall_id}
                            />
                        </View>
                    );
                }}
                keyExtractor={item => `${item._Id}`}
            />
        </View>
    );

}
export default ResoucesCalendar;