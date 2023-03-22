import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ScrollView
} from "react-native";
import { getCurrentServiceCallID } from "../Constant/AsynStorageFuntion";
import ComStyles from "../Constant/Components.styles";
import { moreInfoTicket } from "../Constant/DummyData";
import { getALLTicketById, getTicketById } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import TicketMoreInfoSub from "../SubComponents/TicketMoreInfoSub";
import MoreInfoComponet from "./MoreInfoComponet";


const TicketMoreInfo = (ticketID: any) => {

    const [itemCode, setItemCode] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemGroup, setitemGroup] = useState('');
    const [serial_no, setSerial_no] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [content_str, setcontent] = useState('');
    const [create_by, setcreate_by] = useState('');
    const [remark, setremark] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [subject, setSubject] = useState('');


    useEffect(() => {

        getALLTicketById(ticketID.ID, (result: any) => {

            console.log(" {}{}{}{}{} ==========  ", result);

            setcontent(result[0].subject);
            setStartDate(result[0].startDate);
            setEndDate(result[0].endDate);
            setremark(result[0].contact_name);
            setcreate_by(result[0].created_by);


            setItemCode(result[0].itemCode);
            setItemDescription(result[0].itemDescription);
            setitemGroup("-");
            // setSerial_no(result[0].serialNumber);


        });

        getTicketById(ticketID.ID, (res: any) => {

            console.log(" >>>>>>>>>>>>>> {}{}{}{}{} ==========  ", res);

            setContactNo(res[0].contact_no);
            setContactPerson(res[0].contact_name);
            setSubject(res[0].subject);

        });


    }, []);



    return (
        // <View style={styles.container}>

        //     <FlatList
        //         showsHorizontalScrollIndicator={false}
        //         // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
        //         data={serviceCallDEtails}
        //         style={{ marginTop: 5, marginBottom: 70, }}
        //         renderItem={({ item }) => {
        //             return (
        //                 <TicketMoreInfoSub
        //                     headerText={item.header}
        //                     data={item.data} />
        //             );
        //         }}
        //         keyExtractor={item => `${item.id}`}
        //     />
        // </View>

        <SafeAreaView style={styles.container}>
            <ScrollView >
                <View style={styles.CONTENT}>
                    <View style={{ padding: 10 }} />

                    <MoreInfoComponet
                        title="Service Ticket Details"
                        content={subject}
                        st_date={startDate}
                        et_date={endDate}
                        create_by={create_by}
                        remark={contactPerson}
                        item_code={contactPerson}
                        item_description={itemDescription}
                        item_group={itemGroup}
                        serial_no={""}
                         isShowEquipment={false}


                    />

                    <View style={{ padding: 40 }}></View>
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}
export default TicketMoreInfo;


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