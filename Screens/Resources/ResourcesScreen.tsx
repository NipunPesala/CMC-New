import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";
import Header from "../../Components/Header";
import ComStyles from "../../Constant/Components.styles";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../Components/InputText";
import ActionButton from "../../Components/ActionButton";
import ResourcesStyle from "./ResourcesStyle";
import SparepartsItem from "../../SubComponents/SparepartsItem";
import { getTypeviseResouces, getTypeviseResoucesSearch } from "../../SQLiteDatabaseAction/DBControllers/ResourcesController";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../Constant/AsyncStorageConstants";
import { getAllVehicle, searchVehicle } from "../../SQLiteDatabaseAction/DBControllers/VehicleController";
import { getAllTools, searchTool } from "../../SQLiteDatabaseAction/DBControllers/ToolController";

const ResourcesScreen = () => {

    const navigation = useNavigation();

    const [tool, setTool] = useState(false);
    const [vehicle, setVehicle] = useState(false);
    const [listdata, setlistdata] = useState([]);
    const [ResourceList, setResourceList] = useState([]);
    const [searchText, setSearchText] = useState();

    const ToolPressed = () => {

        setResourceList([]);
        setTool(true);
        setVehicle(false);
        getTool();
    }
    const VehiclePressed = () => {
        setResourceList([]);
        setTool(false);
        setVehicle(true);
        getVehicle();
    }

    useEffect(() => {
        setVehicle(false);
        setTool(true);
    }, [])

    const viewCalendar = (data: any) => {

        console.log(data, "------------------------------");

        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_RESOURCE_ID, data);

        if (tool === true) {
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_RESOURCE_Type, "Tool");
            navigation.navigate('ToolCalendar');

        } else if (vehicle === true) {
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_RESOURCE_Type, "Vehicle");
            navigation.navigate('VehicleCalendar');
        }

    }

    const getVehicle = () => {

        getAllVehicle((result: any) => {

            setResourceList(result);

        });


    }


    const getTool = () => {

        getAllTools((result: any) => {

            setResourceList(result);

        });

    }

    const searchResources = (text: any) => {

        setSearchText(text);

        if (tool) {

            searchTool(text, (result: any) => {
                setResourceList(result);
            });

        } else {

            searchVehicle(text, (result: any) => {
                setResourceList(result);
            });

        }

    }

    useEffect(() => {
        // getResources("Tool");
        getTool();

    }, [])

    return (

        <SafeAreaView style={ComStyles.CONTAINER}>

            <Header isBtn={true} title="Resources" btnOnPress={() => navigation.navigate('Home')} />

            <View style={ComStyles.CONTENT}>

                <View style={ResourcesStyle.container}>
                    <ActionButton
                        title="Tool"
                        onPress={ToolPressed}
                        style={tool === true ? ResourcesStyle.selectedbutton : ResourcesStyle.defaultbutton}
                        textStyle={tool === true ? ResourcesStyle.selectedBUTTON_TEXT : ResourcesStyle.defaultBUTTON_TEXT}
                    />

                    <ActionButton
                        title="Vehicles"
                        onPress={VehiclePressed}
                        style={vehicle === true ? ResourcesStyle.selectedbutton : ResourcesStyle.defaultbutton}
                        textStyle={vehicle === true ? ResourcesStyle.selectedBUTTON_TEXT : ResourcesStyle.defaultBUTTON_TEXT}
                    />
                </View>

                <InputText
                    placeholder={tool === true ? 'Search Tools' : 'Search Vehicles'}
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
                    setState={(newText: any) => searchResources(newText)}
                />

                {tool ?
                    <View style={{ flexDirection: 'row', backgroundColor: ComStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
                        <Text style={ResourcesStyle.HraderStyle}>Tool ID</Text>
                        <Text style={[ResourcesStyle.HraderStyle, { flex: 2 }]}>Tool Description</Text>
                        <Text style={ResourcesStyle.HraderStyle}>Tool Type</Text>
                    </View>
                    : <></>
                }

                {vehicle ?
                    <View style={{ flexDirection: 'row', backgroundColor: ComStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
                        <Text style={ResourcesStyle.HraderStyle}>Vehicle ID</Text>
                        <Text style={[ResourcesStyle.HraderStyle, { flex: 2 }]}>Vehicle Description</Text>
                        <Text style={ResourcesStyle.HraderStyle}>Vehicle Type</Text>
                    </View>
                    : <></>
                }

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={ResourceList}
                    style={{ marginTop: 5, marginBottom: 5, flex: 2 }}
                    renderItem={({ item }) => {
                        return (

                            <TouchableOpacity onPress={() => viewCalendar(tool === true ? item.ItemCode : item.VehicleID)}>
                                <SparepartsItem
                                    is_additional={true}
                                    id={tool === true ? item.ItemCode : item.VehicleID}
                                    description={tool === true ? item.ItemName : item.Decription}
                                    quantity={tool === true ? item.ItemType : item.VehicleType}
                                />

                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={item => `${tool === true ? item.ItemCode : item.VehicleID}`}
                />


            </View>

        </SafeAreaView>

    );

}
export default ResourcesScreen;