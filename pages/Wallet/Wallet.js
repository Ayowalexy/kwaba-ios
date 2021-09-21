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

export default function Wallet({navigation}) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [addFundsModal, setAddFundsModal] = useState(false);

  useEffect(() => {
    openPanel();
  }, []);

  const openPanel = () => {
    setActive(true);
  };

  const closePanel = () => {
    setActive(false);
  };

  return (
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: '#ffffff20',
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Icon name="arrow-back" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
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
          <Icon name="apps" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={[styles.content]}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'normal',
            textAlign: 'left',
            color: COLORS.white,
            marginLeft: 25,
          }}>
          Your Balance:
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: COLORS.white,
              }}>
              <Text style={{fontSize: 15}}>₦ </Text>
              {/* {formatNumber(7680000)} */}
              {formatNumber(Number(0).toFixed(2)) || '0.00'}
            </Text>

            <TouchableOpacity
              onPress={openPanel}
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
              <Icon name="eye-off-outline" size={15} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAddFundsModal(true)}
              style={{
                backgroundColor: '#ffffff20',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
                Add Funds
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              padding: 10,
              paddingHorizontal: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Text
              style={{fontSize: 12, fontWeight: 'normal', color: COLORS.white}}>
              Wallet ID:
            </Text> */}
            <Text
              style={{
                height: 30,
                fontSize: 14,
                fontWeight: 'bold',
                color: COLORS.white,
                marginLeft: 10,
                backgroundColor: '#ffffff20',
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}>
              99776231601
            </Text>
            <TouchableOpacity
              onPress={openPanel}
              style={{
                backgroundColor: '#ffffff20',
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                // borderLeftWidth: 1,
                // borderLeftColor: '#ffffff20',
                borderRadius: 5,
                marginLeft: 5,
              }}>
              <Icon name="copy-outline" size={15} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            onPress={openPanel}
            style={{
              backgroundColor: '#ffffff20',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text
              style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
              Add Funds
            </Text>
          </TouchableOpacity> */}
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
          <Text style={{fontSize: 14, fontWeight: 'bold', color: COLORS.grey}}>
            No Transactions
          </Text>
        </View>
      </SwipeablePanel>

      <SwipeablePanel
        fullWidth
        onlySmall
        isActive={addFundsModal}
        onClose={() => setAddFundsModal(false)}
        closeOnTouchOutside={true}
        style={{flex: 1, borderWidth: 1}}
        onPressCloseButton={() => setAddFundsModal(false)}>
        <View style={{paddingVertical: 20, paddingHorizontal: 30}}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: COLORS.dark}}>
            How would you like {'\n'}to add money?
          </Text>
        </View>
        <View>
          {[
            {name: 'Debit Card', icon: 'card'},
            {name: 'Bank Transfer', icon: 'home'},
          ].map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderTopWidth: 1,
                  borderTopColor: '#BFBFBF50',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#00DC9920',
                    marginRight: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name={item.icon} size={20} color={COLORS.secondary} />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: COLORS.dark,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SwipeablePanel>
    </View>
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
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
