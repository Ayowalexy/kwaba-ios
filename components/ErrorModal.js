import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native';
import {icons} from '../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
const {width} =Dimensions.get('window');
//this is the error modal

const ErrorModal = (props) => {
  const {
    errorModal,
    setErrorModal,
    handlePress,
    errorHeading,
    errorText,
  } = props;

  return (
    <View>
      <Modal visible={errorModal} animationType="fade" transparent={true}>
        <View style={designs.modal}>
          <View style={designs.successModal}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setErrorModal(false)}
              name="close-outline"
              size={30}
              color="#465969"
            />
            <Image source={icons.cancelIcon} style={{height:60,width:60}} />
            <Text style={[designs.boldText, {marginTop: 45, fontSize: 22}]}>
              {errorHeading}
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 14,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              {/* Solos savings has been set up */}
              {errorText}
            </Text>
            <TouchableOpacity
              onPress={handlePress}
              style={[designs.button, {marginTop: 55, width: width*0.8}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ErrorModal;

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
    height: 400,
    padding: 23,
  },
  button: {
    width: width*0.75,
    height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginTop: 62,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    elevation: 6,
  },
  boldText: {
    fontSize: 18,
    lineHeight: 23,
    color: '#2A286A',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
});
