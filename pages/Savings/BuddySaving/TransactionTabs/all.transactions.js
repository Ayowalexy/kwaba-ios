import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getSavingsHistory, getUserSavings} from '../../../../services/network';
import {COLORS} from '../../../../util';
import {formatNumber} from '../../../../util/numberFormatter';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { getTransactionsHistory } from '../../../../services/network';


export default function AllTransactions(props) {
  const getPaymentHistoryReducer = useSelector(
    (state) => state.getPaymentHistoryReducer,
  );
  const slicedTransaction = getPaymentHistoryReducer?.data?.slice(0, 7);

  const solo_history = getPaymentHistoryReducer?.data?.filter(element => !Object.is(element?.savings_id, null))

  const buddyTransactions = solo_history?.filter(element => element?.savings_id === props?.id)

console.log('buddy props', buddyTransactions)
const [transactions, setTransactions] = useState([])

console.log('id', props)


useEffect(() => {
  (async () => {
    const history = await getTransactionsHistory();
    const filter = history?.data?.data?.filter(data => data?.savings_id == props?.id)
    console.log('history',  filter)
    setTransactions(filter)
  })()
}, [])
  return (
    // <ScrollView
    //   scrollEnabled={true}
    //   showsVerticalScrollIndicator={true}
    //   style={{flex: 1}}>
    <View
      style={{
        paddingHorizontal: 10,
        borderTopColor: '#BFBFBF50',
        borderTopWidth: 1,
        paddingVertical: 10,
        flex: 1,
        marginTop: 20,
        overflow: 'scroll',
        // height: '100%',
      }}>
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{
          zIndex: 900,
        }}>
          <View
          style={{
            marginTop: 30,
            paddingHorizontal: 20,
          }}>
          {transactions?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  borderLeftWidth: 2,
                  borderLeftColor:
                    index == solo_history.length - 1
                      ? 'transparent'
                      : '#46596950',
                  paddingBottom: 30,
                }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: COLORS.dark,
                    borderRadius: 15,
                    position: 'absolute',
                    left: -9,
                    top: 0,
                  }}
                />
                <View style={{paddingLeft: 40, marginTop: -5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: COLORS.dark,
                      }}>
                      ₦{formatNumber(Number(item.amount).toFixed(2))}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.dark,
                      }}>
                      {moment(item.updated_at).format('DD MMM YYYY')}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.dark,
                      marginTop: 20,
                      lineHeight: 20,
                    }}>
                    {item.reason}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        {/* {props?.savingsTransactions?.map((el, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF20',
              }}>
              <Icon
                name={
                  el.status == 1
                    ? 'checkmark-done-outline'
                    : 'trending-down-outline'
                }
                size={18}
                color={el.status == 1 ? COLORS.secondary : COLORS.red}
                style={{
                  marginRight: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLORS.dark,
                    }}>
                    {props?.title}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: COLORS.dark,
                    }}>
                    ₦{formatNumber(Number(el.amount))}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: COLORS.dark,
                      opacity: 0.5,
                    }}>
                    {el.created_at}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })} */}
      </ScrollView>
    </View>
    // </ScrollView>
  );
}
