/**
* @author Gagana Lakruwan
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";
import { serviceHistory } from "../Constant/DummyData";
import ListBox from "./ListBox";

const TicketsHistory = () => {
    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={serviceHistory}
                style={{ marginTop: 10, marginBottom: 75, }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ padding: 5, }}>
                            <ListBox
                                ticketNo={item.id.toString()}
                                nameAddress={true}
                                name={item.cusName}
                                address={item.address}
                                headerType="Ticket No  :"
                                date={item.date}
                                ticketError={item.error}
                            />
                        </View>
                    );
                }}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    );
}
export default TicketsHistory;


const styles = StyleSheet.create({
    container: {}
});