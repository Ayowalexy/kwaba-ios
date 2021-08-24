import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, images, icons} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import apiUrl from '../../../services/api';
import {referralDetails} from '../../../services/network';
import QuickSaveModal from '../../../components/QuickSaveModal';

export default function ReferralDetails({navigation}) {
  const [quickSaveModal, setQuickSaveModal] = useState(false);
  useEffect(() => {
    const getReferralDetails = async () => {
      const referral = await referralDetails();
      console.log(referral);
    };
    getReferralDetails();
  }, []);

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
        }}
        color={COLORS.primary}
      />
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <Text style={[styles.heading]}>Referral details</Text>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <View style={[styles.topCard]}>
            <View style={{padding: 10, paddingHorizontal: 20}}>
              <Text style={{fontSize: 12, color: COLORS.primary}}>
                Your earning
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginVertical: 5,
                  marginLeft: 5,
                }}>
                ₦0.00
              </Text>
              {/* <TouchableOpacity
                style={[styles.btn]}
                onPress={() => navigation.navigate('SavingsHome')}>
                <Text style={{fontSize: 12, color: COLORS.white}}>
                  Add a saving
                </Text>
                <Icon
                  name="chevron-forward-outline"
                  size={15}
                  style={{marginTop: 2, marginLeft: 10}}
                  color={COLORS.white}
                />
              </TouchableOpacity> */}
            </View>

            <View
              style={{
                borderLeftWidth: 1,
                borderLeftColor: COLORS.grey,
                padding: 10,
                paddingLeft: 20,
              }}>
              {/* <Text style={{fontSize: 12, color: COLORS.primary}}>
                Rent Discount
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>0%</Text> */}
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => setQuickSaveModal(true)}
                // onPress={() => navigation.navigate('SavingsHome')}
              >
                <Text style={{fontSize: 12, color: COLORS.white}}>
                  Add a saving
                </Text>
                <Icon
                  name="chevron-forward-outline"
                  size={15}
                  style={{marginTop: 2, marginLeft: 10}}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                  },
                ]}
                onPress={() => navigation.navigate('Withdraw')}>
                <Text style={{fontSize: 12, color: COLORS.dark}}>Withdraw</Text>
                <Icon
                  name="chevron-forward-outline"
                  size={15}
                  style={{marginTop: 2, marginLeft: 10}}
                  color={COLORS.dark}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.bottomCard]}>
            <View style={[styles.flexItem]}>
              <Text style={[styles.text]}>Unpaid earning</Text>
              <Text style={[styles.value]}>₦0.00</Text>
            </View>
            <View style={[styles.flexItem]}>
              <Text style={[styles.text]}>Signups</Text>
              <Text style={[styles.value]}>0</Text>
            </View>
            <View style={[styles.flexItem]}>
              <Text style={[styles.text]}>Earnings per referral</Text>
              <Text style={[styles.value]}>₦0.00</Text>
            </View>
            <View style={[styles.flexItem]}>
              <Text style={[styles.text]}>Referred users</Text>
              <Text style={[styles.value]}>0</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <QuickSaveModal
        onRequestClose={() => setQuickSaveModal(!quickSaveModal)}
        visible={quickSaveModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  topCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 2,
    flexDirection: 'row',
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 30,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: COLORS.light,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius: 20,
  },
  flexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingVertical: 22,
    paddingHorizontal: 5,
  },

  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
  },

  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
});
