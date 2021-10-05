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
import {me} from '../../services/network';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

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
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  // useEffect(() => {
  //   (async () => {
  //     console.log('Done...');

  //     try {
  //       const res = await me();
  //       console.log('ME:  ', res);
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      // const userData = await AsyncStorage.removeItem('userData');
      const userData = await AsyncStorage.getItem('userData');
      const parseData = JSON.parse(userData);
      // console.log('THATS ME: ', parseData.user.email);
      setEmail(parseData.user.email);
      // console.log('Email: ', parseData.user.email);
    })();
  }, []);

  const populateEmail = (field) => {
    field('email', email);
  };

  const verifyEmail = async (data) => {
    setSpinner(true);
    try {
      const url =
        'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/user/sendmaillink';
      const token = await getToken();
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
      });

      if (response.status == 201) {
        console.log('Verify Email Res:', response);
        setModalVisible(true);
        setSpinner(false);
      }
    } catch (error) {
      let res = error.response.data;
      if (res.status == 409) {
        // Alert.alert('Error', res.statusMsg);
        navigation.navigate('Home');
        console.log(res.statusMsg);
      }
      setSpinner(false);
    }
  };

  const CustomInput = (props) => {
    const {
      field: {name, onBlur, onChange, value},
      form: {errors, touched, setFieldTouched, setFieldValue},
      ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    // console.log('The props: ', props.form);

    // populateEmail(setFieldValue)
    // setFieldValue('email', 'joshuanwosu007@gmail.com');

    return (
      <>
        <Text style={styles.label}>Verify email address</Text>
        <Text
          style={[
            styles.label,
            {
              marginTop: 5,
              fontSize: 12,
              fontWeight: 'normal',
            },
          ]}>
          Confirm email - <Text style={{fontWeight: 'bold'}}>{email}</Text>
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
    verifyEmail(values);
    setEmail(values.email);
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
              email: email,
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
        email={email}
        goHome={() => navigation.navigate('Home')}
      />

      <Spinner visible={spinner} size="large" />
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
