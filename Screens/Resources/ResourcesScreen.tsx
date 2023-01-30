import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";
import Header from "../../Components/Header";
import ComStyles from "../../Constant/Components.styles";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../Components/InputText";
import ActionButton from "../../Components/ActionButton";
import ResourcesStyle from "./ResourcesStyle";
import { Tool, Vehicle } from "../../Constant/DummyData";
import SparepartsItem from "../../SubComponents/SparepartsItem";
import { getTypeviseResouces, getTypeviseResoucesSearch } from "../../SQLiteDatabaseAction/DBControllers/ResourcesController";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorageConstants from "../../Constant/AsyncStorageConstants";

const ResourcesScreen = () => {

    const navigation = useNavigation();

    const [tool, setTool] = useState(false);
    const [vehicle, setVehicle] = useState(false);
    const [listdata, setlistdata] = useState([]);
    const [ResourceList, setResourceList] = useState();
    const [searchText, setSearchText] = useState();

    const ToolPressed = () => {
        setTool(true);
        setVehicle(false);
        setlistdata(Tool);
        getResources("Tool");
    }
    const VehiclePressed = () => {
        setTool(false);
        setVehicle(true);
        setlistdata(Vehicle);
        getResources("Vehicle");
    }

    useEffect(() => {
        setVehicle(false);
        setTool(true);
        setlistdata(Tool);
    }, [])

    const viewCalendar = (data:any) => {

        console.log(data,"------------------------------");
        
        AsyncStorage.setItem(AsyncStorageConstants.ASYNC_RESOURCE_ID,data);
       
        if (tool === true) {
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_RESOURCE_Type,"Tool");
            navigation.navigate('ToolCalendar');

        } else if (vehicle === true) {
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_RESOURCE_Type,"Vehicle");
            navigation.navigate('VehicleCalendar');
        }

    }

    const getResources = (type: String) => {

        getTypeviseResouces(type, (result: any) => {
            setResourceList(result);

        });


    }

    const searchResources = (text:any) => {

        setSearchText(text);
        if(tool){

            getTypeviseResoucesSearch('Tool' , text,(result:any) => {
                setResourceList(result);
            });
          


        }else{

       
            getTypeviseResoucesSearch('Vehicle' , text,(result:any) => {
                setResourceList(result);
            });

        }

    }

    useEffect(() => {
        getResources("Tool");

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
                    setState={(newText:any) => searchResources(newText)}
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

                            <TouchableOpacity onPress={() => viewCalendar(item.ResourcesID)}>
                                <SparepartsItem
                                    is_additional={true}
                                    id={item.ResourcesID}
                                    description={item.Decription}
                                    quantity={item.Type}
                                />

                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={item => `${item.ResourcesID}`}
                />


            </View>

        </SafeAreaView>

    );

}
export default ResourcesScreen;