import React from 'react';
import {View} from 'react-native';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';

export default function countrySelect(props) {
  const {visible, onSelect, onClose, onOpen} = props;
  return (
    <View>
      <CountryPicker
        {...{
          theme: DARK_THEME,
          withFilter: true,
          withFlag: true,
          withCallingCode: true,
          onSelect: onSelect,
          onClose: onClose,
          onOpen: onOpen,
        }}
        visible={visible}
      />
    </View>
  );
}
