import SQLite from 'react-native-sqlite-storage';
import { tableData } from './TableData';

const db = SQLite.openDatabase({
  name: 'cmc.db',
  location: 'default',
});

export const createTables = () => {

  db.transaction(
    (tx:any) => {
      tableData.forEach(table => {
        const queryString = createTableMakeQueryString(table);
        tx.executeSql(
          queryString,
          [],
          (tx:any, response:any) => {
            console.log(`create table success ${table.name}: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table error ${table.name}: `, error);
          },
        );
      });
    },
    (error:any) => {
      console.log('table create query transaction failed: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );
};

const createTableMakeQueryString = (tableQuery:any) => {
  try {
    let query = `CREATE TABLE IF NOT EXISTS ${tableQuery.name} (`;
    let count = 0;
    tableQuery.columns.forEach(column => {
      query += `${column.name} ${column.dataType} 
      ${column.isPrimaryKey
          ? 'PRIMARY KEY'
          : column.autoIncrement
            ? 'AUTOINCREMENT'
            : ''
        }
      ${column.shouldNotAllowNull ? 'NOT NULL' : ''}
      ${count < tableQuery.columns.length - 1 ? ',' : ''}`;
      count++;
    });
    query += '); ';
    return query;
  } catch (error) {
    console.log('query string creation failed: ', error);
  }

  return null;
};

// Index Key
export const tableIndexKey = () => {

  try {

    // console.log(" index key *********************************************** ")

    // let query = `CREATE UNIQUE INDEX IF NOT EXISTS idx_ticket_spare_parts ON  TICKET_SPARE_PARTS(spId) `;

    //  ------------------------------------  TICKET SPARE PARTS IDX -------------------------------------------------

    db.transaction(
      (tx:any) => {
        const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_ticket_spare_parts ON  TICKET_SPARE_PARTS(spId) `;

        tx.executeSql(
          query_idx_ticketSpareParts,
          [],
          (tx:any, response:any) => {
            console.log(`create table index success TICKET_SPARE_PARTS: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table index key error TICKET_SPARE_PARTS: `, error);
          },
        );
      },
      (error:any) => {
        console.log('table create query transaction failed: ', error);
      },
      (success:any) => {
        console.log('table create query transaction:', 'success');
      },
    );

    //  ------------------------------------  SPARE PARTS IDX -------------------------------------------------

    db.transaction(
      (tx:any) => {
        const query_idx_SpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_spare_parts ON  SPARE_PARTS(SparePartNo) `;

        tx.executeSql(
          query_idx_SpareParts,
          [],
          (tx:any, response:any) => {
            console.log(`create table index success SPARE_PARTS: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table index key error SPARE_PARTS: `, error);
          },
        );
      },
      (error:any) => {
        console.log('table create query transaction failed: ', error);
      },
      (success:any) => {
        console.log('table create query transaction:', 'success');
      },
    );


    // ---------------------------------------- METER READING IDX -----------------------------------------------------------

    db.transaction(
      (tx:any) => {
        const query_idx_meterReading = `CREATE UNIQUE INDEX IF NOT EXISTS idx_meter_reading ON  METER_READING(readingType,date) `;

        tx.executeSql(
          query_idx_meterReading,
          [],
          (tx:any, response:any) => {
            console.log(`create table index success METER_READING: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table index key error METER_READING: `, error);
          },
        );
      },
      (error:any) => {
        console.log('table create query transaction failed: ', error);
      },
      (success:any) => {
        console.log('table create query transaction:', 'success');
      },
    );

    //  --------------------------------------------- SERVICE TYPES IDX ---------------------------------------------------------

    db.transaction(
      (tx:any) => {
        const query_idx_serviceType = `CREATE UNIQUE INDEX IF NOT EXISTS idx_service_types ON  SERVICE_TYPE(typeId) `;

        tx.executeSql(
          query_idx_serviceType,
          [],
          (tx:any, response:any) => {
            console.log(`create table index success SERVICE_TYPE: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table index key error SERVICE_TYPE: `, error);
          },
        );
      },
      (error:any) => {
        console.log('table create query transaction failed: ', error);
      },
      (success:any) => {
        console.log('table create query transaction:', 'success');
      },
    );

    //  ---------------------------------------- ITEM IDX ---------------------------------------------------------------

    db.transaction(
      (tx:any) => {
        const query_idx_item = `CREATE UNIQUE INDEX IF NOT EXISTS idx_item ON  ITEM(itemCode) `;

        tx.executeSql(
          query_idx_item,
          [],
          (tx:any, response:any) => {
            console.log(`create table index success SERVICE_TYPE: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table index key error SERVICE_TYPE: `, error);
          },
        );
      },
      (error:any) => {
        console.log('table create query transaction failed: ', error);
      },
      (success:any) => {
        console.log('table create query transaction:', 'success');
      },
    );

    // -------------------------------- CUSTOMER IDX -----------------------------------------------

    db.transaction(
      (tx:any) => {
        const query_idx_customer = `CREATE UNIQUE INDEX IF NOT EXISTS idx_customer ON  CUSTOMER(CusID) `;

        tx.executeSql(
          query_idx_customer,
          [],
          (tx:any, response:any) => {
            console.log(`create customer table index success CUSTOMER: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create customer table index key error CUSTOMER: `, error);
          },
        );
      },
      (error:any) => {
        console.log('customer table create query transaction failed: ', error);
      },
      (success:any) => {
        console.log('customer table create query transaction:', 'success');
      },
    );


    //  --------------------------------------------- SERVICES IDX ---------------------------------------------------------

    db.transaction(
      (tx:any) => {
        const query_idx_service = `CREATE UNIQUE INDEX IF NOT EXISTS idx_service ON  SERVICE(serviceId) `;

        tx.executeSql(
          query_idx_service,
          [],
          (tx:any, response:any) => {
            console.log(`create table index success SERVICE: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table index key error SERVICE: `, error);
          },
        );
      },
      (error:any) => {
        console.log('table create query transaction failed:SERVICE ', error);
      },
      (success:any) => {
        console.log('table create query transaction:SERVICE', 'success');
      },
    );

  //  --------------------------------------------- Expences IDX ---------------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_Expences = `CREATE UNIQUE INDEX IF NOT EXISTS idx_expences ON  EXPENCES(ExpenseRequestID) `;

      tx.executeSql(
        query_idx_Expences,
        [],
        (tx:any, response:any) => {
          console.log(`create table index success EXPENCES: `, response);
        },
        (tx:any, error:any) => {
          console.log(`create table index key error EXPENCES: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

  //  --------------------------------------------- Priorirty IDX ---------------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_Priority = `CREATE UNIQUE INDEX IF NOT EXISTS idx_priority ON  PRIORITY_LIST(Id) `;

      tx.executeSql(
        query_idx_Priority,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success PRIORITY: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error PRIORITY: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed_PRIORITY: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

  //  --------------------------------------------- TECHNISIAN IDX ---------------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_userTypes = `CREATE UNIQUE INDEX IF NOT EXISTS idx_userTypes ON  USER_TYPES(Id) `;

      tx.executeSql(
        query_idx_userTypes,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success TECHNISIAN: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error TECHNISIAN: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed_TECHNISIAN: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

  //  --------------------------------------------- Contact Person IDX ---------------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_ContactPerson = `CREATE UNIQUE INDEX IF NOT EXISTS idx_contactPerson ON  Contact_Person(Id) `;

      tx.executeSql(
        query_idx_ContactPerson,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success Contact_Person: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error Contact_Person: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed_Contact_Person: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );


  //  --------------------------------------------- EXPENCES TYPE IDX ---------------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_ExpencesTypes = `CREATE UNIQUE INDEX IF NOT EXISTS idx_expences_type ON  EXPENCES_TYPE(expTypeId) `;

      tx.executeSql(
        query_idx_ExpencesTypes,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success EXPENCES_TYPE: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error EXPENCES_TYPE: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed_EXPENCES_TYPE: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

  //  ---------------------------------------------  Resorces IDX ---------------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_Resources = `CREATE UNIQUE INDEX IF NOT EXISTS idx_resources ON  Resources(ResourcesID)`;

      tx.executeSql(
        query_idx_Resources,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success Resources: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error Resources: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed_Resources: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

  // ------------------------------- Customer Items IDX -----------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_Resources = `CREATE UNIQUE INDEX IF NOT EXISTS idx_customerItem ON  Customer_Items(ItemCode,CustomerCode)`;

      tx.executeSql(
        query_idx_Resources,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success CustomerItem: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error CustomerItem: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed_CustomerItem: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );


  // ------------------------------------------ Item Serial No IDX-------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_Resources = `CREATE UNIQUE INDEX IF NOT EXISTS idx_ItemSerialNo ON  Item_serialNO(ItemCode,InternalSN)`;

      tx.executeSql(
        query_idx_Resources,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success Item_serialNO: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error Item_serialNO: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed_Item_serialNO: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );


  // ------------------------------------------------ User IDX -----------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_User = `CREATE UNIQUE INDEX IF NOT EXISTS idx_User ON User(user_id)`;

      tx.executeSql(
        query_idx_User,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success User: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error User: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed User: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

  // ----------------------------------- User_Type IDX --------------------------------------


  db.transaction(
    (tx:any) => {
      const query_idx_UserType = `CREATE UNIQUE INDEX IF NOT EXISTS idx_UserType ON User_Type(type_id)`;

      tx.executeSql(
        query_idx_UserType,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success User: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error User: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed User: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );


   // ----------------------------------- Vehicle IDX --------------------------------------


   db.transaction(
    (tx:any) => {
      const query_idx_Vehicle = `CREATE UNIQUE INDEX IF NOT EXISTS idx_Vehicle ON Vehicle(VehicleID)`;

      tx.executeSql(
        query_idx_Vehicle,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success Vehicle: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error Vehicle: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed Vehicle: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

  // ----------------------------------- Tool IDX --------------------------------------


  db.transaction(
    (tx:any) => {
      const query_idx_Tool = `CREATE UNIQUE INDEX IF NOT EXISTS idx_Tool ON Tool(ItemCode)`;

      tx.executeSql(
        query_idx_Tool,
        [],
        (tx: any, response: any) => {
          console.log(`create table index success Tool: `, response);
        },
        (tx: any, error: any) => {
          console.log(`create table index key error Tool: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed Tool: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

  return null;

} catch (error) {
  console.log('remove Item_serialNO duplicate failed:SERVICE ', error);

}

}

//INSERT QUERY
export const insertData = (data:any, callBack:any) => {
  try {
    db.transaction(
      (tx:any) => {
        data.forEach(table => {
          let queryString = `INSERT INTO ${table.table} (${table.columns}) VALUES (${table.values})`;

          tx.executeSql(
            queryString,
            table.params,
            (tx:any, response:any) => {
              // console.log(`insert data success ${table.table}: `, response);
            },
            (tx:any, error:any) => {
              console.log(`insert data error ${table.table}: `, error);
            },
          );
        });
      },
      (error:any) => {
        console.log('insert data query transaction failed: ', error);
        callBack(null, error); //notify caller
      },
      (success:any) => {
        console.log('insert data query transaction success: ', success);
        callBack(success ?? 'success', null); //notify caller
      },
    );
  } catch (error) {
    console.log('insert data error: ', data);
    callBack(null, error); //notify caller
  }
};

//UPDATE QUERY
// export const updateData = (data, callBack) => {
//   try {
//     db.transaction(
//       tx => {
//         data.forEach(table => {
//           let queryString = `UPDATE ${table.table} SET ${table.query}`;

//           tx.executeSql(
//             queryString,
//             table.params,
//             (tx, response) => {
//               console.log(`update data success ${table.name}: `, response);
//             },
//             (tx, error) => {
//               console.log(`update data error ${table.name}: `, error);
//             },
//           );
//         });
//       },
//       error => {
//         console.log('update data query transaction failed: ', error);
//         callBack(null, error); //notify caller
//       },
//       success => {
//         console.log('update data query transaction success: ', success);
//         callBack(success ?? 'success', null); //notify caller
//       },
//     );
//   } catch (error) {
//     console.log('update data error: ', data);
//     callBack(null, error); //notify caller
//   }
// };


//UPDATE QUERY
export const updateData = (query:any, params:any, callBack:any) => {
  try {
    db.transaction(
      (tx:any) => {
        tx.executeSql(
          query,
          params,
          (tx:any, response:any) => {
            console.log(`update data success : `, response);
          },
          (tx:any, error:any) => {
            console.log(`update data error: `, error);
          },
        );

      },
      (error:any) => {
        console.log('update data query transaction failed: ', error);
        callBack(null, error); //notify caller
      },
      (success:any) => {
        console.log('update data query transaction success: ', success);
        callBack(success ?? 'success', null); //notify caller
      },
    );
  } catch (error) {
    console.log('update data error: ', error);
    callBack(null, error); //notify caller
  }
};

//DELETE QUERY
export const deleteData = (data:any, callBack:any) => {
  try {
    db.transaction(
      (tx:any) => {
        data.forEach(table => {
          let queryString = `DELETE FROM ${table.table} ${table.query}`;

          tx.executeSql(
            queryString,
            table.params,
            (tx:any, response:any) => {
              // console.log(`delete data success ${table.name}: `, response);
            },
            (tx:any, error:any) => {
              // console.log(`delete data error ${table.name}: `, error);
            },
          );
        });
      },
      (error:any) => {
        // console.log('delete data query transaction failed: ', error);
        callBack(null, error); //notify caller
      },
      (success:any) => {
        // console.log('delete data query transaction success: ', success);
        callBack(success ?? 'success', null); //notify caller
      },
    );
  } catch (error) {
    console.log('delete data error: ', data);
    callBack(null, error); //notify caller
  }
};

//SEARCH QUERY
export const searchData = (query: any, params: any, callBack: any) => {
  try {
    db.executeSql(
      query,
      params,
      (tx:any, response:any) => {

        if (tx && tx.rows && tx.rows.raw()) {



          // console.log('search data ................. : ', tx.rows.raw());

          return callBack(tx.rows.raw(), null); //notify caller

        }
      },
      (tx:any, error:any) => {
        callBack(null, error); //notify caller
        console.log('search data error : ', error);
      },
    );
  } catch (error) {
    console.log('search data error: ', error);
    callBack(null, error); //notify caller
  }
};

//ANY QUERY
export const executeQuery = (query:any, params:any, callBack:any) => {
  try {
    db.executeSql(
      query,
      params,
      (tx:any, response:any) => {
        if (tx) {
          console.log('query data : ', tx);
          return callBack(tx, null); //notify caller
        }
        console.log('query data error : no data');
      },
      (tx:any, error:any) => {
        callBack(null, error); //notify caller
        console.log('query data error : ', error);
      },
    );
  } catch (error) {
    console.log('query data error: ', error);
    callBack(null, error); //notify caller
  }
};

//INSERT + UPDATE QUERY
export const indateData = (data:any, callBack:any) => {
  try {
    db.transaction(
      (tx:any) => {
        data.forEach(table => {
          // let queryString = `INSERT INTO ${table.table} (${table.columns}) VALUES (${table.values})
          // ON CONFLICT(${table.primaryKey}) DO UPDATE SET ${table.subQuery}`;

          // console.log("insert query **********************   "+queryString);

          let queryString = `INSERT OR REPlACE INTO ${table.table} (${table.columns}) VALUES (${table.values})`;

          tx.executeSql(
            queryString,
            table.params,
            (tx:any, response:any) => {
              // console.log(`indate data success ${table.table}: `, response);
            },
            (tx:any, error:any) => {
              console.log(`indate data error ${table.table}: `, error);
            },
          );
        });
      },
      (error:any) => {
        console.log(`${data[0].table} data transaction: `, error);
        callBack(null, error); //notify caller
      },
      (success:any) => {
        // console.log(`${data[0].table} data transaction: `, 'success');
        callBack(success ?? 'success', null); //notify caller
      },
    );
  } catch (error) {
    console.log('query data error: ', error);
    callBack(null, error); //notify caller
  }
};