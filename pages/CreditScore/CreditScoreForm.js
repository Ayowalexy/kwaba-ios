import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import AcceptModal from './AcceptModal';
import {creditScorePurchase} from '../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import PaystackPayment from '../../components/Paystack/PaystackPayment';
import PaystackPaymentCobble from '../../components/Paystack/PaystackPaymentCobble';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreditScoreValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  bvn: yup
    .string()
    .test('bvn', 'Must be exactly 11 characters', (val) => val?.length === 11)
    .required('BVN is required'),
});

const CustomInput = (props) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <View
        style={[
          styles.customInput,
          props.multiline && {height: props.numberOfLines * 40},
          hasError && styles.errorInput,
        ]}>
        <TextInput
          style={{
            width: '100%',
            // paddingLeft: 50,
            paddingHorizontal: 16,
            paddingVertical: 16,
            color: COLORS.dark,
          }}
          //   placeholderTextColor={'#a5c2d180'}
          keyboardType="default"
          value={value}
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

export default function CreditScoreForm({navigation}) {
  const [spinner, setSpinner] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showPaystackPayment, setShowPaystackPayment] = useState(false);
  const [resData, setResData] = useState([]);
  const [formValue, setFormValue] = useState([]);

  const userData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    return JSON.parse(userData).user;
  };

  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      bvn: values.bvn,
      company: 'Kwaba',
    };

    setFormValue(data);

    setSpinner(true);

    try {
      const res = await creditScorePurchase(data);
      if (res.status == 200) {
        // console.log('Here is the response: ', res.data.data);
        setResData(res?.data?.data);
        setSpinner(false);
        setShowAcceptModal(true);
      }
    } catch (error) {
      setSpinner(false);
      console.log('The Error: ', error.response);
    }

    console.log('The Data: ', data);
  };

  const handleConnection = async () => {
    setSpinner(true);
    const url = resData?.authorization_url;
    try {
      const result = await openInAppBrowser(url);
      console.log('The Result: ', result);
      setSpinner(false);
      if (result.type == 'cancel') {
        navigation.navigate('CreditScoreAwaiting', formValue);
      }
    } catch (error) {
      setSpinner(false);
      Alert.alert('Oops', 'Something went wrong');
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

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#F7F8FD'} />
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="chevron-back"
            color={COLORS.dark}
            size={20}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 20, flex: 1}}>
          <Formik
            validationSchema={CreditScoreValidationSchema}
            initialValues={{email: '', bvn: ''}}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({handleSubmit, isValid, values, setValues}) => {
              useEffect(() => {
                (async () => {
                  const user = await userData();
                  setValues({email: user.email});
                })();
              }, []);

              return (
                <>
                  <View style={{flex: 1}}>
                    <Field
                      component={CustomInput}
                      name="email"
                      placeholder="Email Address"
                    />

                    <Field
                      component={CustomInput}
                      name="bvn"
                      placeholder="BVN"
                    />
                  </View>

                  <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                    <View style={styles.button}>
                      {spinner ? (
                        <ActivityIndicator size="small" color={COLORS.white} />
                      ) : (
                        <Text style={styles.buttonText}>Continue</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>
        </View>

        {showAcceptModal && (
          <AcceptModal
            onRequestClose={() => setShowAcceptModal(!showAcceptModal)}
            visible={showAcceptModal}
            navigation={navigation}
            onConfirm={() => setShowPaystackPayment(true)}
            // onConfirm={handleConnection}
          />
        )}

        {showPaystackPayment && (
          <PaystackPaymentCobble
            onRequestClose={() => setShowPaystackPayment(!showPaystackPayment)}
            data={{...resData, ...formValue, amount: 2000}}
            channel={'card'}
            paymentCanceled={(e) => {
              console.log('Pay cancel', e);
              Alert.alert(`Payment ${e.status}`);
              setSpinner(false);
              // Do something
            }}
            paymentSuccessful={async (res) => {
              console.log('Pay done', res);
              if (res.status == 'success') {
                // Alert.alert('Awesome!', 'Navigation to checking score!!!!');
                navigation.navigate('CreditScoreAwaiting', formValue);
              } else {
                Alert.alert('Oops', 'Something went wrong');
              }

              // Do something
            }}
          />
        )}

        {/* <Spinner visible={spinner} size="small" /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10131B',
    backgroundColor: COLORS.white,
    backgroundColor: '#F7F8FD',
    flex: 1,
  },

  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#212a33',
    borderColor: '#ADADAD50',
    // backgroundColor: '#2b283550',
    // backgroundColor: 'transparent',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: COLORS.white,
  },

  boldText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
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
    width: '100%',
    backgroundColor: '#212a33',
    backgroundColor: COLORS.light,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    // elevation: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    // color: '#536470',
    textTransform: 'capitalize',
  },
});
