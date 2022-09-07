import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import Spinner from 'react-native-loading-spinner-overlay';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {formatNumber, unFormatNumber} from '../../util/numberFormatter';
import moment from 'moment';
import {moveMoneyToSavingsPlan} from '../../services/network';

const moveMoneyFormSchema = yup.object().shape({
  title: yup.string().required('Please provide title'),
  frequency: yup.string().required('Please select frequency'),
  targetAmount: yup.string().required('Please provide target amount'),
  savingsMethod: yup.string().required('Please select method'),
  savingDuration: yup.string().required('Please select duration'),
});

export default function MoveMoneyModal(props) {
  const {onRequestClose, visible, savingsData, navigation} = props;
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = async (values) => {
    let chosenDuration =
      values.savingDuration == '3 Months'
        ? '3months'
        : values.savingDuration == '6 Months'
        ? '6months'
        : '1years';

    let endDate = moment(savingsData?.savings[0].start_date)
      .add(Number(chosenDuration[0]), chosenDuration[1].toUpperCase())
      .format('YYYY-MM-DD');

    const data = {
      name: values.title,
      frequency: values.frequency,
      target_amount: values.targetAmount,
      how_long: chosenDuration,
      savings_method: values.savingsMethod,
      interest_rate: savingsData?.savings[0].locked ? '11' : '10', // we can get the interest from api
      savings_amount: savingsData?.savings[0].amount,
      savings_id: savingsData?.savings[0].id,
      locked: savingsData?.savings[0].locked,
      auto_save: values.savingOption == 'auto' ? true : false,
      end_date: endDate,
    };

    try {
      setSpinner(true);

      const res = await moveMoneyToSavingsPlan(data);
      console.log('The Res: ', res);

      if (res.status == 200) {
        setSpinner(false);
        onRequestClose();
        navigation.navigate('PaymentSuccessful', {
          name: 'Home',
          content: 'Successful',
          subText: `Your money has been moved to ${values.title}.`,
        });
      } else {
        setSpinner(false);
        Alert.alert('Oops!', 'Something went wrong, please try again later.');
      }
    } catch (error) {
      console.log('The Error: ', error);
      setSpinner(false);
      Alert.alert('Oops!', 'An error occured, please try again later.');
    }

    // console.log('The Value Here: ', values);
    // console.log('The Move Data Here: ', data);
  };

  const CustomInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={[styles.boldText, {marginTop: 20}]}>Savings title?</Text>
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
            }}
            // style={designs.textInput}
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

  const FrequencySelection = (props) => {
    const frequencyList = ['Daily', 'Weekly', 'Monthly'];

    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    // console.log(value);

    return (
      <>
        <Text style={[styles.boldText, {marginTop: 18}]}>
          Saving frequency?
        </Text>

        <View style={styles.options}>
          {frequencyList.map((frequency, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setFieldValue('frequency', frequency);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  width: '32%',
                  height: 50,
                  backgroundColor: value == frequency ? '#9D98EC' : 'white',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: value == frequency ? 'white' : '#465969',
                    lineHeight: 19,
                  }}>
                  {frequency}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const ActiveOptionSelection = (props) => {
    const optionLists = [
      {
        title: 'Automatic',
        body: 'I would like to be debited automatically',
        tag: 'auto',
      },
      {
        title: 'Manual Savings',
        body: 'I would like to save \nwhenever I want',
        tag: 'manual',
      },
    ];
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    // console.log(value);
    return (
      <>
        <Text style={[styles.boldText, {marginTop: 33}]}>Savings method?</Text>
        <View style={styles.options}>
          {optionLists.map(({title, body, tag}, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setFieldValue('savingsMethod', tag)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 13,
                  borderRadius: 5,
                  width: '48%',
                  backgroundColor: value == tag ? '#9D98EC' : 'white',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: value == tag ? 'white' : '#465969',
                    lineHeight: 19,
                  }}>
                  {title}
                </Text>
                <Text
                  style={{
                    color: value == tag ? 'white' : '#ADADAD',
                    fontSize: 12,
                    fontWeight: '600',
                    lineHeight: 15,
                    marginTop: 5,
                  }}>
                  {body}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const HowLongSelection = (props) => {
    const howLongList = ['3 Months', '6 Months', '1 Year'];

    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
      <>
        <Text style={[styles.boldText, {marginTop: 35}]}>
          How long do you want to save for?
        </Text>
        <View style={styles.options}>
          {howLongList.map((duration, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setFieldValue('savingDuration', duration)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  width: '32%',
                  height: 54,
                  backgroundColor: duration == value ? '#9D98EC' : 'white',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: duration == value ? 'white' : '#465969',
                    lineHeight: 19,
                  }}>
                  {duration}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const NumberInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched, values},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    const duration = values?.savingDuration.toString().charAt(0).split('');

    return (
      <>
        <Text style={[styles.boldText, {marginTop: 18}]}>
          How much do you want to save in {duration}{' '}
          {duration == '1' ? 'Year' : duration == '6' ? 'Months' : 'Months'}
        </Text>
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
            onChangeText={(text) => {
              const n = unFormatNumber(text);
              console.log('N: ', n);
              onChange(name)(n.replace(/\D/g, ''));
            }}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View
            style={{
              height: 50,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={onRequestClose}>
              <Icon name="arrow-back" size={25} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <View style={{flex: 1}}>
              <View
                style={{
                  borderBottomColor: '#eee',
                  borderBottomWidth: 1,
                  paddingHorizontal: 30,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  Create Savings Plan
                </Text>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 12,
                    fontWeight: '600',
                    opacity: 0.5,
                    paddingBottom: 10,
                  }}>
                  Move your money to savings plan
                </Text>
              </View>

              <ScrollView
                contentContainerStyle={{paddingHorizontal: 30}}
                showsVerticalScrollIndicator={false}
                scrollEnabled>
                <Formik
                  validationSchema={moveMoneyFormSchema}
                  initialValues={{
                    title: '',
                    savingsMethod: '',
                    frequency: '',
                    savingDuration: '',
                    targetAmount: '',
                  }}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}>
                  {({handleSubmit, isValid, values, setValues}) => (
                    <>
                      <Field
                        component={CustomInput}
                        name="title"
                        placeholder="e.g Next year's rent"
                      />

                      <Field
                        component={ActiveOptionSelection}
                        name="savingsMethod"
                      />

                      <Field component={FrequencySelection} name="frequency" />

                      <Field
                        component={HowLongSelection}
                        name="savingDuration"
                      />

                      {values.savingDuration != '' && (
                        <Field
                          component={NumberInput}
                          name="targetAmount"
                          placeholder="Amount"
                        />
                      )}

                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={[
                          styles.button,
                          {
                            backgroundColor: isValid ? '#00DC99' : '#00DC9950',
                          },
                        ]}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: '600',
                            fontSize: 14,
                            lineHeight: 30,
                          }}>
                          Move
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Formik>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    backgroundColor: COLORS.white,
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    backgroundColor: '#F7F8FD',
    overflow: 'hidden',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
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
  boldText: {
    fontSize: 16,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  textInput: {
    width: 380,
    height: 70,
    padding: 20,
    marginTop: 13,
    backgroundColor: 'white',
    borderRadius: 10,
    // borderColor: '#EAEAEA',
    borderColor: '#ADADAD50',
    borderWidth: 1,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  button: {
    width: 380,
    // height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginTop: 40,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginBottom: 20,

    width: '100%',
    paddingVertical: 15,
    // elevation: 2,
  },
});
