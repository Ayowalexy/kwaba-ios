import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Transactions(props) {
  const {visible, onRequestClose} = props;
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      transparent={true}>
      <View style={styles.centeredModalWrapper}>
        <View style={[styles.bg]}>
          <View style={[styles.headline]}>
            <Icon
              style={{
                color: COLORS.white,
                marginTop: 2,
              }}
              onPress={() => onRequestClose()}
              name="arrow-back"
              size={20}
              color={COLORS.white}
            />
            <Text
              style={{
                color: COLORS.white,
                fontWeight: 'normal',
                marginLeft: 20,
              }}>
              Transactions History
            </Text>
          </View>

          <View style={[styles.transactionBody]}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.dark,
                textAlign: 'center',
              }}>
              No transactions yet
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredModalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bg: {
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headline: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,

    // No transaction style
    justifyContent: 'center',
    alignItems: 'center',
  },
});
