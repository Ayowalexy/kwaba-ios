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
import designs from './style';
import {useDispatch} from 'react-redux';
import {soloSaving} from '../../../redux/actions/savingsActions';
import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

const soloSavingFormSchema = yup.object().shape({
  savingTitle: yup.string().required('Please provide saving title'),
  savingOption: yup.string().required('Please select saving option'),
  savingFrequency: yup.string().required('Please select saving frequency'),
  savingDuration: yup.string().required('Please select saving duration'),
});

export default function Screen1({navigation}) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    try {
      let chosenDuration =
        values.savingDuration == '3 Months'
          ? '3months'
          : values.savingDuration == '6 Months'
          ? '6months'
          : '1years';
      const data = {
        name: values.savingTitle,
        auto_save: values.savingOption == 'auto' ? true : false,
        target_amount: Number(unFormatNumber(values.targetAmount)),
        frequency: values.savingFrequency,
        how_long: chosenDuration,
      };
      // console.log('SOLO SAVING DATA: ', data);
      navigation.navigate('SoloSaving2', data);
    } catch (error) {}
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
        <Text style={[designs.boldText, {marginTop: 20}]}>
          Create your savings title?
        </Text>
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
        <Text style={[designs.boldText, {marginTop: 35}]}>
          How long do you want to save for?
        </Text>
        <View style={designs.options}>
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
        <View style={designs.header}>
          <Text
            style={{
              color: '#00DC99',
              fontSize: 16,
              fontFamily: 'CircularStd',
              fontWeight: 'bold',
              lineHeight: 20,
            }}>
            Solo Saving
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 10,
              fontFamily: 'CircularStd',
              fontWeight: '600',
              lineHeight: 13,
              marginTop: 1,
            }}>
            Save towards your next rent alone
          </Text>
        </View>

        <Formik
          validationSchema={soloSavingFormSchema}
          initialValues={{
            savingTitle: '',
            savingOption: '',
            savingFrequency: '',
            savingDuration: '',
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({handleSubmit, isValid, values, setValues}) => (
            <>
              <Field
                component={CustomInput}
                name="savingTitle"
                placeholder="e.g Next year's rent"
              />

              <Field component={ActiveOptionSelection} name="savingOption" />

              <Field component={FrequencySelection} name="savingFrequency" />

              <Field component={HowLongSelection} name="savingDuration" />

              <TouchableOpacity
                onPress={handleSubmit}
                // disabled={isValid ? false : true}
                disabled={values.savingDuration != '' && isValid ? false : true}
                style={[
                  designs.button,
                  {
                    // backgroundColor: isValid ? '#00DC99' : '#00DC9950',
                    backgroundColor:
                      values.savingDuration != '' && isValid
                        ? '#00DC99'
                        : '#00DC9950',
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
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
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
