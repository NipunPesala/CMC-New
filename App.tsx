/**
 * @author Gagana Lakruwan
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RootNavigator from './Navigation/RootNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont().then();
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
MaterialIcons.loadFont().then();
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont().then();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont().then();
import Octicons from 'react-native-vector-icons/Octicons';
Octicons.loadFont().then();
import Entypo from 'react-native-vector-icons/Entypo';
Entypo.loadFont().then();
import EvilIcons from 'react-native-vector-icons/EvilIcons';
EvilIcons.loadFont().then();
import Fontisto from 'react-native-vector-icons/Fontisto';
Fontisto.loadFont().then();
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView, StatusBar} from 'react-native';
AntDesign.loadFont().then();

const componentName = () => {
  return <RootNavigator />;
};
export default componentName;

const styles = StyleSheet.create({
  container: {},
});
