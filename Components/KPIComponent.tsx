import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Text, Dimensions, View, StyleSheet, ScrollView } from 'react-native';
import comStyles from '../Constant/Components.styles';
import moment from 'moment';
import {
  getCompliteTicketCount2,
  getServiceTicketList,
  getAllTicketCount,
  getAllTicketCountNew

} from '../SQLiteDatabaseAction/DBControllers/TicketController';

const KPIComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [closeTicketNum, setCloseTicketNum] = useState(0);
  const [monthlyProf, setMonthlyProf] = useState('');
  const [allTicketCount, setAllTicketCount] = useState(0);

  var convertMonth = "0";

  const startDate = '2022-01-01T12:00:00';
  const endDate = '2022-01-02T12:00:00';
  const [efectTime, setEfectTime] = useState(0);
  var allclose = 0;
  var allCount = 0;
  var calpofor = 0;

  //convert current month to sql readable format
  const convertCurrentMoth = (Month: any) => {
    if (Month === 1) {
      console.log('this is 1 month');
      convertMonth = "01";
      console.log('this is state valuve------------' + convertMonth);
    } else if (Month === 2) {
      convertMonth = "02";
    } else if (Month === 3) {
      convertMonth = "03";
    } else if (Month === 4) {
      convertMonth = "04";
    } else if (Month === 5) {
      convertMonth = "05";
    } else if (Month === 6) {
      convertMonth = "06";
    } else if (Month === 7) {
      convertMonth = "07";
    } else if (Month === 8) {
      convertMonth = "08";
    } else if (Month === 9) {
      convertMonth = "09";
    } else if (Month === 10) {
      convertMonth = "10";
    } else if (Month === 11) {
      convertMonth = "11";
    } else if (Month === 12) {
      convertMonth = "12";
    }
    calculatePreformance(convertMonth);
  };

  console.log('current month - ' + currentMonth);
  useEffect(() => {
    convertCurrentMoth(currentMonth);
    //getAllCloseTiket(convertMonth);
    // getAllTiketInMonth(convertMonth);

    calculateEfect(startDate, endDate);
    //getAllTiketInMonth(convertMonth);

  }, []);

  //calcualte effective time 
  const calculateEfect = (startD: any, endD: any) => {

    const timePeriod = moment(endD).diff(moment(startD), 'hours');
    setEfectTime(timePeriod);
    console.log('effective time ' + timePeriod);
  }
  const getAllTiketInMonth = (currentMonthAll: any) => {
    console.log('+++all close ticket  number Out ++++', allclose);
    getAllTicketCountNew(currentMonthAll, (result: any) => {
      console.log("-----check all ticket ----------", result);
      const { "COUNT(*)": countAll } = result[0];
      allCount = countAll;
      setAllTicketCount(countAll);




    });

  };
  const getAllCloseTiket = (currentMonthClose: any) => {
    getCompliteTicketCount2(currentMonthClose, (result: any) => {
      const { "COUNT(*)": countx } = result[0];
      allclose = countx;
      setCloseTicketNum(countx);
      calpofor = (allclose / allCount * 100);

      if (isNaN(calpofor))
        setMonthlyProf('0');
      else {
        let convertCalPorf = calpofor.toFixed(2);
        setMonthlyProf(convertCalPorf);
      }
    });

  };



  const calculatePreformance = (currentMon: any) => {
    getAllTiketInMonth(currentMon);
    getAllCloseTiket(currentMon);

  }


  return (
    <View>
      <View style={style.detaislContainer}>
        <View style={style.detaislsubContainer}>
          <Text style={style.detaisSubText}>Monthly Closed Tickets</Text>
          <Text style={style.detaisMainText}>{closeTicketNum}</Text>
          <Text style={style.detaisSubText}>30%</Text>
        </View>
        <View style={style.detaislsubContainer}>
          <Text style={style.detaisSubText}>Monthly Performance</Text>
          <Text style={style.detaisMainText}>{monthlyProf}%</Text>
          <Text style={style.detaisSubText}>5.3%</Text>
        </View>
      </View>

      <View style={{ margin: 10 }}></View>

      <View style={style.detaislContainer}>
        <View style={style.detaislsubContainer}>
          <Text style={style.detaisSubText}>Effective Time</Text>
          <Text style={style.detaisMainText}>{efectTime}</Text>
          <Text style={style.detaisSubText}>30%</Text>
        </View>
        <View style={style.detaislsubContainer}>
          <Text style={style.detaisSubText}>Travel Time</Text>
          <Text style={style.detaisMainText}>26H</Text>

          <Text style={style.detaisSubText}>-20%</Text>
        </View>
      </View>

      <View style={{ margin: 10 }}></View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: 5,
    elevation: 5,
    backgroundColor: comStyles.COLORS.WHITE,
    height: 250,
  },

  detaislContainer: {
    flexDirection: 'row',
    height: 100,
    flex: 1,
  },

  detaislsubContainer: {
    flex: 1,
    borderRadius: 5,
    height: 100,
    elevation: 5,
    alignItems: 'center',
    margin: 5,
    backgroundColor: comStyles.COLORS.WHITE,
  },
  detaisSubText: {
    fontSize: 10,
    marginTop: 10,
    alignItems: 'center',
    fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
  },
  detaisMainText: {
    fontSize: 34,
    marginTop: 5,
    color: comStyles.COLORS.Accent_900,
    alignItems: 'center',
    fontFamily: comStyles.FONT_FAMILY.SEMI_BOLD,
  },
});

export default KPIComponent;
