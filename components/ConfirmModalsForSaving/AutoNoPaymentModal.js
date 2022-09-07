import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {images, icons, COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import {userCreateSavings} from '../../services/network';

export default function AutoNoPaymentModal(props) {
  const {visible, onRequestClose, handleClickPaymentType} = props;
  const [spinner, setSpinner] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.content}>
              <TouchableOpacity onPress={onRequestClose} style={styles.close}>
                <Icon name="close" size={25} color={COLORS.dark} />
              </TouchableOpacity>

              <View style={{marginTop: 50, padding: 20}}>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: COLORS.dark,
                      fontSize: 16,
                    }}>
                    Confirm
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.dark,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    You have chosen to save automatically
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                    color: COLORS.dark,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                  }}>
                  You will be charged a small fee of{' '}
                  <Text style={{color: COLORS.secondary, fontWeight: 'bold'}}>
                    ₦50
                  </Text>{' '}
                  to check if your card is valid. Don’t worry, this money will
                  be added into your Kwaba savings account.
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    // console.log('Clicked on');
                    handleClickPaymentType();
                    onRequestClose();
                  }}
                  style={{
                    width: '100%',

                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    backgroundColor: '#00DC99',
                    marginBottom: 20,

                    width: '100%',
                    paddingVertical: 15,

                    marginTop: 20,
                    backgroundColor: '#00DC99',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 12,
                      lineHeight: 30,
                    }}>
                    CONFIRM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 200,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  close: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    top: 20,

    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },

  heading: {
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: 'bold',
    // marginBottom: 20,
    paddingLeft: 30,
    backgroundColor: '#BFBFBF20',
    paddingVertical: 20,
    // textAlign: 'center',
  },
});
