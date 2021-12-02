import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {COLORS, FONTS, images} from '../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import Spinner from 'react-native-loading-spinner-overlay';
import {formatNumber, unFormatNumber} from '../../util/numberFormatter';
import NumberFormat from '../../components/NumberFormat';

import {joinSavingsChallenge} from '../../services/network';

export default function PreferenceModal(props) {
  const {
    visible,
    onRequestClose,
    navigation,
    onSubmit,
    data,
    setJoinData,
  } = props;
  const [spinner, setSpinner] = useState(false);
  const [amount, setAmount] = useState(0);
  const [savingsMethod, setSavingsMethod] = useState('automatic');
  const [frequency, setFrequency] = useState('daily');

  const handleSubmit = async () => {
    const joinData = {
      savings_challenge_id: data?.id,
      savings_amount: unFormatNumber(amount),
      savings_method: savingsMethod == 'automatic' ? 'auto' : savingsMethod,
    };

    // console.log('The Data: ', joinData);

    setJoinData(joinData);

    onSubmit();

    onRequestClose();

    Keyboard.dismiss();

    // setSpinner(true);
    // try {
    //   const res = await joinSavingsChallenge(joinData);
    //   if (res.status == 200) {
    //     setSpinner(false);
    //     console.log('Data: ', res.data);
    //   } else {
    //     setSpinner(false);
    //     console.log('Res Error: ', res.response);
    //   }
    // } catch (error) {
    //   setSpinner(false);
    //   console.log('Error: ', error.response);
    // }

    // onSubmit();
    // onRequestClose();
    // navigation.navigate('JoinChallengeDashboard');
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      transparent={true}>
      <View style={styles.centeredModalWrapper}>
        <View style={[styles.content]}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
              backgroundColor: '#EEE',
              width: 40,
              height: 40,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              onPress={onRequestClose}
              name="close"
              size={20}
              color={COLORS.dark}
            />
          </TouchableOpacity>
          {/* <Text>PreferenceModal</Text> */}
          <View style={{marginVertical: 30}}>
            <View style={{marginTop: 20}}>
              <Text style={[styles.title]}>How do you want to save ?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                {['Automatic', 'Manual'].map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.savingsType,
                        {
                          backgroundColor:
                            item.toLocaleLowerCase() == savingsMethod
                              ? '#5A4CB1'
                              : COLORS.white,
                        },
                      ]}
                      onPress={() => {
                        item.toLocaleLowerCase() == 'automatic'
                          ? setSavingsMethod('automatic')
                          : setSavingsMethod('manual');
                      }}>
                      <Text
                        style={[
                          styles.savingsTypeText,
                          {
                            color:
                              item.toLocaleLowerCase() == savingsMethod
                                ? COLORS.white
                                : COLORS.dark,
                          },
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* <View style={{marginTop: 20}}>
              <Text style={[styles.title]}>Savings frequency ?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                {['Daily', 'Weekly', 'Monthly'].map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.savingsType,
                        {
                          width: '31%',

                          backgroundColor:
                            item.toLowerCase() == frequency
                              ? '#5A4CB1'
                              : COLORS.white,
                        },
                      ]}
                      onPress={() => {
                        setFrequency(item.toLowerCase());
                      }}>
                      <Text
                        style={[
                          styles.savingsTypeText,
                          {
                            color:
                              item.toLowerCase() == frequency
                                ? COLORS.white
                                : COLORS.dark,
                          },
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View> */}

            <View style={{marginTop: 20}}>
              <Text style={[styles.title]}>How much do you want to save ?</Text>
              <NumberFormat
                value={amount}
                onChangeText={(text) => setAmount(text)}
              />
            </View>

            <TouchableOpacity
              disabled={unFormatNumber(amount) < 100}
              style={[
                styles.btn,
                {
                  elevation: 0,
                  backgroundColor:
                    unFormatNumber(amount) < 100 ? '#5A4CB150' : '#5A4CB1',
                },
              ]}
              onPress={handleSubmit}>
              <Text style={[styles.btnText]}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Spinner visible={spinner} size="large" />
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredModalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  contentView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  savingsType: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    // marginRight: 20,
    borderWidth: 1,
    borderColor: '#ADADAD50',
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  savingsTypeText: {
    color: COLORS.dark,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginLeft: 5,
  },

  btn: {
    backgroundColor: '#5A4CB1',
    // backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: COLORS.white,
    // color: '#5A4CB1',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
