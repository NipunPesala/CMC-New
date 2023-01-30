import React from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import ActionButton from "./ActionButton";
import comStyles from "../Constant/Components.styles";
import { Colors } from "react-native/Libraries/NewAppScreen";

type CustomPropTypes = {

    onpress?: Function;
}

const ActinModalCmponent = ({ onpress }: CustomPropTypes) => {

    return (
        <View style={modalstyle.modalMainContainer}>

            <ActionButton title="Accept" style={modalstyle.ActionButton} />
            <ActionButton title="Reject" style={modalstyle.rejectBtn} />
            <ActionButton title="Cancel" style={modalstyle.loginBtn} textStyle={modalstyle.txtStyle} onPress={onpress} />

        </View>
    );

}

const modalstyle = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    loginBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        marginBottom: 10,

    },

    rejectBtn: {
        backgroundColor: comStyles.COLORS.HIGH_BUTTON_RED,
        marginBottom: 30
    },

    ActionButton: {
        marginTop: 10,
        marginBottom: 10
    },

    txtStyle: {
        color: comStyles.COLORS.ICON_BLUE
    }

});

export default ActinModalCmponent;