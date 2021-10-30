import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {COLORS} from '../../util';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SuccessModal(props) {
  const {onRequestClose, visible} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={[designs.centeredView]}>
        <View style={[designs.modalView, {backgroundColor: COLORS.success}]}>
          <TouchableOpacity style={[designs.closeBtn]} onPress={onRequestClose}>
            <Icon name="close" style={[designs.closeIcon]} />
          </TouchableOpacity>
          <View>
            <View style={[designs.header]}>
              <Icon
                style={[designs.headerIcon]}
                name="ios-checkmark-done-sharp"
              />
              <Text style={[designs.headerTitle]}>Success</Text>
            </View>

            <View style={[designs.content]}>
              <Text>Successfully</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
