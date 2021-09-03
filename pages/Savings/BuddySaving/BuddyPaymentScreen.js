import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatNumber} from '../../../util/numberFormatter';
import CreditCardModalBuddy from '../../../components/CreditCard/CreditCardModalBuddy';

export default function BuddyPaymentScreen(props) {
  const {navigation, route} = props;
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    console.log('Payment Amount: ', route.params.data.payment.amount);
  }, []);

  const handlePayment = async () => {
    const resData = route.params.data;

    console.log('ID: ', resData);

    const buddyRes = resData.buddy_savings;
    const paymentRes = resData.payment;
    console.log('Response Data: ', paymentRes);
    setShowCardModal(true);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.headline]}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={20}
          color={COLORS.white}
        />
        <Text
          style={{
            fontSize: 14,
            marginLeft: 20,
            fontWeight: 'bold',
            color: COLORS.white,
          }}>
          Payment
        </Text>
      </View>

      <View style={{flex: 1}}></View>

      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <TouchableOpacity
          onPress={handlePayment}
          style={[
            {
              width: '100%',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00DC99',
              paddingVertical: 10,
              marginBottom: 0,
              backgroundColor: '#00DC99',
            },
          ]}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14,
              lineHeight: 30,
            }}>
            PAY NOW{'  '}₦
            {formatNumber(route.params.data.payment.amount) || '0.00'}
          </Text>
        </TouchableOpacity>
      </View>

      {showCardModal && (
        <CreditCardModalBuddy
          onRequestClose={() => setShowCardModal(!showCardModal)}
          visible={showCardModal}
          info={route.params.data}
          navigation={navigation}
          redirectTo="BuddySavingDashBoard"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headline: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
});
