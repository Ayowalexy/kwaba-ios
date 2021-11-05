import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../util';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {changePassword} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  ErrorModal,
  SuccessModal,
  WarningModal,
} from '../../../components/MessageModals';

const CustomInput = (props) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <>
      {
        <View
          style={[
            designs.customInput,
            props.multiline && {height: props.numberOfLines * 40},
            hasError && designs.errorInput,
          ]}>
          <TextInput
            style={[
              {
                width: '100%',
                paddingVertical: 16,
                paddingRight: 50,
                paddingLeft: 20,
              },
            ]}
            value={value}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            onChangeText={(text) => onChange(name)(text)}
            {...inputProps}
            secureTextEntry={secureTextEntry}
          />
          <Icon
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            color="#D6D6D6"
            size={20}
            style={{
              position: 'absolute',
              top: 11,
              right: 5,
              padding: 10,
              // borderWidth: 1,
            }}
          />
        </View>
      }

      {hasError && <Text style={designs.errorText}>{errors[name]}</Text>}
    </>
  );
};

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup
    .string()
    .matches(/\d/, 'Password must have a number')
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('New password is required'),
  retypeNewPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.newPassword === value;
    }),
});

export default function ChangePasswordModal(props) {
  const {onRequestClose, visible} = props;
  const [spinner, setSpinner] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (values) => {
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    console.log('The Data For Password: ', data);

    setSpinner(true);
    try {
      const response = await changePassword(data);
      console.log('Omi:', response);
      setSpinner(false);
      if (response.status == 200) {
        // setSuccessModalMessage('password Change successfull');
        setShowSuccessModal(true);
        // console.log('Reset Successful.');
      } else {
        console.log('Something went wrong.');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.log('The Error: ', error);
      setSpinner(false);
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <View style={designs.centeredView}>
          <View style={designs.modalView}>
            <Icon
              onPress={onRequestClose}
              name="arrow-back-outline"
              size={25}
              style={{color: COLORS.primary}}
            />
            <Text style={[designs.headline]}>Change Password</Text>
            <Formik
              validationSchema={changePasswordSchema}
              initialValues={{
                oldPassword: '',
                newPassword: '',
                retypeNewPassword: '',
              }}
              onSubmit={(values, {setValues, setErrors}) => {
                handleSubmit(values, setValues, setErrors);
              }}>
              {({handleSubmit, isValid, values, setValues}) => (
                <>
                  <View style={{flex: 1}}>
                    <Field
                      component={CustomInput}
                      name="oldPassword"
                      placeholder="Old Password"
                    />

                    <Field
                      component={CustomInput}
                      name="newPassword"
                      placeholder="New Password"
                    />

                    <Field
                      component={CustomInput}
                      name="retypeNewPassword"
                      placeholder="Retype New Password"
                    />
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!isValid}
                    style={[
                      designs.btn,
                      {
                        backgroundColor: '#00DC99',
                        width: '100%',
                        borderRadius: 10,
                      },
                    ]}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        lineHeight: 30,
                        fontWeight: 'bold',
                      }}>
                      UPDATE PASSWORD
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />

      {showSuccessModal && (
        <SuccessModal
          onRequestClose={() => {
            setShowSuccessModal(!showSuccessModal);
          }}
          visible={showSuccessModal}
        />
      )}

      {showErrorModal && (
        <ErrorModal
          onRequestClose={() => {
            setShowErrorModal(!showErrorModal);
          }}
          visible={showErrorModal}
        />
      )}

      {/* <WarningModal
        onRequestClose={() => {
          setShowWarningModal(!showWarningModal);
        }}
        visible={showWarningModal}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({});
