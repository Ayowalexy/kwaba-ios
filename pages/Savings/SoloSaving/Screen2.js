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
import {unFormatNumber} from '../../../util/numberFormatter';

const soloSavingFormSchema = yup.object().shape({
  savingDuration: yup.string().required('Please select saving duration'),
  savingStartOption: yup.string().required('Please select saving start date'),
});

export default function Screen2({navigation}) {
  const dispatch = useDispatch();
  // const savings = useSelector((state) => state.soloSavingReducer);
  // const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));
  // const [startOption, setStartOption] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [instantSaving, setInstantSaving] = useState(null);

  const handleDateSelect = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // console.log('Moment:', new Date().toISOString());

  const handleSubmit = (values) => {
    // try {
    //   let chosenDuration =
    //     // I replaced 1 year which is 1y to 12 months which is 12M
    //     duration == '3 Months' ? '3M' : duration == '6 Months' ? '6M' : '12M';
    //   const data = {
    //     savings_tenure: duration,
    //     savings_start_date:
    //       startOption == 'today' ? moment().format() : moment(date).format(),
    //     savings_end_date: moment(date)
    //       .add(Number(chosenDuration[0]), chosenDuration[1])
    //       .format(),
    //     instant_saved_amount: instantSaving,
    //   };
    //   // console.log('M: ', savings_tenure);
    //   dispatch(soloSaving(data));
    //   navigation.navigate('SoloSaving3');
    // } catch (error) {}
    try {
      let chosenDuration =
        values.savingDuration == '3 Months'
          ? '3M'
          : values.savingDuration == '6 Months'
          ? '6M'
          : '1Y';

      const data = {
        savings_tenure: values.savingDuration,
        savings_start_date:
          values.savingStartOption == 'today'
            ? moment().format()
            : moment(date).format(),
        savings_end_date: moment(date).add(
          Number(chosenDuration[0]),
          chosenDuration[1],
        ),
        instant_saved_amount: unFormatNumber(instantSaving),
        saving_start_option: values.savingStartOption,
      };

      console.log(data);
      dispatch(soloSaving(data));
      navigation.navigate('SoloSaving3');
    } catch (error) {
      console.log(error);
    }
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
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <Formik
          validationSchema={soloSavingFormSchema}
          initialValues={{
            savingDuration: '',
            savingStartOption: '',
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({handleSubmit, isValid, values, setValues}) => (
            <>
              <Field component={HowLongSelection} name="savingDuration" />

              <Field
                component={StartOptionSelection}
                name="savingStartOption"
              />

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
                  display="default"
                  minimumDate={moment().toDate()}
                />
              )}

              <TouchableOpacity onPress={handleSubmit} style={[designs.button]}>
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
