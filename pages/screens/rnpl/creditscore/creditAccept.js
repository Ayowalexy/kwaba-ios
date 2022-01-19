import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CreditAccept(props) {
  const {onRequestClose, visible, onConfirm} = props;

  const handleNavigate = () => {
    onConfirm();
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
    backgroundColor: '#ddd',
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    top: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: 23,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
