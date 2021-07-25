import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons, COLORS} from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import moment from 'moment';

const completeProfileSchema = yup.object().shape({
  bvn: yup
    .string()
    .required()
    .matches(/^[0-9]{11}$/, 'Must be exactly 11 digits'),
  dob: yup.string().required('Field'),
});

const Screen2 = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const CustomInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={styles.label}>Bank Verification Number</Text>
        <View
          style={[
            styles.customInput,
            props.multiline && {height: props.numberOfLines * 40},
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

  const DOB = (props) => {
    const {
      field: {name, value},
      form: {errors, touched, setFieldValue},
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
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowDate(true);
            setFieldValue('dob', date);
          }}>
          <Text
            style={{
              color: COLORS.primary,
            }}>
            {moment(date).format('YYYY-MM-DD')}
          </Text>

          <Image
            style={{width: 20, height: 20}}
            resizeMode="contain"
            source={icons.dateTimePicker}
          />
        </TouchableOpacity>

        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={handleDateSelect}
            mode="date"
            is24Hour={true}
            display="default"
          />
        )}

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  const handleSubmit = async (values) => {
    console.log('Loading...');
    console.log(values);

    navigation.navigate('CompleteProfile5', {data: values});
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true}>
        <View
          style={{
            marginTop: 25,
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

          <Formik
            validationSchema={completeProfileSchema}
            initialValues={{
              bvn: '',
              dob: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({handleSubmit, isValid, values, setValues}) => (
              <>
                <Field component={CustomInput} name="bvn" placeholder="BVN" />
                <Field component={DOB} name="dob" />

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[designs.btn, {backgroundColor: '#00DC99'}]}>
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
