
//import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageConstants from './AsyncStorageConstants';

export const getCurrentServiceCallID = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_CURRENT_SERVICE_CALL_ID)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getLoginUserName = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_NAME)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getRESOURCE_ID = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_RESOURCE_ID)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const get_ASYNC_TOCKEN = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_TOCKEN)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}

export const get_ASYNC_USERID = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_LOGIN_USERID)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getRESOURCE_Type = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_RESOURCE_Type)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getCustomerIDAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_CUSTOMERID)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const getCustomerTypeAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_CUSTOMER_TYPE)
    return value

  } catch (e) {
    console.log('Failed to fetch the data from storage')
  }
}
export const ClearAsyncStorage = async () => {
 
    try {
      await AsyncStorage.clear()
      return "OK"
    } catch (e) {
      console.log('Failed to clear the async storage.')
    }
}

// export const getNotification_ID = async () => {
 
//   try {
//     const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_NOTIFICATION_DOC_ENTRY)
//     return value

//   } catch (e) {
//     console.log('Failed to fetch the data from storage')
//   }
// }



    export const getLoginTokenKEyAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_LOGIN_ACCESS_TOKEN)
        return value
    
      } catch (e) {
        console.log('Failed to fetch the data from storage')
      }
    }
    
    export const getASYNC_CURRENT_TICKET_ID = async () => {
      try {
        const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_CURRENT_TICKET_ID)
        return value
    
      } catch (e) {
        console.log('Failed to fetch the data from storage')
      }
    }

    export const getASYNC_CURRENT_SP_REQUEST_ID = async () => {
      try {
        const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_CURRENT_SP_REQUEST_ID)
        return value
    
      } catch (e) {
        console.log('Failed to fetch the data from storage')
      }
    }
    
    export const getLoginTokenKEyAsyncStorageStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_STORAGE_NOTIFICATION_STATUS)
        return value
    
      } catch (e) {
        console.log('Failed to fetch the data from storage')
      }
    }

    export const getASYNC_SELECT_TICKET = async () => {
      try {
        const value = await AsyncStorage.getItem(AsyncStorageConstants.SELECT_TICKET)
        return value
    
      } catch (e) {
        console.log('Failed to fetch the data from storage')
      }
    }

    
    export const getASYNC_LOGIN_STATUS = async () => {
      try {
        const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_LOGIN_STATUS)
        return value
    
      } catch (e) {
        console.log('Failed to fetch the data from storage')
      }
    }

  //   set_data = async (storage_key, value) => {
  //     try {
  //         const value_to_store = JSON.stringify(value);
  //         return await AsyncStorage.setItem(storage_key, value_to_store);
  //     } catch (error) {
  //         console.log(error);
  //         return error;
  //     }
  // }
  
  // get_data = async (storage_key) => {
  //     console.log("Getting Data", storage_key);
  //     const value = await AsyncStorage.getItem(storage_key)
  //         .then((returned_value) => {
  //             const parsed = JSON.parse(returned_value);
  //             return parsed;
  //         })
  //         .catch((error) => {
  //             console.log("Get Item Error: ", error);
  //         })
  //     console.log("Finished Getting Data");
  //     return value;
  // }
  
  // clear_data = async () => {
  //     console.log("Clearing Persistent Storage");
  //     return await AsyncStorage.clear();
  // }
  
  // module.exports = {
  //     set_data,
  //     get_data,
  //     clear_data
  // }


