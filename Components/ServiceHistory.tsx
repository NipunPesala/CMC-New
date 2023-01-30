/**
* @author Gagana Lakruwan
*/
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList
} from "react-native";
import { getCurrentServiceCallID } from "../Constant/AsynStorageFuntion";
import { getCompelteTicketByServiceId, getTicketByServiceId } from "../SQLiteDatabaseAction/DBControllers/TicketController";
import ListBox from "./ListBox";


const ServiceHistory = () => {

    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    const navigation = useNavigation();

    let serviceID;

    const [ticketList,setTicketList]:any[] = useState([]);
    

    useEffect(() => {

      //  console.log(" ServiceHistory ........... ");

        getCurrentServiceCallID().then(res => {
            

            serviceID = res;
            getTicketList(serviceID);
            
        })

    }, [])
    

    const getTicketList = (id:any) => {

        getCompelteTicketByServiceId(id,(result:any) => {

            const ticketArray: any[] = [];

            for (let i = 0; i < result.length; ++i) {

                
                        // [{"_Id": 2, "assignTo": "Gayan", "attend_status": "3",
                        //  "content": "complte", "cusNic": "888888888888",
                        //   "cusRemark": "complete", "endDate": "25-11-2022",
                        //    "engRemark": "complte", "itemDescription": "comp",
                        //     "priority": "Medium", "serviceId": "SC_2022-11-14_1", 
                        //     "signatureStatus": "1", "startDate": "15-11-2022", "status": "0", 
                        //     "ticketId": "SCT_2022-11-15_2"}]

                ticketArray.push(
                    {
                        id: result[i].ticketId,
                        cusName: result[i].content,
                        address: result[i].itemDescription,
                        status: result[i].priority,
                        date :result[i].startDate,
                       

                    }
                );

            }

            setTicketList(ticketArray);

           // console.log("***** " , ticketList)

            
        });


    }

        return (
            <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={ticketList}
                style={{ marginTop: 10, marginBottom: 75, }}
                renderItem={({ item }) => {
                    return (


                        <View style={{ padding: 5, }}>
                            <ListBox
                                ticketNo={item.id.toString()}
                                name={"Ticket Content: "+item.cusName}
                                ticketStatus={"Status: Completed"}
                                isbtn={false}
                                nameAddress={true}
                                enableStatus={false}
                                date={"Date:"+item.date}
                                headerType="Ticket No  :"
                                ticketError={item.error}
                                
                            />
                        </View>
                    );
                }}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    );
}
export default ServiceHistory;



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
});

