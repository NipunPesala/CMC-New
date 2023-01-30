import { Dimensions, StyleSheet } from "react-native";

let width = Dimensions.get("screen").width;

export default StyleSheet.create({

    modalCont: {
        flex: 1,
        flexGrow: 1,
        width: width,
        paddingHorizontal: 10,

    },
    
});