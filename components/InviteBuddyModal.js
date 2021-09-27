import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import {COLORS} from '../util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InviteBuddy} from '../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {formatNumber} from '../util/numberFormatter';
import moment from 'moment';

export default function InviteBuddyModal(props) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [buddyTarget, setBuddyTarget] = useState('');
  const [savingAmount, setSavingAmount] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [userName, setUserName] = useState('');
  const [spinner, setSpinner] = useState(false);
  const {
    onRequestClose,
    visible,
    data,
    resData,
    setBuddyInvite,
    startDate,
    endDate,
  } = props;

  const getReferralCode = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const referral_code = JSON.parse(userData).user.referral_code;
    setReferralCode(referral_code);
    return referral_code;
  };

  const getUserName = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const username = JSON.parse(userData).username;
    console.log('USRENAME: ', username);
    console.log('ID: ', JSON.parse(userData));
    setUserName(username);
  };

  useEffect(() => {
    getReferralCode();
    getUserName();
    // console.log('Ref code: ', referralCode);
    // console.log('user name: ', userName);
    // console.log('Param: ', resData.buddy_savings.id);
    // console.log('API: ', resData.buddylink);
    console.log('The Props: ', resData.buddy_savings.frequency);
  }, []);

  const inviteLink = `https://kwaba.ng/BuddyInviteLists`;

  const copyToClipboard = async () => {
    const msg = `${userName.toString()} has Invited you to join them to save for rent on Kwaba - Join now\n\n${
      // resData?.buddylink
      inviteLink
    }`;
    Clipboard.setString(msg);
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${userName.toString()} has Invited you to join them to save for rent on Kwaba - Join now\n\n${
          // resData?.buddylink
          inviteLink
        }`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const numberOfBuddiesAndMe = Number(data.number_of_buddies) + 1;
    const numberOfBuddies = Number(data.number_of_buddies);

    const buddies_target = Math.round(
      Number(data.target_amount) -
        Number(data.target_amount) / numberOfBuddiesAndMe,
    );

    // console.log(data.target_amount);

    const calc = (buddies_target / numberOfBuddies).toFixed(0);

    let start = moment(data.date_starting);
    let end = moment(data.date_ending);

    let diff = end.diff(
      start,
      data.savings_frequency.toLowerCase() == 'daily'
        ? 'days'
        : data.savings_frequency
            .substring(0, data.savings_frequency.length - 2)
            .toLowerCase() + 's',
    );
    console.log('Calc: ', diff);

    setBuddyTarget(calc);

    const saving_amount = (calc / diff).toFixed(0);
    setSavingAmount(saving_amount);
  }, []);

  const sendInvite = async () => {
    setSpinner(true);
    const data = {
      loan_id: resData.buddy_savings.id,
      fullname: fullname,
      email: email,
      phonenumber: phone,
      target_amount: buddyTarget,
      amount_to_save_monthly: savingAmount,
      buddy_name: userName,
    };

    console.log('The Invite: ', data);
    try {
      const res = await InviteBuddy(data);

      if (res.status == 200) {
        setSpinner(false);

        const inviteTemplate = {
          fullname: fullname,
          email: email,
          allocatedAmount: buddyTarget,
          savingAmount: savingAmount,
          id: res.data.buddy.id,
        };

        setBuddyInvite(inviteTemplate);
        onRequestClose();

        // console.log('Send Invite Res: ', res);
      } else {
        setSpinner(false);
        console.log('Error new: ', res);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error 2: ', error);
    }
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#2A286A',
                  fontFamily: 'CircularStd',
                  fontWeight: 'bold',
                  fontSize: 16,
                  lineHeight: 19,
                }}>
                Enter your buddy details
              </Text>
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={25}
                color="#465969"
              />
            </View>

            <View style={{marginTop: 20}}>
              <TextInput
                style={[styles.textInput]}
                placeholder="Full name"
                placeholderTextColor="#777"
                value={fullname}
                onChangeText={(text) => setFullname(text)}
                keyboardType="default"
              />
              <TextInput
                style={[styles.textInput]}
                placeholder="Email"
                placeholderTextColor="#777"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
              <TextInput
                style={[styles.textInput]}
                placeholder="Phone number"
                placeholderTextColor="#777"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
              />

              {Number(data.target_amount) >= 1 && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}>
                  <View style={[styles.amountBox]}>
                    <Text style={[styles.amountBoxTitle]}>Buddies target</Text>
                    <View style={[styles.amountBoxInput]}>
                      <Text style={[styles.amountBoxInputText]}>
                        Allocated amount
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: COLORS.dark,
                            marginLeft: 10,
                          }}>
                          ₦{formatNumber(buddyTarget)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.amountBox]}>
                    <Text style={[styles.amountBoxTitle]}>
                      Amount to save{' '}
                      {resData.buddy_savings.frequency.toLowerCase()}
                    </Text>
                    <View style={[styles.amountBoxInput]}>
                      <Text style={[styles.amountBoxInputText]}>
                        Saving Amount
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: COLORS.dark,
                            marginLeft: 10,
                          }}>
                          ₦{formatNumber(savingAmount)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={sendInvite}
              style={[styles.btn, {backgroundColor: COLORS.secondary}]}>
              <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                ADD
              </Text>
            </TouchableOpacity>

            <View style={[styles.inviteLinkText]}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.dark,
                  lineHeight: 20,
                }}>
                "{userName.toString()} has Invited you to join them to save for
                {'\n'} rent on Kwaba - Join now"
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: COLORS.dark,
                  lineHeight: 20,
                  marginTop: 10,
                  // textDecorationLine: 'underline',
                  // paddingHorizontal: 10,
                }}>
                {/* {resData?.buddylink} */}
                {inviteLink}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={[styles.inviteActionBtn]}
                onPress={copyToClipboard}>
                <Text style={[styles.inviteActionBtnText]}>COPY</Text>
                <Icon name="ios-copy-outline" style={{color: COLORS.dark}} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onShare}
                style={[
                  styles.inviteActionBtn,
                  {backgroundColor: COLORS.light},
                ]}>
                <Text
                  style={[styles.inviteActionBtnText, {color: COLORS.white}]}>
                  SHARE
                </Text>
                <Icon
                  name="ios-share-social-outline"
                  style={{color: COLORS.white}}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>

      <Spinner visible={spinner} size="large" />
    </Modal>
    //  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    flex: 1,
    width: '100%',
    maxHeight: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 25,
    paddingHorizontal: 15,
  },
  btn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 13,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    color: COLORS.primary,
    marginTop: 10,
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

  amountBox: {
    width: '48%',
  },

  amountBoxTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginLeft: 10,
  },

  amountBoxInput: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#BFBFBF50',
  },

  amountBoxText: {
    fontSize: 12,
    color: COLORS.primary,
  },

  amountBoxInputText: {
    color: COLORS.grey,
    fontSize: 10,
  },

  inviteLinkText: {
    borderColor: '#BFBFBF50',
    borderWidth: 1,
    width: '100%',
    minHeight: 70,
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  inviteActionBtn: {
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#BFBFBF50',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  inviteActionBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 5,
    color: COLORS.dark,
  },
});
