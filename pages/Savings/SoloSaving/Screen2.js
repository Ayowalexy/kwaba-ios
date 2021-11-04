import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {soloSaving} from '../../../redux/actions/savingsActions';
import moment from 'moment';
import NumberFormat from '../../../components/NumberFormat';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import {formatNumber, unFormatNumber} from '../../../util/numberFormatter';

const soloSavingFormSchema = yup.object().shape({
  targetAmount: yup.string().required('Please provide saving amount'),
  savingStartOption: yup.string().required('Please select saving start date'),
});

export default function Screen2(props) {
  const dispatch = useDispatch();
  // const savings = useSelector((state) => state.soloSavingReducer);
  // const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));
  // const [startOption, setStartOption] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [instantSaving, setInstantSaving] = useState(null);

  const [howLong, setHowLong] = useState('');

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSubmit = (values) => {
    try {
      const data = {
        ...props.route.params,
        target_amount: Number(unFormatNumber(values.targetAmount)),
        start_date:
          values.savingStartOption == 'today'
            ? moment().format('YYYY-MM-DD')
            : moment(date).format('YYYY-MM-DD'),
        savings_amount:
          values.savingStartOption == 'today'
            ? Number(unFormatNumber(instantSaving))
            : 50,
      };
      // console.log(data);
      props.navigation.navigate('SoloSaving3', data);
    } catch (error) {}
  };

  useEffect(() => {
    // console.log('How Long?: ', props.route.params?.how_long);
    setHowLong(props.route.params?.how_long);
  }, []);

  const NumberInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    const hl = howLong.toString().charAt(0).split(''); //

    return (
      <>
        <Text style={[designs.boldText, {marginTop: 18}]}>
          How much do you want to save in {hl}{' '}
          {hl == '1' ? 'Year' : hl == '6' ? 'Months' : 'Months'}
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
            onChangeText={(text) => onChange(name)(text)}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  // const HowLongSelection = (props) => {
  //   const howLongList = ['3 Months', '6 Months', '1 Year'];

  //   const {
  //     field: {name, onBlur, onChange, value},
  //     form: {errors, touched, setFieldTouched, setFieldValue},
  //     ...inputProps
  //   } = props;

  //   const hasError = errors[name] && touched[name];
  //   return (
  //     <>
  //       <Text style={[designs.boldText, {marginTop: 35}]}>
  //         How long do you want to save for?
  //       </Text>
  //       <View style={designs.options}>
  //         {howLongList.map((duration, index) => {
  //           return (
  //             <TouchableOpacity
  //               key={index}
  //               onPress={() => setFieldValue('savingDuration', duration)}
  //               style={{
  //                 display: 'flex',
  //                 alignItems: 'center',
  //                 justifyContent: 'center',
  //                 borderRadius: 5,
  //                 width: '32%',
  //                 height: 54,
  //                 backgroundColor: duration == value ? '#9D98EC' : 'white',
  //               }}>
  //               <Text
  //                 style={{
  //                   fontSize: 12,
  //                   fontWeight: '600',
  //                   color: duration == value ? 'white' : '#465969',
  //                   lineHeight: 19,
  //                 }}>
  //                 {duration}
  //               </Text>
  //             </TouchableOpacity>
  //           );
  //         })}
  //       </View>

  //       {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
  //     </>
  //   );
  // };

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
    <View style={designs.container}>
      <Icon
        onPress={() => props.navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <Formik
          validationSchema={soloSavingFormSchema}
          initialValues={{
            targetAmount: '',
            savingStartOption: '',
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({handleSubmit, isValid, values, setValues}) => (
            <>
              {/* <Field component={HowLongSelection} name="savingDuration" /> */}
              <Field
                component={NumberInput}
                name="targetAmount"
                placeholder="Amount"
              />

              <Field
                component={StartOptionSelection}
                name="savingStartOption"
              />

              <Text
                style={{
                  width: '100%',
                  fontSize: 12,
                  marginTop: 10,
                  textAlign:
                    values.savingStartOption == 'today' ? 'left' : 'right',
                  paddingHorizontal: 10,
                  color: '#465969',
                }}>
                {values.savingStartOption &&
                  new Date(date.toISOString()).toDateString().slice(4)}
              </Text>

              {values.savingStartOption == 'today' && (
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
                  display="spinner"
                  minimumDate={moment().add(1, 'days').toDate()}
                />
              )}

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={values.targetAmount != '' && isValid ? false : true}
                style={[
                  designs.button,
                  {
                    backgroundColor:
                      values.targetAmount != '' && isValid
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
