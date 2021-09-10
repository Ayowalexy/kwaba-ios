import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS, FONTS, images} from '../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setBankFromStorage} from '../redux/actions/bankActions';
import BankAccount from '../pages/UserAccount/CardAndBank/BankAccount';

export default function Disbursement({navigation}) {
  const dispatch = useDispatch();
  const theBank = useSelector((state) => state.getBankAccountsReducer);
  const [clickedID, setClickedID] = useState('');
  const [userBankAccounts, setUserBankAccounts] = useState([]);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      const storeBank = await AsyncStorage.getItem(`storeBank-${user.id}`);
      const parsedData = JSON.parse(storeBank);
      console.log('STORE: BANK: ', parsedData);
      setClickedID(parsedData.id);
    })();
  }, []);

  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          fontWeight: '900',
        }}
        color={COLORS.primary}
      />
      <Text style={[styles.heading]}>Disbursement Account</Text>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={[styles.content]}>
          <BankAccount
            userBankAccounts={userBankAccounts}
            allBanks={(value) => setUserBankAccounts(value)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  // heading: {
  //   paddingHorizontal: 20,
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: COLORS.primary,
  // },
  contentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  contentView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 10,
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonEmpty: {
    width: 40,
    height: 40,
    borderRadius: 40,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: COLORS.grey,
  },
  paymentCard: {
    width: 150,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
  bankCard: {
    width: 250,
    height: 140,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: 20,
    elevation: 1,
    overflow: 'hidden',
  },
});
