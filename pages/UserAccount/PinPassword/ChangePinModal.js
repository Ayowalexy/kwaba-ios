import React, {useEffect, useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../util';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

export default function ChangePinModal(props) {
  const {onRequestClose, visible} = props;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [cellProps, getCellLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmit = async () => {
    console.log(value);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <View style={designs.centeredView}>
          <View style={designs.modalView}>
            <Icon
              onPress={onRequestClose}
              name="arrow-back-outline"
              size={25}
              style={{color: COLORS.primary}}
            />
            <View style={{flex: 1}}>
              <Text style={[designs.headline]}>Change PIN</Text>
              {/* <Text style={[designs.subtitle]}>
                Your Kwaba PIN Protects your account from unauthorized access
              </Text> */}

              <View style={{marginTop: 30, alignItems: 'center'}}>
                <Text style={[designs.subtitle]}>Set up new Kwaba PIN</Text>

                <CodeField
                  ref={ref}
                  {...cellProps}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={designs.codeInputContainer}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({index, symbol, isFocused}) => (
                    <View
                      key={index}
                      style={[designs.codeInput, isFocused && styles.focusCell]}
                      onLayout={getCellLayoutHandler(index)}>
                      <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={value.length != 4}
              style={[
                designs.btn,
                {
                  backgroundColor: '#00DC99',
                  width: '100%',
                  borderRadius: 10,
                },
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  lineHeight: 30,
                  fontWeight: 'bold',
                }}>
                UPDATE PIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({});
