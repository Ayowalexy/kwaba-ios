import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, images} from '../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setBankFromStorage} from '../redux/actions/bankActions';
import BankAccount from '../pages/UserAccount/CardAndBank/BankAccount';
import {getAllBanks, getBankAccounts} from '../services/network';
import AddBankAccountModal from './addBankAccountModal';

export default function Disbursement(props) {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const theBank = useSelector((state) => state.getBankAccountsReducer);
  const [clickedID, setClickedID] = useState('');
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [bankModalVisible, setBankModalVisible] = useState(false);

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const handlePress = async (item) => {
    console.log('Item: ', item);
    console.log('Route: ', route?.params?.from);
    const user = await getUser();
    await AsyncStorage.setItem(`storeBank-${user.id}`, JSON.stringify(item));
    if (route?.params?.from) {
      navigation.navigate(route?.params?.from);
    } else {
      navigation.navigate('EmergencyLoanRequest');
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser();
  //     const storeBank = await AsyncStorage.getItem(`storeBank-${user.id}`);
  //     const parsedData = JSON.parse(storeBank);
  //     console.log('STORE: BANK: ', parsedData);
  //     setClickedID(parsedData?.id);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await getBankAccounts();
        // console.log('Banker Res: ', res.data.userBanks);
        setUserBankAccounts(res?.data?.userBanks);
      } catch (error) {
        console.log('The Error: ', error);
      }
    })();
  }, []);

  const renderBankAccounts = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.bankCard,
        {
          borderWidth: item.id == clickedID ? 2 : 0,
          borderColor: item.id == clickedID ? COLORS.secondary : 'none',
        },
      ]}
      onPress={() => {
        handlePress(item);
      }}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: COLORS.white,
          }}>
          {item.user_bank_name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.light,
          }}>
          {item.bank_name}
        </Text>
        <Text
          style={{
            marginTop: 40,
            fontSize: 14,
            color: COLORS.white,
            opacity: 0.8,
          }}>
          {item.bank_account_number}
        </Text>

        <Image
          style={{
            width: 71,
            height: 110,
            position: 'absolute',
            resizeMode: 'contain',
            right: -21,
            bottom: -20,
            borderWidth: 1,
          }}
          source={images.maskGroup24}
        />
      </View>
    </TouchableOpacity>
  );

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
          <View style={[styles.contentView]}>
            <>
              <TouchableOpacity
                // onPress={() => setBankModalVisible(true)}
                onPress={() => navigation.navigate('CardAndBankDetails')}
                style={[styles.addButton]}>
                <IconFA5 name="plus" size={15} color={COLORS.white} />
              </TouchableOpacity>
              <FlatList
                data={userBankAccounts}
                renderItem={renderBankAccounts}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{
                  marginLeft: 10,
                }}
                contentContainerStyle={{
                  paddingVertical: 5,
                }}
              />
            </>
          </View>
        </View>
      </ScrollView>

      {/* {bankModalVisible && (
        <AddBankAccountModal
          onRequestClose={() => setBankModalVisible(!bankModalVisible)}
          visible={bankModalVisible}
          setDisplayAllBankAccounts={(all) => console.log('all:', all)}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },

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
