import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../util';
import * as Animatable from 'react-native-animatable';

export default function PaymentTypeModalForSavings(props) {
  const {onRequestClose, visible, setShowAmountModal, setChannel} = props;

  const handleClose = () => {
    onRequestClose();
  };

  const handleClick = (item) => {
    setShowAmountModal(true);
    onRequestClose();
    // console.log('Item: ', item);

    setChannel(item.channel);
  };

  const payments = [
    {
      name: 'Pay with card',
      img: images.maskGroup29,
      channel: 'paystacks',
    },
    {
      name: 'Pay with wallet',
      img: images.maskGroup31,
      channel: 'wallets',
    },
  ];

  const PaymentType = () => {
    return (
      <>
        <Icon
          onPress={handleClose}
          name="close"
          size={25}
          style={{
            right: 0,
            top: 0,
            position: 'absolute',
            zIndex: 2,
            color: COLORS.grey,
            padding: 10,
          }}
        />

        <View style={{paddingLeft: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            Payment method
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'normal',
              color: COLORS.grey,
              marginVertical: 2,
            }}>
            Choose a payment method
          </Text>
        </View>

        {payments.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleClick(item)}
              style={[
                styles.btn,
                {
                  backgroundColor: '#F7F8FD',
                  marginBottom: 0,
                  overflow: 'hidden',
                },
              ]}>
              <View
                style={[styles.displayFlex, {justifyContent: 'space-between'}]}>
                <View style={styles.displayFlex}>
                  <Image
                    style={{height: 50, width: 50, marginBottom: -16}}
                    source={item.img}
                  />
                  <Text
                    style={{
                      color: '#2A286A',
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginLeft: 15,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <Icon
                  style={{
                    color: COLORS.dark,
                    backgroundColor: 'white',
                    borderRadius: 50,
                    padding: 7,
                  }}
                  name="arrow-forward"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <>
              <Animatable.View
                duration={300}
                delay={100}
                easing="ease-in-out"
                animation="slideInLeft">
                <PaymentType />
              </Animatable.View>
            </>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 1,
    paddingVertical: 15,
  },
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#ADADAD',
    borderWidth: 1,
    marginTop: 15,
  },
  creditCard: {
    width: '100%',
    height: 51,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 19,
  },

  boldText: {
    fontSize: 18,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
  },

  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.dark,
    marginTop: 8,
    fontSize: 14,
  },
  errorText: {
    fontSize: 10,
    color: '#f00000',
    marginLeft: 5,
  },
  errorInput: {
    borderColor: '#f0000050',
  },
  button: {
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: COLORS.primary,
    marginTop: 20,
    // marginBottom: 20,

    width: '100%',
    paddingVertical: 15,
  },
});
