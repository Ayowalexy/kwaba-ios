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

export default function ManualNoPaymentModal(props) {
  const {visible, onRequestClose, storeData, navigation} = props;
  const [spinner, setSpinner] = useState(false);

  const handleClick = async () => {
    try {
      const data = storeData;

      console.log('The Data Here: ', data);

      setSpinner(true);
      const response = await userCreateSavings(data);

      console.log('The Savings: ', response?.response?.data);
      if (response.status == 200) {
        setSpinner(false);
        // Alert.alert('Success', 'Savings created');
        console.log('Response Data:', response?.response);
        navigation.navigate('PaymentSuccessful', {
          content: 'Savings Plan Created Successfully',
          name: 'SoloSavingDashBoard',
          id: response?.response?.data?.data?.id,
        });
      } else {
        setSpinner(false);
        Alert.alert('Error', 'something went wrong');
      }
    } catch (error) {
      console.log('The Error: ', error);
      Alert.alert('Error', 'An error occured, please retry');
      setSpinner(false);
    }

    onRequestClose();
  };

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
                    You have chosen to save manually
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
                  This means that Kwaba will not be able to help you save
                  automatically and you will always have to manually fund your
                  savings plan.
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    // handleClickPaymentType();
                    handleClick();
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
