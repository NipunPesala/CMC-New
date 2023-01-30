/**
* @author Madushika Sewwandi
*/
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import ComponentsStyles from "../Constant/Components.styles";
import CheckBox from '@react-native-community/checkbox';
import InputText from "../Components/InputText";
import IconA from 'react-native-vector-icons/Entypo';
import ActionButton from "../Components/ActionButton";
import { TouchableOpacity } from "react-native-gesture-handler";
type ParamTypes = {
    id: any;
    description?: string;
    quantity?: any;
    is_checkbox?: boolean;
    is_editinput?: boolean;
    qty_value?: any;
    setStateQuantity?: any;
    stateValue?: any;
    PlusonPreonPressss?: Function;
    MinonPress?: Function;
}

const SparepartsItem1 = ({ id, description, quantity, is_checkbox, is_editinput, stateValue, setStateQuantity, MinonPress }: ParamTypes) => {

    const [selectcbx, setSelect] = useState(false);


    return (


        <TouchableOpacity style={styles.container} onPress={() => {
            if (MinonPress) MinonPress()
        }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, fontSize: 14, color: ComponentsStyles.COLORS.BLACK }}>{id}</Text>
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ flex: 2, fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, fontSize: 14, color: ComponentsStyles.COLORS.BLACK }}>{description}</Text>
                </View>
                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ flex: 2, fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, fontSize: 14, color: ComponentsStyles.COLORS.BLACK }}>{quantity}</Text>
                </View>
            </View>
        </TouchableOpacity>








    );
}
export default SparepartsItem1;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        margin: 2,
        elevation: 5,
    },
    checkbx: {
        tintColor: ComponentsStyles.COLORS.ICON_BLUE
    },


    inputTextStyle: {
        marginTop: 15,
        borderWidth: 1,
        paddingLeft: 0,
        marginLeft: 0,
        fontSize: 16,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        color: ComponentsStyles.COLORS.HEADER_BLACK,
        // borde: 1,
        borderColor: ComponentsStyles.COLORS.HEADER_BLACK,
        // borderStyle: "dashed",
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 0,
        height: 30
    },
});