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

export default function Disbursement({navigation}) {
  const dispatch = useDispatch();
  const theBank = useSelector((state) => state.getBankAccountsReducer);
  const [clickedID, setClickedID] = useState('');

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  // useEffect(() => {
  //   console.log('The Bank: ', theBank.data);
  // }, [theBank]);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      const storeBank = await AsyncStorage.getItem(`storeBank-${user.id}`);
      const parsedData = JSON.parse(storeBank);
      console.log('STORE: BANK: ', parsedData);
      setClickedID(parsedData.id);
    })();
  }, []);

  const handlePress = async (item) => {
    setClickedID(item.id);
    const user = await getUser();
    await AsyncStorage.setItem(`storeBank-${user.id}`, JSON.stringify(item));

    dispatch(setBankFromStorage(item));
    navigation.goBack();
  };

  const renderBankAccounts = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.bankCard,
        // {
        //   borderWidth: item.id == clickedID ? 2 : 0,
        //   borderColor: item.id == clickedID ? COLORS.secondary : 'none',
        // },
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

        {item.id == clickedID && (
          <Icon
            name="checkbox"
            size={20}
            color={COLORS.secondary}
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
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
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={styles.content}>
          <Text style={styles.heading}>Change/Add Account</Text>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
          <TouchableOpacity
            // onPress={() => setBankModalVisible(true)}
            style={[styles.addButton]}>
            <IconFA5 name="plus" size={15} color={COLORS.white} />
          </TouchableOpacity>
          <FlatList
            data={theBank?.data}
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 16,
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
