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

export default function InviteBuddyModal(props) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [buddyTarget, setBuddyTarget] = useState('');
  const [savingAmount, setSavingAmount] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [userName, setUserName] = useState('');
  const {onRequestClose, visible, onConfirm} = props;

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
    setUserName(username);
  };

  useEffect(() => {
    getReferralCode();
    getUserName();
    console.log('Ref code: ', referralCode);
    console.log('user name: ', userName);
  }, []);

  const copyToClipboard = async () => {
    const msg = ` "${userName
      .toString()
      .toUpperCase()} Has Invited You To Join Them To Save For Rent On Kwaba -
    Join Now"{'\n'}
    https://www.kwaba.ng/?ref=1`;
    Clipboard.setString(msg);
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: ` "${userName
          .toString()
          .toUpperCase()} Has Invited You To Join Them To Save For Rent On Kwaba -
        Join Now"{'\n'}
        https://www.kwaba.ng/?ref=1`,
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
              />
              <TextInput
                style={[styles.textInput]}
                placeholder="Email"
                placeholderTextColor="#777"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={[styles.textInput]}
                placeholder="Phone number"
                placeholderTextColor="#777"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />

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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: COLORS.dark,
                          marginLeft: 10,
                        }}>
                        ₦
                      </Text>
                      <TextInput
                        style={{
                          width: '100%',
                          //   borderWidth: 1,
                          paddingVertical: 0,
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}
                        placeholderTextColor="#777"
                        value={buddyTarget}
                        onChangeText={(text) => setBuddyTarget(text)}
                      />
                    </View>
                  </View>
                </View>

                <View style={[styles.amountBox]}>
                  <Text style={[styles.amountBoxTitle]}>
                    Amount to save monthly
                  </Text>
                  <View style={[styles.amountBoxInput]}>
                    <Text style={[styles.amountBoxInputText]}>
                      Saving Amount
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: COLORS.dark,
                          marginLeft: 10,
                        }}>
                        ₦
                      </Text>
                      <TextInput
                        style={{
                          width: '100%',
                          //   borderWidth: 1,
                          paddingVertical: 0,
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}
                        placeholderTextColor="#777"
                        value={savingAmount}
                        onChangeText={(text) => setSavingAmount(text)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.btn, {backgroundColor: COLORS.secondary}]}>
              <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                INVITE
              </Text>
            </TouchableOpacity>

            <View style={[styles.inviteLinkText]}>
              <Text style={{fontSize: 12, color: COLORS.dark, lineHeight: 20}}>
                "{userName.toString().toUpperCase()} Has Invited You To Join
                Them To Save For Rent On Kwaba - Join Now"{'\n'}
                https://www.kwaba.ng/?ref=1
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
    // borderColor: '#f00',
    // borderWidth: 1,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
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
