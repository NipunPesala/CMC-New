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

type ParamTypes = {
    id: any;
    description?: string;
    quantity?: any;
    is_checkbox?: boolean;
    is_editinput?: boolean;
    is_additional?: boolean;
    qty_value?: any;
    setStateQuantity?: any;
    stateValue?: any;
}

const SparepartsItem = ({ id, description, quantity, is_checkbox, is_editinput, stateValue, setStateQuantity, is_additional }: ParamTypes) => {

    const [selectcbx, setSelect] = useState(false);


    return (

        <View style={styles.container}>

            {is_additional ?

                <View style={{ flex: 1, }}>
                    <Text style={{ fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, fontSize: 14, color: ComponentsStyles.COLORS.BLACK }}>{id}</Text>
                </View>

                :
                <></>

            }

            <View style={{ flex: 2 }}>
                <Text style={{ fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, fontSize: 14, color: ComponentsStyles.COLORS.BLACK }}>{description}</Text>
            </View>
            <View style={{ flex: 1, }}>
                <Text style={{ fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, fontSize: 14, marginLeft: 10, color: ComponentsStyles.COLORS.BLACK }}>{quantity}</Text>

            </View>


        </View>

    );
}
export default SparepartsItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
        elevation: 2,
    },
    checkbx: {
        tintColor: ComponentsStyles.COLORS.ICON_BLUE
    },


    inputTextStyle: {
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
        margin: 5,
        borderRadius: 0,
        height: 30
    },
});