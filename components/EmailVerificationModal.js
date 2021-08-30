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
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../util';

export default function EmailVerificationModal(props) {
  const {onRequestClose, visible, goHome, email} = props;
  const [spinner, setSpinner] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

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
      const url = 'http://67.207.86.39:8000/api/v1/user/sendmaillink';
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
      console.log('Error', error);
    }
  };

  const closeEmail = () => {
    onRequestClose();
    setEmailSent(false);
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
        {!emailSent ? (
          <View style={styles.modalView}>
            <Icon
              onPress={onRequestClose}
              style={{alignSelf: 'flex-end'}}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
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
                  fontSize: 13,
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
                onPress={closeEmail}
                style={[styles.btn, {backgroundColor: COLORS.white}]}>
                <Text
                  style={{
                    color: COLORS.dark,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  No, change my email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.modalView}>
            <Icon
              onPress={closeEmail}
              style={{alignSelf: 'flex-end'}}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
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
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  btn: {
    width: '100%',
    // height: 70,
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
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
});
