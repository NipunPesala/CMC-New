import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions
} from "react-native";
import ListBox from "../Components/ListBox";
import SparePartsRequest from "../Screens/Reports/SparePartsRequest";



const ReportsComponent = () => {

    const navigation = useNavigation();
    const serviceTicketDetails = () => {
        navigation.navigate('ServiceTicketDetailsScreen');
    }
    const ServiceTicketSummaryReportScreen = () => {
        navigation.navigate('ServiceTicketSummaryReportScreen');
    }
    const SparePartsRequestScreen = () => {
        navigation.navigate('SparePartsRequest');
    }

    return (

        <View>
            <ListBox
                ticketNo="Service Ticket Details"
                isIcon={true}
                onPressIcon={serviceTicketDetails}
                headerStyle={{
                    marginBottom: 15,
                }}
            />

            <ListBox
                ticketNo="Service Ticket Summary Reports"
                isIcon={true}
                onPressIcon={ServiceTicketSummaryReportScreen}
                headerStyle={{
                    marginBottom: 15,
                }}
            />

            <ListBox
                ticketNo="Spare Parts Request"
                isIcon={true}
                onPressIcon={SparePartsRequestScreen}
                headerStyle={{
                    marginBottom: 15,
                }}
            />
        </View>

    );



}
export default ReportsComponent;