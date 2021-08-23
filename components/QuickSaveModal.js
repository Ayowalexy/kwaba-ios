import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../util';
import * as Animatable from 'react-native-animatable';
import {formatNumber, unFormatNumber} from '../util/numberFormatter';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {addFundsToSavings, getUserSavings} from '../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {getTotalSoloSavings} from '../redux/actions/savingsActions';

const amountSchema = yup.object().shape({
  amount: yup.string().required('Please provide amount'),
});

export default function QuickSaveModal(props) {
  const {onRequestClose, visible, openSuccessModal} = props;
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showAmountField, setShowAmountField] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const getSoloSaving = useSelector((state) => state.getSoloSavingsReducer);

  const handleClose = () => {
    setShowPaymentType(false);
    onRequestClose();
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  useEffect(() => {
    getUserSavings();
  }, []);

  const verifyPayment = async (data) => {
    const token = await getToken();
    const url = 'http://67.207.86.39:8000/api/v1/verify_savings_payment';
    try {
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      return error.message;
    }
  };

  const openInAppBrowser = async (url) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#2A286A',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          hasBackButton: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });

        return result;
      } else Linking.openURL(url);
    } catch (error) {
      return error.message;
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSpinner(true);
      const res = await getUserSavings();
      const ID = res.data.data[0].id;

      if (res.status == 200) {
        let data = {
          savings_id: ID,
          amount: Number(unFormatNumber(values.amount)),
          channel: 'paystacks',
        };

        const res = await addFundsToSavings(data);

        if (res.status == 200) {
          setSpinner(false);
          const result = await openInAppBrowser(
            res.data.data.authorization_url,
          );

          if (result.type == 'cancel') {
            let data = {reference: res.data.data.reference};
            const verify = await verifyPayment(data);

            onRequestClose();
            if (verify.status == 200) {
              // navigation.navigate('SoloSavingDashboard');
              Alert.alert('Successful', 'Payment was successful');

              getUserSavings();
              dispatch(getTotalSoloSavings());
            }

            // console.log('Payment verified: ', verify);
            // console.log('dataa: ', data);
          }
          // console.log(res.data.data.authorization_url);
        }

        // const

        // console.log('Data: ', data);
        // console.log('Res: ', res.status);
      }
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  const savings = [
    {
      name: 'Solo Savings',
      img: images.maskGroup15,
    },
    {
      name: 'Buddy Savings',
      img: images.maskGroup14,
    },
  ];

  const payments = [
    {
      name: 'Pay with card',
      img: images.maskGroup29,
    },
    {
      name: 'Pay with wallet',
      img: images.maskGroup31,
    },
  ];

  const NumberInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={[styles.boldText, {marginTop: 18}]}>How much?</Text>
        <View
          style={[
            styles.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && styles.errorInput,
          ]}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              position: 'absolute',
              left: 15,
              color: COLORS.dark,
            }}>
            ₦
          </Text>
          <TextInput
            style={{
              width: '100%',
              paddingLeft: 50,
              paddingVertical: 16,
            }}
            keyboardType="number-pad"
            value={formatNumber(value)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            onChangeText={(text) => onChange(name)(text)}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const PaymentType = () => {
    return (
      <>
        <Icon
          onPress={() => {
            setShowPaymentType(false);
          }}
          name="arrow-back"
          size={25}
          style={{
            right: 0,
            top: 0,
            position: 'absolute',
            zIndex: 2,
            color: COLORS.grey,
            padding: 10,
          }}
        />

        <View style={{paddingLeft: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            Payment method
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'normal',
              color: COLORS.grey,
              marginVertical: 2,
            }}>
            Choose a payment method
          </Text>
        </View>

        {payments.map((item, index) => {
          return (
            <TouchableOpacity
              disabled={item.name.toLocaleLowerCase() == 'pay with wallet'}
              key={index}
              onPress={() => setShowAmountField(true)}
              style={[
                styles.btn,
                {
                  backgroundColor: '#F7F8FD',
                  marginBottom: 0,
                  overflow: 'hidden',
                },
              ]}>
              <View
                style={[styles.displayFlex, {justifyContent: 'space-between'}]}>
                <View style={styles.displayFlex}>
                  <Image
                    style={{height: 50, width: 50, marginBottom: -16}}
                    source={item.img}
                  />
                  <Text
                    style={{
                      color: '#2A286A',
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginLeft: 15,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <Icon
                  style={{
                    color: COLORS.dark,
                    backgroundColor: 'white',
                    borderRadius: 50,
                    padding: 7,
                  }}
                  name="arrow-forward"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  const SavingsType = (props) => {
    return (
      <>
        <Icon
          onPress={handleClose}
          name="close-outline"
          size={25}
          style={{
            right: 0,
            top: 0,
            position: 'absolute',
            color: COLORS.grey,
            zIndex: 2,
            padding: 10,
          }}
        />

        <View style={{paddingLeft: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            Quick Save
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'normal',
              color: COLORS.grey,
              marginVertical: 2,
            }}>
            Where do you want to save to?
          </Text>
        </View>

        {savings.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              disabled={item.name.toLocaleLowerCase() == 'buddy savings'}
              onPress={() => setShowPaymentType(true)}
              style={[
                styles.btn,
                {
                  backgroundColor: '#F7F8FD',
                  marginBottom: 0,
                  overflow: 'hidden',
                },
              ]}>
              <View
                style={[styles.displayFlex, {justifyContent: 'space-between'}]}>
                <View style={styles.displayFlex}>
                  <Image
                    style={{height: 50, width: 50, marginBottom: -16}}
                    source={item.img}
                  />
                  <Text
                    style={{
                      color: '#2A286A',
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginLeft: 15,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <Icon
                  style={{
                    color: COLORS.dark,
                    backgroundColor: 'white',
                    borderRadius: 50,
                    padding: 7,
                  }}
                  name="arrow-forward"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* {visible && ( */}
            {/* <>
              {!showPaymentType ? (
                <Animatable.View
                  duration={300}
                  delay={100}
                  easing="ease-in-out"
                  animation={'slideInLeft'}>
                  <SavingsType />
                </Animatable.View>
              ) : (
                <Animatable.View
                  duration={300}
                  delay={100}
                  easing="ease-in-out"
                  animation="slideInLeft">
                  <PaymentType />
                </Animatable.View>
              )}
            </> */}
            {/* )} */}

            {showAmountField ? (
              <Formik
                validationSchema={amountSchema}
                initialValues={{
                  amount: '',
                }}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}>
                {({handleSubmit, isValid, values, setValues}) => (
                  <>
                    <Icon
                      onPress={() => {
                        setShowAmountField(false);
                        setShowPaymentType(true);
                      }}
                      name="arrow-back"
                      size={25}
                      style={{
                        right: 25,
                        top: 15,
                        position: 'absolute',
                        zIndex: 2,
                        color: COLORS.grey,
                        padding: 10,
                      }}
                    />
                    <Field
                      component={NumberInput}
                      name="amount"
                      placeholder="Amount"
                    />

                    <TouchableOpacity
                      onPress={handleSubmit}
                      disabled={isValid ? false : true}
                      style={[styles.button]}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 12,
                          lineHeight: 30,
                        }}>
                        PROCEED
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            ) : (
              <>
                {!showPaymentType ? (
                  <Animatable.View
                    duration={300}
                    delay={100}
                    easing="ease-in-out"
                    animation={'slideInLeft'}>
                    <SavingsType />
                  </Animatable.View>
                ) : (
                  <Animatable.View
                    duration={300}
                    delay={100}
                    easing="ease-in-out"
                    animation="slideInLeft">
                    <PaymentType />
                  </Animatable.View>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 1,
    paddingVertical: 15,
  },
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#ADADAD',
    borderWidth: 1,
    marginTop: 15,
  },
  creditCard: {
    width: '100%',
    height: 51,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 19,
  },

  boldText: {
    fontSize: 18,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
  },

  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.dark,
    marginTop: 8,
    fontSize: 14,
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },
  button: {
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: COLORS.primary,
    marginTop: 20,
    // marginBottom: 20,

    width: '100%',
    paddingVertical: 15,
  },
});
