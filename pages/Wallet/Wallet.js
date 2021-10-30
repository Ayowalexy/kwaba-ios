import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../util';
import {formatNumber} from '../../util/numberFormatter';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMaxLoanCap} from '../../redux/actions/savingsActions';
import {useDispatch, useSelector} from 'react-redux';
import {SwipeablePanel} from 'rn-swipeable-panel';
import AddFundToWalletModal from './AddFundToWalletModal';
import {
  getUserWallet,
  getUserWalletTransactions,
} from '../../redux/actions/walletAction';

export default function Wallet(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [addFundsModal, setAddFundsModal] = useState(false);

  const [amount, setAmount] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const [toggleAmount, setToggleAmount] = useState(true);

  const getWallet = useSelector((state) => state.getUserWalletReducer);
  const getWalletTransactions = useSelector(
    (state) => state.getUserWalletTransactionsReducer,
  );

  useEffect(() => {
    dispatch(getUserWallet());
    dispatch(getUserWalletTransactions());
    // dispatch(getBillsCategory('airtime'));
  }, []);

  useEffect(() => {
    setAmount(getWallet.available_balances);
  }, [getWallet]);

  // useEffect(() => {
  //   // setTransactions(getWalletTransactions);
  //   // console.log(getWalletTransactions);
  // }, [getWalletTransactions]);

  // useEffect(() => {
  //   openPanel();
  // }, []);

  const openPanel = () => {
    setActive(true);
  };

  const closePanel = () => {
    setActive(false);
  };

  return (
    <>
      <View style={[styles.container]}>
        <View
          style={{
            width: '100%',
            flex: 1,
            position: 'absolute',
            //   alignItems: 'center',
            //   justifyContent: 'center',
            opacity: 0.1,
          }}>
          <Icon
            name="wallet"
            size={200}
            color={COLORS.light}
            style={{
              position: 'absolute',
              right: -20,
              transform: [{rotate: '10deg'}],
            }}
          />
          <Icon
            name="wallet"
            size={100}
            color={COLORS.light}
            style={{
              position: 'absolute',
              left: -10,
              top: 50,
              transform: [{rotate: '-10deg'}],
            }}
          />
          <Icon
            name="wallet"
            size={50}
            color={COLORS.light}
            style={{
              position: 'absolute',
              left: 100,
              top: 100,
              transform: [{rotate: '-10deg'}],
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#00000050',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              backgroundColor: '#ffffff20',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon name="arrow-back" size={20} color={COLORS.white} />
          </TouchableOpacity> */}
          <View />
          <Text
            style={{
              fontSize: 12,
              marginLeft: 40,
              fontWeight: 'bold',
              color: COLORS.white,
            }}>
            My Wallet
          </Text>

          <TouchableOpacity
            onPress={openPanel}
            style={{
              backgroundColor: '#ffffff20',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Icon name="list-sharp" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={[styles.content]}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'normal',
                textAlign: 'left',
                color: COLORS.white,
                // marginLeft: 25,
              }}>
              Your Balance:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}>
                <Text style={{fontSize: 15}}>₦ </Text>
                {toggleAmount
                  ? formatNumber(Number(amount).toFixed(2))
                  : formatNumber(Number(amount).toFixed(2)).replace(
                      new RegExp('[0-9]', 'g'),
                      'x',
                    )}
              </Text>

              <TouchableOpacity
                onPress={() => setToggleAmount(!toggleAmount)}
                style={{
                  backgroundColor: '#ffffff20',
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Icon
                  name={toggleAmount ? 'eye-off-outline' : 'eye-outline'}
                  size={15}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setAddFundsModal(true)}
              style={{
                backgroundColor: '#ffffff20',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginTop: 20,
              }}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
                Add Funds
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <SwipeablePanel
          fullWidth
          isActive={active}
          onClose={closePanel}
          noBackgroundOpacity={true}
          closeOnTouchOutside={true}
          style={{flex: 1, borderWidth: 1}}
          onPressCloseButton={closePanel}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            {/* {!getWalletTransactions?.data?.length ? ( */}
            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: COLORS.grey}}>
              No Transactions
            </Text>
            {/* // ) : (
            //   <View>
            //     {getWalletTransactions?.data?.map((item, index) => {
            //       return (
            //         <View key={index}>
            //           <Text>{item.amount}</Text>
            //         </View>
            //       );
            //     })}
            //   </View>
            // )} */}
          </View>
        </SwipeablePanel>
      </View>

      {addFundsModal && (
        <AddFundToWalletModal
          onRequestClose={() => setAddFundsModal(!addFundsModal)}
          visible={addFundsModal}
          navigation={navigation}
          walletDetails={getWallet}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#00000050',
    borderTopWidth: 1,
    borderTopColor: COLORS.primary,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
