import { Dimensions, StyleSheet } from "react-native";
import ComponentsStyles from "../../Constant/Components.styles";
import comStyles from "../../Constant/Components.styles";

let width = Dimensions.get("screen").width;

export default StyleSheet.create({

    maincontainer: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
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
    detaislContainer: {
        flexDirection:'row',
        height:90,

    },
    detaislContainer1: {
        flexDirection:'row',
        height:50,

    },
    AttendanceDetails: {
        fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize:14,
        color:ComponentsStyles.COLORS.BLACK,

    },
    AttendanceDetailspress: {
        fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize:14,
        color:ComponentsStyles.COLORS.Accent_900,

    },
    detaislsubContainer: {
        flex:1,
        borderRadius:5,
        height:82,
        elevation:5,
        alignItems:'center',
        margin:5,
        backgroundColor:ComponentsStyles.COLORS.WHITE,

    },
    detaisSubText: {
       fontSize:10,
       marginTop:10,
       alignItems:'center',
       fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,

    },
    detaisMainText: {
       fontSize:34,
       marginTop:5,
       color:ComponentsStyles.COLORS.Accent_900,
       alignItems:'center',
       fontFamily:ComponentsStyles.FONT_FAMILY.SEMI_BOLD,

    },
    bottomViewleft1:{
        borderWidth:1,
        borderColor:ComponentsStyles.COLORS.BLACK,
        width:'100%',
        marginTop:10,
        marginLeft:10
    },
    bottomViewleft2:{
        borderWidth:1,
        borderColor:ComponentsStyles.COLORS.Accent_900,
        width:'100%',
        marginTop:10,
        marginLeft:10
    },
    bottomViewright1:{
        borderWidth:1,
        borderColor:ComponentsStyles.COLORS.BLACK,
        width:'100%',
        marginTop:10,
        marginLeft:10
    },
    bottomViewright2:{
        borderWidth:1,
        borderColor:ComponentsStyles.COLORS.Accent_900,
        width:'100%',
        marginTop:10,
        marginLeft:10
    },
    arrowbar:{
        marginTop:5,
        marginBottom:10,
    }

});