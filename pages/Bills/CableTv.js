import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images, icons} from '../../util/index';

const CableTv = ({navigation, route}) => {
  let name = route.params.name;
  return (
    <View>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingHorizontal: 20, paddingVertical: 10}}
        color={COLORS.primary}
      />

      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.primary}}>
          {name}
        </Text>

        <TouchableOpacity
          style={styles.customInput}
          // onPress={() => {
          //   setVisible(!visible);
          // }}
        >
          <Text style={{color: '#BFBFBF'}}>Choose provider</Text>
          <Icon
            name="chevron-down-outline"
            size={20}
            style={{fontWeight: 'bold'}}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <View style={[styles.customInput, {padding: 0}]}>
          <TextInput
            style={{
              width: '100%',
              paddingLeft: 20,
              paddingVertical: 16,
            }}
            placeholder="Customer ID"
            placeholderTextColor="#BFBFBF"
            keyboardType="phone-pad"
          />
        </View>

        <View style={[styles.customInput, {padding: 0}]}>
          <TextInput
            style={{
              width: '100%',
              paddingLeft: 20,
              paddingVertical: 16,
            }}
            placeholder="Amount"
            placeholderTextColor="#BFBFBF"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: '#00DC99',
              width: '100%',
              borderRadius: 10,
              // marginTop: 20,
            },
          ]}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              lineHeight: 30,
              fontWeight: 'bold',
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CableTv;

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },

  btn: {
    padding: 15,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    marginTop: 50,
  },
});
