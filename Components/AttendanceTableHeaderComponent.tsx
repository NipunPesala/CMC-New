/**
 * @author Gagana Lakruwan
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import IconA from 'react-native-vector-icons/Ionicons';
import ComponentsStyles from '../Constant/Components.styles';

type ParamTypes = {
  Headertitle1: any;
  isHeadertitle1: boolean;
  Headertitle2: string;
  isHeadertitle2: boolean;
  Headertitle3: string;
  isHeadertitle3: boolean;
  Headertitle4: string;
  isHeadertitle4: boolean;
  Headertitle5: string;
  isHeadertitle5: boolean;
  Headertitle6: string;
  isHeadertitle6: boolean;
  iconOnPress?: Function;
  btnOnPress?: Function;
  batchStyle?:any;
  txtstyle?:any;
  batchLabelStyle?:any;
};

const AttendanceTableDetailsComponent = ({
  Headertitle1,
  Headertitle2,
  Headertitle3,
  Headertitle4,
  Headertitle5,
  Headertitle6,
  isHeadertitle1,
  isHeadertitle2,
  isHeadertitle3,
  isHeadertitle4,
  isHeadertitle5,
  isHeadertitle6,
  iconOnPress,
  btnOnPress,
  batchStyle,
  txtstyle,
  batchLabelStyle
}: ParamTypes) => {
  return (
    <View style={styles.container}>
        {isHeadertitle1 ? (
          <View style={styles.headersubContainer}>
            <Text style={styles.textStyle}>{Headertitle1}</Text>
          </View>
        ) : null}
        {isHeadertitle2 ? (
          <View style={styles.headersubContainer}>
            <Text style={styles.textStyle}>{Headertitle2}</Text>
          </View>
        ) : null}
        {isHeadertitle3 ? (
          <View style={[styles.headersubContainer,batchStyle]}>
            <Text style={[styles.textStyle,txtstyle]}>{Headertitle3}</Text>
          </View>
        ) : null}
        {isHeadertitle4 ? (
          <View style={styles.headersubContainer}>
            <Text style={styles.textStyle}>{Headertitle4}</Text>
          </View>
        ) : null}
        {isHeadertitle5 ? (
          <View style={styles.headersubContainer}>
            <Text style={styles.textStyle}>{Headertitle5}</Text>
          </View>
        ) : null}
        {isHeadertitle6 ? (
          <View style={styles.headersubContainer,batchLabelStyle}>
            <Text style={styles.textStyle}>{Headertitle6}</Text>
          </View>
        ) : null}
    </View>
  );
};
export default AttendanceTableDetailsComponent;

const styles = StyleSheet.create({
  container: {
    height: 35,
    margin:5,
    flexDirection: 'row',
  },
  iconStye: {
    color: 'white',
  },
  textStyle: {
    fontSize: 12,
    fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
  },
  headersubContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headersubContainer1: {
    flex: 1,
    backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10
  },
});
