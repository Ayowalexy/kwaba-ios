import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import designs from '../style';
import {useDispatch} from 'react-redux';
import {soloSaving} from '../../../redux/actions/savingsActions';
import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import NumberFormat from '../../../components/NumberFormat';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const soloSavingFormSchema = yup.object().shape({
  savingOption: yup.string().required('Please select saving option'),
  savingFrequency: yup.string().required('Please select saving frequency'),
  // targetAmount: yup.string().required('Please provide saving amount'),
  // savingStartOption: yup.string().required('Field is required'),
});

export default function Screen1(props) {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [instantSaving, setInstantSaving] = useState(null);

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSubmit = (values) => {
    const data = {
      ...route.params,
      savings_method: values.savingOption,
      // savings_amount: Number(unFormatNumber(values.targetAmount)),
      savings_amount: Number(unFormatNumber(instantSaving)),
      savings_frequency: values.savingFrequency,
      // savings_startOption: values.savingsStartOption,
    };
    console.log('savings method', values.savingOption);
    // console.log('Screen 3: ', Number(unFormatNumber(instantSaving)));

    navigation.navigate('BuddySaving4', data);
  };

  const NumberInput = (props) => {
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
        <Text style={[designs.boldText, {marginTop: 18}]}>
          What is your saving frequency?
        </Text>

        <View style={designs.options}>
          {frequencyList.map((frequency, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setFieldValue('savingFrequency', frequency);
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
        body: 'I would like to save whenever I want',
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
        <Text style={[designs.boldText, {marginTop: 33}]}>
          How do you want to save?
        </Text>
        <View style={designs.options}>
          {optionLists.map(({title, body, tag}, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setFieldValue('savingOption', tag)}
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

  const StartOptionSelection = (props) => {
    const startOptionList = [
      {
        title: 'Will start today',
        tag: 'today',
      },
      {
        title: 'Will pick a preferred date',
        tag: 'pick_date',
      },
    ];
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    return (
      <>
        <Text style={[designs.boldText, {marginTop: 26}]}>
          When do you want to start saving?
        </Text>
        <View style={designs.options}>
          {startOptionList.map(({title, tag}, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setFieldValue('savingStartOption', tag);

                  if (tag == 'pick_date') setShowDate(true);
                  else setDate(moment().toDate());
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  width: '49%',
                  height: 54,
                  backgroundColor: value == tag ? '#9D98EC' : 'white',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: value == tag ? 'white' : '#465969',
                    lineHeight: 15,
                  }}>
                  {title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  return (
    <Formik
      validationSchema={soloSavingFormSchema}
      initialValues={{
        savingOption: '',
        savingFrequency: '',
        // targetAmount: '',
        // savingStartOption: '',
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}>
      {({handleSubmit, isValid, values, setValues}) => (
        <>
          <View style={designs.container}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back-outline"
              size={25}
              style={{fontWeight: '900'}}
              color="#2A286A"
            />
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
              <Field component={ActiveOptionSelection} name="savingOption" />

              {values.savingOption != '' && (
                <Field component={FrequencySelection} name="savingFrequency" />
              )}

              {/* {values.savingFrequency != '' && (
                <>
                  <Text style={[designs.boldText, {marginTop: 18}]}>
                    How much do you want to save (
                    <Text style={{fontSize: 14, color: COLORS.grey}}>
                      {values.savingFrequency}
                    </Text>
                    ) ?
                  </Text>
                  <Field
                    component={NumberInput}
                    name="targetAmount"
                    placeholder="Amount"
                  />
                </>
              )} */}

              {/* {values.savingFrequency != '' && (
                <Field
                  component={StartOptionSelection}
                  name="savingStartOption"
                />
              )} */}

              <Text
                style={{
                  width: '100%',
                  fontSize: 12,
                  marginTop: 10,
                  textAlign: 'right',
                  paddingRight: 10,
                  color: '#465969',
                }}>
                {values.savingStartOption &&
                  new Date(date.toISOString()).toDateString().slice(4)}
              </Text>

              {values.savingFrequency != '' && (
                <>
                  <View style={{overflow: 'hidden'}}>
                    <Animatable.View
                      duration={300}
                      delay={50}
                      easing="ease-in-out"
                      animation="slideInDown">
                      <Text style={[designs.boldText, {marginTop: 26}]}>
                        How much do you want to save today?
                      </Text>
                      <NumberFormat
                        value={instantSaving}
                        onChangeText={(text) => setInstantSaving(text)}
                      />
                    </Animatable.View>
                  </View>
                </>
              )}

              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  onChange={handleDateSelect}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  minimumDate={moment().toDate()}
                />
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isValid ? false : true}
                style={[
                  designs.button,
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
                  Next
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
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
});
