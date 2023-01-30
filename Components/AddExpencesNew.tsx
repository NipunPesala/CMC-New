import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform, ToastAndroid, Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import ComponentsStyles from '../Constant/Components.styles';
import ActionButton from './ActionButton';
import {useNavigation} from '@react-navigation/native';
import InputText from './InputText';
import moment from 'moment';
import {
  getLoginUserName,
  getASYNC_CURRENT_TICKET_ID,
} from '../Constant/AsynStorageFuntion';
import {
  saveExpences,
  getExpenceById,
  updateExpences,
} from '../SQLiteDatabaseAction/DBControllers/ExpencesController';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAllExpencesType} from '../SQLiteDatabaseAction/DBControllers/ExpencesTypeController';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from './Header';
var id: any;
var loginUser: any;
var type: any;
var exid: any;
const AddExpencesNew = (props: any) => {
  const {navigation, route} = props;
  const [isFocus, setIsFocus] = useState(false);

  const [craeteDate, setCreateDate] = useState('');
  const [TicketID, setTicketID] = useState('');
  const [loginUser1, setloginUser1] = useState('');
  const [ExTypeList, setExTypeList] = useState([]);
  const [amount, setamount] = useState('');
  const [remark, setremark] = useState('');
  const [expencesTypeId, setexpencesTypeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [show, setShow] = useState(false);
  const [dateType, setDateType] = useState('');
  const [title, settitle] = useState('');
  const [btntitle, setbtntitle] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    if (dateType == 'fromDate') {
      setStartDate(moment(new Date(currentDate)).format('DD-MM-YYYY'));
    } else {
    }
  };

  const showDatePicker = (currentMode: any) => {
    console.log('awaaaaaaaaaaaaaaaa..................');

    setShow(true);
    setDateType(currentMode);
  };

  const test = () => {
    console.log(' okkkkkkkk................... ');
  };

  const saveExpencesData = () => {
    const sendData = [
      {
        ServiceCall_ID: TicketID,
        ExpenseTypeID: expencesTypeId,
        Amount: amount,
        Remark: remark,
        CreatedBy: loginUser,
        CreateDate: craeteDate,
        RelaventDate: startDate,
        status: 0,
      },
    ];
    // if(!/^[0-9]+$/.test(amount)){
    //     ToastAndroid.show("Please Enter only  numeric characters..  ", ToastAndroid.SHORT);
    // }else{

    // }

    if (TicketID != null) {
      if (expencesTypeId != '') {
        if (amount != '') {
          if (!/^[0-9]+$/.test(amount)) {
            ToastAndroid.show(
              'Please Enter only numeric characters. ',
              ToastAndroid.SHORT,
            );
          } else {
            if (startDate != '') {
              if (type == '1') {
                UpdateData();
              } else if (type === '0') {
                SaveData(sendData);
              }
            } else {
              ToastAndroid.show(
                'Please Select Relevent Date..!  ',
                ToastAndroid.SHORT,
              );
            }
          }
        } else {
          ToastAndroid.show('Please Enter Amount..!  ', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          'Please Select Expences Type..!  ',
          ToastAndroid.SHORT,
        );
      }
    } else {
      ToastAndroid.show('Please Check Service ID..!  ', ToastAndroid.SHORT);
    }
  };

  const UpdateData = () => {
    updateExpences(
      TicketID,
      expencesTypeId,
      amount,
      remark,
      loginUser,
      craeteDate,
      startDate,
      '0',
      exid,
      (result: any) => {
        console.log(result, '!!!!!!!!!!!!!!!!!!!!');
        ToastAndroid.show('Expences Save Success ', ToastAndroid.SHORT);
        navigation.goBack();
      },
    );
  };
  const SaveData = (data: any) => {
    try {
      saveExpences(data, (result: any) => {
        console.log(result, 'saveExpences');

        if (result === 'success') {
          ToastAndroid.show('Expences Save Success ', ToastAndroid.SHORT);
          // navigation.goBack();
          navigation.navigate('TicketDetails', {
            tab: 'Expences',
          });
        } else {
          Alert.alert('Failed...!', 'Service Call Save Failed.', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAndGoBack = () => {
    Alert.alert('Cancle', 'Are you sure ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  };

  useEffect(() => {
    type = route.params.type;

    if (type == '1') {
      settitle('Update Expences');
      setbtntitle('Update');
      exid = route.params.exid;

      load_UpdateOldData(exid);
    } else if (type === '0') {
      settitle('Add New Expences');
      setbtntitle('Add');
    }

    console.log('------------------------', type);

    getAllExpencesType((result: any) => {
      // setServiceCallList(result);
      console.log(result);
      setExTypeList(result);
    });

    getASYNC_CURRENT_TICKET_ID().then(res => {
      console.log(res);
      id = res;
      setTicketID(id);
      console.log(
        res,
        '+++++++++++++++++++++33333333333333+++++++++++++++++++++++++++',
      );
    });
    getLoginUserName().then(res => {
      console.log(res, '++++++++++++++++++++++++++++++++++++++++++++++++');
      loginUser = res;
      setloginUser1(loginUser);
      // setTicketID(id);

      console.log(
        loginUser,
        '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
        loginUser1,
      );
    });
    setCreateDate(moment().utcOffset('+05:30').format('YYYY-MM-DD kk:mm:ss'));
  }, []);

  const load_UpdateOldData = (id: any) => {
    getExpenceById(id, (result: any) => {
      var amount = result[0].Amount;

      console.log(amount, '^^^^^^^^^^^666666666^^^^^^^^^^^^^^', id);
      setamount(result[0].Amount + '');
      setremark(result[0].Remark);
      setStartDate(result[0].RelaventDate);

      getAllExpencesType((result1: any) => {
        console.log('************', result1);

        // setServiceCallList(result);
        const data = result1?.filter(
          (a: any) => a.name == result[0].ExpenseTypeID,
        )[0];
        // setSelectAssistance(data.name)
        console.log(data.name, '------------------------------');
        setexpencesTypeId(data.name);
      });
    });
  };
  return (
    <SafeAreaView style={ComponentsStyles.CONTAINER}>
      {/* <TouchableOpacity style={style.dashStyle} onPress={() => navigation.goBack()} /> */}
      <Header title="" isBtn={true} btnOnPress={() => navigation.goBack()} />
      <View style={{padding: 5}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={style.maintxt}>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          padding: 10,
        }}>
        {/* <ActionButton title="Cancel" style={style.loginBtn} textStyle={style.txtStyle} onPress={() => { closeModal(false) }} /> */}
        <ActionButton
          title="Cancel"
          style={style.loginBtn}
          textStyle={style.txtStyle}
          onPress={cancelAndGoBack}
        />
        <ActionButton
          title={btntitle}
          style={{flex: 0.5}}
          onPress={() => saveExpencesData()}
        />
      </View>

      <ScrollView style={style.scrollStyle} nestedScrollEnabled={true}>
        <View>
          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Create Date"
            stateValue={craeteDate}
            editable={false}
            style={ComponentsStyles.serviceTicketInput}
          />
          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Service ID"
            stateValue={TicketID}
            editable={false}
            style={ComponentsStyles.serviceTicketInput}
          />
          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Create Date"
            stateValue={loginUser1}
            editable={false}
            style={ComponentsStyles.serviceTicketInput}
          />
          <View style={{zIndex: 50}}>
            <Dropdown
              style={[
                style.dropdown,
                isFocus && {borderColor: ComponentsStyles.COLORS.BORDER_COLOR},
              ]}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              iconStyle={style.iconStyle}
              data={ExTypeList}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={!isFocus ? 'Select Expences type ' : '...'}
              searchPlaceholder="Search Expences type"
              value={expencesTypeId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                // setValue(item.description);
                // setSelectItemCode(item.itemCode);

                // changeItemName(item.description);
                // ItemDesc = item.description;
                console.log(item.expTypeId + '  .................... ');
                setexpencesTypeId(item.name);

                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={style.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={15}
                />
              )}
            />
          </View>

          <View style={{padding: 5}} />
          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Enter Amount"
            stateValue={amount}
            setState={setamount}
            editable={true}
            style={ComponentsStyles.serviceTicketInput}
            max={8}
            keyType={"number-pad"}
          />

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <InputText
                placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
                placeholder="Date relevent to Expences"
                stateValue={startDate}
                setState={setStartDate}
                editable={false}
                style={ComponentsStyles.serviceTicketInput}
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign
                name="calendar"
                size={30}
                onPress={() => showDatePicker('fromDate')}
                color={ComponentsStyles.COLORS.BLACK}
              />
            </View>
          </View>

          <InputText
            placeholderColor={ComponentsStyles.COLORS.HEADER_BLACK}
            placeholder="Enter Remark"
            stateValue={remark}
            editable={true}
            setState={setremark}
            max={35}
            style={ComponentsStyles.serviceTicketInput}
          />
        </View>
      </ScrollView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{padding: 30}} />
    </SafeAreaView>
  );
};
export default AddExpencesNew;

const style = StyleSheet.create({
  txtStyle: {
    color: ComponentsStyles.COLORS.ICON_BLUE,
  },
  loginBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: ComponentsStyles.COLORS.ICON_BLUE,
    flex: 0.5,
    marginRight: 10,
  },
  scrollStyle: {
    marginBottom: 0,
    marginLeft: 13,
    marginRight: 13,
  },
  dashStyle: {
    width: 50,
    height: 5,
    backgroundColor: ComponentsStyles.COLORS.DASH_COLOR,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  maintxt: {
    color: ComponentsStyles.COLORS.BLACK,
    fontSize: 18,
    fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: ComponentsStyles.COLORS.HEADER_BLACK,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    color: ComponentsStyles.COLORS.BLACK,
    fontFamily: ComponentsStyles.FONT_FAMILY.REGULAR,
  },
  placeholderStyle: {
    fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
    fontSize: 12,
    color: ComponentsStyles.COLORS.BLACK,
  },
  selectedTextStyle: {
    fontFamily: ComponentsStyles.FONT_FAMILY.SEMI_BOLD,
    fontSize: 12,
    color: ComponentsStyles.COLORS.ICON_BLUE,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
