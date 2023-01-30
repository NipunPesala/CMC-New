/**
* @author Gagana Lakruwan
*/
import { StyleSheet,Dimensions } from "react-native";
import ComponentsStyles from "../../../Constant/Components.styles";
import comStyles from "../../../Constant/Components.styles";
let width = Dimensions.get("screen").width;
export default StyleSheet.create({

    callText: {
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.HEADER_BLACK,
        fontSize: 16
    },
    modalCont: {
        flex: 1,
        flexGrow: 1,
        width: width,
        paddingHorizontal: 10,

    },

    seeAllText: {
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.ICON_BLUE,
        fontSize: 16
    },
    defaultbutton: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderWidth: 1,
        borderColor: comStyles.COLORS.WHITE,
        justifyContent: 'center',
        borderRadius: 5,
        flex: 0.5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        shadowColor: "#000",
        marginRight: 5

    },
    defaultBUTTON_TEXT: {
        color: comStyles.COLORS.REQUEST_DETAILS_ASH,
        textAlign:"left"
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 10

    },
    defaultbuttonwidthChange: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderWidth: 1,
        borderColor: comStyles.COLORS.WHITE,
        borderRadius: 5,
        flex: 1,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        shadowColor: "#000",
        marginRight: 5

    },
    homebuttonStyle:{
        justifyContent:'flex-start',height:30
    },
    bottomActionBtn:{
            backgroundColor:ComponentsStyles.COLORS.RED_COLOR,
            height:50,
    },




})
