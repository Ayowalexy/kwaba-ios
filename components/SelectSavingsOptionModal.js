import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../util';
import { useSelector, useDispatch } from 'react-redux';
import { getUserReferrals } from '../redux/actions/referralAction';

export default function SelectSavingsOptionModal(props) {
  const {onRequestClose, visible, onClick} = props;
  const dispatch = useDispatch();
  const allBuddySaving = useSelector((state) => state.getBuddySavingsReducer);
  const allSoloSaving = useSelector((state) => state.getSoloSavingsReducer);

  const referrals = useSelector((state) => state.getUserReferralsReducer);

  // const genders = ['Solo Savings', 'Buddy Savings', 'Wallets', 'Referral'];
  const genders = ['Solo Savings', 'Buddy Savings', 'Referrals'];
console.log('referrals', referrals)
  useEffect(() => {
    dispatch(getUserReferrals());
  }, [])
  return (
    // <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <Text style={{fontWeight: 'bold', fontSize: 16}}>Select Month</Text> */}
          <Icon
            onPress={onRequestClose}
            name="close-outline"
            size={25}
            color="#465959"
            style={{
              padding: 20,
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
          <View style={{marginTop: 20}}>
            {genders.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                    if((item === 'Referrals') && (referrals?.data?.total_earnings === 0)){
                      return Alert.alert(
                        'No Referral Earnings',
                        "Sorry, you don't have any referral earnings yet"
                      )
                    } else if((item === 'Referrals') && (referrals?.data?.total_unpaid_earnings < 1000)){
                      return Alert.alert(
                        'Low Referral Earnings',
                        "Sorry, your referral earnings is not up to the minimum amount"
                      )
                    }

                    if(item === 'Solo Savings'){
                      console.log("allSoloSaving", Object.values(allSoloSaving?.data))
                      const data = Object.values(allSoloSaving?.data)
                      const filter = data.filter(element=> !(Object.is(element, null)))
                      // const matured = filter.filter(element => element.amount_saved >= element.target_amount)
                      const usedFilter = filter.filter(element => !element.status && !element.funds_withdrawn)
                      // if(matured.length === 0){
                        console.log('marured', usedFilter)
                        
                      if(usedFilter.length === 0){
                        return Alert.alert(
                          'No Matured Solo Savings',
                          'Sorry, none of your savings has reached the target date'
                        )
                      }
                    }

                    if(item === 'Buddy Savings'){
                      const filter = allBuddySaving.data.filter(element=> !(Object.is(element, null)))
                      const matured = filter.filter(element => element.amount_saved >= element.target_amount)
                      const usedFilter = filter.filter(element => element.status && element.funds_withdrawn)
                      if(usedFilter.length === 0){
                        return Alert.alert(
                          'No Matured Buddy Savings',
                          'Sorry, none of your savings has reached the target date'
                        )
                    }
                    } 
                  onClick(item);
                  onRequestClose();
                }}
                key={index}
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  // alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
    // </View>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 25,
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 13,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#EFEFEF',
    borderWidth: 1,
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
