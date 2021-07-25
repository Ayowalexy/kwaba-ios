import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
// import designs from './style';
import {COLORS, FONTS, images, icons} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import CardAndBankModal from './CardAndBankModal';
import AddBankAccountModal from '../../../components/addBankAccountModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoCardAndBank(props, {navigation}) {
  const {allBanks} = props;
  const [showCardAndBankModal, setShowCardAndCardModal] = useState(false);
  const [bankModalVisible, setBankModalVisible] = useState(false);

  const handleAdd = async () => {
    console.log('Opening...');
    setShowCardAndCardModal(true);
  };

  const checkType = async (type) => {
    console.log('The Type:', type);
    if (type == 'add-bank-account') {
      setBankModalVisible(true);
    } else {
      // for payment card
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View style={{bottom: 50, alignItems: 'center'}}>
          <Image
            source={icons.cardAndBank}
            style={{width: 150, height: 150, marginLeft: -10}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.grey,
              lineHeight: 20,
            }}>
            No payment card and bank{'\n'} account
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleAdd}
          style={[styles.button, {position: 'absolute', bottom: 20}]}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 12,
              lineHeight: 30,
              textTransform: 'uppercase',
            }}>
            ADD NEW CARD / ACCOUNT
          </Text>
        </TouchableOpacity>
      </View>

      <CardAndBankModal
        onRequestClose={() => setShowCardAndCardModal(!showCardAndBankModal)}
        visible={showCardAndBankModal}
        navigation={navigation}
        onClick={(type) => checkType(type)}
      />

      <AddBankAccountModal
        onRequestClose={() => setBankModalVisible(!bankModalVisible)}
        visible={bankModalVisible}
        setDisplayAllBankAccounts={(all) => allBanks(all)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    // height: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    backgroundColor: '#00DC99',
    marginTop: 20,
  },
});
