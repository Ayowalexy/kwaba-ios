import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {COLORS, icons} from '../util';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {login} from '../services/network';
import {useDispatch, useSelector} from 'react-redux';
import urls from '../services/routes';

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function EmailVerificationModal(props) {
  const {onRequestClose, visible, goHome, email} = props;
  const [spinner, setSpinner] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);

  const loginState = useSelector((state) => state.loginReducer);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const verifyEmail = async () => {
    const data = {
      email: email,
    };
    setSpinner(true);
    try {
      // const url =
      //   'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/user/sendmaillink';
      const url = urls.auth.SEND_EMAIL_VERIFICATION;
      const token = await getToken();
      const response = await axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
      });

      if (response.status == 201) {
        console.log('Verify Email Res:', response);
        // setModalVisible(true);
        // onRequestClose();
        setSpinner(false);
        setEmailSent(true);
      }
    } catch (error) {
      // let res = error.response.data;
      // if (res.status == 409) {
      //   // Alert.alert('Error', res.statusMsg);
      //   navigation.navigate('Home');
      //   console.log(res.statusMsg);
      // }
      setSpinner(false);
      setEmailSent(false);
      console.log('Error', error.response);
    }
  };

  const handleChangeEmail = async () => {
    console.log('Change Email Address');
    setChangeEmail(true);
  };

  const closeEmail = () => {
    onRequestClose();
    setEmailSent(false);
    setChangeEmail(false);
  };

  const handleGoBack = () => {
    console.log('Going Back...');
    setChangeEmail(false);
    setEmailSent(false);
  };

  const handleSubmit = async (values) => {
    console.log('Values: ', values);
    console.log('Login state: ', loginState);
    try {
      const response = await login({
        email: 'realjosh2021@gmail.com',
        password: values.password,
      });
      console.log('Login: reponse: ', response);
    } catch (error) {
      console.log('The Error: ', error);
    }
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
        <View
          style={[
            styles.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && styles.errorInput,
          ]}>
          <TextInput
            style={{
              width: '100%',
              paddingHorizontal: 15,
              paddingVertical: 5,
              fontSize: 12,
            }}
            keyboardType={
              name.toLowerCase() == 'password' ? 'default' : 'email-address'
            }
            value={value}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            onChangeText={(text) => onChange(name)(text)}
            secureTextEntry={name.toLowerCase() == 'password'}
            {...inputProps}
          />
        </View>

        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </>
    );
  };

  return (
    // <View style={styles.centeredView}>
    <Modal
      style={
        {
          // borderTopLeftRadius: 16,
          // borderTopRightRadius: 16,
        }
      }
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        {changeEmail ? (
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                width: 30,
                height: 30,
                borderRadius: 15,
                borderColor: COLORS.grey,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconFA name="angle-left" size={20} color={COLORS.dark} />
            </TouchableOpacity>
            {/* <View style={{marginTop: 20}}> */}
            <View
              style={{
                width: '100%',
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={icons.emailSent}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            </View>
            <Text
              style={{
                color: COLORS.dark,
                fontFamily: 'CircularStd',
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
              }}>
              Update email address
            </Text>

            <Formik
              validationSchema={formSchema}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}>
              {({handleSubmit, isValid, values, setValues}) => (
                <>
                  <View style={{justifyContent: 'flex-start', marginTop: 10}}>
                    <View style={{marginTop: 10}}>
                      <Text style={[styles.label]}>
                        Which email would you like to use with Kwaba?
                      </Text>
                      <Field
                        component={CustomInput}
                        name="email"
                        placeholder="Enter the email you'd like to login with"
                      />
                    </View>
                    <View style={{marginTop: 10}}>
                      <Text style={[styles.label]}>
                        Confirm your current password
                      </Text>
                      <Field
                        component={CustomInput}
                        name="password"
                        placeholder="Password"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                      styles.btn,
                      {backgroundColor: COLORS.secondary, marginTop: 20},
                    ]}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      Use this email address
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        ) : (
          // </View>
          <>
            {!emailSent ? (
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={closeEmail}
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    borderColor: COLORS.grey,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="close-outline" size={20} color={COLORS.dark} />
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={icons.emailSent}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: COLORS.dark,
                    fontFamily: 'CircularStd',
                    fontWeight: 'bold',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  We still need to confirm{'\n'}your email
                </Text>

                <View
                  style={{
                    marginTop: 10,
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'CircularStd',
                      color: COLORS.grey,
                      fontSize: 12,
                      // fontWeight: 'bold',
                      textAlign: 'center',
                      paddingHorizontal: 20,
                      lineHeight: 20,
                    }}>
                    Should we send the confirmation to{'\n'}
                    <Text
                      style={{
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                      {email}
                    </Text>
                    ?
                  </Text>
                  <TouchableOpacity
                    onPress={verifyEmail}
                    style={[
                      styles.btn,
                      {backgroundColor: COLORS.secondary, marginTop: 20},
                    ]}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      Yes, that's my email
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleChangeEmail}
                    style={[styles.btn, {backgroundColor: '#F5F5F5'}]}>
                    <Text
                      style={{
                        color: COLORS.dark,
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      No, change my email
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={closeEmail}
                    style={[styles.btn, {backgroundColor: COLORS.white}]}>
                    <Text
                      style={{
                        color: COLORS.dark,
                        fontSize: 12,
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}>
                      Remind me later
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={closeEmail}
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    borderColor: COLORS.grey,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="close-outline" size={20} color={COLORS.dark} />
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={icons.emailSent}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#2A286A',
                    fontFamily: 'CircularStd',
                    fontWeight: 'bold',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  Please check your email {'\n'}to confirm
                </Text>
                <TouchableOpacity
                  onPress={closeEmail}
                  style={[styles.btn, {backgroundColor: COLORS.white}]}>
                  <Text
                    style={{
                      color: COLORS.dark,
                      fontSize: 12,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    Okay!
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      <Spinner visible={spinner} size="large" />
    </Modal>
    // </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // borderColor: '#f00',
    // borderWidth: 1,
    padding: 20,
    paddingHorizontal: 40,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  btn: {
    width: '100%',
    // height: 70,
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 5,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.dark,
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
