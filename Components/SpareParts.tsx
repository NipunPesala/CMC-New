/**
* @author Gagana Lakruwan
*/
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
} from "react-native";
import AsyncStorageConstants from "../Constant/AsyncStorageConstants";
import ComStyles from "../Constant/Components.styles";
import { spareparts } from "../Constant/DummyData";
import { getSparePartsAllData } from "../SQLiteDatabaseAction/DBControllers/SparePartsController";
import { getALLTicketById } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import SparepartsItem from "../SubComponents/SparepartsItem";
import ActionButton from "./ActionButton";


type ParamTypes = {
    onPress?: Function;
    sparePartList?: [];
    isActive?: boolean;
}



const SpareParts = (sparePartList: any, isActive: boolean,ticketID:any) => {

    const navigation = useNavigation();

    const [callDetailList, setCallDetailList] = useState(sparePartList);


    const checkStatus = () => {

        console.log(" ticket is ..........   " , callDetailList.ticketID);
        

        getALLTicketById(callDetailList.ticketID, (result:any)  => {

            // console.log("db result " ,  result[0].attend_status);
            
         
            if( result[0].attend_status == '1'){

                // console.log("awaaaaaaaaaaa");
                

                AsyncStorage.setItem(AsyncStorageConstants.SELECT_TICKET, 'false');
                navigation.navigate("RequestBottomSheet");

            }else{

                Alert.alert(
                    "Failed...!",
                    "Please start ticket..",
                    [
                        {
                            text: "OK", onPress: () => {
    
                            }
                        }
                    ]
                );


            }

        });

    }


    const checkActive = () => {

        console.log(" spare parts ticket status <<<<<<<<<<<<<<<<<   " , callDetailList.isActive);
        

        if(callDetailList.isActive){

            console.log(" check status");
            

            checkStatus();

           
        }else{
         

          
            AsyncStorage.setItem(AsyncStorageConstants.SELECT_TICKET, 'false');
            navigation.navigate("RequestBottomSheet");


        }
        
    }



    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', backgroundColor: ComStyles.COLORS.TICKET_HEADER_ASH, justifyContent: 'center', alignItems: 'center', padding: 5, marginTop: 5, }}>
                <Text style={{ flex: 1 }}>ID</Text>
                <Text style={{ flex: 2 }}>Description</Text>
                <Text style={{ flex: 1 }}>Qty</Text>
            </View>

            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={callDetailList.sparePartList}
                style={{ marginTop: 5, marginBottom: 100, }}
                renderItem={({ item }) => {
                    return (
                        <SparepartsItem
                            is_additional={true}
                            id={item.SparePartNo}
                            description={item.description}
                            quantity={item.stock_qty}
                        />
                    );
                }}
                keyExtractor={item => `${item.spId}`}
            />

            <View style={{ position: 'absolute', width: '100%', bottom: 70, }}>

                <ActionButton
                    title="Request Spare Parts"
                    is_icon={true}
                    icon_name="diff-added"
                    onPress={() =>checkActive()}
                    iconColor={ComStyles.COLORS.WHITE}
                    
                />

            </View>
        </View>
    );
}
export default SpareParts;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
    },

});