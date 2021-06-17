import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {icons} from '../util/index';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const SuccessModal = (props) => {
  const {
    successModal,
    setSuccessModal,
    handlePress,
    successHeading,
    successText,
  } = props;

  return (
    <View>
      <Modal visible={successModal} animationType="fade" transparent={true}>
        <View style={designs.modal}>
          <View style={designs.successModal}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#465969"
            />
            <Image source={icons.tick} style={{width: 80, height: 80}} />
            <Text style={[designs.boldText, {marginTop: 20, fontSize: 22}]}>
              {successHeading}
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 14,
                lineHeight: 20,
                // fontWeight: 'bold',
                marginTop: 10,
                // width: '70%',
              }}>
              {/* Solos savings has been set up */}
              {successText}
            </Text>
            <TouchableOpacity
              onPress={handlePress}
              style={[designs.button, {marginTop: 30, width: '100%'}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  // lineHeight: 30,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SuccessModal;

const designs = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    fontFamily: 'Circular Std',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 16,
    paddingRight: 16,
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    // height: 400,
    padding: 20,
  },
  button: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    // marginTop: 62,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    padding: 20,
    paddingVertical: 20,
    // elevation: 6,
  },
  boldText: {
    fontSize: 16,
    // lineHeight: 30,
    color: '#2A286A',
    fontFamily: 'CircularStd',
    fontWeight: 'bold',
  },
});
