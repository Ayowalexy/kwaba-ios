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

export default function Reject({navigation}) {
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
          <View>
            <Image
              source={images.declineImage}
              style={{
                width: '100%',
                height: 150,
                borderWidth: 1,
                resizeMode: 'contain',
                marginTop: 50,
              }}
            />
          </View>
          <View style={[styles.textContent]}>
            <Text style={[styles.redText]}>Confirm Rejection</Text>
            <View style={{paddingHorizontal: 20, marginTop: 30}}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: COLORS.dark,
                  lineHeight: 30,
                }}>
                Are you sure you want to reject the offer? If you need more
                money towards your rent, you can invite a guarantor to support
                your application
              </Text>
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
          <Text style={[styles.btnText, {color: COLORS.white}]}>
            Invite Guarantor
          </Text>
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
    marginTop: 50,
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
