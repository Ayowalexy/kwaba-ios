import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {COLORS} from '../../util';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';

export default function WarningModal(props) {
  const {onRequestClose, visible} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={[designs.centeredView]}>
        <View style={[designs.modalView, {backgroundColor: COLORS.warning}]}>
          <TouchableOpacity style={[designs.closeBtn]} onPress={onRequestClose}>
            <Icon name="close" style={[designs.closeIcon]} />
          </TouchableOpacity>
          <View>
            <View style={[designs.header]}>
              <Icon style={[designs.headerIcon]} name="warning-outline" />
              <Text style={[designs.headerTitle]}>Warning</Text>
            </View>

            <View style={[designs.content]}>
              <Text>Something went wrong</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
