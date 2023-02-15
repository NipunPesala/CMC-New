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
    AsyncStorage,
} from 'react-native';
import Header from '../../Components/Header';
import ComStyles from '../../Constant/Components.styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import InputText from '../../Components/InputText';
import ActionButton from '../../Components/ActionButton';
import SparepartsItem from '../../SubComponents/SparepartsItem';
import { spareparts } from '../../Constant/DummyData';
import ActinModalCmponent from '../../Components/ActionModalComponent';
import style from './style';
import AddSparePartsComponent from '../../Components/AddSparePartsComponent';
import RequestBottomSheet from '../../Components/RequestBottomSheet';
import AddAdditionalSpareParts from '../../Components/AddAdditionalSpareParts';
import { getSearchSpareParts, getSparePartsAllData } from '../../SQLiteDatabaseAction/DBControllers/SparePartsController';
import { getASYNC_CURRENT_TICKET_ID } from '../../Constant/AsynStorageFuntion';
import AsyncStorageConstants from '../../Constant/AsyncStorageConstants';

let height = Dimensions.get('screen').height;

let list: [] = [];

const SparePartsScreen = () => {
    const navigation = useNavigation();
    const [isShowSweep, setIsShowSweep] = useState(true);
    const [modalStyle, setModalStyle] = useState(new Animated.Value(height));
    const [isSparepart, setIsSparepart] = useState(true);
    const [isAdditional, setIsAdditional] = useState(true);
    const [SparePartList, setSparePartList] = useState([]);
    const [searchText, setSearchText] = useState();

    const slideInModal = () => {
        setIsShowSweep(false);
        console.log('sampleIn');
        Animated.timing(modalStyle, {
            toValue: height / 8,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };
    //#endregion

    //#region SlideOutModal

    const slideOutModal = () => {
        setIsShowSweep(true);
        Keyboard.dismiss();
        Animated.timing(modalStyle, {
            toValue: height,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const getSpareParts = () => {



        getSparePartsAllData((result: any) => {


            setSparePartList(result);



            // console.log(" Spare Parts11111111111  ................  ", result);
            // console.log(" Spare Parts List  ................  ", SparePartList.length);


        });
    };

    const searchSpareParts = (text: any) => {

        console.log(" txt .............  ", text);


        setSearchText(text);

        getSearchSpareParts(text, (result: any) => {

            setSparePartList(result);

        });



    }

    const checkInprogressTicket = () => {

        AsyncStorage.setItem(AsyncStorageConstants.SELECT_TICKET, 'true');
        navigation.navigate("RequestBottomSheet");

    }

    useFocusEffect(
        React.useCallback(() => {
            getSpareParts();

        }, []),
    );

    // useEffect(() => {
    //     getSpareParts();
    // });

    // useEffect(() => {

    //     const focusHandler = navigation.addListener('focus', () => {
    //         getSpareParts();
    //     });
    //     return focusHandler;
    // }, [navigation]);


    return (
        <SafeAreaView style={ComStyles.CONTAINER}>
            {/* <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    top: modalStyle,
                    backgroundColor: '#fff',
                    zIndex: 20,
                    borderRadius: 10,
                    elevation: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginLeft: 0,
                    ...Platform.select({
                        ios: {
                            paddingTop: 50,
                        },
                    }),
                }}>
                <View style={style.modalCont}> */}

            {/* if (isSparepart) {

                        <AddSparePartsComponent
                            onpressicon={() => slideOutModal()}
                            onpress={() => setIsSparepart(true)}
                        />

                    }else if (isAdditional) {


                        // <AddAdditionalSpareParts
                        // onpressicon={() => slideOutModal()}
                        // onpress={() => setIsAdditional(true)}
                        // />

                    }else{

                        <RequestBottomSheet
                            onpressicon={() => slideOutModal()}
                            addAdditional={() => setIsAdditional(false)}
                            addOnpress={() => setIsSparepart(false)}
                        />

                    } */}


            {/* {isSparepart ?
                        <RequestBottomSheet
                            onpressicon={() => slideOutModal()}
                            addAdditional={() => setIsAdditional(false)}
                            addOnpress={() => setIsSparepart(false)}
                        />
                        :
                        <AddSparePartsComponent
                            onpressicon={() => slideOutModal()}
                            onpress={() => setIsSparepart(true)}
                        />

                    } */}



            {/* </View>
            </Animated.View> */}

            <Header
                isBtn={true}
                title="Spare Parts"
                btnOnPress={() => navigation.goBack()}
            />

            <View style={ComStyles.CONTENT}>
                <InputText
                    placeholder="Search Spare Parts"
                    is_clr_icon={true}
                    icon_name1="search1"
                    iconClr="rgba(60, 60, 67, 0.6)"
                    style={{
                        marginTop: 5,
                        paddingLeft: 50,
                    }}
                    imgStyle={{
                        paddingTop: 10,
                        left: 20,
                    }}
                    stateValue={searchText}
                    setState={(newText: any) => searchSpareParts(newText)}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: ComStyles.COLORS.TICKET_HEADER_ASH,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        marginTop: 5,
                    }}>
                    <Text
                        style={{
                            flex: 1,
                            fontFamily: ComStyles.FONT_FAMILY.SEMI_BOLD,
                            fontSize: 13,
                        }}>
                        ID
                    </Text>
                    <Text
                        style={{
                            flex: 2,
                            fontFamily: ComStyles.FONT_FAMILY.SEMI_BOLD,
                            fontSize: 13,
                        }}>
                        Description
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            fontFamily: ComStyles.FONT_FAMILY.SEMI_BOLD,
                            fontSize: 13,
                        }}>
                        Qty
                    </Text>
                </View>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    // data={Arrays.SelectPackage.Wash.filter(ob => ob.extras == true)}
                    data={SparePartList}
                    style={{ marginTop: 5, marginBottom: 5, flex: 2 }}
                    renderItem={({ item }) => {
                        return (
                            <SparepartsItem
                                is_additional={true}
                                id={item.SparePartNo}
                                description={item.description}
                                quantity={item.stock_qty}
                            />
                        );
                    }}
                    keyExtractor={item => `${item.spId}`}
                />

                <ActionButton
                    title="Request Spare Parts "
                    style={{ marginBottom: 70 }}
                    is_icon={true}
                    icon_name="diff-added"
                    onPress={() => checkInprogressTicket()}
                    iconColor={ComStyles.COLORS.WHITE}
                />
            </View>
        </SafeAreaView>
    );
};
export default SparePartsScreen;
