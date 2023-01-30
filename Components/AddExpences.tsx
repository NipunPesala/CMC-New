import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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
    Animated,
    Keyboard,
    Platform,
    Alert,
    ToastAndroid,
} from 'react-native';
import comStyles from '../Constant/Components.styles';
import Header from './Header';
import ActionButton from './ActionButton';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputText from './InputText';
import InputTextField from './InputTextField';

const AddExpences = () => {
    const navigation = useNavigation();

    // Inputs field states
    const [craeteDate, setCreateDate] = useState('');
    const [serviceCallId, setServiceCallId] = useState('');
    const [createBy, setCreateBy] = useState('');
    const [expencesType, setExpencesType] = useState('');
    const [amount, setAmount] = useState('');
    const [expencesDate, setExpencesDate] = useState('');
    const [remark, setRemark] = useState('');


    return (
        <SafeAreaView style={comStyles.CONTAINER}>
            <TouchableOpacity
                style={style.dashStyle}
                onPress={() => navigation.navigate('Home')}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={style.maintxt}>Add New Expences</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                    padding: 10,
                }}>
                <ActionButton
                    title="Cancel"
                    style={style.loginBtn}
                    textStyle={style.txtStyle}
                    onPress={() => navigation.navigate('Home')}
                />
                <ActionButton
                    title="Create"
                    style={{ flex: 0.5 }}
                //onPress={() => }
                />
            </View>

            <ScrollView style={style.scrollStyle} nestedScrollEnabled={true}>
                <View>
                    <InputText
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        placeholder="Create Date"
                        stateValue={craeteDate}
                        editable={true}
                        style={comStyles.serviceTicketInput}
                    />
                    <InputText
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        placeholder="Service Call ID"
                        stateValue={serviceCallId}
                        editable={true}
                        style={comStyles.serviceTicketInput}
                    />
                    <InputText
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        placeholder="Create By"
                        stateValue={createBy}
                        editable={true}
                        style={comStyles.serviceTicketInput}
                    />
                    <View style={{ zIndex: 100 }}>
                        <DropDownPicker
                            //open={}
                            // items={}
                            placeholder="Expences Type"
                            placeholderStyle={{
                                fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
                                fontSize: 12,
                            }}
                            // onChangeItem={item => console.log(item.label, item.value)}
                            style={comStyles.dropdownBox}
                            //setOpen={}
                            containerStyle={{ height: 40 }}
                            dropDownStyle={{ backgroundColor: 'white' }}
                            dropDownMaxHeight={'100%'}
                            labelStyle={{ fontSize: 14 }}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: 'white',
                                elevation: 1000,
                                borderColor: comStyles.COLORS.BORDER_COLOR,
                            }}
                            listMode="SCROLLVIEW"
                            scrollViewProps={{
                                nestedScrollEnabled: true,
                            }}
                            // onChangeValue={}
                            value={expencesType}
                        // setValue={}
                        />
                    </View>
                    <View style={{ padding: 10 }} />
                    <InputText
                        placeholder="Amount"
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        style={comStyles.serviceTicketInput}
                        stateValue={amount}
                        editable={true}
                    />
                    <View style={{ padding: 5 }} />
                    <TouchableOpacity onPress={() => showDatePicker('fromDate')}>
                        <InputText
                            placeholder="Date relevent to Expences"
                            placeholderColor={comStyles.COLORS.HEADER_BLACK}
                            is_back_icon={true}
                            back_icon_name="calendar"
                            editable={true}
                            backiconClr={comStyles.COLORS.BLACK}
                            style={comStyles.serviceTicketInput}
                            stateValue={expencesDate}
                        // setState={setStartDate}
                        />
                    </TouchableOpacity>
                    <InputTextField
                        placeholderColor={comStyles.COLORS.HEADER_BLACK}
                        placeholder="Remark"
                        stateValue={remark}
                        editable={true}
                        style={comStyles.serviceTicketInput}
                    />
                    <View style={{ padding: 25 }} />
                </View>
            </ScrollView>

            {/* <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
            onChange={onChange}
            /> */}

            <View style={{ padding: 30 }} />
        </SafeAreaView>

    );

}

const style = StyleSheet.create({
    txtStyle: {
        color: comStyles.COLORS.ICON_BLUE,
    },
    loginBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        flex: 0.5,
        marginRight: 10,
    },
    scrollStyle: {
        marginBottom: 0,
        marginLeft: 13,
        marginRight: 13,
    },
    dashStyle: {
        width: 50,
        height: 5,
        backgroundColor: comStyles.COLORS.DASH_COLOR,
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'center',
    },
    maintxt: {
        color: comStyles.COLORS.BLACK,
        fontSize: 18,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
        color: comStyles.COLORS.HEADER_BLACK,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
        color: comStyles.COLORS.BLACK,
        fontFamily: comStyles.FONT_FAMILY.REGULAR,
    },
    placeholderStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: comStyles.COLORS.BLACK,
    },
    selectedTextStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 12,
        color: comStyles.COLORS.ICON_BLUE,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
});
export default AddExpences;