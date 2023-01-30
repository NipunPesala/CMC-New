import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    FlatList,
    Dimensions,
    Animated,
    Keyboard,
    StyleSheet,
    Platform,
    Alert,
} from 'react-native';
import ActionButton from '../../Components/ActionButton';
import ComStyles from "../../Constant/Components.styles";
import SyncStyle from './SyncStyle';
import axios from 'axios';
import AsyncStorageConstants from '../../Constant/AsyncStorageConstants';

import { BASE_URL_GET } from '../../Constant/Commen_API_Url';
import { get_ASYNC_TOCKEN } from '../../Constant/AsynStorageFuntion';
import * as DB_Customer from '../../SQLiteDatabaseAction/DBControllers/CustomerController';
import * as DB_Item from '../../SQLiteDatabaseAction/DBControllers/ItemController';
import * as DB_ServiceType from '../../SQLiteDatabaseAction/DBControllers/ServiceTypeController';
import * as DB_UserTypes from '../../SQLiteDatabaseAction/DBControllers/Users_TypesController';
import * as DB_User from '../../SQLiteDatabaseAction/DBControllers/UserController';
let SyncArray1: any[] = [];
let arrayindex = 0;
var TOCKEN_KEY: any;
var GET_URL = "http://124.43.13.162:4500/api/";
const SyncScreen = () => {

    const navigation = useNavigation();


    const [SyncArray, setSyncArray]: any[] = useState([]);
    const [Token_Key, setToken_Key] = useState("");

    const syncbtn = () => {

        SyncArray1 = [];
        setSyncArray([]);
        get_ASYNC_TOCKEN().then(res => {
            TOCKEN_KEY = res;
            Sync_Customer(TOCKEN_KEY);
            Sync_Item(TOCKEN_KEY);
            Sync_ServiceType(TOCKEN_KEY);
            Sync_User_Type(TOCKEN_KEY);
            Sync_User(TOCKEN_KEY);
        })


    }

    //----------------------------------  user download ----------------------------------------------
    const Sync_User = (Key:any) => {
      const AuthStr = 'Bearer '.concat(Key);
      const URL = GET_URL+"user";
      axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        console.log("+++++++++++++++++++++Sync_User+++++++++++++++++++++++++");
          if (response.status === 200) {
            DB_User.saveUser(response.data, (res: any) => {
                if (res = true) {
                  arrayindex++;

                  SyncArray1.push({
                    name: 'User Download Sucsessfully...',
                    id: arrayindex,
                  });
                  setSyncArray(SyncArray1);
                  
                } else {
                  SyncArray1.push({
                    name: 'User Save Failed...',
                    id: arrayindex,
                  });
                  setSyncArray(SyncArray1);
                }
              });
            } else {

              SyncArray1.push({
                name: 'User Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
            }
      })
      .catch((error) => {
        SyncArray1.push({
          name: 'User Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
          console.log('errorrrrr ' + error);
      });
  }

  //----------------------------------  user Types download ----------------------------------------------
    const Sync_User_Type = (Key:any) => {
      const AuthStr = 'Bearer '.concat(Key);
      const URL = GET_URL+"user/user-types";
      axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        console.log("+++++++++++++++++++++Sync_User_Type+++++++++++++++++++++++++");
          if (response.status === 200) {
            DB_UserTypes.saveTechnitian(response.data, (res: any) => {
                if (res = true) {
                  arrayindex++;

                  SyncArray1.push({
                    name: 'User Type Download Sucsessfully...',
                    id: arrayindex,
                  });
                  setSyncArray(SyncArray1);
                  
                } else {
                  SyncArray1.push({
                    name: 'User Type Save Failed...',
                    id: arrayindex,
                  });
                  setSyncArray(SyncArray1);
                }
              });
            } else {

              SyncArray1.push({
                name: 'User Type Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
            }
      })
      .catch((error) => {
        SyncArray1.push({
          name: 'User Type Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
          console.log('errorrrrr ' + error);
      });
  }
  //----------------------------------  service type download ----------------------------------------------
    const Sync_ServiceType = (Key:any) => {
        const AuthStr = 'Bearer '.concat(Key);
        const URL = GET_URL+"service-call/problem-types";
        axios.get(URL, { headers: { Authorization: AuthStr } })
        .then(response => {
          console.log("+++++++++++++++++++++Sync_ServiceType+++++++++++++++++++++++++");
          
            if (response.status === 200) {
                DB_ServiceType.saveServiceType(response.data, (res: any) => {
                  if (res = true) {
                    arrayindex++;

                    SyncArray1.push({
                      name: 'Service Type Download Sucsessfully...',
                      id: arrayindex,
                    });
                    setSyncArray(SyncArray1);
                    
                  } else {
                    SyncArray1.push({
                      name: 'Service Type Save Failed...',
                      id: arrayindex,
                    });
                    setSyncArray(SyncArray1);
                  }
                });
              } else {

                SyncArray1.push({
                  name: 'Service Type Download Failed...',
                  id: arrayindex,
                });
                setSyncArray(SyncArray1);
              }
        })
        .catch((error) => {
          SyncArray1.push({
            name: 'Service Type Save Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
            console.log('errorrrrr ' + error);
        });
    }

    //----------------------------------  item download ----------------------------------------------
    const Sync_Item = (Key:any) => {
        const AuthStr = 'Bearer '.concat(Key);
        const URL = GET_URL+"items";
        axios.get(URL, { headers: { Authorization: AuthStr } })
        .then(response => {
            if (response.status === 200) {
                DB_Item.saveItem(response.data, (res: any) => {

                  if (res = true) {
                    arrayindex++;

                    SyncArray1.push({
                      name: 'Item Download Sucsessfully...',
                      id: arrayindex,
                    });
                    setSyncArray(SyncArray1);
                    
                  } else {
                    SyncArray1.push({
                      name: 'Item Save Failed...',
                      id: arrayindex,
                    });
                    setSyncArray(SyncArray1);
                  }
                });
              } else {

                SyncArray1.push({
                  name: 'Item Download Failed...',
                  id: arrayindex,
                });
                setSyncArray(SyncArray1);
              }
        })
        .catch((error) => {
          SyncArray1.push({
            name: 'Item Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
            console.log('errorrrrr ' + error);
        });
    }


    //----------------------------------  customer download ----------------------------------------------
    const Sync_Customer = (Key:any) => {
        
        const AuthStr = 'Bearer '.concat(Key);
        const URL = GET_URL+"customers";
        axios.get(URL, { headers: { Authorization: AuthStr } })
        .then(response => {
            if (response.status === 200) {
                DB_Customer.saveCustomer(response.data, (res: any) => {

                  if (res = true) {
                    arrayindex++;

                    SyncArray1.push({
                      name: 'Customer Download Sucsessfully...',
                      id: arrayindex,
                    });
                    setSyncArray(SyncArray1);
                  } else {
                    SyncArray1.push({
                      name: 'Customer Save Failed...',
                      id: arrayindex,
                    });
                    setSyncArray(SyncArray1);
                  }
                });
              } else {
                console.log('fails');

                SyncArray1.push({
                  name: 'Customer Download Failed...',
                  id: arrayindex,
                });
                setSyncArray(SyncArray1);
              }
        })
        .catch((error) => {
          SyncArray1.push({
            name: 'Customer Save Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
            console.log('errorrrrr ' + error);
        });
    }
    const cancelAndGoBack = () => {
        Alert.alert('Cancle', 'Are you sure ? ', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => navigation.goBack(), }
        ]);
    }

    return (

        <SafeAreaView style={ComStyles.CONTAINER}>

            <View style={ComStyles.CONTENT}>


                <View style={{ flex: 1.5, marginBottom: 5 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                        data={SyncArray}
                        style={{ marginTop: 10,  }}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ height: 25, flexDirection: 'row' }}>
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            color: ComStyles.COLORS.DASH_COLOR,
                                            fontSize: 16,
                                        }}>
                                        {item.name}
                                    </Text>
                                </View>
                            );
                        }}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>

                <View style={{ flexDirection: 'row', flex: 0.25 }}>
                    <View style={{ flex: 1, padding: 3 }}>
                        <ActionButton title="Sync" onPress={() => syncbtn()} />
                    </View>
                    <View style={{ flex: 1, padding: 3 }}>
                        <ActionButton title="Cancel"
                            onPress={() => cancelAndGoBack()}
                        />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
};
export default SyncScreen;