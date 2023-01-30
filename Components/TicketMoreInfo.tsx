/**
* @author Gagana Lakruwan
*/
import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";
import { getCurrentServiceCallID } from "../Constant/AsynStorageFuntion";
import ComStyles from "../Constant/Components.styles";
import { moreInfoTicket } from "../Constant/DummyData";
import TicketMoreInfoSub from "../SubComponents/TicketMoreInfoSub";


const TicketMoreInfo = (serviceCallDEtails:any) => {
    return (
        <View style={styles.container}>

            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={serviceCallDEtails}
                style={{ marginTop: 5, marginBottom: 70, }}
                renderItem={({ item }) => {
                    return (
                        <TicketMoreInfoSub
                            headerText={item.header}
                            data={item.data} />
                    );
                }}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    );
}
export default TicketMoreInfo;


const styles = StyleSheet.create({
    container: {}
});