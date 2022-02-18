import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CreditForm, CreditAwaiting} from '.';
import {COLORS, images} from '../../../../util';
import CreditDashboard from './creditDashboard';

export default function CreditOnboard({navigation}) {
  const [formData, setFormData] = useState({});
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [showCreditAwaiting, setShowCreditAwaiting] = useState(false);
  const [showCreditDashboard, setShowCreditDashboard] = useState(false);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'creditOnboarding');
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser();
  //     const checkIfAwaiting = await AsyncStorage.getItem(
  //       `creditScoreDetail-${user.id}`,
  //     );

  //     console.log('DA: ', checkIfAwaiting);
  //     if (checkIfAwaiting != null && checkIfAwaiting != 'false') {
  //       console.log('loading up...');
  //       setShowCreditAwaiting(true);
  //     } else {
  //       AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'false');
  //       console.log('no load up');
  //     }
  //   })();
  // }, []);

  return (
    <>
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="arrow-back-outline"
            color={COLORS.dark}
            size={25}
            onPress={() => navigation.navigate('Rent')}
          />
        </View>

        <View style={[styles.content]}>
          <Image source={images.speedometer} style={styles.image} />

          <View style={styles.textWrapper}>
            <Text style={styles.title}>Check Your Credit Report</Text>
            <Text style={styles.subText}>
              To successfully apply to rent now-pay later, we need to check your
              credit report to get to know you a little bit more.
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('CreditForm')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Check credit report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FD',
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  textWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subText: {
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    backgroundColor: COLORS.primary,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'capitalize',
  },
});
