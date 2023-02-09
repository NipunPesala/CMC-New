/**
* @author Madushika Sewwandi
*/
import { Dimensions, StyleSheet } from "react-native";
import comStyles from "../../Constant/Components.styles";


let width = Dimensions.get("screen").width;
export default StyleSheet.create({
    ActionButton: {
        marginTop: 20,
        marginBottom: 10
    },

    box1: {
       flex: 0.5
    }, 
    box3: {
        //flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:200,
     }, 

    box2: {

        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5

    },

    loginBtn: {

        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: comStyles.COLORS.ICON_BLUE,
        marginBottom: 20
    },

    loginBtndesable: {

        backgroundColor: comStyles.COLORS.PROCEED_ASH,
        borderWidth: 1,
        borderColor: comStyles.COLORS.PROCEED_ASH,
        marginBottom: 20,
       
    },

    subtxt: {
        color: comStyles.COLORS.BLACK,
        fontSize: 15,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 10,
    },

    logo: {
       width: 60,
        height: 15, 
    },
    logoMain: {
        width: 320,
        height: 50, 
        paddingTop:50,
        //paddingBottom:50,
        marginTop:50,
    },
    footer: {
        fontSize: 10,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        color: comStyles.COLORS.WHITE,
        marginRight: 5
    },

    modalCloseBTN: {
        marginTop: 5,
        marginBottom: 0,
        padding: 15,
        width: 45,
        borderRadius: 30,
        backgroundColor: "#fff",
        zIndex: 4,
        alignSelf: 'center'
    },
    modalCont: {
        flex: 1,
        flexGrow: 1,
        width: width,
        paddingHorizontal: 10,

    },
    desable_BUTTON_TEXT: {
        fontSize: 16,
    },

    
})