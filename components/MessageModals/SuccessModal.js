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
        <View style={[designs.modalView, {backgroundColor: COLORS.secondary}]}>
          <TouchableOpacity style={[designs.closeBtn]} onPress={onRequestClose}>
            <Icon name="close" style={[designs.closeIcon]} />
          </TouchableOpacity>
          <View>
            <View style={[designs.header]}>
              <Icon
                style={[designs.headerIcon, {color: COLORS.white}]}
                name="ios-checkmark-done-sharp"
              />
              <Text style={[designs.headerTitle, {color: COLORS.white}]}>
                Updated
              </Text>
            </View>

            <View style={[designs.content]}>
              <Text style={{color: COLORS.dark}}>
                Password successfully updated.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
