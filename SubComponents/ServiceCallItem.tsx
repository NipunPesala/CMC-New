/**
* @author Madushika Sewwandi
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import ComponentsStyles from "../Constant/Components.styles";
import IconA from 'react-native-vector-icons/Ionicons';

type ParamTypes = {
    id: any;
    description?: any;
    quantity?: any;
    is_icon?: boolean;
    iconPress?: Function;
}

const ServiceCallItem = ({ id, description, quantity, is_icon,iconPress }: ParamTypes) => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={{ flex: 0, display: "none" }}>{id}</Text>
                <Text style={{ flex: 1, textAlign: "left" }}>{description}</Text>
                <Text style={{ flex: 2, textAlign: "left" }}>{quantity}</Text>
                {is_icon ?
                    <TouchableOpacity onPress={() => {
                        if (iconPress) iconPress()
                    }}>
                        <IconA
                            name="close-circle"
                            size={20}
                            color={ComponentsStyles.COLORS.ICON_BLUE} />
                    </TouchableOpacity>

                    : <></>
                }
            </View>
        </View>
    );
}
export default ServiceCallItem;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        textAlign: "center",
    }
});