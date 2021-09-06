import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getSavingsHistory, getUserSavings} from '../../../../services/network';
import {COLORS} from '../../../../util';
import {formatNumber} from '../../../../util/numberFormatter';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AllTransactions(props) {
  const getSoloSaving = useSelector((state) => state.getSoloSavingsReducer);
  const [savingTitle, setSavingTitle] = useState('');
  const [transactions, setTransactions] = useState(null);

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
          // borderColor: 'blue',
          // borderWidth: 2,
          // flex: 1,
          // height: 500,
          zIndex: 900,
        }}>
        {/* {transactions?.map((el, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                // marginTop: 10,
                // backgroundColor: 'red',
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
                    {savingTitle}
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
