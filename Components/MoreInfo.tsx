
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getCurrentServiceCallID } from "../Constant/AsynStorageFuntion";

import { getServiceById } from "../SQLiteDatabaseAction/DBControllers/ServiceController";
import MoreInfoComponet from "./MoreInfoComponet";


const MoreInfo = () => {

    const [itemCode, setItemCode] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemGroup, setitemGroup] = useState('');
    const [serial_no, setSerial_no] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [content_str, setcontent] = useState('');
    const [create_by, setcreate_by] = useState('');
    const [remark, setremark] = useState('');
    let serviceID;

    useEffect(() => {
        getCurrentServiceCallID().then(res => {
            serviceID = res;
            getServiceData(res);

            console.log(" more info  ........  " , serviceID);

        })

    }, [])

    const getServiceData = (serviceID: any) => {
        console.log(serviceID, "  ,,,,,MoreInfo,,,,,,,,,,,,,,,,,,,  ");
        try {

            getServiceById(serviceID, (result: any) => {

                // [{"Approve_status": "1", "Attend_status": "1", "_Id": 1, "assistance": "1",
                //  "contact_name": "444", "contact_no": 769968772,
                //   "created_by": "1", "customer": "Sanmik Food", 
                //   "customer_address": "1/D Nalapaha", "end_date": "14-11-2022", 
                //   "handle_by": "2", "item_code": "SHINI/BH90115000050",
                //    "item_description": "EGO ASSEMBLE (FOR SCD-400U CLAIM)",
                //     "priority": "Medium", "secretary": "1", "serviceId": "SC_2022-11-14_1",
                //      "service_type": "1", "start_date": "14-11-2022", "status": "0", "subject": "car"}]
                 console.log(result , "   ------------------------  ");

                setcontent(result[0].subject);
                setStartDate(result[0].start_date);
                setEndDate(result[0].end_date);
                setremark(result[0].contact_name);
                setcreate_by("-");


                setItemCode(result[0].item_code);
                setItemDescription(result[0].item_description);
                setitemGroup("-");
                setSerial_no("-")



            });

        } catch (error) {
            console.log(" service data MoreInfo ,,,,,,,,  ", error);

        }

    }




    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <View style={styles.CONTENT}>
                    <View style={{ padding: 10 }} />

                    <MoreInfoComponet
                        content={content_str}
                        st_date={startDate}
                        et_date={endDate}
                        create_by={create_by}
                        remark={remark}
                        item_code={itemCode}
                        item_description={itemDescription}
                        item_group={itemGroup}
                        serial_no={serial_no}



                    />

                    <View style={{padding:40}}></View>
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}
export default MoreInfo;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    CONTENT: {
        marginBottom: 0,
        marginLeft: 13,
        marginRight: 13,
        flex: 1,
    },
});
