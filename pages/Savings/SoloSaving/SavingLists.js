import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, images} from '../../../util';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {formatNumber} from '../../../util/numberFormatter';

export default function SavingLists({navigation}) {
  const dispatch = useDispatch();
  const allSavings = useSelector((state) => state.getSoloSavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);

  // useEffect(() => {
  //   console.log('From the store Max Loan Cap: ', getMaxLoanCap1);
  // }, []);

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  return (
    <View style={[styles.container]}>
      <View
        style={{
          width: '100%',
          // minHeight: 100,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: COLORS.primary,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: '#46596950',
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginRight: 20,
            }}>
            <Icon name="arrow-back-outline" size={25} color={COLORS.white} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: COLORS.white,
            }}>
            Solo Savings
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingLeft: 40,
            paddingTop: 10,
            paddingBottom: 30,
          }}>
          <Text style={{fontSize: 14, color: COLORS.white}}>
            You've already saved
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: COLORS.white,
              fontStyle: 'italic',
            }}>
            <Text style={{fontSize: 14, color: COLORS.light}}>₦{'  '}</Text>
            <Text>
              {formatNumber(
                Number(getMaxLoanCap1.data.total_solo_savings).toFixed(2),
              )}
            </Text>
          </Text>
        </View>
      </View>
      <View style={[styles.cardContainer]}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 80,
          }}
          scrollEnabled
          showsVerticalScrollIndicator={false}>
          {allSavings?.data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.card]}
                onPress={() =>
                  navigation.navigate('SoloSavingDashBoard', {id: item.id})
                }>
                <View style={[styles.cardFlex]}>
                  <View style={[styles.progressContainer]}>
                    <AnimatedCircularProgress
                      size={60}
                      width={5}
                      rotation={0}
                      style={{zIndex: 9, position: 'relative'}}
                      fill={
                        (Number(item.amount_save) /
                          Number(item.target_amount)) *
                        100
                      }
                      tintColor={COLORS.light}
                      backgroundColor="#2A286A10">
                      {(fill) => (
                        <View
                          style={{
                            backgroundColor: COLORS.white,
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // elevation: 2,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'CircularStd',
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: COLORS.dark,
                              textAlign: 'center',
                            }}>
                            {fill.toFixed(0)}%
                          </Text>
                        </View>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                  <View style={[styles.cardText]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={[styles.cardTitle]}>{item.name}</Text>
                      {/* <Icon
                        name={item.locked ? 'lock-closed' : 'lock-open'}
                        size={12}
                        color={COLORS.light}
                      /> */}
                    </View>

                    <View style={[styles.cardAmount]}>
                      <Text style={[styles.amountText]}>
                        ₦{formatNumber(item.amount_save) || '0.00'}
                      </Text>
                      <Text style={[styles.amountText, {opacity: 0.5}]}>
                        ₦{formatNumber(item.target_amount)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SoloSaving1')}
        style={{
          backgroundColor: COLORS.primary,
          width: 60,
          height: 60,
          position: 'absolute',
          right: 10,
          bottom: 10,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          borderColor: COLORS.white,
        }}>
        <IconFA5 name="plus" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    width: '100%',
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#9D98EC20',
    borderRadius: 15,
    marginBottom: 0,
    marginTop: 10,
  },
  cardFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginRight: 20,
  },
  cardText: {
    // borderWidth: 1,
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: COLORS.dark,
    marginRight: 20,
  },
  cardAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  amountText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.dark,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
