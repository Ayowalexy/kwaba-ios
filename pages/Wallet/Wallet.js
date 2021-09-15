import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../util';
import {formatNumber} from '../../util/numberFormatter';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMaxLoanCap} from '../../redux/actions/savingsActions';
import {useDispatch, useSelector} from 'react-redux';
import {plus_1} from '../../util/icons';

export default function Wallet({navigation}) {
  const dispatch = useDispatch();
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);
  return (
    <View style={[styles.container]}>
      <View
        style={{
          width: '100%',
          flex: 1,
          position: 'absolute',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          opacity: 0.1,
        }}>
        <Icon
          name="wallet"
          size={200}
          color={COLORS.light}
          style={{
            position: 'absolute',
            right: -20,
            transform: [{rotate: '10deg'}],
          }}
        />
        <Icon
          name="wallet"
          size={100}
          color={COLORS.light}
          style={{
            position: 'absolute',
            left: -10,
            top: 50,
            transform: [{rotate: '-10deg'}],
          }}
        />
        <Icon
          name="wallet"
          size={50}
          color={COLORS.light}
          style={{
            position: 'absolute',
            left: 100,
            top: 100,
            transform: [{rotate: '-10deg'}],
          }}
        />
      </View>
      <View style={[styles.content]}>
        <View style={[styles.heading]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: '#ffffff20',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon name="arrow-back" size={20} color={COLORS.white} />
          </TouchableOpacity>

          <Text
            style={{fontSize: 16, fontWeight: 'normal', color: COLORS.white}}>
            My Wallet
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff20',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon name="wallet-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            //   borderWidth: 1,
            padding: 20,
            minHeight: 150,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: 14, fontWeight: 'normal', color: COLORS.white}}>
            Your Balance
          </Text>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: COLORS.white}}>
            <Text style={{fontSize: 15}}> ₦</Text>
            {/* {formatNumber(7680000)} */}
            {formatNumber(Number(0).toFixed(2)) || '0.00'}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 100,
          padding: 20,
          alignItems: 'center',
        }}>
        <View style={{width: 50, height: 5, backgroundColor: '#BFBFBF50'}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    padding: 20,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
