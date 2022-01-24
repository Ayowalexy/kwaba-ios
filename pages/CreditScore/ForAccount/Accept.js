import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {COLORS} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AcceptModal(props) {
  const {onRequestClose, visible, navigation, onConfirm} = props;

  const handleNavigate = () => {
    onConfirm();
    onRequestClose();
    // navigation.navigate('CreditScoreDashboard');
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
                <Icon name="close" size={20} color={COLORS.white} />
              </TouchableOpacity>

              <View style={{marginTop: 50, padding: 20}}>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.dark,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    Credit Score Payment
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
                  You will be charged the sum of ₦2,000 to check your credit
                  report.
                </Text>

                <TouchableOpacity onPress={handleNavigate}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Okay, Continue</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'rgba(16,19,27,0.8)',
  },

  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 200,
    backgroundColor: '#fff',
    // backgroundColor: '#10131B',
    // backgroundColor: '#212a33',
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
    backgroundColor: '#10131B',
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    top: 20,

    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0.3,
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

  button: {
    width: '100%',
    backgroundColor: '#212a33',
    backgroundColor: '#10131B',
    backgroundColor: COLORS.secondary,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // elevation: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    // color: '#536470',
    textTransform: 'uppercase',
  },
});
