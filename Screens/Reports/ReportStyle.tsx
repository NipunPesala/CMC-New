import { Dimensions, StyleSheet } from "react-native";
import ComponentsStyles from "../../Constant/Components.styles";
import comStyles from "../../Constant/Components.styles";

let width = Dimensions.get("screen").width;

export default StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },

    selectedbutton: {
        backgroundColor: comStyles.COLORS.ICON_BLUE,
        flex: 0.5,
        height:50,
        justifyContent: 'center',
        borderRadius: 5,
    },
    selectedbutton1: {
        backgroundColor: comStyles.COLORS.ICON_BLUE,
        flex: 0.5,
        height: 50,
        justifyContent: 'center',
        borderRadius: 5,
        fontSize:0.5,
    },
    selectedBUTTON_TEXT: {
        color: comStyles.COLORS.WHITE,
        fontSize:13,
        padding:5,
    },
    defaultbutton: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        justifyContent: 'center',
        borderRadius: 5,
        flex: 0.5,
        height: 50,
    },
    defaultbutton1: {
        backgroundColor: comStyles.COLORS.WHITE,
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        justifyContent: 'center',
        borderRadius: 5,
        flex: 0.5,
        height: 50,
    },
    defaultBUTTON_TEXT: {
        color: comStyles.COLORS.REQUEST_DETAILS_ASH,
        fontSize:13,
        padding:5,

    },
    
    ServiceTicketDetailsScreenIcon: {
        width: 50,
        height: 70,
    },
    customStyletableHeader: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },

    openstyle: {
        backgroundColor: '#7DCEA0',
        borderRadius: 10,
        width:85,
        justifyContent:"center",
        textAlign: 'center',
        paddingLeft:0,

    },
    Completestyle: {
        backgroundColor: '#1E8449',
        borderRadius: 10,
        justifyContent:"center",
        paddingLeft:8,
        paddingRight:8,
    
    },
    pendingstyle: {
        backgroundColor: '#e2a25d',
        borderRadius: 10,
    },
     holdstyle: {
        backgroundColor: '#5DADE2',
        borderRadius: 10,
    },
    textStyle:{
        color:'#FFFF',
        fontFamily:ComponentsStyles.FONT_FAMILY.BOLD
    },
    modalCont: {
        flex: 1,
        flexGrow: 1,
        width: width,
        paddingHorizontal: 10,

    },
});