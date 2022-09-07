import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons, COLORS } from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';

const completeProfileSchema = yup.object().shape({
  bvn: yup
    .string()
    .required()
    .matches(/^[0-9]{11}$/, 'Must be exactly 11 digits'),
  dob: yup.string()
    // .transform(function (value, originalValue) {
    //   if (this.isType(value)) {
    //     return value;
    //   }
    //   const result = parse(originalValue, "dd.MM.yyyy", new Date());
    //   return result;
    // })
    // .typeError("please enter a valid date")
    // .required()
    // .max("01-01-2006", "You must be at least 16 years old to continue")
});


const Screen2 = ({ navigation }) => {
  // const [date, setDate] = useState(new Date());
  // const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState('01-01-2005')
  const [open, setOpen] = useState(false);
  const top = useSafeAreaInsets().top;

  // getting the age of the user??
  useEffect(() => {
    var years = moment().diff('1997-07-08', 'years');
    var days = moment().diff('1981-01-01', 'days');

    console.log('Years: ', years);
    console.log('Days: ', days);
  }, []);

  const Dob = (props) => {
    const {
      field: { name, value },
      form: { errors, touched, setFieldValue },
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    const handleDateSelect = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDate(Platform.OS === 'ios');
      setDate(currentDate);
      setFieldValue('dob', currentDate);
    };
    return (
      <>
        <>
          <Text style={styles.label}>Date of Birth</Text>

          <DatePicker
            style={{
              width: '100%',
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              borderColor: '#ADADAD50',
              borderWidth: 1,
              marginTop: 10,
              padding: 10
            }}
            date={date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                // marginLeft: 36
                textAlign: 'right',
                borderWidth: 0,
                position: 'absolute',
                left: 0,
                paddingLeft: 10
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setFieldValue('dob', date)
              setDate(date)
            }}
          />

          {/* {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={handleDateSelect}
            mode="date"
            is24Hour={true}
            display="spinner"
          /> */}
          {/* )} */}

          {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </>

      </>

    )
  }

  const CustomInput = (props) => {
    const {
      field: { name, onBlur, onChange, value },
      form: { errors, touched, setFieldTouched },
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={styles.label}>Bank Verification Number</Text>
        <View
          style={[
            styles.customInput,
            props.multiline && { height: props.numberOfLines * 40 },
            hasError && styles.errorInput,
          ]}>
          <TextInput
            style={{
              width: '100%',
              paddingHorizontal: 16,
              paddingVertical: 16,
            }}
            keyboardType="number-pad"
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

  // const DOB = (props) => {
  //   const {
  //     field: { name, value },
  //     form: { errors, touched, setFieldValue },
  //     ...inputProps
  //   } = props;

  //   const hasError = errors[name] && touched[name];

  //   const handleDateSelect = (event, selectedDate) => {
  //     const currentDate = selectedDate || date;
  //     setShowDate(Platform.OS === 'ios');
  //     setDate(currentDate);
  //     setFieldValue('dob', currentDate);
  //   };

  //   return (
  //     <>
  //       <Text style={styles.label}>Date of Birth</Text>
  //       <TouchableOpacity
  //         style={[styles.customInput, { padding: 20 }]}
  //         onPress={() => {
  //           setShowDate(true);
  //           setFieldValue('dob', date);
  //         }}>
  //         <Text
  //           style={{
  //             color: COLORS.primary,
  //           }}>
  //           {moment(date).format('DD-MM-YYYY')}
  //         </Text>

  //         <Image
  //           style={{ width: 20, height: 20 }}
  //           resizeMode="contain"
  //           source={icons.dateTimePicker}
  //         />
  //       </TouchableOpacity>

  //       {showDate && (
  //         <DateTimePicker
  //           testID="dateTimePicker"
  //           value={date}
  //           onChange={handleDateSelect}
  //           mode="date"
  //           is24Hour={true}
  //           display="spinner"
  //         />
  //       )}

  //       {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
  //     </>
  //   );
  // };

  const handleSubmit = async (values) => {
    const complete_profile = await AsyncStorage.getItem('complete_profile');
    await AsyncStorage.setItem(
      'complete_profile',
      JSON.stringify({ ...JSON.parse(complete_profile), ...values }),
    );
    navigation.navigate('CompleteProfile3');
  };

  return (
    <View style={[designs.container, { backgroundColor: '#F7F8FD', marginTop: Platform.OS == 'ios' ? top : 0 }]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{ fontWeight: '900' }}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View
          style={{
            marginTop: 25,
            paddingHorizontal: 10,
          }}>
          <Text
            style={[
              designs.heading,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontSize: 25,
                lineHeight: 32,
              },
            ]}>
            Complete your profile
          </Text>
          <Text
            style={[
              designs.body,
              {
                color: '#465969',
                textAlign: 'left',
                fontSize: 15,
                lineHeight: 19,
              },
            ]}>
            Provide your personal details
          </Text>

          {/* <DOB /> */}

          <Formik
            validationSchema={completeProfileSchema}
            initialValues={{
              bvn: '',
              dob: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({ handleSubmit, isValid, values, setValues }) => (
              <>
                <Field component={CustomInput} name="bvn" placeholder="BVN" />
                <Field component={Dob} name="dob" placeholder={date} />

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[designs.btn, { backgroundColor: '#00DC99' }]}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 14,
                      lineHeight: 30,
                    }}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default Screen2;

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
    marginTop: 40,
    marginLeft: 2,
    fontSize: 14,
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
});
