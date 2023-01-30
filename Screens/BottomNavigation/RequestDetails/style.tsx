/**
* @author Gagana Lakruwan
*/
import { StyleSheet } from "react-native";
import ComponentsStyles from "../../../Constant/Components.styles";
import ComStyles from "../../../Constant/Components.styles";

export default StyleSheet.create({

    activeBtn: {
        flex: 1,
        justifyContent: 'center'
    },
    deActiveBtn: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: ComStyles.COLORS.ICON_BLUE, justifyContent: 'center'
    },
    activeText: {
        fontSize: 10
    },
    deActiveText: {
        fontSize: 10,
        color: ComStyles.COLORS.SERVISE_HEADER_ASH,
    }

})