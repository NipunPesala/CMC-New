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
  RefreshControl,
} from 'react-native';
import ActionButton from '../../Components/ActionButton';
import ComStyles from "../../Constant/Components.styles";
import SyncStyle from './SyncStyle';
import axios from 'axios';
import AsyncStorageConstants from '../../Constant/AsyncStorageConstants';

import { BASE_URL_GET } from '../../Constant/Commen_API_Url';
import { get_ASYNC_TOCKEN } from '../../Constant/AsynStorageFuntion';
import * as DB_Customer from '../../SQLiteDatabaseAction/DBControllers/CustomerController';
import * as DB_CstomerItems from '../../SQLiteDatabaseAction/DBControllers/CustomerItemsController';
import * as DB_Item from '../../SQLiteDatabaseAction/DBControllers/ItemController';
import * as DB_ServiceType from '../../SQLiteDatabaseAction/DBControllers/ServiceTypeController';
import * as DB_UserTypes from '../../SQLiteDatabaseAction/DBControllers/Users_TypesController';
import * as DB_User from '../../SQLiteDatabaseAction/DBControllers/UserController';
import * as DB_ItemSerialNo from '../../SQLiteDatabaseAction/DBControllers/ItemSerialNoController';
import * as DB_Priority from '../../SQLiteDatabaseAction/DBControllers/PriorityController';
import * as DB_SpareParts from '../../SQLiteDatabaseAction/DBControllers/SparePartsController';
import * as DB_ExpenseType from '../../SQLiteDatabaseAction/DBControllers/ExpencesTypeController';
import * as DB_Vehicle from '../../SQLiteDatabaseAction/DBControllers/VehicleController';
import * as DB_Tool from '../../SQLiteDatabaseAction/DBControllers/ToolController';
import { ExpencesType, priorityListInitial, Service_types } from "../../Constant/DummyData";
import { logProfileData } from 'react-native-calendars/src/Profiler';
import { getASYNC_LOGIN_STATUS } from "../../Constant/AsynStorageFuntion"
import { getCustomers } from '../../Services/Api/SyncService';
import { getSpareParts } from '../../Services/Api/UserAuthService';
import { err } from 'react-native-svg/lib/typescript/xml';

let SyncArray1: any[] = [];
let arrayindex = 0;
var TOCKEN_KEY: any;
var LoginType: any;
var GET_URL = "http://124.43.13.162:4500/api/";

var ButtonTitle: any;
const SyncScreen = (props: any) => {

  const { navigation, route } = props;

  const navi = useNavigation();


  const [SyncArray, setSyncArray]: any[] = useState([]);
  const [Token_Key, setToken_Key] = useState("");
  const [onRefresh, setOnRefresh] = useState(false);
  const [disablebtn, setdisablebtn] = useState(false);
  const [syncText, setsyncText] = useState('');
  const [btntitle, setbtntitle] = useState('');

  // const route=useRoute();

  const syncbtn = () => {

    console.log(ButtonTitle, "111111111111111111111111", btntitle);

    if (ButtonTitle == "Sync") {
      console.log("2222222222222222222222222");
      SyncArray1 = [];
      setSyncArray([]);
      get_ASYNC_TOCKEN().then(res => {
        TOCKEN_KEY = res;
        Sync_Customer(TOCKEN_KEY);
        // SyncCustomer();

        setOnRefresh(false);
        setdisablebtn(false)

      })
    } else {
      // Alert.alert("Colse")
      console.log("close .............. ");

      if (LoginType == "FIRST") {
        navi.navigate("BottomNavi");
      } else {
        navi.navigate("Home");

      }

    }



  }

  useEffect(() => {
    setdisablebtn(true);
    LoginType = route.params.LoginStatus;
    console.log(LoginType, '-----111111111111111111111111111111111111111-----');
    if (LoginType == "FIRST") {
      setbtntitle('Sync')
      ButtonTitle = "Sync";
      setdisablebtn(false)
      syncbtn();
    } else {
      setbtntitle('Sync')
      ButtonTitle = "Sync";
    }

  }, [])


  // const SyncCustomer = () => {

    // getCustomers()
    //   .then((res) => {
    //     console.log(res, " customer sync ....................... ");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })

  // }

  //----------------------------------  user download ----------------------------------------------
  const Sync_User = (Key: any) => {
    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "user";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        console.log("+++++++++++++++++++++Sync_User+++++++++++++++++++++++++");
        if (response.status === 200) {
          DB_User.saveUser(response.data, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {
              arrayindex++;

              SyncArray1.push({
                name: 'User Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_CustomerItems(TOCKEN_KEY);

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'User Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_CustomerItems(TOCKEN_KEY);

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'User Download Successfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_CustomerItems(TOCKEN_KEY);

            }
          });
        } else {

          arrayindex++;

          setOnRefresh(false);
          SyncArray1.push({
            name: 'User Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_CustomerItems(TOCKEN_KEY);

        }
      })
      .catch((error) => {

        arrayindex++;

        setOnRefresh(false);
        SyncArray1.push({
          name: 'User Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        setOnRefresh(true);
        Sync_CustomerItems(TOCKEN_KEY);

      });
  }

  //----------------------------------  user Types download ----------------------------------------------
  const Sync_User_Type = (Key: any) => {
    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "user/user-types";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        console.log("+++++++++++++++++++++Sync_User_Type+++++++++++++++++++++++++");
        if (response.status === 200) {
          DB_UserTypes.saveTechnitian(response.data, (res: any) => {


            setOnRefresh(false);


            if (res == 1) {

              arrayindex++;

              SyncArray1.push({
                name: 'User Type Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_User(TOCKEN_KEY);

            } else if (res == 2) {
              arrayindex++;

              SyncArray1.push({
                name: 'User Type Save Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_User(TOCKEN_KEY);

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'User Type Download Successfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_User(TOCKEN_KEY);
            }

          });
        } else {

          arrayindex++;

          setOnRefresh(false);
          SyncArray1.push({
            name: 'User Type Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_User(TOCKEN_KEY);
        }
      })
      .catch((error) => {

        arrayindex++;
        setOnRefresh(false);
        SyncArray1.push({
          name: 'User Type Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        setOnRefresh(true);
        Sync_User(TOCKEN_KEY);
      });
  }
  //----------------------------------  service type download ----------------------------------------------
  const Sync_ServiceType = (Key: any) => {
    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "service-call/problem-types";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {

        if (response.status === 200) {
          DB_ServiceType.saveServiceType(response.data, (res: any) => {

            setOnRefresh(false);
            if (res == 1) {

              arrayindex++;

              SyncArray1.push({
                name: 'Service Type Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_User_Type(TOCKEN_KEY);

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Service Type Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_User_Type(TOCKEN_KEY);

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Service Type Download Successfully...',
                id: arrayindex,
              });

              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_User_Type(TOCKEN_KEY);

            }
          });
        } else {

          setOnRefresh(false);

          arrayindex++;

          SyncArray1.push({
            name: 'Service Type Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_User_Type(TOCKEN_KEY);
        }
      })
      .catch((error) => {

        arrayindex++;

        setOnRefresh(false);
        SyncArray1.push({
          name: 'Service Type Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        console.log('errorrrrr ' + error);
        Sync_User_Type(TOCKEN_KEY);
      });
  }

  //----------------------------------  item download ----------------------------------------------
  const Sync_Item = (Key: any) => {
    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "items";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          DB_Item.saveItem(response.data, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {

              arrayindex++;

              SyncArray1.push({
                name: 'Item Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_ServiceType(TOCKEN_KEY);

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Item Save Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_ServiceType(TOCKEN_KEY);

            } else if (res == 3) {

              console.log("success item ..................", SyncArray1.length);

              arrayindex++;

              SyncArray1.push({
                name: 'Item Downloaded Successfully...',
                id: arrayindex,
              });

              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_ServiceType(TOCKEN_KEY);

            }
          });
        } else {

          arrayindex++;

          setOnRefresh(false);

          SyncArray1.push({
            name: 'Item Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          Sync_ServiceType(TOCKEN_KEY);
          setOnRefresh(true);

        }
      })
      .catch((error) => {

        setOnRefresh(false);

        arrayindex++;
        SyncArray1.push({
          name: 'Item Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        Sync_ServiceType(TOCKEN_KEY);
        setOnRefresh(true);

      });
  }

  //----------------------------------  customer download ----------------------------------------------
  const Sync_Customer = (Key: any) => {

    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "customers";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          DB_Customer.saveCustomer(response.data, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {

              arrayindex++;

              SyncArray1.push({
                name: 'Customer Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Customer Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // setsyncText(syncText + "\n" + 'Customer Save Failed...');

              Sync_Item(TOCKEN_KEY);


            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Customer Downloaded Successfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_Item(TOCKEN_KEY);

            }
          });
        } else {

          setOnRefresh(false);

          arrayindex++;
          SyncArray1.push({
            name: 'Customer Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);

          Sync_Item(TOCKEN_KEY);
        }
      })
      .catch((error) => {

        setOnRefresh(false);
        arrayindex++;
        SyncArray1.push({
          name: 'Customer Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        Sync_Item(TOCKEN_KEY);


      });
  }

  //----------------------------- Download Customer Items -------------------------------
  const Sync_CustomerItems = (Key: any) => {

    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "items";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          DB_CstomerItems.saveCustomerItems(response.data, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {
              arrayindex++;

              SyncArray1.push({
                name: 'Customer Items Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_ItemSerialNo(TOCKEN_KEY);

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Customer Items Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_ItemSerialNo(TOCKEN_KEY);

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Customer Items Download Successfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_ItemSerialNo(TOCKEN_KEY);

            }
          });
        } else {

          arrayindex++;

          setOnRefresh(false);

          SyncArray1.push({
            name: 'Customer Items Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_ItemSerialNo(TOCKEN_KEY);

        }
      })
      .catch((error) => {

        arrayindex++;
        setOnRefresh(false);
        SyncArray1.push({
          name: 'Customer Items Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        setOnRefresh(true);
        Sync_ItemSerialNo(TOCKEN_KEY);

      });
  }

  //----------------------------- Download  Item Serial No -------------------------------

  const Sync_ItemSerialNo = (Key: any) => {

    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "items";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          DB_ItemSerialNo.saveItemSerialNo(response.data, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {
              arrayindex++;

              SyncArray1.push({
                name: 'Item Serial No Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_SpareParts(TOCKEN_KEY);

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Item Serial No Download Sucsessfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_SpareParts(TOCKEN_KEY);

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Item Serial No Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_SpareParts(TOCKEN_KEY);
            }


          });
        } else {

          arrayindex++;
          setOnRefresh(false);

          SyncArray1.push({
            name: 'Item Serial No Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_SpareParts(TOCKEN_KEY);
        }
      })
      .catch((error) => {
        arrayindex++;
        setOnRefresh(false);
        SyncArray1.push({
          name: 'Item Serial No Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        setOnRefresh(true);
        Sync_SpareParts(TOCKEN_KEY);
      });
  }

  // ------------------ Download Spare parts -------------------
  const Sync_SpareParts = (Key: any) => {

    // getSpareParts()
    //   .then((res) => {
    //     console.log(res, " spare part sync ....................... ");
    //     Sync_Vehicle(TOCKEN_KEY);
    //   })
    //   .catch((err) => {
    //     console.log("SP error ",err);
    //   })



    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "spare-parts";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          DB_SpareParts.saveSpareParts(response.data, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {
              arrayindex++;

              SyncArray1.push({
                name: 'Spare Parts Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_Priority();

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Spare Parts Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_Vehicle(TOCKEN_KEY);

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Spare Parts Download Sucsessfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_Vehicle(TOCKEN_KEY);
            }
          });
        } else {
          // console.log(response.status);

          setOnRefresh(false);

          arrayindex++;

          SyncArray1.push({
            name: 'Spare Parts Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_Vehicle(TOCKEN_KEY);
        }
      })
      .catch((error) => {

        // console.log(" SP error " , error);
        

        setOnRefresh(false);

        arrayindex++;
        SyncArray1.push({
          name: 'Spare Parts Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        Sync_Vehicle(TOCKEN_KEY);
      });

  }

  // ------------------ Download Vehicle -------------------
  const Sync_Vehicle = (Key: any) => {
    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "vehicle";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          DB_Vehicle.saveVehicle(response.data, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {
              arrayindex++;

              SyncArray1.push({
                name: 'Vehicle Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_Priority();

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Vehicle Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_Tool(TOCKEN_KEY);

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Vehicle Download Sucsessfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_Tool(TOCKEN_KEY);
            }
          });
        } else {
          console.log('fails');

          setOnRefresh(false);

          arrayindex++;

          SyncArray1.push({
            name: 'Vehicle Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_Tool(TOCKEN_KEY);
        }
      })
      .catch((error) => {

        setOnRefresh(false);

        arrayindex++;
        SyncArray1.push({
          name: 'Vehicle Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        setOnRefresh(true);
        Sync_Tool(TOCKEN_KEY);
      });

  }


  // ------------------ Download Tool -------------------
  const Sync_Tool = (Key: any) => {
    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "items/assets";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          DB_Tool.saveTool(response.data, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {
              arrayindex++;

              SyncArray1.push({
                name: 'Tool Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              // Sync_Priority();

            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Tool Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_ExpenseType();

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Tool Download Sucsessfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_ExpenseType();
            }
          });
        } else {
          console.log('fails');

          setOnRefresh(false);

          arrayindex++;

          SyncArray1.push({
            name: 'Tool Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_ExpenseType();
        }
      })
      .catch((error) => {

        setOnRefresh(false);

        arrayindex++;
        SyncArray1.push({
          name: 'Tool Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        setOnRefresh(true);
        Sync_ExpenseType();
      });

  }

  //-------------------------------- Download Expense Type -----------------------------
  const Sync_ExpenseType = () => {

    DB_ExpenseType.saveExpencesType(ExpencesType, (res: any, error: any) => {

      setOnRefresh(false);


      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Expense Type Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Expense Type Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        Sync_Priority();

      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Expense Type Download Sucsessfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        Sync_Priority();
      }

    })

  }

  //-------------------------------- Download Priority -----------------------------
  const Sync_Priority = () => {

    DB_Priority.savePriority(priorityListInitial, (res: any, error: any) => {

      setOnRefresh(false);

      if (res == 1) {

        arrayindex++;

        SyncArray1.push({
          name: 'Priority Downloading...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);

      } else if (res == 2) {

        arrayindex++;

        SyncArray1.push({
          name: 'Priority Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        setOnRefresh(false);

        arrayindex++;

        SyncArray1.push({
          name: 'Finished...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setdisablebtn(true);
        setbtntitle('Close')
        ButtonTitle = "Close";
        setOnRefresh(true);
        setOnRefresh(false);

      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Priority Download Sucsessfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        setOnRefresh(false);

        arrayindex++;

        SyncArray1.push({
          name: 'Finished...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setdisablebtn(true);
        setOnRefresh(true);
        setOnRefresh(false);
        setbtntitle('Close')
        ButtonTitle = "Close";

      }

    })

  }


  const AlertSync_close_press = () => {
    // console.log("CCCCCCCCCCCCCC");
    if (LoginType == "FIRST") {
      navi.navigate("BottomNavi");
    } else {
      navi.navigate("Home");

    }
  }

  const cancelAndGoBack = () => {


    Alert.alert('Cancle', 'Are you sure ? ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => AlertSync_close_press() }
    ]);
  }

  const handleRefresh = () => {

    setOnRefresh(false);
    syncbtn();

  }



  return (

    <SafeAreaView style={ComStyles.CONTAINER}>

      <View style={ComStyles.CONTENT}>


        <View style={{ flex: 1.5, marginBottom: 5 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
            data={SyncArray}
            style={{ marginTop: 10, }}
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
            onRefresh={() => null}
            refreshing={onRefresh}
            keyExtractor={item => `${item.id}`}
          />


          {/* {

            SyncArray1.map((item) => (
              <Text key={item.id}>{item.name}</Text>
            )

            )

          } */}



        </View>

        <View style={{ flexDirection: 'row', flex: 0.25, marginBottom: 35 }}>

          {
            disablebtn === true ? <View style={{ flex: 1, padding: 3 }}>
              <ActionButton title={btntitle} onPress={() => syncbtn()} />
            </View> : null
          }


        </View>
      </View>

    </SafeAreaView>
  );
};
export default SyncScreen; 