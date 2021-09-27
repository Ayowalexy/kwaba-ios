import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import {COLORS, icons, images} from '../../../util';

export default function BussinessCompleteModal(props) {
  const {onRequestClose, visible, navigation} = props;

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
              style={{width: 100, height: 100, marginBottom: 5}}
              source={images.group3701}
              resizeMode="contain"
            />
            {/* <Text
              style={{
                color: COLORS.secondary,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Business Owner
            </Text> */}
            <Text
              style={{
                fontSize: 14,
                color: COLORS.dark,
                lineHeight: 20,
                marginTop: 10,
                textAlign: 'center',
              }}>
              Business profile created{'\n'}successfully.
            </Text>

            <TouchableOpacity
              onPress={() => {
                onRequestClose();
                navigation.navigate('RentalFormBusiness1');
              }}
              style={{
                backgroundColor: COLORS.secondary,
                // padding: 20,
                paddingVertical: 10,
                paddingHorizontal: 30,
                alignItems: 'center',
                justifyContent: 'center',
                // width: '100%',
                borderRadius: 5,
                marginTop: 20,
              }}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
                CONTINUE TO PAY RENT
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
    borderRadius: 5,
    overflow: 'hidden',
    padding: 20,
  },
  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 18,
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
});
