import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectBankModal from '../../components/SelectBankModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import email from 'react-native-email';

export default function RentalLoanFormBankStatementUploadEmail({navigation}) {
  const [selectedBank, setSelectedBank] = useState('');
  const [showSelectBankModal, setShowSelectBankModal] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [oneBank, setOneBank] = useState([]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const url = 'http://67.207.86.39:8000/api/v1/bank_email';
        const response = await axios.get(url, {
          headers: {'Content-Type': 'application/json'},
        });
        const data = response.data;

        const userData = await AsyncStorage.getItem('userData');
        const parsedUserData = JSON.parse(userData);

        // console.log('Response: ', response.data.banks);

        if (response.status == 200) {
          // console.log('JOSHUA: ', data);

          // data.banks.forEach((bank) => {
          //   console.log('Bank Name:', bank);
          //   setBankData(...bank);
          // });

          setBankData(data.banks);
          console.log(bankData);
          // console.log('USER: ', parsedUserData.user);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const sendMail = () => {
    console.log('Hello');

    const to = 'bankemail@email.com'; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
      bcc: 'mee@mee.com', // string or array of email addresses
      subject: 'Request for a copy of my bank statement',
      body: 'Hello, I need the copy of my bank statement',
    }).catch(console.error);
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />
      <ScrollView>
        <View style={styles.content}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: COLORS.primary}}>
            Request Bank State
          </Text>
          <Text
            style={{
              fontSize: 13,
              lineHeight: 20,
              marginBottom: 20,
              marginTop: 10,
              color: COLORS.grey,
            }}>
            The email used to request for your bank amount should be the one you
            receive notification with your bank
          </Text>
          <View>
            <TextInput
              style={[styles.textField]}
              placeholder="Full Name"
              keyboardType="default"
              // placeholderTextColor="#BFBFBF"
              // value={value}
              // onChangeText={(text) => onChange(name)(text)}
            />
            <TextInput
              style={[styles.textField]}
              placeholder="Email"
              keyboardType="email-address"
              // placeholderTextColor="#BFBFBF"
              // value={value}
              // onChangeText={(text) => onChange(name)(text)}
            />
            <TextInput
              style={[styles.textField]}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              // placeholderTextColor="#BFBFBF"
              // value={value}
              // onChangeText={(text) => onChange(name)(text)}
            />
            <TextInput
              style={[styles.textField]}
              placeholder="Account Name"
              keyboardType="default"
              // placeholderTextColor="#BFBFBF"
              // value={value}
              // onChangeText={(text) => onChange(name)(text)}
            />
            <TextInput
              style={[styles.textField]}
              placeholder="Account Number"
              keyboardType="number-pad"
              // placeholderTextColor="#BFBFBF"
              // value={value}
              // onChangeText={(text) => onChange(name)(text)}
            />
            <TouchableOpacity
              style={styles.customInput}
              onPress={() => {
                setShowSelectBankModal(!showSelectBankModal);
              }}>
              {selectedBank != '' ? (
                <Text
                  style={{
                    // fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {selectedBank}
                </Text>
              ) : (
                <Text
                  style={{
                    // fontWeight: 'bold',
                    color: '#aaa',
                  }}>
                  Bank
                </Text>
              )}

              <Icon
                name="chevron-down-outline"
                size={20}
                style={{fontWeight: 'bold'}}
                color="#BABABA"
              />
            </TouchableOpacity>

            {/* <TextInput
              style={[styles.textField]}
              placeholder="Bank Email"
              keyboardType="number-pad"
            /> */}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 10,
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity
          onPress={sendMail}
          // disabled={isError()}
          style={[
            designs.button,
            {backgroundColor: COLORS.secondary, marginTop: 0, marginBottom: 0},
          ]}>
          <Text
            style={[
              designs.buttonText,
              {
                color: COLORS.white,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 12,
              },
            ]}>
            CREATE EMAIL
          </Text>
        </TouchableOpacity>
      </View>

      <SelectBankModal
        onRequestClose={() => setShowSelectBankModal(!showSelectBankModal)}
        visible={showSelectBankModal}
        onClick={(value) => setSelectedBank(value)}
        banks={bankData}
        selectedBank={selectedBank}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 0.5,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },

  text: {
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 0,
    color: '#BFBFBF',
    lineHeight: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  body: {
    fontSize: 12,
    lineHeight: 20,
    color: '#ADADAD',
    marginTop: 20,
    width: '80%',
    // fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    top: -20,
  },

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
    padding: 20,
  },

  textField: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

// const styles = StyleSheet.create({

//   amount: {
//     width: '32%',
//     padding: 15,
//     // paddingHorizontal: 10,
//     backgroundColor: '#9D98EC',
//     backgroundColor: '#EDECFC',
//     borderRadius: 5,
//     marginTop: 10,
//     borderColor: '#ADADAD50',
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   amountText: {
//     color: COLORS.primary,
//     fontSize: 13,
//     fontWeight: 'bold',
//   },

//   btn: {
//     padding: 15,
//     borderRadius: 10,
//     // marginTop: 20,
//     fontSize: 14,
//     fontFamily: 'CircularStd-Medium',
//     fontWeight: '600',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 1,
//   },
// });
