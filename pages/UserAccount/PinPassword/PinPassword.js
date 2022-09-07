import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../util';
import ChangePasswordModal from './ChangePasswordModal';
import SetPinModal from './SetPinModal';
import ChangePinModal from './ChangePinModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PinPassword(props) {
  const {navigation} = props;
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showSetPinModal, setShowSetPinModal] = useState(false);
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  return (
    <>
      <View style={[styles.container, { marginTop: Platform.OS == 'ios' ? statusBarHeight : 0}]}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{color: COLORS.primary}}
        />
        <Text style={[styles.headline]}>Password and PIN</Text>
        <View>
          <TouchableOpacity
            style={[styles.card]}
            onPress={() => setShowChangePasswordModal(true)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="lock-closed"
                size={25}
                style={{color: COLORS.primary, marginRight: 10}}
              />
              <Text style={[styles.cardText]}>Change Password</Text>
            </View>
            <IconFA
              name="chevron-right"
              size={15}
              style={{color: COLORS.grey}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card]}
            onPress={() => setShowChangePinModal(true)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="keypad"
                size={25}
                style={{color: COLORS.primary, marginRight: 10}}
              />

              <Text style={[styles.cardText]}>Change PIN</Text>
            </View>
            <IconFA
              name="chevron-right"
              size={15}
              style={{color: COLORS.grey}}
            />
          </TouchableOpacity>
        </View>
      </View>

      {showChangePasswordModal && (
        <ChangePasswordModal
          onRequestClose={() =>
            setShowChangePasswordModal(!showChangePasswordModal)
          }
          visible={showChangePasswordModal}
        />
      )}

      {/* {showSetPinModal && (
        <SetPinModal
          onRequestClose={() => setShowSetPinModal(!showSetPinModal)}
          visible={showSetPinModal}
        />
      )} */}

      {showChangePinModal && (
        <ChangePinModal
          onRequestClose={() => setShowChangePinModal(!showChangePinModal)}
          visible={showChangePinModal}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 25,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
