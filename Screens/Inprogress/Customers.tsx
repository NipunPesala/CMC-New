import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import comStyles from "../../Constant/Components.styles";
import Header from "../../Components/Header";
import { useNavigation } from "@react-navigation/native";
import InputText from "../../Components/InputText";
import CustomerDetails from "../../Components/CustomerDetails";
import { Dropdown } from "react-native-element-dropdown";
import { getAllCustomerINFO } from "../../SQLiteDatabaseAction/DBControllers/CustomerController";
import ListBox from "../../Components/ListBox";
import { cofirmService } from "../../Constant/DummyData";


const Customers = () => {

    const navigation = useNavigation();
    const [isFocus, setIsFocus] = useState(false);
    const [customerList, setCustomerList] = useState([]);
    const [selectCustomer, setSelectCustomer] = useState(null);


    const [contactpersonlist, setcontactpersonlist] = useState(false);
    const [contactperson, setcontactperson] = useState('');


    const [customerID, setcustomerID] = useState('');
    const [customerName, setcustomerName] = useState('');
    const [address, setaddress] = useState('');
    const [contactNumber, setcontactNumber] = useState('');
    const [cusType, setcusType] = useState('');
    const [cusDescription, setcusDescription] = useState('');

    useEffect(() => {
        getCustomers();
        setcontactpersonlist(false);
    }, [])


    const getCustomers = () => {


        getAllCustomerINFO((result: any) => {
            //console.log("<><><><><><><><><cus info2222"+ result);
            setCustomerList(result);
        });

    }
    const presHanderl = (data: any) => {
        console.log(data);
        setcontactperson(data);
        setcontactpersonlist(false);

    }

    const handleContactperson = () => {
        console.log(cofirmService);

        if (contactpersonlist === true) {
            setcontactpersonlist(false);
        } else {
            setcontactpersonlist(true);
        }


    }

    return (

        <SafeAreaView style={comStyles.CONTAINER}>
            <Header isBtn={true} title="Customers" btnOnPress={() => navigation.goBack()} />

            <View style={comStyles.CONTENT}>


                <Dropdown

                    style={[style.dropdown, isFocus && { borderColor: comStyles.COLORS.BORDER_COLOR }]}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={customerList}
                    search
                    maxHeight={300}
                    labelField="CusName"
                    valueField="CusName"
                    placeholder={!isFocus ? 'Select Customer ' : '...'}
                    searchPlaceholder="Search Customer "
                    value={selectCustomer}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {

                        // [{"Address": "1/D Nalapaha", "CusCode": "SANMIK DEPT 11", "CusID": 1,
                        //  "CusName": "Sanmik Food", "_Id": 6, "status": "1"}

                        console.log('%%%%-----', item);
                        setSelectCustomer(item.CusName);
                        setcustomerID(item.CusID);
                        setcustomerName(item.CusName);
                        setaddress(item.Address);
                        setcontactNumber("-");
                        setcusType("-");
                        setcusDescription(item.CusCode);
                        setIsFocus(false);
                    }}





                //     renderLeftIcon={() => (
                //         <AntDesign
                //             style={style.icon}
                //             color={isFocus ? comStyles.COLORS.HEADER_BLACK : comStyles.COLORS.HEADER_BLACK}
                //             name="Safety"
                //             size={15}
                //         />
                //     )}
                />
                <View style={{ padding: 5 }}></View>

                {/* {<InputText
                    placeholder="Search by Customer Name or ID"
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
                /> } */}


                <View style={{ marginBottom: 140 }}>

                    <ScrollView>

                        {/* <CustomerDetails /> */}

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
{/* 
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


                            <View style={{ padding: 5 }}></View> */}

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





                    </ScrollView>

                </View>



            </View>
        </SafeAreaView>

    );

}

const style = StyleSheet.create({


    headerText: {
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.ICON_BLUE,
        fontSize: 16
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 15,
        paddingLeft: 50,

    },
    placeholderStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: comStyles.COLORS.BLACK
    },
    selectedTextStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: comStyles.COLORS.ICON_BLUE
    }, iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    }, icon: {
        marginRight: 5,
        color: comStyles.COLORS.HEADER_BLACK,
    },

});

export default Customers;