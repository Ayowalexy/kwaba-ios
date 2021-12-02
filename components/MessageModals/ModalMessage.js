import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {COLORS} from '../../util';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ModalMessage(props) {
  const {message, onClose, naviagtion} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={message.visible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 9,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          display: message.visible ? 'flex' : 'none',
        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            minWidth: 50,
            minHeight: 50,
            width: 300,
            maxWidth: '100%',
            borderRadius: 5,
            elevation: 5,
            padding: 20,
            paddingVertical: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              // borderWidth: 2,
              backgroundColor: message?.success ? COLORS.success : COLORS.error,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Icon
              name={message.success ? 'checkmark-sharp' : 'warning-outline'}
              style={{
                fontSize: 30,
                // color: message?.success ? COLORS.success : COLORS.error,
                color: COLORS.white,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 15,
              color: COLORS.primary,
              textAlign: 'center',
              lineHeight: 22,
              paddingHorizontal: 20,
            }}>
            {message?.body}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            style={{
              borderRadius: 20,
              width: 30,
              height: 30,
              marginTop: 20,
              backgroundColor: '#eee',
              position: 'absolute',
              right: 15,
              top: -5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={'close'}
              style={{
                fontSize: 18,
                color: COLORS.dark,
                opacity: 0.5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
