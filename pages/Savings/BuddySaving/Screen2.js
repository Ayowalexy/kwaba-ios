import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import designs from '../style';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {COLORS} from '../../../util';
import {formatNumber} from '../../../util/numberFormatter';

const buddySavingFormSchema = yup.object().shape({
  savingDuration: yup.string().required('Please select saving duration'),
});

const HowLongSelection = (props) => {
  const howLongList = ['3 Months', '6 Months', '1 Year', 'Others'];

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
                marginTop: 5,
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
              {duration == 'Others' && (
                <IconFA
                  name="calendar"
                  size={15}
                  style={{marginLeft: 10}}
                  color="#2A286A"
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const StartAndStopDate = (props) => {
  const howLongList = ['Start date', 'End date'];

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
                flexDirection: 'row',
                borderRadius: 5,
                width: '48%',
                height: 54,
                backgroundColor: duration == value ? '#9D98EC' : 'white',
                marginTop: 5,
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
                name="calendar"
                size={15}
                style={{marginLeft: 10}}
                color="#2A286A"
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

export default function Screen1({navigation}) {
  const handleSubmit = async (values) => {
    console.log(values);

    navigation.navigate('BuddySaving2');
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
          validationSchema={buddySavingFormSchema}
          initialValues={{
            savingDuration: '',
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({handleSubmit, isValid, values, setValues}) => (
            <>
              <>
                <Text style={[designs.boldText, {marginTop: 20}]}>
                  How long do you and your buddies want{'\n'}to save for?
                </Text>
                <Field component={HowLongSelection} name="savingDuration" />
              </>

              <>
                <Field component={StartAndStopDate} name="savingDuration" />
              </>

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
