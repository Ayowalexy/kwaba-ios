import React from 'react';
import {
    Pressable,
    Modal,
    Text,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images} from '../util/index';

const CustomPicker = ({ onPress, pressed=false, value, children, close, modalVisible }) => {
    return (
        <>
<Pressable onPress={onPress} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: value == ''? 25: 7, paddingBottom: 25, borderRadius: 10, borderColor: '#EFEFEF', borderWidth: 1, backgroundColor: COLORS.white, marginBottom: 23}}> 
              <View style={{ padding: 0, justifyContent: 'center' }}>
                  <Text style={{color: COLORS.grey, fontSize: value == '' || null? 16: 10, lineHeight: value == ''? 30: 10, marginBottom: value == ''? 0: 3}}>Loan Purpose</Text>
                  
                  {value !== '' && <Text style={[FONTS.body1FontStyling, {marginBottom: 'auto'}]}>{value}</Text>}
    
              </View>
              <View style={{height: '100%', paddingTop: value == ''? 0: 12 }}><IconFA name = {pressed? 'angle-up': 'angle-down'} size={30} color={COLORS.grey}/></View>
          </Pressable>
          <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose ={close}>
          <View style={designs.modalWrapper}>
                    <View style={designs.modalView}>
                        <View style={[designs.modalHeader, {justifyContent: 'flex-end'}]}>
                        <Icon
              onPress={close}
              style={{alignSelf: 'flex-end'}}
              name="close-outline"
              size={30}
              color="#465969"
            />
            </View>
            {children}
            </View>
            </View>
            </Modal>
            </>
            )
};

const CustomTextInput = ({ onPress, pressed=false, placeHolderText }) => {
    return (
<Pressable onPress={onPress} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: !pressed? 25: 7, paddingBottom: 25, borderRadius: 10, borderColor: '#EFEFEF', borderWidth: 1, backgroundColor: COLORS.white, marginBottom: 23}}> 
              <View style={{ padding: 0, justifyContent: 'center' }}>
                  <Text style={{color: COLORS.grey, fontSize: !pressed? 16: 10, lineHeight: pressed? 30: 10, marginBottom: pressed? 0: 3}}>{placeHolderText}</Text>
                  
                  {pressed && <TextInput style={[FONTS.body1FontStyling, {marginBottom: 'auto'}]}/>}
    
              </View>
          </Pressable>

            )
};

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
    modalView:{
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 23,
      }
});

export {CustomPicker, CustomTextInput};
