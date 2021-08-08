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
import AsyncStorage from '@react-native-async-storage/async-storage';

const completeProfileSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
});

const Screen5 = (props) => {
  const {navigation, route} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [completeProfileData, setCompleteProfileData] = useState([]);

  const CustomInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
      <>
        <Text style={styles.label}>Verify email address</Text>
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
            keyboardType="email-address"
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

  const handleSubmit = async (values) => {
    const complete_profile = await AsyncStorage.getItem('complete_profile');
    await AsyncStorage.setItem(
      'complete_profile',
      JSON.stringify({...JSON.parse(complete_profile), ...values}),
    );

    setModalVisible(true);
  };

  const HandleCompleteProfile = async () => {
    const complete_profile = await AsyncStorage.getItem('complete_profile');
    const parseData = JSON.parse(complete_profile);

    let {
      bvn,
      dob,
      how_much_is_your_rent,
      when_is_your_next_rent_due,
    } = parseData;

    console.log(
      bvn,
      moment(dob).format('MMM-DD-YYYY'),
      unFormatNumber(how_much_is_your_rent),
      moment(when_is_your_next_rent_due).format('YYYY-MM-DD'),
    );
    setModalVisible(false);
    navigation.navigate('Home');
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
              email: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({handleSubmit, isValid, values, setValues}) => (
              <>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email"
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
                    Verify
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
