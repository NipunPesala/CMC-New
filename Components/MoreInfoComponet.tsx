import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import ComponentsStyles from "../Constant/Components.styles";
import ActionButton from "./ActionButton";

type ParamTypes = {
    content: string;
    st_date: any,
    et_date: any,
    create_by?: string;
    remark?: string;
    item_code?: string;
    serial_no: string,
    item_description: string,
    item_group: string,
}

const MoreInfoComponet =({content,st_date,et_date,create_by,remark,item_code,item_description,serial_no,item_group}: ParamTypes) => {
    return (
<View style={styles.container}>

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.headerText}>Service Call Details  </Text>
                
            </View>

         <View style={{ padding: 10 }} />
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Subject </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{content}</Text>
            </View>


            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Planned To Start </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{st_date}</Text>
            </View>



            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Planned To End </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{et_date}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Created By</Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{create_by}</Text>
            </View>


            
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Contact Name </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{remark}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
              
            <Text style={{}}>   </Text>
            </View>


            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.headerText}>Equipment Card Details  </Text>
                
            </View>

          

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Item Code </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{item_code}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>MFR.Serial No </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{serial_no}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Item Description </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{item_description}</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.bodyTextLeft}>Item Group </Text>
                <Text style={{}}> :  </Text>
                <Text style={styles.bodyTextRight}>{item_group}</Text>
            </View>

</View>
        );
    }
    export default MoreInfoComponet;


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
        flex: 2
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