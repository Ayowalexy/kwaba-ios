import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export default function GuarantorOnboarding({navigation}) {
  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('rentalLoanForm');
      console.log('HERE: ', await AsyncStorage.getItem('rentalLoanForm'));
    })();
  }, []);

  const handleProceedClick = async () => {
    navigation.navigate('GuarantorForm');
  };

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{paddingVertical: 20, paddingHorizontal: 10}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={[styles.content]}>
          <Text style={[styles.heading]}>Invite Guarantor</Text>
          <View>
            <Image
              source={images.guarantorImage}
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'contain',
                marginTop: 30,
              }}
            />
          </View>
          <View style={{marginVertical: 25}}>
            <Text
              style={{
                fontSize: 13,
                color: COLORS.dark,
                textAlign: 'center',
                lineHeight: 20,
              }}>
              To conitinue you application, we need{'\n'}you to provide a
              guarantor to support{'\n'}your application.
            </Text>
          </View>
          <View style={[styles.textContent]}>
            <Text style={[styles.redText]}>Conditions</Text>
            <View style={[styles.listText]}>
              {[
                'Guarantor must be in salaried employment',
                'Eran above N200,000 monthly',
                'Have no bad loans',
                'We will set up your monthly repayment on\nyour guarantors account.',
                'You will be responsible to fund your guarantors\naccount for yout monthly repayments.',
              ].map((text, index) => (
                <View style={[styles.list]} key={index}>
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 5,
                      backgroundColor: COLORS.primary,
                      marginRight: 10,
                      marginTop: 2,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: COLORS.primary,
                      lineHeight: 20,
                    }}>
                    {text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.btnContainer]}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: COLORS.white}]}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={[styles.btnText]}>Not Interested </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: COLORS.secondary}]}
          onPress={() => {
            handleProceedClick();
          }}>
          <Text style={[styles.btnText, {color: COLORS.white}]}>Proceed </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
    backgroundColor: '#F7F8FD',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  textContent: {
    // alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingBottom: 40,
    // paddingLeft: 10,
    borderRadius: 5,
  },
  redText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'red',
    opacity: 0.5,
    alignItems: 'center',
    textAlign: 'center',
  },
  listText: {
    marginTop: 20,
    paddingLeft: 20,
    // borderWidth: 1,
  },

  list: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 20,
    // marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F7F8FD',
  },

  btn: {
    width: '49%',
    paddingVertical: 20,
    // backgroundColor: COLORS.secondary,
    alignItems: 'center',
    borderRadius: 10,
  },

  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 10,
  },
});
