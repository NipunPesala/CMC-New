/**
* @author Gagana Lakruwan
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import ActionButton from "./ActionButton";

type ParamTypes = {

    btnTitle: string;
    isIcon?: boolean;
    isBtn?: boolean;
    btnStyle?: any;
    txtStyle?: any;

    pressbtn?: Function;
}


const Locations = ({ pressbtn, btnTitle, btnStyle, txtStyle }: ParamTypes) => {
    return (

        <View style={styles.container}>
            <ActionButton title={btnTitle}
                style={btnStyle}
                textStyle={txtStyle}
                onPress={pressbtn} />
        </View>
    );
}
export default Locations;


const styles = StyleSheet.create({
    container: {
      padding:30
        
    }
});