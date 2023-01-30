/**
* @author Madushika Sewwandi
*/
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { screenWidth } from 'react-native-calendars/src/expandableCalendar/commons';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from './ActionButton';
import comStyles from '../Constant/Components.styles'
import { useNavigation } from "@react-navigation/native";
import NewServiceCall from './NewServiceCall';
import NewServiceTicket from './NewServiceTicket';

const ButtonSheetComponent = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [screenType, setScreenType] = useState('main');

    const closeModal = (val: boolean) => {
        // setModalVisible(val);
        setScreenType('main');
    }

    const modalClose = () =>{
        setModalVisible(false);
        navigation.navigate('Home');
    }

    const serviceCall = () =>{
        setModalVisible(false);
        navigation.navigate('NewServiceCall', {
            serviceID: 0,
            mode:0,
            cusList:[]
        });
       // navigation.navigate('NewServiceCall');
    }

    const serviceTicket = () =>{
        setModalVisible(false);
        navigation.navigate('NewServiceTicket', {
            mode: "0",
        });
    }


    return (
        <View style={styles.headerContainer}>

            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { setModalVisible(true) }}>
                <Icon name={"add-box"} size={30} color={"white"} style={{}} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Modal
                    backdropOpacity={0.3}
                    isVisible={modalVisible}
                    onBackdropPress={() => modalClose()}
                    style={styles.contentView}
                >
                    {
                        screenType == 'main' ?

                            <View style={styles.modalMainContainer}>

                                <TouchableOpacity style={styles.dashStyle} onPress={() => modalClose()} />

                                <View style={{ width: '100%', }}>
                                    {/* <ActionButton title="Add New Service Call" style={styles.ActionButton} onPress={() => setScreenType('serviceCall')} /> */}
                                    <ActionButton title="Add New Service Call" style={styles.ActionButton} onPress={() => serviceCall()} />
                                    <ActionButton title="Add New Service Ticket" style={styles.ActionButton} onPress={() => serviceTicket()} />
                                    {/* <ActionButton title="Add Expences" style={styles.ActionButton}  /> */}

                                    <ActionButton title="Cancel" style={styles.loginBtn} textStyle={styles.txtStyle} onPress={() => modalClose()} />
                                </View>

                            </View>
                            :
                            screenType == 'serviceCall' ?
                                <NewServiceCall onClose={closeModal} />
                                :
                                <NewServiceTicket onClose={closeModal} onpressclose={() => setModalVisible(false)} />
                    }
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    headerContainer: {
        justifyContent: 'center'
    },
    container: {
        width: 100,
    },

    contentView: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

    loginBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        marginBottom: 10,
        marginTop: 20

    },

    rejectBtn: {
        backgroundColor: comStyles.COLORS.HIGH_BUTTON_RED,
        marginBottom: 30
    },

    ActionButton: {
        marginTop: 15,
    },

    txtStyle: {
        color: comStyles.COLORS.ICON_BLUE
    },
    dashStyle: {
        width: 50,
        height: 5,
        backgroundColor: comStyles.COLORS.DASH_COLOR,
        borderRadius: 20,
        marginTop: 5,
    },
    modalCont: {
        flex: 1,
        flexGrow: 1,
        width: screenWidth,
        paddingHorizontal: 10,

    },
});

export default ButtonSheetComponent;