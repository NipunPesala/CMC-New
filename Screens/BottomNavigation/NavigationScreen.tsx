/**
* @author Madushika Sewwandi
*/
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home/Home";
import ProfileScreen from "../Profile/ProfileScreen";
import comStyles from "../../Constant/Components.styles";
import IconA from 'react-native-vector-icons/MaterialIcons';
import NotificationScreen from "../Notification/NotificationScreen";
import ServiceCall from "./ServiceCall/ServiceCall";
import RequestDetails from "./RequestDetails/RequestDetails";
import TicketDetails from "./TicketDetails/TicketDetails";
import RouteScreen from "../Route/RouteScreen";
import { Dimensions, StyleSheet } from "react-native";
import ButtonSheetComponent from "../../Components/ButtonSheetComponent";
import NewServiceTicket from "../../Components/NewServiceTicket";
import SparePartsScreen from "../SpareParts/SparePartsScreen";
import ResourcesScreen from "../Resources/ResourcesScreen";
import ToolCalendar from "../CalendarViewScreen/ToolCalendar";
import VehicleCalendar from "../CalendarViewScreen/VehicleCalendar";
import AttendanceScreen from "../Attendance/AttendanceScreen";
import ReportsScreen from "../Reports/ReportsScreen";
import ServiceTicketDetailsScreen from "../Reports/ServiceTicketDetailsScreen";
import ServiceTicketSummaryReportScreen from "../Reports/ServiceTicketSummaryReportScreen";
import SparePartsRequest from "../Reports/SparePartsRequest";
import InprogressTask from "../Inprogress/InprogressTask";
import Customers from "../Inprogress/Customers";
import NewServiceCall from "../../Components/NewServiceCall";
import CompleteTicket from "../../Components/CompleteTicket";
import ServiceTicketList from "../../Screens/BottomNavigation/TicketDetails/ServiceTicketList";
import RequestBottomSheet from "../../Components/RequestBottomSheet";
import AddAdditionalSpareParts from "../../Components/AddAdditionalSpareParts";
import AddSparePartsComponent from "../../Components/AddSparePartsComponent";
import AddExpences from "../../Components/AddExpences";
import AddExpencesNew from "../../Components/AddExpencesNew";

import ResourcesRequestComponent from "../../Components/ResourcesRequestComponent";
import SyncScreen from "../Sync/SyncScreen";
import CusTicketSummary from "../../Screens/Reports/CusTicketSummary";

let width = Dimensions.get("screen").width;

const Stack = createStackNavigator();
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceCall" component={ServiceCall} options={{ headerShown: false }} />
            <Stack.Screen name="RequestDetails" component={RequestDetails} options={{ headerShown: false }} />
            <Stack.Screen name="TicketDetails" component={TicketDetails} options={{ headerShown: false }} />
            <Stack.Screen name="NewServiceTicket" component={NewServiceTicket} options={{ headerShown: false }} />
            <Stack.Screen name="SparePartsScreen" component={SparePartsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResourcesScreen" component={ResourcesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ToolCalendar" component={ToolCalendar} options={{ headerShown: false }} />
            <Stack.Screen name="VehicleCalendar" component={VehicleCalendar} options={{ headerShown: false }} />
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ReportsScreen" component={ReportsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceTicketDetailsScreen" component={ServiceTicketDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceTicketSummaryReportScreen" component={ServiceTicketSummaryReportScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SparePartsRequest" component={SparePartsRequest} options={{ headerShown: false }} />
            <Stack.Screen name="InprogressTask" component={InprogressTask} options={{ headerShown: false }} />
            <Stack.Screen name="Customers" component={Customers} options={{ headerShown: false }} />
            <Stack.Screen name="NewServiceCall" component={NewServiceCall} options={{ headerShown: false }} />
            <Stack.Screen name="CompleteTicket" component={CompleteTicket} options={{ headerShown: false }} />
            <Stack.Screen name="RequestBottomSheet" component={RequestBottomSheet} options={{ headerShown: false }} />
            <Stack.Screen name="AddAdditionalSpareParts" component={AddAdditionalSpareParts} options={{ headerShown: false }} />
            <Stack.Screen name="AddSparePartsComponent" component={AddSparePartsComponent} options={{ headerShown: false }} />
            <Stack.Screen name="AddExpencesNew" component={AddExpencesNew} options={{ headerShown: false }} />
            <Stack.Screen name="ResourcesRequestComponent" component={ResourcesRequestComponent} options={{ headerShown: false }} />
            <Stack.Screen name="SyncScreen" component={SyncScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RouteScreen" component={RouteScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceTicketList" component={ServiceTicketList} options={{ headerShown: false }} />
            <Stack.Screen name="CusTicketSummary" component={CusTicketSummary} options={{ headerShown: false }} />
        </Stack.Navigator>

    )
}
const PayScreenComponent = () => {
    return null
}

const Tab = createBottomTabNavigator();

const NavigationScreen = () => {

    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: "absolute",
                    elevation: 0,
                    backgroundColor: comStyles.COLORS.HEADER_BLUE,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    height: 65,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;


                    if (route.name === 'HomeManager') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'notifications' : 'notifications';
                    } else if (route.name === 'Route') {
                        iconName = focused ? 'work' : 'work';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person';
                    } else if (route.name === 'Add') {
                        iconName = focused ? 'add-box' : 'add-box';
                    }

                    return <IconA name={iconName} size={size} color={color} />;
                },

                tabBarActiveTintColor: comStyles.COLORS.ICON_BLUE,
                tabBarInactiveTintColor: comStyles.COLORS.WHITE,
            })}

        >

            <Tab.Screen name="HomeManager" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="Route" component={RouteScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Add"
                component={PayScreenComponent}
                options={{
                    headerShown: false,
                    tabBarButton: () => (<ButtonSheetComponent />),
                }}
            />
            <Tab.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

        </Tab.Navigator >


    );

}
export default NavigationScreen;

const style = StyleSheet.create({
    modalCont: {
        flex: 1,
        flexGrow: 1,
        width: width,
        paddingHorizontal: 10,

    },
});