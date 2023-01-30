/**
* @author Gagana Lakruwan
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import ComponentsStyles from "../Constant/Components.styles";
import ActionButton from "./ActionButton";

type ParamTypes = {
    reqNo: string;
    customer?: string;
    contactPerson?: string;
    contactNo?: string;
    location: string,
    status: string,
    btnTite: string,
    onPress: Function,
    enable: boolean,
    btnStyle: any,
    typeNo: string,
    isService: boolean,

}
const ServiceCustomerDetails = ({ reqNo, customer, contactPerson, contactNo, location, status, btnTite, onPress, enable, btnStyle, typeNo, isService }: ParamTypes) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.headerText}>{typeNo}  </Text>
                <Text style={styles.headerText}>{reqNo}</Text>
            </View>
            <View style={{ padding: 10 }} />
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Customer </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{customer}</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                {isService ?
                    <Text style={styles.bodyTextLeft}>Contact Person </Text>
                    :
                    <Text style={styles.bodyTextLeft}>Assign To</Text>
                }
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{contactPerson}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Contact No </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{contactNo}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Location </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{location}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Status </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{status}</Text>
            </View>
            {!enable ?
                <View style={styles.btnStyle}>
                    <ActionButton title={btnTite} onPress={onPress} disabled={enable} style={btnStyle} />
                </View>
                : <></>}
        </View>
    );
}
export default ServiceCustomerDetails;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        shadowColor: "#000",
        padding: 7,
        flexDirection: 'column',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        color: ComponentsStyles.COLORS.SERVISE_HEADER_ASH,
        fontFamily: ComponentsStyles.FONT_FAMILY.BOLD,
        fontSize: 16
    },
    bodyTextLeft: {
        color: ComponentsStyles.COLORS.SERVISE_HEADER_ASH,
        fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
        fontSize: 14,
        flex: 1
    },
    bodyTextRight: {
        color: ComponentsStyles.COLORS.SERVISE_HEADER_ASH,
        fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
        fontSize: 14,
        flex: 2
    },
    btnStyle: {
        //    position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    }
});