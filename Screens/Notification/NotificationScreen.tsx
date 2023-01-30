/**
* @author Madushika Sewwandi
*/
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList
} from "react-native";
import comStyles from "../../Constant/Components.styles";
import Header from "../../Components/Header";
import { useNavigation } from "@react-navigation/native";
import { Notification } from "../../Constant/DummyData";
import ListBox from "../../Components/ListBox";



const NotificationScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={comStyles.CONTAINER}>
            <Header isBtn={true} title="Notifications" btnOnPress={() => navigation.goBack()} />
            <View style={comStyles.CONTENT}>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={Notification}
                    style={{ marginTop: 10, marginBottom: 65, }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ padding: 5, marginBottom: 5 }}>
                                <ListBox
                                    headerType={item.title}
                                    date={item.dateTime}
                                    isanyIcon={true}
                                    anyIconName="close-circle"
                                />
                            </View>
                        );
                    }}
                    keyExtractor={item => `${item.id}`}
                />

            </View>

        </SafeAreaView>

    );
}
export default NotificationScreen;

