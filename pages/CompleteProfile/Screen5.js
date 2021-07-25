import React, {useState, useEffect} from 'react';
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
import {formatNumber, unFormatNumber} from '../../util/numberFormatter';
import moment from 'moment';
import Modal from '../../components/modal';

const completeProfileSchema = yup.object().shape({
  how_much_is_your_rent: yup.string().required('Please enter an amount'),
  when_is_your_next_rent_due: yup.string().required('Select a date'),
});

const Screen5 = (props) => {
  const {navigation, route} = props;
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [completeProfileData, setCompleteProfileData] = useState([]);

  const NumberInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={styles.label}>How much is your rent?</Text>
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

  const SelectDate = (props) => {
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
      setFieldValue('when_is_your_next_rent_due', currentDate);
    };

    return (
      <>
        <Text style={styles.label}>When is your next rent due?</Text>
        <TouchableOpacity
          style={[styles.customInput, {padding: 20}]}
          onPress={() => {
            setShowDate(true);
            setFieldValue('when_is_your_next_rent_due', date);
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
    let data = {
      bvn: route.params.data.bvn,
      dob: moment(route.params.data.dob).format('YYYY-MM-DD'),
      how_much_is_your_rent: unFormatNumber(values.how_much_is_your_rent),
      when_is_your_next_rent_due: moment(
        values.when_is_your_next_rent_due,
      ).format('YYYY-MM-DD'),
    };

    setCompleteProfileData(data);

    setModalVisible(true);
  };

  const HandleCompleteProfile = async () => {
    console.log('profile data: ', completeProfileData);
    // navigation.navigate('Home');
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
              how_much_is_your_rent: '',
              when_is_your_next_rent_due: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({handleSubmit, isValid, values, setValues}) => (
              <>
                <Field
                  component={NumberInput}
                  name="how_much_is_your_rent"
                  placeholder="Amount"
                />
                <Field
                  component={SelectDate}
                  name="when_is_your_next_rent_due"
                />

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
                    COMPLETE
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>

      <Modal
        onRequestClose={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onSave={() => HandleCompleteProfile()}
      />
    </View>
  );
};

export default Screen5;

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
