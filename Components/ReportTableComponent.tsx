import React, { useState, useEffect } from 'react';
import { StyleSheet ,ScrollView,View} from 'react-native';
import { DataTable } from 'react-native-paper';

const TicketRepart = (headerTitles :any, rows :any ) => {
    //console.log('check data header ______________',headerTitles.headerTitles);
    //console.log('check data  body______________',headerTitles.rows);

  return (
    <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}}>
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        {headerTitles.headerTitles.map(({title}) => (
          <DataTable.Title style={styles.headerData} >{title}</DataTable.Title>
        ))}
      </DataTable.Header>
      <ScrollView style={styles.scrollStyle} nestedScrollEnabled={true}>
      {headerTitles.rows.map((row :any) => (
        <DataTable.Row key={row.a_id}>
          {Object.values(row).map((value) => (
            <DataTable.Cell style={styles.bodyData}>{value}</DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
   </ScrollView >
    </DataTable>
    
    </ScrollView >

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    
  },
  headerData:{
    width:150,
    alignItems:'center',
    justifyContent:'center'    
  },
  bodyData:{
    width:150,
   // padding:80,
   alignItems:'center',    
   justifyContent:'center'
  },
  scrollStyle: {
    marginBottom: 0,
    marginLeft: 13,
    marginRight: 13,
},
});

export default TicketRepart;