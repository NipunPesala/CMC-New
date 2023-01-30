import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Text, Dimensions, View, StyleSheet, ScrollView} from 'react-native';
import comStyles from '../Constant/Components.styles';
import moment from 'moment';
import {
  getCompliteTicketCount,
  getServiceTicket,
  getCompliteTicketCount2,
  getServiceTicketList,
  getAllTicketCount,
} from '../SQLiteDatabaseAction/DBControllers/TicketController';

const KPIComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [closeTicketNum, setCloseTicketNum] = useState(0);
  const [monthlyProf, setMonthlyProf] = useState(0);
  var convertMonth = "0";
  const startDate = '2022-01-01T12:00:00';
  const endDate = '2022-01-02T12:00:00';
  const[efectTime,setEfectTime]=useState(0);
  //convert current month to sql readable format
  
  const convertCurrentMoth = (Month: any) => {
    console.log(
      '-------------------------this is convertCurrentMoth----------',
    );
    if (Month === 1) {
      console.log('this is 1 month');
      convertMonth="01";
      console.log('this is state valuve------------' + convertMonth);
    } else if (Month === 2) {
        convertMonth="02";
    } else if (Month === 3) {
        convertMonth="03";
    } else if (Month === 4) {
        convertMonth="04";
    } else if (Month === 5) {
        convertMonth="05";
    } else if (Month === 6) {
        convertMonth="06";
    } else if (Month === 7) {
        convertMonth="07";
    } else if (Month === 8) {
        convertMonth="08";
    } else if (Month === 9) {
        convertMonth="09";
    } else if (Month === 10) {
        convertMonth="10";
    } else if (Month === 11) {
        convertMonth="11";
    }else if (Month === 12) {
        convertMonth="12";
    }
  };

  console.log('current month - ' + currentMonth);
  useEffect(() => {
    convertCurrentMoth(currentMonth);
    //const testmonth = '01';
    getAllCloseTiket(convertMonth);
    
    calculateEfect(startDate,endDate);
    
   
  }, []);

  //calcualte effective time 
const  calculateEfect=(startD:any,endD:any)=>{

  const timePeriod = moment(endD).diff(moment(startD), 'hours');
  setEfectTime(timePeriod);
  console.log('effective time '+timePeriod); 
}


  const getTestAllTiket = () => {
    getServiceTicketList((result: any) => {
      console.log('///////////////', result);
    });
  };
  const getAllCloseTiket = (currentMonth: any) => {
    getCompliteTicketCount2(currentMonth, (result: any) => {
      console.log('--close ticket count--', result);
      //console.log('--close ticket count get to variable--'+result.rows(0)["COUNT(*)"]);
      const{"COUNT(*)":countx}=result[0];
      setCloseTicketNum(countx);
      console.log('--close ticket only number--', countx);
      
    });
   
  };

  const getAllTiket = () => {
    getAllTicketCount((result:any) =>{

        console.log("/////////////////",result);
        const{"COUNT(*)":countAlll}=result[0];
        const Performance=(closeTicketNum/countAlll)*100
        setMonthlyProf(Performance);
        console.log('--close ticket only number--', countAlll);
    
    });
  };
  if(closeTicketNum===0){
    
  }else{
    getAllTiket();
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

      <View style={{margin: 10}}></View>

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

      <View style={{margin: 10}}></View>
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
