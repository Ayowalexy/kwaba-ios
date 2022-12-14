import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {COLORS} from '../../util';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ErrorModal(props) {
  const {onRequestClose, visible} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={[designs.centeredView]}>
        <View style={[designs.modalView, {backgroundColor: COLORS.red}]}>
          <TouchableOpacity style={[designs.closeBtn]} onPress={onRequestClose}>
            <Icon
              name="close"
              style={[designs.closeIcon, {color: COLORS.white}]}
            />
          </TouchableOpacity>
          <View>
            <View style={[designs.header]}>
              <Icon
                style={[designs.headerIcon, {color: COLORS.white}]}
                name="warning-outline"
              />
              <Text style={([designs.headerTitle], {color: COLORS.white})}>
                Error!
              </Text>
            </View>

            <View style={[designs.content]}>
              <Text style={{color: COLORS.white}}>
                An error occurred, please retry
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
