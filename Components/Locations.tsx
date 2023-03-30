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
    btnTitle1: string;
    isIcon?: boolean;
    isBtn?: boolean;
    btnStyle?: any;
    btnStyle1?: any;
    txtStyle?: any;
    txtStyle1?: any;

    pressbtn?: Function;
    pressbtn1?: Function;
}


const Locations = ({ pressbtn, btnTitle, btnStyle, txtStyle, pressbtn1, btnTitle1, btnStyle1, txtStyle1 }: ParamTypes) => {
    return (

        <View style={styles.container}>

            <View style={{ padding: 10 }} />

            <ActionButton title={btnTitle1}
                style={btnStyle1}
                textStyle={txtStyle1}
                onPress={pressbtn1} />

            <View style={{ padding: 10 }} />

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
        padding: 30

    }
});