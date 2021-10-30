import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';
import CreditCardFormWallet from './CreditCardFormWallet';

export default function CreditCardModalWallet(props) {
  const {onRequestClose, visible, info, navigation, redirectTo} = props;

  // useEffect(() => {
  //   console.log('Data: ', info);
  //   console.log('Seq ID: ', ID);
  // }, []);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
                  fontSize: 18,
                  lineHeight: 19,
                }}>
                Add Card
              </Text>
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={25}
                color="#465969"
              />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
              <View style={{flex: 1}}>
                <CreditCardFormWallet
                  ResInfo={info}
                  navigation={navigation}
                  onRequestClose={onRequestClose}
                  redirectTo={redirectTo}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 10,
                  }}>
                  <Icon name="lock-closed" size={15} color={COLORS.dark} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      color: COLORS.dark,
                      marginLeft: 10,
                    }}>
                    Secured by{' '}
                    <Text style={{fontWeight: 'bold'}}>Paystack</Text>
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
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
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 25,
    paddingBottom: 0,
  },
});
