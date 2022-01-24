import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import Spinner from 'react-native-loading-spinner-overlay';

export default function MoveMoneyToExistingPlanModal(props) {
  const {onRequestClose, visible, savingsData, navigation} = props;
  const [spinner, setSpinner] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View
            style={{
              height: 50,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={onRequestClose}>
              <Icon name="arrow-back" size={25} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalView}>
            <View style={{flex: 1}}>
              <View
                style={{
                  borderBottomColor: '#eee',
                  borderBottomWidth: 1,
                  paddingHorizontal: 30,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  Select a Savings Plan
                </Text>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 12,
                    fontWeight: '600',
                    opacity: 0.5,
                    paddingBottom: 10,
                  }}>
                  Move your money to savings plan
                </Text>
              </View>

              <View style={{paddingVertical: 20}}>
                <ActivityIndicator size="small" color="#5A4CB1" />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    backgroundColor: COLORS.white,
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    backgroundColor: '#F7F8FD',
    overflow: 'hidden',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
});
