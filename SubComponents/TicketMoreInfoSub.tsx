import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";
import ComStyles from "../Constant/Components.styles";
import MoreInfoListItem from "./MoreInfoListItem";

type ParamTypes = {
    headerText: string;
    data?: any;
}

const TicketMoreInfoSub = ({ headerText, data }: ParamTypes) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{headerText}</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                data={data}
                style={{ marginTop: 5, }}
                renderItem={({ item }) => {
                    return (
                        <MoreInfoListItem
                            title={item.title}
                            item={item.item} />
                    );
                }}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    );
}
export default TicketMoreInfoSub;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    headerText: {
        fontFamily: ComStyles.FONT_FAMILY.BOLD,
        color: ComStyles.COLORS.HEADER_BLACK,
        fontSize: 16,
        marginBottom: 10,
    }
});