import moment from "moment";
import { Alert, BackHandler } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-community/async-storage";
import SQLite from 'react-native-sqlite-storage';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getLoginPassword, getLoginUserName } from "./AsynStorageFuntion";

const [isDeleted, setIsDeleted] = useState(false);
const navigation = useNavigation();

export const getCurrentTime = (callback: any) => {

  console.log(".............................  " + moment().utcOffset('+05:30').format(' hh:mm:ss a') + "...................................")

  return moment().utcOffset('+05:30').format(' hh:mm:ss a');

}

export const getCurrentDate = (callback: any) => {

  console.log(".............................  " + moment().format('MMMM Do YYYY') + "...................................")

  let datec = moment().format('MMMM Do YYYY');

  return datec;

}

export const BackPressHandler = (callback: any) => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback();
    return true;
  });
}

export const isNetworkAvailable = (callBack: any) => {

  var isConnect: any;
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    console.log("Is connected?", state.isInternetReachable);

    isConnect = state.isInternetReachable;
  });

  callBack(isConnect);

}

export const getLoginDetails = (callBack: any) => {

  var uname:any;
  var pw:any;

  getLoginUserName().then(async res => {

    uname = res;

  });
  getLoginPassword().then(async resp => {

    pw = resp;

  });


  callBack(uname,pw);


}




