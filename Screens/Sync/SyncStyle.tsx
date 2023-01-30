import { Dimensions, StyleSheet } from "react-native";
import comStyles from "../../Constant/Components.styles";

export default StyleSheet.create({


    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    selectedbutton: {
        backgroundColor: comStyles.COLORS.ICON_BLUE,
        flex: 0.5,
        borderRadius: 5,
    },
    selectedBUTTON_TEXT: {
        color: comStyles.COLORS.WHITE,
    },
    defaultbutton: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        justifyContent: 'center',
        borderRadius: 5,
        flex: 0.5
    },
    defaultBUTTON_TEXT: {
        color: comStyles.COLORS.REQUEST_DETAILS_ASH,
    },
    HraderStyle: {
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        flex: 1,
        fontSize: 12,
        alignSelf: 'center'
    }



});
