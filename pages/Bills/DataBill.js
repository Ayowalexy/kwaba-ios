import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, images, icons } from '../../util/index';
// import { SwipeablePanel } from 'rn-swipeable-panel';
import { useDispatch, useSelector } from 'react-redux';
import { getBillsCategory } from '../../redux/actions/billsAction';
import axios from 'axios';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import CreditCardModalBills from '../../components/CreditCard/CreditCardModalBills';
import PaymentTypeModal from '../../components/PaymentType/PaymentTypeModal';
import { buyOtherBills, BuyPurchaseAirtime } from '../../services/network';
import NumberFormat from '../../components/NumberFormat';
import { unFormatNumber } from '../../util/numberFormatter';
import { verifySavingsPayment } from '../../services/network';
import { baseUrl } from '../../services/routes';
import { completeSavingsPayment } from '../../services/network';

const DataBill = ({ navigation, route }) => {
  const dispatch = useDispatch();
  let name = route.params.name;
  const [active, setActive] = useState(false);
  const [serviceID, setServiceID] = useState('');
  const [providerName, setProviderName] = useState('');
  const [packageModal, setPackageModal] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [packageName, setPackageName] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [amount, setAmount] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [variationCode, setVariationCode] = useState('');

  const [showCardModal, setShowCardModal] = useState(false);
  const [resData, setResData] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [channel, setChannel] = useState('');
  const [showPaystackPayment, setShowPaystackPayment] = useState(false)
  const [verifyData, setVerifyData] = useState('')
  const [verifyBillsData, setVerifyBillsData] = useState('')

  const [airtimeData, setAirtimeData] = useState('');


  const [billData, setBillData] = useState('');
  const getBillsCategoryLists = useSelector(
    (state) => state.getBillCategoryReducer,
  );

  useEffect(() => {
    getBillsItems();
  }, [serviceID]);

  useEffect(() => {
    console.log('Params: ', route.params);
    const val = route?.params?.data?.filter((item) => item?.name == name);
    console.log('The Value: ', route?.params);
    setAirtimeData(val);
  }, [name]);

  useEffect(() => {
    if (packageName != '') {
      let selectedPackage = packageData.filter(
        (item) => item.name == packageName,
      )[0];
      setAmount(selectedPackage?.variation_amount);
      setVariationCode(selectedPackage?.variation_code);
    }
  }, [packageName]);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const showSuccess = async () => {
    navigation.navigate('PaymentSuccessful', {
      name: 'DataBill',
      content: 'Recharge Successful',
      subText: 'Sent! You have successfully recharged the number',
    });
  };

  const getBillsItems = async () => {
    if (serviceID != '') {
      console.log('Service ID: ', serviceID);
      try {
        const token = await getToken();
        const url = `${baseUrl}/bills/get-bills-items/${serviceID}`;
        console.log(url)
        // const url = `https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/get_bills_items/${serviceID}`;
        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/json', Authorization: token },
        });
        setPackageData(response?.data?.data?.content?.varations);
      } catch (error) {
        console.log('Error:', error.response.data);
      }
    }
  };

  useEffect(() => {
    dispatch(getBillsCategory('data'));
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
    //   serviceID: 'airtel-data',
    //   billersCode: '08011111111',
    //   variation_code: 'airt-50',
    //   amount: 49.99,
    //   recepient: '08011111111',
    // };
    setShowPaymentModal(true);
  };

  const handlePaymentRoute = async (value) => {
    if (value == 'wallet') {
      const data = {
        amount: unFormatNumber(amount),
        channel: 'wallet',
        purpose: 'bills',
        billsMethod: 'billsWithoutBillersCode',
      };

      setChannel(value); //wallet

      await verifyBillsPayment(data, value);
    } else {
      const data = {
        amount: unFormatNumber(amount),
        channel: 'paystack',
        purpose: 'bills',
        billsMethod: 'billsWithoutBillersCode',
      };

      setChannel(value);

      await verifyBillsPayment(data, value);
    }
  };


  const billsPayment = async (data) => {
    setSpinner(true);

    console.log('Airtime payload: ', data);

    try {
      if (data.channel !== 'wallet') {
        setSpinner(false);
        return await showSuccess();
      }
      const res = await completeSavingsPayment(data);

      if (res.status == 200) {
        setSpinner(false);
        console.log('The Res: ', res);

        await showSuccess();
      } else {
        setSpinner(false);
        console.log('Not Okay Res: ', res.response.data);
        Alert.alert('Oops ', 'An error occured');
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response);
    }
  };


  const verifyBillsPayment = async (data, paymentChannel) => {
    setSpinner(true);
    const res = await verifySavingsPayment({
      ...data,
      billsData: {
        amount: unFormatNumber(amount),
        recepient: customerID, //08011111111 for test
        serviceId: providerName, // e.g mtn, airtel, glo, 9mobile
      },
    });

    if (!res) {
      return [];
    }

    if (res.status == 200) {
      setSpinner(false);
      setVerifyBillsData(res?.data?.data);
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: unFormatNumber(amount),
          channel: 'wallet',
          // reference: res?.data?.data?.paymentReference, // from verifyBillsPayment
          reference: res?.data?.data?.reference,
          purpose: 'bills',
          billsMethod: 'billsWithoutBillersCode',
          billsData: {
            amount: unFormatNumber(amount),
            recepient: phoneNumber, //08011111111 for test
            serviceId: airtimeData[0]?.serviceID, // e.g mtn, airtel, glo, 9mobile
          },
        };

        console.log('Billsssss: ', payload);
        await billsPayment(payload);
      } else {
        setShowPaystackPayment(true);
      }
    } else {
      setSpinner(false);
      Alert.alert('Error', 'something went wrong.');
    }
  };


  // const buyOtherBills = async () => {
  //   const data = {
  //     serviceID: serviceID,
  //     billersCode: customerID,
  //     variation_code: variationCode,
  //     amount: amount,
  //     recepient: customerID,
  //   };

  //   setSpinner(true);
  //   const token = await getToken();
  //   const url = 'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/buy_other_bills';
  //   try {
  //     const response = await axios.post(url, data, {
  //       headers: {'Content-Type': 'application/json', Authorization: token},
  //     });
  //     if (response.status == 200) {
  //       setSpinner(false);
  //       setResData(response?.data?.data);
  //       setShowCardModal(true);
  //       console.log('The Response: ', response?.data?.data);
  //     } else {
  //       setSpinner(false);
  //       console.log('Something went wrong', response);
  //     }
  //   } catch (error) {
  //     setSpinner(false);
  //     console.log('The Buy Bill Error: ', error);
  //   }
  // };
  return (
    <>
      <View style={{ flex: 1 }}>
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

        <View style={{ paddingHorizontal: 20, flex: 1 }}>
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
              <Text style={{ color: '#BFBFBF' }}>Choose a provider</Text>
            ) : (
              <Text style={{ color: COLORS.dark, fontWeight: 'normal' }}>
                {providerName}
              </Text>
            )}

            <Icon
              name="chevron-down-outline"
              size={20}
              style={{ fontWeight: 'bold' }}
              color={COLORS.dark}
            />
          </TouchableOpacity>

          {serviceID != '' && (
            <TouchableOpacity
              style={styles.customInput}
              onPress={() => setPackageModal(true)}>
              {packageName == '' ? (
                <Text style={{ color: '#BFBFBF' }}>Packages</Text>
              ) : (
                <Text style={{ color: COLORS.dark, fontWeight: 'normal' }}>
                  {packageName}
                </Text>
              )}
              <Icon
                name="chevron-down-outline"
                size={20}
                style={{ fontWeight: 'bold' }}
                color={COLORS.dark}
              />
            </TouchableOpacity>
          )}

          <View style={[styles.customInput, { padding: 0 }]}>
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
              value={customerID}
              onChangeText={(text) => {
                setCustomerID(text);
                console.log(text);
              }}
            // onTextInput={(text) => {
            //   setCustomerID(text);
            //   console.log(text);
            // }}
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
          />

          <TouchableOpacity
            onPress={handleRoute}
            disabled={customerID.length < 11 || amount == ''}
            style={[
              styles.btn,
              {
                backgroundColor: '#00DC99',
                backgroundColor:
                  customerID.length < 11 || amount == ''
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
      {/* <SwipeablePanel
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
        <View style={{ flex: 1 }}>
          {getBillsCategoryLists?.data?.map((item, index) => {
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
                    source={{ uri: item.image }}
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
      </SwipeablePanel> */}

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


      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={verifyBillsData}
          channel={channel}
          paymentCanceled={(e) => {
            console.log('Pay cancel', e);
            setSpinner(false);
            // Do something
          }}
          paymentSuccessful={async (res) => {
            setSpinner(false);
            const data = {
              amount: unFormatNumber(amount),
              channel: 'paystack',
              // reference: verifyBillsData?.paymentReference, // from verifyBillsPayment
              reference: verifyBillsData?.reference,
              purpose: 'bills',
              billsMethod: 'billsWithoutBillersCode',
              billsData: {
                amount: unFormatNumber(amount),
                recepient: customerID, //08011111111 for test
                serviceId: providerName
                // serviceId: airtimeData[0]?.serviceID, // e.g mtn, airtel, glo, 9mobile
              },
            };

            console.log('We here: ', data);

            await billsPayment(data);
          }}
        />
      )}

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(value) => {
            handlePaymentRoute(value); // paystack, bank, wallet
          }}
        // disable="wallet"
        />
      )}
    </>
  );
};

export default DataBill;

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
