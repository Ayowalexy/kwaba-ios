import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {COLORS, icons} from '../../util';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CompleteProfileModal(props) {
  const {onRequestClose, visible, navigation, screenName} = props;

  useEffect(() => {
    storeData();
  }, []);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@completeProfilePage', screenName);
    } catch (e) {
      // saving error
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 50, height: 50, marginBottom: 5}}
              source={icons.profile}
              resizeMode="contain"
            />
            <Text
              style={{color: COLORS.orange, fontWeight: 'bold', fontSize: 20}}>
              Complete Profile
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.dark,
                lineHeight: 25,
                marginTop: 10,
                textAlign: 'center',
              }}>
              Complete your profile to unleash{'\n'}the power of Kwaba.
            </Text>

            <TouchableOpacity
              onPress={() => {
                onRequestClose();
                navigation.navigate('CompleteProfile2');
              }}
              style={{
                backgroundColor: COLORS.primary,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                borderRadius: 10,
                marginTop: 20,
              }}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
                COMPLETE PROFILE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    zIndex: 9,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 20,
  },
  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 1,
    paddingVertical: 15,
  },
});
