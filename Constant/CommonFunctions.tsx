import moment from "moment";
import { BackHandler } from "react-native";

 export const getCurrentTime = callback => {

    console.log(".............................  " + moment().utcOffset('+05:30').format(' hh:mm:ss a') + "...................................")

    return moment().utcOffset('+05:30').format(' hh:mm:ss a');

}

export const getCurrentDate = (callback:any) => {

  console.log(".............................  " + moment().format('MMMM Do YYYY') + "...................................")

  let datec = moment().format('MMMM Do YYYY');

  return datec;

}

export const BackPressHandler = callback => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      callback();
      return true;
    });
}


