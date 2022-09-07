import React from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images} from '../util/index';


const NonCenteredModal = ({ children, close, modalVisible, headerStyle }) =>{
    <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose ={()=>{}}>
            <View style={designs.modalWrapper}>
            <View style={designs.modalView}> 
            <View style={[designs.modalHeader, {marginBottom: 11}, {...headerStyle}]}>
            <Icon
              onPress={close}
              style={{marginLeft: 'auto'}}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            </View>
            {children}
            </View>

            </View>
            
        </Modal>

}

const CenteredModal =({ close, successModal, headerText, subText, buttonTitle })=> {
    <Modal visible={successModal} animationType="fade" transparent={true}>
        <View
          style={designs.centeredModalWrapper}>
          <View style={[designs.successModal, {borderRadius: 30}]}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={close}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            <Image source={icons.tick} style={{width: 84, height: 84, marginTop: 25}}/>
            <Text style={designs.successModalBodyText}>
            {headerText}
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 12,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 6,
              }}>
              {subText}
            </Text>
            <TouchableOpacity
              onPress={handleClick}
              style={[designs.button, {marginTop: 30, width: '100%', alignSelf: 'center', backgroundColor: COLORS.secondary}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                  textAlign: 'center'
                }}>
                {buttonTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
}

const designs = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 34
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        fontFamily: 'Circular Std',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',      
      }, 
      centeredModalWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    modalView:{
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 23,
      },
      successModal: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        width: '90%',
        marginHorizontal: 'auto'
      },
      modalTitleText: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        lineHeight: 23,
        color: COLORS.primary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12
  },
  modalBodyText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 19,
    color: COLORS.primary,
    marginBottom: 30
  },
  successModalBodyText: {marginTop: 35, 
    fontSize: 22, 
    lineHeight: 33, 
    color: COLORS.primary, 
    fontWeight: 'bold'},

  flexRow: {
      flexDirection: 'row'
  },
  button: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    padding: 24,
    marginHorizontal: 20,
    elevation: 20,
    shadowColor: COLORS.secondary, 
    marginBottom: 40
  },

});

export {NonCenteredModal, CenteredModal};
