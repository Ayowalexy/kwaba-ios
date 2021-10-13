import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images, icons} from '../../util/index';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {useDispatch, useSelector} from 'react-redux';
import {getBillsCategory} from '../../redux/actions/billsAction';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import CreditCardModalBills from '../../components/CreditCard/CreditCardModalBills';
import Spinner from 'react-native-loading-spinner-overlay';
import {buyOtherBills, BuyPurchaseAirtime} from '../../services/network';
import {unFormatNumber} from '../../util/numberFormatter';
import NumberFormat from '../../components/NumberFormat';

const CableTvBill = ({navigation, route}) => {
  const dispatch = useDispatch();
  let name = route.params.name;
  const [active, setActive] = useState(false);
  const [serviceID, setServiceID] = useState('');
  const [providerName, setProviderName] = useState('');
  const [packageModal, setPackageModal] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [packageName, setPackageName] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [amount, setAmount] = useState(0);
  const [customerID, setCustomerID] = useState('');
  const [variationCode, setVariationCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [showCardModal, setShowCardModal] = useState(false);
  const [resData, setResData] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [channel, setChannel] = useState('');

  const getBillsCategoryLists = useSelector(
    (state) => state.getBillCategoryReducer,
  );

  useEffect(() => {
    getBillsItems();
  }, [providerName]);

  useEffect(() => {
    if (packageName != '') {
      let selectedPackage = packageData?.filter(
        (item) => item.name == packageName,
      )[0];
      setAmount(selectedPackage?.variation_amount);
      setVariationCode(selectedPackage?.variation_code);
    }
  }, [packageName]);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const getBillsItems = async () => {
    if (serviceID != '') {
      console.log('Service ID: ', serviceID);

      try {
        const token = await getToken();
        const url = `https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/get_bills_items/${serviceID}`;
        const response = await axios.get(url, {
          headers: {'Content-Type': 'application/json', Authorization: token},
        });
        setPackageData(response?.data?.data?.content?.varations);
      } catch (error) {
        console.log('The Error:', error);
      }
    }
  };

  useEffect(() => {
    dispatch(getBillsCategory('tv-subscription'));
    (async () => {
      const user = await getUser();
      setPhoneNumber(user.telephone);
    })();
  }, []);

  const openPanel = () => {
    setActive(true);
    Keyboard.dismiss();
  };

  const closePanel = () => {
    setActive(false);
  };

  const handleRoute = async () => {
    // const data = {
    //   serviceID: 'gotv-jinja',
    //   billersCode: '08011111111',
    //   variation_code: 'airt-50',
    //   amount: 49.99,
    //   recepient: '08011111111',
    // };
    setShowPaymentModal(true);
  };

  const handlePaymentRoute = async (value) => {
    setSpinner(true);
    const data = {
      serviceID: serviceID,
      billersCode: customerID,
      variation_code: variationCode,
      amount: unFormatNumber(amount),
      recepient: phoneNumber,
    };
    // console.log('Hello', data);

    if (value == 'paystack') {
      const response = await buyOtherBills(data);

      console.log('The buy response: ', response);
      if (response.status == 200) {
        setSpinner(false);

        setShowCardModal(true); // show card modal
        setResData(response?.data?.data);
        setChannel(value); //paystack
      } else {
        setSpinner(false);
      }
    } else if (value == 'bank') {
      console.log(value);
    } else {
      console.log(value); // wallet
    }
  };
  return (
    <>
      <View style={{flex: 1}}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{
            fontWeight: '900',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          color={COLORS.primary}
        />

        <View style={{paddingHorizontal: 20, flex: 1}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: COLORS.primary,
              marginLeft: 5,
            }}>
            {name}
          </Text>

          <TouchableOpacity style={styles.customInput} onPress={openPanel}>
            {providerName == '' ? (
              <Text style={{color: '#BFBFBF'}}>Choose a provider</Text>
            ) : (
              <Text style={{color: COLORS.dark, fontWeight: 'normal'}}>
                {providerName}
              </Text>
            )}

            <Icon
              name="chevron-down-outline"
              size={20}
              style={{fontWeight: 'bold'}}
              color={COLORS.dark}
            />
          </TouchableOpacity>

          {serviceID != '' && (
            <TouchableOpacity
              style={styles.customInput}
              onPress={() => setPackageModal(true)}>
              {packageName == '' ? (
                <Text style={{color: '#BFBFBF'}}>Packages</Text>
              ) : (
                <Text style={{color: COLORS.dark, fontWeight: 'normal'}}>
                  {packageName}
                </Text>
              )}
              <Icon
                name="chevron-down-outline"
                size={20}
                style={{fontWeight: 'bold'}}
                color={COLORS.dark}
              />
            </TouchableOpacity>
          )}

          <View style={[styles.customInput, {padding: 0}]}>
            <TextInput
              style={{
                width: '100%',
                paddingLeft: 20,
                paddingVertical: 16,
                color: COLORS.dark,
              }}
              placeholder="Customer ID"
              placeholderTextColor="#BFBFBF"
              keyboardType="phone-pad"
              value={customerID}
              onChangeText={(text) => {
                setCustomerID(text);
              }}
            />
          </View>

          {/* <View style={[styles.customInput, {padding: 0}]}>
            <TextInput
              style={{
                width: '100%',
                paddingLeft: 20,
                paddingVertical: 16,
                color: COLORS.dark,
                // fontWeight: 'bold',
              }}
              placeholder="Amount"
              placeholderTextColor="#BFBFBF"
              keyboardType="phone-pad"
              value={amount ? '₦' + amount : ''}
              editable={false}
            />
          </View> */}

          <NumberFormat
            value={amount}
            onChangeText={(text) => setAmount(text)}
            editable={false}
          />

          <View style={[styles.customInput, {padding: 0, display: 'none'}]}>
            <TextInput
              style={{
                width: '100%',
                paddingLeft: 20,
                paddingVertical: 16,
                color: COLORS.dark,
              }}
              placeholder="Phone Number"
              placeholderTextColor="#BFBFBF"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleRoute}
            disabled={customerID.length < 1 || amount == '' || phoneNumber < 11}
            style={[
              styles.btn,
              {
                backgroundColor: '#00DC99',
                backgroundColor:
                  customerID.length < 1 || amount == '' || phoneNumber < 11
                    ? '#00DC9950'
                    : '#00DC99',
                width: '100%',
                borderRadius: 10,
                zIndex: 0,
                // marginTop: 20,
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                lineHeight: 30,
                fontWeight: 'bold',
              }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <SwipeablePanel
        showCloseButton
        fullWidth
        isActive={active}
        onClose={closePanel}
        closeOnTouchOutside={true}
        style={{
          position: 'absolute',
          zIndex: 9,
          backgroundColor: '#ffffff',
        }}
        onPressCloseButton={closePanel}>
        <View style={{flex: 1}}>
          {getBillsCategoryLists?.data?.content?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setServiceID(item.serviceID);
                  setProviderName(item.name);
                  setPackageName('');
                  closePanel();
                }}
                key={index}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#BFBFBF20',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#9D98EC40',
                    marginRight: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item?.image}}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 40,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: COLORS.dark,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SwipeablePanel>

      <SwipeablePanel
        showCloseButton
        fullWidth
        isActive={packageModal}
        onClose={() => setPackageModal(false)}
        closeOnTouchOutside={true}
        style={{
          position: 'absolute',
          zIndex: 9,
          backgroundColor: '#ffffff',
        }}
        onPressCloseButton={() => setPackageModal(false)}>
        {packageData?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setPackageName(item.name);
                setPackageModal(false);
              }}
              key={index}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF20',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 20,
                paddingHorizontal: 30,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'normal',
                  color: COLORS.dark,
                  textAlign: 'left',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </SwipeablePanel>

      <Spinner visible={spinner} size="large" />

      {showCardModal && (
        <CreditCardModalBills
          onRequestClose={() => setShowCardModal(!showCardModal)}
          visible={showCardModal}
          info={resData}
          navigation={navigation}
          redirectTo="BillsHome"
          channel={channel}
        />
      )}

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(value) => {
            handlePaymentRoute(value); // paystack, bank, wallet
          }}
        />
      )}
    </>
  );
};

export default CableTvBill;

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },

  btn: {
    padding: 15,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
