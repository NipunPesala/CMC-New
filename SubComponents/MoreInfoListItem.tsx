import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import ComponentsStyles from "../Constant/Components.styles";

type ParamTypes = {
    title: string;
    item?: string;
}

const MoreInfoListItem = ({ title, item }: ParamTypes) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.titleText}>{item}</Text>
        </View>
    );
}
export default MoreInfoListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor:'white',
        padding:10,
        marginTop: 5,
        borderRadius:10,
        marginLeft: 3,
        marginRight: 3,
    },
    titleText: {
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 14,
        color: ComponentsStyles.COLORS.SERVISE_HEADER_ASH,
        flex: 1
    }
});