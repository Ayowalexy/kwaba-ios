import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS, images } from '../../../util';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  getMaxLoanCap,
  getOneSoloSavings,
  getOneSoloSavingsTransaction,
} from '../../../redux/actions/savingsActions';
import { selectSolo } from '../../../redux/reducers/store/solo-savings/solo-savings-selectors';
import { selectAllSoloSavings } from '../../../redux/reducers/store/solo-savings/solo-savings-selectors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { formatNumber } from '../../../util/numberFormatter';

const Item = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.card]}
      onPress={() => {
        dispatch(getOneSoloSavings(item?.id));
        dispatch(getOneSoloSavingsTransaction(item?.id));
        navigation.navigate('SoloSavingDashBoard', { id: item?.id });
        console.log('The ID: ', item?.id);
      }}>
      <View style={[styles.cardFlex]}>
        <View style={[styles.progressContainer]}>
          <AnimatedCircularProgress
            size={60}
            width={5}
            rotation={0}
            style={{ zIndex: 9, position: 'relative' }}
            fill={
              (Number(item?.amount_save) / Number(item?.target_amount)) * 100
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
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.cardTitle]}>{item?.name}</Text>
          </View>

          <View style={[styles.cardAmount]}>
            <View>
              <Text style={[styles.amountText]}>Amount Saved</Text>
              <Text style={[styles.amountText]}>
                ???{formatNumber(item?.amount_save) || '0.00'}
              </Text>
            </View>

            <View>
              <Text style={[styles.amountText]}>Target Amount</Text>
              <Text style={[styles.amountText]}>
                ???{formatNumber(item?.target_amount)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function SavingLists({ navigation, route }) {
  const dispatch = useDispatch();
  const allUserSoloSavings = useSelector(selectAllSoloSavings)
  const user = useSelector(selectSolo)
  const [amount_saved_, setAmountSaved] = useState(0)
  const allSavings = useSelector((state) => state.getSoloSavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);

console.log('userss', user)
const insets = useSafeAreaInsets();
const statusBarHeight = insets.top;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.name == 'SavingLists') {
        const filtered = user.filter(a => a.savings_type == 'solo_savings')
          .reduce((b, c) => b + Number(c.amount_saved), 0)
        setAmountSaved(filtered)

        console.log('Fil', filtered)
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    dispatch(getMaxLoanCap());
    console.log('All user solo savings', allUserSoloSavings)

    console.log('Length: ', allSavings?.data?.length);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.card]}
        onPress={() => {
          dispatch(getOneSoloSavings(item?.id));
          dispatch(getOneSoloSavingsTransaction(item?.id));
          navigation.navigate('SoloSavingDashBoard', { id: item?.id });
        }}>
        <View style={[styles.cardFlex]}>
          <View style={[styles.progressContainer]}>
            <AnimatedCircularProgress
              size={60}
              width={5}
              rotation={0}
              style={{ zIndex: 9, position: 'relative' }}
              fill={
                (Number(item?.amount_saved) / Number(item?.target_amount)) * 100
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
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.cardTitle]}>{item?.name}</Text>
            </View>

            <View style={[styles.cardAmount]}>
              <View>
                <Text style={[styles.amountText, { opacity: 0.5 }]}>
                  Amount Saved
                </Text>
                <Text style={[styles.amountText]}>
                  ???{formatNumber(item?.amount_saved) || '0.00'}
                </Text>
              </View>

              <View>
                <Text style={[styles.amountText, { opacity: 0.5 }]}>
                  Target Amount
                </Text>
                <Text style={[styles.amountText]}>
                  ???{formatNumber(item?.target_amount)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { marginTop: Platform.OS == 'ios'
    ? statusBarHeight
    : 0
  
  }]}>
      <View
        style={{
          width: '100%',
          // minHeight: 100,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: COLORS.primary,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SavingsHome')}
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
          <Text style={{ fontSize: 14, color: COLORS.white }}>
            You've already saved
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: COLORS.white,
              fontStyle: 'italic',
            }}>
            <Text style={{ fontSize: 14, color: COLORS.light }}>???{'  '}</Text>
            <Text>
              {/* {formatNumber(
                Number(getMaxLoanCap1?.data?.total_solo_savings).toFixed(2),
              )} */}
              {
                user?.filter(a => a?.savings_type == 'solo_savings')?.length
                ?
              
              formatNumber(
                Number(
                  user.filter(a => a.savings_type == 'solo_savings')
                    .reduce((b, c) => b + Number(c.amount_saved), 0)
                ).toFixed(2)
              )
              :
              '0.00'
            
            }
            </Text>
          </Text>
        </View>

        <Image
          source={images.maskGroup29}
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.cardContainer]}>
        <FlatList
          data={user?.filter(
            (v) => v?.savings_type == 'solo_savings',
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id?.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
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
    // backgroundColor: COLORS.primary,
    width: '100%',
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#9D98EC20',
    // backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: -5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#BFBFBF50',
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
