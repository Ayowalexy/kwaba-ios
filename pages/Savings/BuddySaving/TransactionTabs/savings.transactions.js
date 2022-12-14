import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../../../util';
import {formatNumber} from '../../../../util/numberFormatter';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTransactionsHistory } from '../../../../services/network';


export default function SavingsTransactions(props) {
  useEffect(() => {
    // console.log('Props: ', props.savingsTransactions);
  }, []);
  const [transactions, setTransactions] = useState([])

  console.log('id', props)


  useEffect(() => {
    (async () => {
      const history = await getTransactionsHistory();
      const filter = history?.data?.data?.filter(data => data?.savings_id == props?.id)
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
        {transactions?.map((el, index) => {
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
                    ???{formatNumber(Number(el.amount))}
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
        })}
      </ScrollView>
    </View>
    // </ScrollView>
  );
}
