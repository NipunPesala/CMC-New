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
import * as DB_ServiceTicket from '../../SQLiteDatabaseAction/DBControllers/TicketController';
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
import * as DB_ServiceCall from '../../SQLiteDatabaseAction/DBControllers/ServiceController';
import { ExpencesType, priorityListInitial, Service_types } from "../../Constant/DummyData";
import { logProfileData } from 'react-native-calendars/src/Profiler';
import { getASYNC_LOGIN_STATUS } from "../../Constant/AsynStorageFuntion"
import { getCustomers } from '../../Services/Api/SyncService';
import { getSpareParts } from '../../Services/Api/UserAuthService';
import { err } from 'react-native-svg/lib/typescript/xml';
import { get_ASYNC_USERID, getLoginUserName } from "../../Constant/AsynStorageFuntion";
import { updateSycnServiceCAll, Update_webRefId, getAllUploadFailServiceCalls,getServiceById,getServiceId } from "../../SQLiteDatabaseAction/DBControllers/ServiceController";
import { getAllUploadFailServiceTickets, updateUploadedServiceTicket } from "../../SQLiteDatabaseAction/DBControllers/TicketController";
import moment from "moment";

let SyncArray1: any[] = [];
let arrayindex = 0;
var TOCKEN_KEY: any;
var LoginType: any;
var GET_URL = "http://124.43.13.162:4500/api/";
let UploadFailCalls: any[] = [];
let UploadFailTickets: any[] = [];
var ButtonTitle: any;

var UserIdUpload: any;
var UserNameUpload: any;

const SyncScreen = (props: any) => {

  const { navigation, route } = props;

  const navi = useNavigation();


  const [SyncArray, setSyncArray]: any[] = useState([]);
  const [Token_Key, setToken_Key] = useState("");
  const [onRefresh, setOnRefresh] = useState(false);
  const [disablebtn, setdisablebtn] = useState(false);
  const [syncText, setsyncText] = useState('');
  const [btntitle, setbtntitle] = useState('');
  const [failCalls, setFailCalls]: any[] = useState([]);
  const [contactPerson, setContactPerson] = useState('');
  const [webRefId, setWebRefId] = useState('');
  
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
    getLoginUserNameForUplode();
    getAllUploadFailData();
    getAllUploadFailTicketData();
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


  const getLoginUserNameForUplode = () => {
    getLoginUserName().then(res => {
      UserNameUpload = res;
      console.log('user Name --+++++++++++++' + UserNameUpload);
    })
    get_ASYNC_USERID().then(res => {
      UserIdUpload = res;
      console.log('user id upload  --+++++++++++++++' + UserIdUpload);
    })



  }

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
        // Sync_Priority();// remove priority 
        Sync_ServiceCall(TOCKEN_KEY);
      } else if (res == 3) {

        arrayindex++;

        SyncArray1.push({
          name: 'Expense Type Download Sucsessfully...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        setOnRefresh(true);
        // Sync_Priority(); // remove priority 
        Sync_ServiceCall(TOCKEN_KEY);
      }

    })

  }


  //------------------------------ Download Service Calls  nipun------------------------
  const Sync_ServiceCall = (Key: any) => {
    console.log('this is a sync_service call ')
    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "service-call";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          DB_ServiceCall.saveServiceData(response.data, 1, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {
              arrayindex++;

              SyncArray1.push({
                name: 'Service Call Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);


            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Service Call Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              //Sync_Priority();
              Sync_Service_ticket(TOCKEN_KEY)

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Service Call Download Sucsessfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              //Sync_Priority();
              Sync_Service_ticket(TOCKEN_KEY)
            }
          });
        } else {
          console.log('fails');

          setOnRefresh(false);

          arrayindex++;

          SyncArray1.push({
            name: 'Service Call  Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          //  Sync_Priority();
          Sync_Service_ticket(TOCKEN_KEY)
        }
      })
      .catch((error) => {

        setOnRefresh(false);

        arrayindex++;
        SyncArray1.push({
          name: 'Service Call Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        setOnRefresh(true);
        //Sync_Priority();
        Sync_Service_ticket(TOCKEN_KEY)
      });

  }
  //--------------------------------Download ticket----------------------------------
  const Sync_Service_ticket = (Key: any) => {
    console.log('this is a sync_servic ticket ')
    const AuthStr = 'Bearer '.concat(Key);
    const URL = GET_URL + "service-call/service-ticket";
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        if (response.status === 200) {
          // console.log('ticket responce data------------ ',response.data.);
          DB_ServiceTicket.saveTicket(response.data, 1, (res: any) => {

            setOnRefresh(false);

            if (res == 1) {
              arrayindex++;

              SyncArray1.push({
                name: 'Service Ticket Downloading...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);


            } else if (res == 2) {

              arrayindex++;

              SyncArray1.push({
                name: 'Service Ticket Download Failed...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_Priority();

            } else if (res == 3) {

              arrayindex++;

              SyncArray1.push({
                name: 'Service Ticket Download Sucsessfully...',
                id: arrayindex,
              });
              setSyncArray(SyncArray1);
              setOnRefresh(true);
              Sync_Priority();
            }
          });
        } else {
          console.log('fails');

          setOnRefresh(false);

          arrayindex++;

          SyncArray1.push({
            name: 'Ticket Download Failed...',
            id: arrayindex,
          });
          setSyncArray(SyncArray1);
          setOnRefresh(true);
          Sync_Priority();
        }
      })
      .catch((error) => {

        setOnRefresh(false);

        arrayindex++;
        SyncArray1.push({
          name: 'Ticket Download Failed...',
          id: arrayindex,
        });
        setSyncArray(SyncArray1);
        console.log('errorrrrr ' + error);
        setOnRefresh(true);
        Sync_Priority();
      });

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
  //----------------------------uplode added service Tickets  in offline (with out internet connection)-------------------------------------
  const getAllUploadFailTicketData = () => {
    getAllUploadFailServiceTickets((result: any) => {

      for (let i = 0; i < result.length; i++) {
        UploadFailTickets.push(result[i]);

      }
      console.log('ubpload fail Tickets--- ', UploadFailTickets);
      console.log('ubpload fail tickets  length --- ', UploadFailTickets.length);
       UploadServiceTickets(UploadFailTickets);
    });

  }


  const UploadServiceTickets = async (UnsavedArray: any) => {


    console.log('+++++++++++++++UploadService Tickets---------------------------', UnsavedArray);
    try {
      const authStr = `Bearer ${await get_ASYNC_TOCKEN()}`;
      const headers = { 'Authorization': authStr };
      const URL = BASE_URL_GET + "service-ticket";

      for (let i = 0; i < UnsavedArray.length; i++) {

       
        
          getServiceById(UnsavedArray[i].serviceId, (result: any) => {
             
              console.log('contact person +++++++++++', result[0].contact_name);
              console.log('service web ref id', result[0].service_web_RefID);
             
              setContactPerson(result[0].contact_name);
              setWebRefId(result[i].service_web_RefID);
             
          });

          
             
            console.log('ticket web reffff +++++++++++',webRefId);
           
     
      
        const prams = {
          "UserName": UserNameUpload,
          "objServiceTiketList": [
            {

              "UserID": UserIdUpload, // done
              "ticketId":  UnsavedArray[i].ticketId, //done
              "serviceId": webRefId, // done
              "startDate":  UnsavedArray[i].startDate, // done
              "itemDescription":  UnsavedArray[i].itemDescription,// done
              "endDate":  UnsavedArray[i].endDate,//done
              "content":  UnsavedArray[i].content,// done
              "assignTo":  UnsavedArray[i].assignTo, // done
              "attend_status": "Pending",// done
              "created_At": moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'), //done
              "assignedByMobile": UserIdUpload, // done
              "assignedToMobile":  UnsavedArray[i].assignTo,// done
              "contactPerson": contactPerson,// not
              "priority":  UnsavedArray[i].priority//done
            }
          ]
        };

        console.log('--NEW Ticket UPLOAD JSON--', prams);

        const response = await axios.post(URL, prams, {
          headers: headers
        });

        console.log("[s][t][a][t][u][s][]", response.status);

        if (response.status == 200) {

          console.log('<------ NEW SERVICE TICKET UPLOAD Method --->', response.data)
          console.log(response.data[0].UniqueNo);

          if (response.data[0].ErrorId == 0) {
            // this use fro update sync flag as 1 
            console.log('<------service ticket id  --->', response.data[0].ServiceTicketId)

            updateUploadedServiceTicket(UnsavedArray[i].serviceId, response.data[0].ServiceTicketId, (result: any) => {
              console.log("ticket sync status,web ref update --------- ", result);

            });
          } else {

            Alert.alert(
              "Upload Error !",
              "Bad Request",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
        } else {
          Alert.alert(
            "Invalid Details!",
            "Bad Request",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      }
    } catch (error) {
      console.log(">>>>>>>>>>>>", error);
    }
  }


  //----------------------------uplode added service call in offline (with out internet connection)----------------------------------------
  const getAllUploadFailData = () => {
    getAllUploadFailServiceCalls((result: any) => {

      for (let i = 0; i < result.length; i++) {
        UploadFailCalls.push(result[i]);

      }
      console.log('ubpload fail service call --- ', UploadFailCalls);
      console.log('ubpload fail service call length --- ', UploadFailCalls.length);
      UploadServiceCall(UploadFailCalls);
    });

  }


  const UploadServiceCall = async (UnsavedArray: any) => {

    console.log('+++++++++++++++UploadServiceCall++++++++++++++++++++++++++++++++=+');
    console.log('+++++++++++++++UploadServiceCall----------------------------', UnsavedArray);
    try {
      const authStr = `Bearer ${await get_ASYNC_TOCKEN()}`;
      const headers = { 'Authorization': authStr };
      const URL = BASE_URL_GET + "service-call";

      for (let i = 0; i < UnsavedArray.length; i++) {
        const prams = {
          "UserName": UserNameUpload,
          "objServiceCallList": [
            {

              "UserID": UserIdUpload, //done
              "problem_type": UnsavedArray[i].service_type,//done
              "serviceId": UnsavedArray[i].serviceId,//done
              "priority": UnsavedArray[i].priority,//done
              "service_type": UnsavedArray[i].service_type,//done
              "item_code": UnsavedArray[i].item_code,//done
              "itemID": UnsavedArray[i].itemID, //done
              "customerID": UnsavedArray[i].customerID, //done
              "customer": UnsavedArray[i].customer,///done
              "customer_address": UnsavedArray[i].customer_address,//done
              "contact_name": UnsavedArray[i].contact_name,//done
              "contact_no": UnsavedArray[i].contact_no, //done
              "handle_by": UnsavedArray[i].TechnicianID,//done
              "secretary": UnsavedArray[i].SecretaryID,//done
              "sales_assistance": UnsavedArray[i].assistance,//done
              "start_date": UnsavedArray[i].start_date,
              "end_date": UnsavedArray[i].end_date,//done
              "created_by": UserNameUpload,//
              "active_status": 1,
              "Approve_status": UnsavedArray[i].Approve_status, //done
              "Attend_status": UnsavedArray[i].Attend_status,//done
              "created_At": UnsavedArray[i].CreateAt,//done
              "handledByHandledByCode": UnsavedArray[i].TechnicianID,///done
              "originsDropDownOriginCode": 1,
              "problemTypesDropDownProblemTypeCode": UnsavedArray[i].service_typeID,//done
              "clusterHeadClusterHeadCode": UnsavedArray[i].TechnicianID,//done
              "secretaryDBSecretaryCode": UnsavedArray[i].SecretaryID,///done
              "salesAssistantDBSalesAssistantCode": UnsavedArray[i].AssisstanceID,///done
              "inquiryType": "new",
              "subject": UnsavedArray[i].subject//done
            }
          ]
        };

        console.log('--NEW SERVICE CALL UPLOAD JSON--', prams);

        const response = await axios.post(URL, prams, {
          headers: headers
        });

        console.log("[s][t][a][t][u][s][]", response.status);

        if (response.status == 200) {

          console.log('<------ NEW SERVICE CALL UPLOAD Method --->', response.data)
          console.log('uplode api response', response.data[0].ErrorId);
          console.log('web service call id', response.data[0].ServiceCallId);

          if (response.data[0].ErrorId == 0) {
            console.log('this is if inside----');
            // this use fro update sync flag as 1 
            console.log('this is a web service call id ----', response.data[0].ServiceCallId);
            updateSycnServiceCAll(response.data[0].UniqueNo, (result: any) => { });

            Update_webRefId(response.data[0].ServiceCallId, UnsavedArray[i].serviceId, (result: any) => {
              console.log('web ref update___' + result)
            });
          } else {

            Alert.alert(
              "Upload Error !",
              "Bad Request",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
        } else {
          Alert.alert(
            "Invalid Details!",
            "Bad Request",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      }
    } catch (error) {
      console.log(">>>>>>>>>>>>", error);
    }
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