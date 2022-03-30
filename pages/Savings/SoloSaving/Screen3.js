import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {images} from '../../../util/index';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {soloSaving} from '../../../redux/actions/savingsActions';
import {unFormatNumber, numberWithCommas} from '../../../util/numberFormatter';
import CardAndBankModal from './CardAndBankModal';
import PaymentTypeModal from '../../../components/PaymentType/PaymentTypeModal';
import DepositModal from './DepositModal';
import SubsequentModal from './SubsequentModal';
import DepositWalletModal from './DepositWalletModal';
import PaystackPayment from '../../../components/Paystack/PaystackPayment';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  completeSavingsPayment,
  getInterestRate,
  userCreateSavings,
  verifySavingsPayment,
  verifyWalletTransaction,
} from '../../../services/network';
import PaymentTypeModalSavings from '../../../components/PaymentType/PaymentTypeModalSavings';
import ConfirmSave from '../../../components/ConfirmModalsForSaving/ConfirmSave';
import ManualNoPaymentModal from '../../../components/ConfirmModalsForSaving/ManualNoPaymentModal';
import AutoNoPaymentModal from '../../../components/ConfirmModalsForSaving/AutoNoPaymentModal';

export default function Screen3({navigation, route}) {
  const store = useSelector((state) => state.soloSavingReducer);
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [locked, setLocked] = useState(true);

  const savings_target = store.savings_amount * Number(store.savings_tenure[0]);
  const savings_start_date = moment(store.savings_start_date).format(
    'MMM D, YYYY',
  );
  const savings_end_date = moment(store.savings_end_date).format('MMM D, YYYY');
  const toggleSwitch = () => {
    setLocked((previousState) => !previousState);
  };

  const [amountToSave, setAmountToSave] = useState(null);

  const [modal, setModal] = useState(false);
  const [addCardModal, setAddCardModal] = useState(false);

  const [savingsTitle, setSavingsTitle] = useState('');
  const [savingsAmount, setSavingsAmount] = useState(0);
  const [savingsTarget, setSavingsTarget] = useState(0);
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amountToSaveNow, setAmountToSaveNow] = useState(0);

  const [storeData, setStoreData] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showDepositWalletModal, setShowDepositWalletModal] = useState(false);
  const [showSubsequentModal, setShowSubsequentModal] = useState(false);

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [channel, setChannel] = useState('');

  const [spinner, setSpinner] = useState(false);

  const [resData, setResData] = useState('');

  const [mandateType, setMandateType] = useState(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [paymentTypeValue, setPaymentTypeValue] = useState('');

  const [showManualNoPaymentModal, setShowManualNoPaymanetModal] =
    useState(false);

  const [showAutoNoPaymentModal, setShowAutoNoPaymentModal] = useState(false);

  const [verifyData, setVerifyData] = useState('');

  const addCardAndBankModal = () => {
    setModal(true);
    // setShowPaymentModal(true);
  };

  const [lockedSavingsInterestValue, setLockedSavingsInterestValue] =
    useState(0);
  const [unlockedSavingsInterestValue, setUnlockedSavingsInterestValue] =
    useState(0);

  useEffect(() => {
    const data = route.params;

    console.log('The Data: ', data);

    let frequency =
      data.savings_frequency == 1
        ? 'daily'
        : data?.savings_frequency == 7
        ? 'weekly'
        : 'monthly';

    setSavingsTitle(data?.savings_name);
    setSavingsTarget(data?.target_amount);
    setFrequency(frequency);
    setStartDate(data?.start_date);

    let end_date = moment(data.start_date)
      .add(Number(data.savings_period), 'M'.toUpperCase())
      .format('YYYY-MM-DD');

    setEndDate(end_date);

    setStoreData({...data, locked: locked, bvn: ''});

    let start = moment(data?.start_date);
    let end = moment(end_date);

    let diff = end.diff(
      start,
      frequency == 'daily'
        ? 'days'
        : frequency.substring(0, frequency.length - 2).toLowerCase() + 's',
    );
    // console.log('Calc: ', diff);
    setSavingsAmount(data.target_amount / diff);
    setAmountToSaveNow(
      moment().format('YYYY-MM-DD') == data.start_date && data.amount,
    );

    dispatch(soloSaving({locked: locked}));
  }, [locked]);

  const showSuccess = async () => {
    navigation.navigate('PaymentSuccessful', {
      content: 'Payment Successful',
      subText: 'You have successfully funded your savings',
      name: 'SoloSavingDashBoard',
      id: verifyData.id,
    });
  };

  const createSavings = async (bol, paymentChannel) => {
    // ebuka resume here
    setSpinner(true);
    const data = {
      auto_save: route?.params?.auto_save,
      savings_frequency: route?.params?.savings_frequency,
      savings_name: route?.params?.savings_name,
      savings_period: route?.params?.savings_period,
      start_date: route?.params?.start_date,
      target_amount: route?.params?.target_amount,
      savings_amount: Number(savingsAmount).toFixed(2),
      locked: true,
    };
    console.log('payload for savings creation', data);
    const response = await userCreateSavings(data);
    console.log('this has created savings successfully');
    setSpinner(false);
    if (!response) return [];

    if (bol) {
      const vData = response?.data?.data;
      const payloadData = {
        amount: route.params.amount,
        savings_id: vData.id,
        channel: paymentChannel,
        purpose: 'savings',
      };
      await verifyPaymentRequest(payloadData, paymentChannel);
      console.log(
        'payment to create savings verified successfully',
        payloadData,
      );
    } else {
      navigation.navigate('PaymentSuccessful', {
        content: 'Savings Created',
        subText: 'Your savings plan has been created successfully',
        name: 'SoloSavingDashBoard',
        id: response?.data?.data.id,
      });
    }
  };

  const savingsPayment = async (data) => {
    setSpinner(true);

    try {
      // ebuka hereeeee!!!
      if (data?.channel === 'paystack') {
        return await showSuccess();
      }
      const res = await completeSavingsPayment(data);

      if (res.status == 200) {
        // console.log('Complete Paymentttttttttt: ', res?.data);
        await showSuccess();
      }
    } catch (error) {
      console.log('The Error: ', error?.response?.data);
    } finally {
      setSpinner(false);
    }
  };

  const verifyPaymentRequest = async (data, paymentChannel) => {
    setSpinner(true);
    const res = await verifySavingsPayment(data);

    setSpinner(false);
    if (!res) return [];

    if (res.status == 200) {
      const verifyData = res?.data?.data;
      setVerifyData({...verifyData, id: data.savings_id});
      if (paymentChannel == 'wallet') {
        const payload = {
          amount: verifyData.amount,
          savings_id: data.savings_id,
          channel: 'wallet',
          // reference: verifyData.paymentReference,
          reference: verifyData.reference,
          purpose: 'savings',
        };
        await savingsPayment(payload);
      } else {
        setShowPaystackPayment(true);
        console.log('Hello here');
      }
    } else {
      console.log('Error pp: ', res?.response);
    }
  };

  const handleContinue = () => {
    const data = route?.params;

    if (data?.amount == 0) {
      createSavings(false); // no payemnt here, just create the savings thank you.
    } else {
      console.log('Showing payment modal');
      setShowPaymentModal(true);
    }
  };

  const handlePaymentRoute = async (value) => {
    setSpinner(true);
    if (value == 'wallet') {
      createSavings(true, value);
    } else {
      setChannel(value);
      createSavings(true, 'paystack');
    }
  };

  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <Text style={[designs.boldText, {marginTop: 15}]}>
          Review your saving details
        </Text>
        <View style={[designs.summaryBox, {paddingBottom: 16}]}>
          <View style={designs.whiteBox}>
            <View style={{marginTop: 16}}>
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 15,
                  fontWeight: '700',
                  color: '#9D98EC',
                  fontFamily: 'Circular Std',
                }}>
                SOLO SAVING
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#2A286A',
                  lineHeight: 23,
                  fontFamily: 'Circular Std',
                }}>
                {savingsTitle}
              </Text>
            </View>
            <Image
              style={{width: 61, height: 66}}
              source={images.maskGroup15}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>
                {/* Amount To Save {store.savings_frequency} */}
                Amount To Save {frequency}
              </Text>
              <Text style={designs.value}>
                ₦{numberWithCommas(Number(savingsAmount).toFixed(0)) || ' 0.00'}
              </Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Target Amount</Text>
              <Text style={designs.value}>
                ₦{numberWithCommas(Number(savingsTarget).toFixed(0)) || ' 0.00'}
              </Text>
            </View>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>Amount To Save Now </Text>
              <Text style={designs.value}>
                ₦{numberWithCommas(Number(amountToSaveNow).toFixed(2))}
              </Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Start Date</Text>
              <Text style={designs.value}>{startDate}</Text>
            </View>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>End Date</Text>
              <Text style={designs.value}>{endDate}</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Interest Rate</Text>
              <Text style={designs.value}>
                {/* {locked
                  ? lockedSavingsInterestValue
                  : unlockedSavingsInterestValue} */}
                11% P.A
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 23,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                lineHeight: 15,
                marginRight: 23,
              }}>
              Lock saving?
            </Text>
            <Switch
              trackColor={{false: 'white', true: 'white'}}
              thumbColor={locked ? '#00DC99' : '#ADADAD'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={locked}
            />
          </View> */}
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              // height: 26,
              borderRadius: 13,
              backgroundColor: '#00000022',
              padding: 2,
              paddingVertical: 5,
              // paddingHorizontal: 5,
              // marginRight: 'auto',
              // marginLeft: 'auto',
              marginTop: 15,
              // marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#FFE700',
                fontSize: 10,
                lineHeight: 13,
                fontWeight: 'bold',
                fontFamily: 'Circular Std',
                textAlign: 'center',
              }}>
              {/* {locked
                ? ' Keep your rent savings locked to earn higher interest.'
                : 'You will get a lower interest rate if you unlock your rent savings. However, you can withdraw your funds anytime for free'} */}
              {/* To help you not miss your rent payment, withdrawals can only be
              done at your maturity date */}
              To help you not miss your rent payment, withdrawals can only be
              done at the end date of your savings plan
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 100,
          }}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text
            style={{
              color: '#465969',
              fontSize: 12,
              lineHeight: 15,
              fontWeight: 'bold',
            }}>
            I agree to{' '}
            <Text style={{color: '#00DC99'}}>Terms and Conditions</Text>
          </Text>
        </View>
        <TouchableOpacity
          disabled={!toggleCheckBox}
          // onPress={addCardAndBankModal}
          onPress={handleContinue}
          // onPress={() => setShowPaymentModal(true)}
          style={[
            designs.button,
            {
              marginTop: 15,
              backgroundColor: spinner ? '#00DC9950' : '#00DC99',
            },
          ]}>
          <Text
            style={{
              color: toggleCheckBox ? '#fff' : '#ffffff50',
              fontWeight: 'bold',
              fontSize: 12,
              lineHeight: 30,
            }}>
            {spinner ? (
              <ActivityIndicator size="small" color={'#fff'} />
            ) : (
              'CONTINUE'
            )}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {showPaymentModal && (
        <PaymentTypeModal
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(data) => {
            console.log(data);
            handlePaymentRoute(data); // paystack, bank, wallet
          }}
        />
      )}

      {/* {showPaymentModal && (
        <PaymentTypeModalSavings
          onRequestClose={() => setShowPaymentModal(!showPaymentModal)}
          visible={showPaymentModal}
          setPaymentType={(value) => {
            handlePaymentRoute(value); // paystack, bank, wallet
          }}
          setPaymentTypeValue={(value) => {
            setPaymentTypeValue(value); // paystack, bank, wallet
            setShowConfirmModal(true);
          }}
          mandateType={mandateType}
          showConfirmModal={(bol) => {
            setShowConfirmModal(bol);
          }}
          showAutoModal={(bol) => {
            setShowAutoNoPaymentModal(bol);
          }}
          setPaymentWallet={(value) => {
            // handlePaymentRoute(value)
            console.log('The Value: ', value);
            handleCreateSavings();
          }}
        />
      )} */}

      {showConfirmModal && (
        <ConfirmSave
          onRequestClose={() => setShowConfirmModal(!showConfirmModal)}
          visible={showConfirmModal}
          handleClickPaymentType={() => {
            handlePaymentRoute(paymentTypeValue);
          }}
        />
      )}

      {showManualNoPaymentModal && (
        <ManualNoPaymentModal
          onRequestClose={() =>
            setShowManualNoPaymanetModal(!showManualNoPaymentModal)
          }
          visible={showManualNoPaymentModal}
          storeData={storeData}
          navigation={navigation}
        />
      )}

      {showAutoNoPaymentModal && (
        <AutoNoPaymentModal
          onRequestClose={() =>
            setShowAutoNoPaymentModal(!showAutoNoPaymentModal)
          }
          visible={showAutoNoPaymentModal}
          handleClickPaymentType={() => {
            // handlePaymentRoute2(paymentTypeValue, 50);
            console.log('Hello world');
          }}
        />
      )}

      {showPaystackPayment && (
        <PaystackPayment
          onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
          data={verifyData}
          channel={channel}
          paymentCanceled={(e) => {
            setSpinner(false);
            Alert.alert('Payment cancelled');
          }}
          paymentSuccessful={async (res) => {
            const data = {
              amount: verifyData.amount,
              savings_id: verifyData.id,
              channel: 'paystack',
              // reference: verifyData.paymentReference,
              reference: verifyData.reference,
              purpose: 'savings',
            };

            await savingsPayment(data);
          }}
        />
      )}

      {/* <Spinner visible={spinner} size="large" /> */}
    </View>
  );
}
