/**
* @author Gagana Lakruwan
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import IconMC from 'react-native-vector-icons/AntDesign';
import ComponentsStyles from "../Constant/Components.styles";

type ParamTypes = {
    leftarrow: string;
    rightarrow: string;
    isIcon?: boolean;
    isBtn?: boolean;
    image?: any;
    iconOnPress?: Function;
    iconOnPressL?: Function;
    iconOnPressR?: Function;
    btnOnPress?: Function;
    customestyle?: any;
}

const LeftRightArrowbarComponent = ({ leftarrow, rightarrow,customestyle, image, isBtn, iconOnPress, btnOnPress ,iconOnPressL,iconOnPressR}: ParamTypes) => {
    return (
        <View style={[styles.Container,customestyle]}>
            <View style={styles.subContainer1}>
                <IconMC name={leftarrow} size={22} color={ComponentsStyles.COLORS.ICON_BLUE} iconStyle={styles.ServiceTicketDetailsScreenIcon} onPress={iconOnPressL} />
            </View>
            <View style={styles.subContainer2}>
                <View style={styles.barcontainer}></View>
            </View>
            <View style={styles.subContainer1}>
                <IconMC name={rightarrow} size={22} color={ComponentsStyles.COLORS.ICON_BLUE} iconStyle={styles.ServiceTicketDetailsScreenIcon} onPress={iconOnPressR}/>
            </View>
        </View>
    );
}
export default LeftRightArrowbarComponent;


const styles = StyleSheet.create({
    ServiceTicketDetailsScreenIcon: {
        width: 50,
        height: 70,
    },
    Container:{
        height: 30, 
        flexDirection: 'row'
    },
    subContainer1:{
        flex: 0.6, alignItems: 'center', justifyContent: 'center'
    },
      subContainer2:{
        flex: 3, justifyContent: 'center', alignItems: 'center'
    },
    barcontainer:{
        height: 8, width: '70%', backgroundColor: ComponentsStyles.COLORS.PROCEED_ASH, borderRadius: 15 
    }

});