import React, {useRef, useState, useEffect} from 'react';
import {
  // @ts-ignore
  View,
  // @ts-ignore
  Text,
  // @ts-ignore
  StyleSheet,
  // @ts-ignore
  TextInput,
  // @ts-ignore
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../util/index';
import {useForm, FormProvider, useFormContext} from 'react-hook-form';
import FormTextField from './FormTextField';
import cardValidator from 'card-validator';
import {cardNumberFormatter, expirationDateFormatter} from './formatter';
import CardIcon from './CardIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RNPaystack from 'react-native-paystack';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

import {useSelector, useDispatch} from 'react-redux';
import {
  getTotalSoloSavings,
  getMaxLoanCap,
} from '../../redux/actions/savingsActions';

RNPaystack.init({
  publicKey: 'pk_live_a985cb2ee00d4727671240dc7d3db5d8dab2d4bb',
  // publicKey: 'pk_test_803016ab92dcf40caa934ef5fd891e0808b258ef',
});

interface FormModel {
  holderName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
}

enum CardFields {
  CardNumber,
  CardHolderName,
  Expiration,
  CVV,
}

const CreditCardFormRNPL: React.FC = (props: any) => {
  const formMethods = useForm<FormModel>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      // holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  });

  // const holderNameRef = useRef<TextInput>(null);
  const cardNumberRef = useRef<TextInput>(null);
  const expirationRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  const {watch} = useForm();
  const cardNumber = watch('cardNumber');
  const {card} = cardValidator.number(cardNumber);
  const isAmex = card?.type === 'american-express';
  const cvvLength = isAmex ? 4 : 3;

  const [responseInfo, setResponseInfo] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [appID, setAppID] = useState('');

  const dispatch = useDispatch();

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const userData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    return JSON.parse(userData).user;
  };

  // RNPL REPAYMENT VERIFICATION
  const verifyPayment = async (data: any) => {
    const token = await getToken();
    const url =
      'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/rentrepayment/verify';

    try {
      const response = await axios.post(url, data, {
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

  useEffect(() => {
    application();
  }, []);

  const application = async () => {
    const token = await getToken();
    try {
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      const id = applicationIDCallRes.data.data.id;
      console.log('App ID: ', id);
      setAppID(id);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    setResponseInfo(props.ResInfo);
  }, [props]);

  const onSubmit = async (model: FormModel) => {
    // console.log('The props: ', props);
    setSpinner(true);
    console.log('form submitted: ', model);
    const user = await userData();
    try {
      const pay = await RNPaystack.chargeCard({
        cardNumber: '4123450131001381',
        expiryMonth: '10',
        expiryYear: '22',
        cvc: '883',
        email: user.email,
        //@ts-ignore
        amountInKobo: responseInfo?.amount * 100, //@ts-ignore
        reference: responseInfo?.reference,
      });

      const data = {
        reference: pay.reference,
        applicationId: appID,
      };

      // console.log('The Pay: ', data);
      // setSpinner(false);

      const verify = await verifyPayment(data);

      console.log('Verify Response: ', verify);
      setSpinner(false);

      if (verify?.status == 200) {
        console.log('Payment verified');
        console.log('Verify: ', verify);
        setSpinner(false);
        // display success modal
        // navigate to dashboard / homepage

        //dispatch
        dispatch(getTotalSoloSavings());
        // dispatch(getMaxLoanCap());

        props.navigation.navigate('PaymentSuccessful', {
          name: props.redirectTo,
          // id: props.ResInfo.id,
        });
        props.onRequestClose();
      } else {
        setSpinner(false);
      }
    } catch (error) {
      console.log('The Error: ', error);
      setSpinner(false);
    }
  };

  const [focusedField, setFocusedField] = useState<CardFields | null>(null);

  async function goNext() {
    console.log('Next...');
  }

  return (
    <View style={[styles.container]}>
      <FormProvider {...formMethods}>
        <FormTextField
          ref={cardNumberRef}
          style={styles.textField}
          name="cardNumber"
          label="Card Number"
          icon="card"
          keyboardType="number-pad"
          maxLength={19}
          validationLength={isAmex ? 18 : 19}
          rules={{
            required: 'Card number is required.',
            validate: {
              isValid: (value: string) => {
                return (
                  cardValidator.number(value).isValid ||
                  'This card number looks invalid.'
                );
              },
            },
          }}
          formatter={cardNumberFormatter}
          endEnhancer={<CardIcon cardNumber={'4187 4518 4608 2925'} />}
          onFocus={() => setFocusedField(CardFields.CardNumber)}
          onValid={goNext}
        />
        {/* <FormTextField
          ref={holderNameRef}
          style={styles.textField}
          name="holderName"
          label="Cardholder Name"
          icon="person"
          rules={{
            required: 'Cardholder name is required.',
            validate: {
              isValid: (value: string) => {
                return (
                  cardValidator.cardholderName(value).isValid ||
                  'Cardholder name looks invalid'
                );
              },
            },
          }}
          autoCorrect={false}
          onSubmitEditing={goNext}
          onFocus={() => setFocusedField(CardFields.CardHolderName)}
        /> */}
        <FormTextField
          ref={expirationRef}
          style={styles.textField}
          name="expiration"
          label="Expiration Date"
          icon="calendar"
          keyboardType="number-pad"
          maxLength={5}
          validationLength={5}
          rules={{
            required: 'Expiration date is required.',
            validate: {
              isValid: (value: string) => {
                return (
                  cardValidator.expirationDate(value).isValid ||
                  'This expiration date looks invalid.'
                );
              },
            },
          }}
          formatter={expirationDateFormatter}
          onFocus={() => setFocusedField(CardFields.Expiration)}
          onValid={goNext}
        />
        <FormTextField
          ref={cvvRef}
          style={styles.textField}
          name="cvv"
          label="Security Code"
          icon="lock-closed"
          keyboardType="number-pad"
          maxLength={cvvLength}
          validationLength={cvvLength}
          secureTextEntry={true}
          rules={{
            required: 'Security code is required.',
            validate: {
              isValid: (value: string) => {
                return (
                  cardValidator.cvv(value, cvvLength).isValid ||
                  'This security code looks invalid.'
                );
              },
            },
          }}
          onFocus={() => setFocusedField(CardFields.CVV)}
          onValid={goNext}
        />
        <TouchableOpacity
          style={[styles.button]}
          onPress={formMethods.handleSubmit(onSubmit)}>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
            PAY NOW
          </Text>
        </TouchableOpacity>
      </FormProvider>

      <Spinner visible={spinner} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  row: {},
  textField: {
    marginBottom: 10,
    position: 'relative',
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CreditCardFormRNPL;
