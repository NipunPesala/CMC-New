import React, { useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import ActionButton from "./ActionButton";
import comStyles from "../Constant/Components.styles";
import IconA from 'react-native-vector-icons/Ionicons';
import InputText from "./InputText";
import ImagePicker from 'react-native-image-crop-picker';
import getCurrentTime from "../Constant/CommonFunctions";
import moment from "moment";

type CustomPropTypes = {
    placeholder?: string;
    style?: any;
    textstyle?: any;
    placeholderColor?: string;
    onpress?: Function;
    icon_name?: string;
    mValue: string;
}
// requestPermission();
const ModalComponent = ({ onpress,mValue }: CustomPropTypes) => {


    const [image, setImage] = useState();
    const [meterValue, setMeterValue] = useState('');
    const [time, getTime] = useState();
    const [imgStatus, setImgStatus] = useState(0);

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
        }).then(image => {

            console.log(image.path);
            setImage(image.path);

        }).catch((error) => {

            Alert.alert(
                "Warning...!",
                "Permission Denied...Please get Permission from manually in setting",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {

                        }
                    }
                ]
            );
        });
    }

    const getMeterValues = (text:any) =>{

        mValue = text;
        
    }


    const getStared = () => {
        const sendData = [
            {
               
            }
        ]

        // if (TicketID != null) {
        //     if (expencesTypeId != null) {
        //         if (amount != null) {
        //           console.log('Hiii');
        //     } else {
        //         ToastAndroid.show("Please Select Expences Type..!  ", ToastAndroid.SHORT);
        //     }
        // } else {
        //     ToastAndroid.show("Please Check Service ID..!  ", ToastAndroid.SHORT);
        // }



    }

    return (
        <View style={style.modalMainContainer}>

            <View style={style.modalSubContainer}>
                <IconA name='location-outline' size={20} />
                <Text style={style.modalRegularTitle}>Location: </Text>
                <Text style={style.modalTitle}>Colombo 05</Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 10 }}>
                <IconA name='time-outline' size={20} />
                <Text style={style.modalRegularTitle}>Time: </Text>
                <Text style={style.modalTitle}>{moment().utcOffset('+05:30').format(' hh:mm a')}</Text>
            </View>

            <View style={style.modalMainContainer}>
                <Text style={{ fontFamily: comStyles.FONT_FAMILY.BOLD, color: comStyles.COLORS.HEADER_BLACK, fontSize: 15, marginTop: 10 }}>Add the meter you are starting from</Text>
            </View>
            <InputText 
            style={style.inputTextStyle} 
            placeholder="125KM"
            stateValue={meterValue}
            keyType={'number-pad'}
            setState={
                (meterValue) => {setMeterValue(meterValue);
                getMeterValues(meterValue);
                
                }}
    
            />
            <Text style={style.subtxt}>OR</Text>

            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
                <Text style={style.modalTitle}>Update the photo of the meter</Text>
                <Text style={style.modalTitle}>time you are starting from</Text>
            </View>

            <View style={style.txtUpload}>
                {
                    image ?

                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontFamily: comStyles.FONT_FAMILY.BOLD, color: comStyles.COLORS.ORANGE, fontSize: 18, marginRight: 5 }}>Image Uploaded</Text>
                            <IconA name='ios-checkmark-circle' size={20} color={comStyles.COLORS.LOW_BUTTON_GREEN} style={{ marginRight: 5 }} />
                        </View>
                        :
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", }} onPress={() => openCamera()}>
                            <IconA name='cloud-upload' size={20} color={comStyles.COLORS.ICON_BLUE} style={{ marginRight: 5 }} />
                            <Text style={{ fontFamily: comStyles.FONT_FAMILY.BOLD, color: comStyles.COLORS.ICON_BLUE, fontSize: 18, marginRight: 5 }}>Photo of Meter*</Text>
                        </TouchableOpacity>
                }
            </View>

            <ActionButton 
            title="Let's Get Start" 
            style={style.ActionButton} 
            onPress={onpress}
            />

        </View>
    );

}

export default ModalComponent;


const style = StyleSheet.create({

    modalMainContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    modalSubContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 5

    },

    modalRegularTitle: {
        fontFamily: comStyles.FONT_FAMILY.REGULAR,
        color: comStyles.COLORS.HEADER_BLACK,
        fontSize: 15,
        marginRight: 5
    },

    modalTitle: {

        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.HEADER_BLACK,
        fontSize: 15

    },
    txtUpload: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderStyle: "dashed",
        width: '100%',
        marginTop: 25,

    },
    subtxt: {
        color: comStyles.COLORS.BLACK,
        fontSize: 13,
        fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
        marginBottom: 10
    },
    ActionButton: {
        marginTop: 20,
        marginBottom: 10
    },

    inputTextStyle: {
        borderWidth: 0,
        paddingLeft: 0,
        marginLeft: 0,
        width: '100%',
        fontSize: 20,
        fontFamily: comStyles.FONT_FAMILY.BOLD,
        color: comStyles.COLORS.HEADER_BLACK,
        borderBottomWidth: 0.5,
        borderColor: comStyles.COLORS.HEADER_BLACK,
        borderStyle: "dashed",
        textAlign: "center",
        margin: 5,
        borderRadius: 0,
    }
});


