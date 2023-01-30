/**
* @author Madushika Sewwandi
*/
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView
} from "react-native";
import ActionButton from "../../Components/ActionButton";
import Header from "../../Components/Header";
import KPIComponent from "../../Components/KPIComponent";
import ReportsComponent from "../../Components/ReportsComponent";
import comStyles from "../../Constant/Components.styles";
import style from "./ReportStyle";
import { useNavigation } from "@react-navigation/native";

const ReportsScreen = () => {
    const navigation = useNavigation();

    const [kpi, setKpi] = useState(false);
    const [reports, setReports] = useState(false);

    const KpiPressed = () => {
        setKpi(true);
        setReports(false);
    }

    const ReportsPressed = () => {
        setKpi(false);
        setReports(true);
    }

    useEffect(() => {
        setKpi(true);
        setReports(false);
    }, [])

    return (

        <SafeAreaView style={comStyles.CONTAINER}>

            <Header isBtn={true} title="Reports" btnOnPress={() => navigation.goBack()} />

            <View style={comStyles.CONTENT}>

                <View style={style.container}>
                    <ActionButton
                        title="KPI"
                        onPress={KpiPressed}
                        style={kpi === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={kpi === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />

                    <ActionButton
                        title="Reports"
                        onPress={ReportsPressed}
                        style={reports === true ? style.selectedbutton : style.defaultbutton}
                        textStyle={reports === true ? style.selectedBUTTON_TEXT : style.defaultBUTTON_TEXT}
                    />
                </View>

                <View style={{ marginBottom: 140 }}>
                    <ScrollView>

                        {kpi ?
                            <KPIComponent />
                            : <></>
                        }

                        {reports ?
                            <ReportsComponent />
                            : <></>
                        }

                    </ScrollView>
                </View>



            </View>


        </SafeAreaView >

    );

}
export default ReportsScreen;