import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import designs from '../style';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {COLORS} from '../../../util';
import {formatNumber} from '../../../util/numberFormatter';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const buddySavingFormSchema = yup.object().shape({
  savingDuration: yup.string().required('Please select saving duration'),
  savingStartDate: yup.string().required('Required'),
  // savingEndDate: yup.string().required('Required'),
  // saving,
});


export default function Screen1(props) {
  const {navigation} = props;
  const [showStartDate, setShowStartDate] = useState(false);

  const top = useSafeAreaInsets().top;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
                  marginTop: 8,
                }}>
                {duration == 'Others' ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
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
                      <IconFA
                        name="calendar-alt"
                        size={20}
                        style={{
                          marginLeft: 10,
                          marginTop: 2,
                          color: duration == value ? 'white' : '#465969',
                        }}
                        color="#2A286A"
                      />
                    </View>
                  </>
                ) : (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: duration == value ? 'white' : '#465969',
                      lineHeight: 19,
                    }}>
                    {duration}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const StartDate = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    const handleStartDateSelect = (event, selectedDate) => {
      const currentDate = selectedDate || startDate;
      setShowStartDate(Platform.OS === 'ios');
      setStartDate(currentDate);
      setFieldValue('savingStartDate', currentDate);
    };

    return (
      <View style={[styles.dateBtnWrapper]}>
        <TouchableOpacity
          style={[styles.dateBtn]}
          onPress={() => {
            setShowStartDate(true);
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: '#465969',
              lineHeight: 19,
            }}>
            {startDate != ''
              ? moment(startDate).format('DD-MM-YYYY')
              : 'Start date'}
          </Text>
          <IconFA
            name="calendar-alt"
            size={18}
            style={{marginLeft: 10}}
            color="#2A286A"
          />
        </TouchableOpacity>
        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}

        {showStartDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate || new Date(Date.now())}
            onChange={handleStartDateSelect}
            mode="date"
            is24Hour={true}
            display="spinner"
            minimumDate={moment().toDate()}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    console.log('Props: ', props.route.params);
  }, []);

  const handleSubmit = async (values) => {

    console.log('values', props.route.params.target_amount, values.savingDuration)
    if((Number(values.savingDuration[0]) === 3) && (props.route.params.target_amount < 50000)){
      return Alert.alert(
        'Invalid Target Amount',
        'The minimum target amount for a 3 month long buddy savings is ₦50,000'
      )
    } else if ((Number(values.savingDuration[0]) === 6) && (props.route.params.target_amount < 100000)){
      return Alert.alert(
        'Invalid Target Amount',
        'The minimum target amount for a 6 month long buddy savings is ₦100,000'
      )
    } else if((Number(values.savingDuration[0]) === 1) && (props.route.params.target_amount < 200000)){
      return Alert.alert(
        'Invalid Target Amount',
        'The minimum target amount for a 12 month long buddy savings is ₦200,000'
      )
    }

    const data = {
      ...props.route.params,
      duration: values.savingDuration[0],
      date_starting: moment(values.savingStartDate),
      date_ending: moment(values.savingStartDate).add(
        Number(values.savingDuration[0]),
        values.savingDuration[2].toUpperCase(),
      ),
    };
    // console.log('The Data: ', data);

    props.navigation.navigate('BuddySaving3', data);
  };

  return (
    <Formik
      validationSchema={buddySavingFormSchema}
      initialValues={{
        savingDuration: '',
        savingStartDate: '',
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}>
      {({handleSubmit, isValid, values, setValues}) => (
        <>
          <View style={[designs.container, { marginTop: Platform.OS == 'ios' ? top : 0}]}>
            <Icon
              onPress={() => navigation.goBack()}
              name="arrow-back-outline"
              size={25}
              style={{fontWeight: '900'}}
              color="#2A286A"
            />
            <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
              <>
                <Text style={[designs.boldText, {marginTop: 20}]}>
                  How long do you and your buddies want{'\n'}to save for?
                </Text>
                <Field component={HowLongSelection} name="savingDuration" />
              </>

              <>
                <View
                  style={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      // flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 13,
                      flexWrap: 'nowrap',
                      // borderWidth: 1,
                    },
                  ]}>
                  <Field component={StartDate} name="savingStartDate" />
                  <Text style={{paddingHorizontal: 10, color: COLORS.dark}}>
                    to
                  </Text>
                  {/* <Field component={EndDate} name="savingEndDate" /> */}
                  <View style={[styles.dateBtnWrapper]}>
                    <TouchableOpacity style={[styles.dateBtn]}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#465969',
                          lineHeight: 19,
                        }}>
                        {values.savingStartDate && values.savingDuration
                          ? moment(values.savingStartDate)
                              .add(
                                Number(values.savingDuration[0]),
                                values.savingDuration[2].toUpperCase(),
                              )
                              .format('DD-MM-YYYY')
                          : 'End date'}
                      </Text>
                      <IconFA
                        name="calendar-alt"
                        size={18}
                        style={{marginLeft: 10}}
                        color="#2A286A"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>

              <View
                style={{
                  display:
                    values.savingStartDate && values.savingDuration
                      ? 'flex'
                      : 'none',
                }}>
                <Text style={[designs.boldText, {marginTop: 40}]}>
                  Withdrawal date will be
                </Text>
                <TouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 1,
                      backgroundColor: '#00DC99',
                      marginTop: 10,
                      marginBottom: 50,
                      width: '100%',
                      paddingVertical: 15,
                      backgroundColor: COLORS.primary,
                      flexDirection: 'row',
                    },
                  ]}>
                  <IconFA
                    name="calendar-check"
                    size={20}
                    style={{marginRight: 10, color: COLORS.yellow}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 12,
                      lineHeight: 30,
                    }}>
                    {values.savingStartDate && values.savingDuration
                      ? moment(values.savingStartDate)
                          .add(
                            Number(values.savingDuration[0]),
                            values.savingDuration[2].toUpperCase(),
                          )
                          .format('DD MMMM YYYY')
                      : 'withdrawal date'}
                  </Text>
                </TouchableOpacity>
              </View>

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
  dateBtnWrapper: {
    flexDirection: 'column',
    width: '45%',
    marginTop: 5,
    // borderWidth: 1,
  },
  dateBtn: {
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    // width: '100%',
    height: 54,
    backgroundColor: '#FFF',
    // borderWidth: 1,
  },
});
