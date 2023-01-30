import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView } from "react-native";
import comStyles from "../Constant/Components.styles";
import { cofirmService } from '../Constant/DummyData';
import ListBox from "./ListBox";
import DropDownPicker from 'react-native-dropdown-picker';



const CustomerDetails = (props: any) => {
    const priorityListInitial = [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' }
    ];
    const [contactpersonlist, setcontactpersonlist] = useState(false);
    const [contactperson, setcontactperson] = useState('');


    const [customerID, setcustomerID] = useState('');
    const [customerName, setcustomerName] = useState('');
    const [address, setaddress] = useState('');
    const [contactNumber, setcontactNumber] = useState('');
    const [cusType, secusType] = useState('');
    const [cusDescription, setcusDescription] = useState('');


    useEffect(() => {
        setcontactpersonlist(false);

    }, [])
    const handleContactperson = () => {
        console.log(cofirmService);

        if (contactpersonlist === true) {
            setcontactpersonlist(false);
        } else {
            setcontactpersonlist(true);
        }


    }
    const presHanderl = (data: any) => {
        console.log(data);
        setcontactperson(data);
        setcontactpersonlist(false);

    }

    return (

        <View>

            <Text style={style.headerText}>Customer Details</Text>

            <View style={{ padding: 5 }}></View>

            <ListBox
                headerType="Customer ID"
                value={true}
                txtvalue={customerID}
            />

            <View style={{ padding: 5 }}></View>

            <ListBox
                headerType="Customer Name"
                value={true}
                txtvalue={customerName}
            />

            <View style={{ padding: 5 }}></View>

            <ListBox
                headerType="Location"
                value={true}
                txtvalue={address}
            />

            <View style={{ padding: 5, }}></View>

            <ListBox
                headerType="Contact Person"
                value={true}
                txtvalue={contactperson}
                isanyIcon={true}
                onPressCancelIcon={handleContactperson}
                anyIconName="chevron-down"
                iconColor={comStyles.COLORS.BLACK}
            />
            {contactpersonlist ?

                <View style={{ height: 100 }}>

                    <ScrollView>
                        {cofirmService.map((item, index) => {
                            return (
                                <Text onPress={() => presHanderl(item.cusName)} style={style.persontextStyle}>{item.cusName}</Text>
                                
                                )
                        }
                        )
                        }


                    </ScrollView>
                </View> : null}


            <View style={{ padding: 5 }}></View>

            <ListBox
                headerType="Contact No"
                value={true}
                txtvalue={contactNumber}
            />

            <View style={{ padding: 5 }}></View>

            <ListBox
                headerType="Customer Type"
                value={true}
                txtvalue={cusType}
            />

            <View style={{ padding: 5 }}></View>

            <ListBox
                headerType="Customer Description"
                value={true}
                txtvalue={cusDescription}
            />

            <View style={{ padding: 5 }}></View>


        </View>
    );
}

const style = StyleSheet.create({


    headerText: {
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.ICON_BLUE,
        fontSize: 20,
        padding:5
    },
    persontextStyle: {
        fontSize: 16, marginLeft: 10, marginTop: 5
    }

});

export default CustomerDetails;