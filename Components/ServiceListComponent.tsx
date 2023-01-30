import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
} from "react-native";
import ComponentsStyles from '../Constant/Components.styles'
import ListBox from "./ListBox";

type ParamTypes = {
    txtDate: string;
    btnTxt: string;
    subList?: any;
    recieve?: boolean;
    confirm?: boolean;
    onPressIcon?: Function;
    onPresBtn?: Function;

}

let service_id = '';


const getServiceID = (ID:any) =>{

    service_id = ID;

    console.log(service_id,"  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ");
    

}

const ServiceListComponent = ({ txtDate, btnTxt, subList, recieve, confirm, onPressIcon, onPresBtn}: ParamTypes) => {

    const width = Dimensions.get("screen").width;

    return (

        <View style={styles.mainContainer}>

            <Text style={styles.TextTitle}>{txtDate}</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={subList}
                style={{ marginTop: 10, alignItems: 'center' }}
                horizontal={false}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
                            <ListBox
                                ticketNo={item.serviceId}
                                name={item.customer}
                                address={item.customer_address}
                                status={item.priority}
                                nameAddress={true}
                                isbtn={recieve}
                                isIcon={confirm}
                                onPressIcon={onPressIcon}
                                onPresBtn={onPresBtn}
                                btnTitle={btnTxt}
                            />
                        </View>
                    );
                }}
                keyExtractor={item => `${item._Id}`}
            />
        </View>
    );

}

const styles = StyleSheet.create({

    mainContainer: {

        width: '100%',
        backgroundColor: ComponentsStyles.COLORS.WHITE,
    },

    TextTitle: {
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        fontSize: 16
    },


});
export default ServiceListComponent;