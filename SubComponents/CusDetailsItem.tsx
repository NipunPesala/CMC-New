import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import ComponentsStyles from "../Constant/Components.styles";

type ParamTypes = {
    title?: string;
    Value?: any;

}


const CusDetailsItem = ({ title, Value }: ParamTypes) => {

    return (
        <View style={styles.container}>

            <Text style={{ flex: 1, fontFamily: ComponentsStyles.FONT_FAMILY.BOLD, fontSize: 12, color: ComponentsStyles.COLORS.BLACK }}>{title}</Text>
            <Text style={{ flex: 1, fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR, fontSize: 10, color: ComponentsStyles.COLORS.PROCEED_ASH }}>{Value}</Text>

        </View>
    );

}

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
        elevation: 2,
    },

});


export default CusDetailsItem;