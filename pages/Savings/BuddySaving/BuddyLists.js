import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, images} from '../../../util';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMaxLoanCap,
  getTotalBuddySavings,
} from '../../../redux/actions/savingsActions';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {formatNumber} from '../../../util/numberFormatter';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

// const renderTabBar = (props) => (
// <TabBar
//   {...props}
//   scrollEnabled={true}
//   indicatorStyle={{
//     backgroundColor: COLORS.primary,
//     //   backgroundColor: 'transparent',
//     flex: 1,
//     height: '100%',
//     borderRadius: 0,
//     elevation: 2,
//     zIndex: 99999,
//     //   width: 200,
//   }}
//   // indicatorContainerStyle={{backgroundColor: 'red'}}
//   pressColor={'transparent'}
//   style={{
//     backgroundColor: '#F7F8FD',
//     elevation: 0,
//     // flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'center',
//     // alignItems: 'center',
//     // marginVertical: 10,
//     // backgroundColor: 'red',
//     // marginTop: 50,
//     // borderWidth: 1,
//     // flex: 1,
//   }}
//   tabStyle={{
//     backgroundColor: 'transparent',
//     // marginHorizontal: 10,
//     // borderRadius: 5,
//     zIndex: 1,
//     padding: 0,
//     // borderWidth: 5,
//     flex: 1,
//   }}
//   renderLabel={({route, focused, color}) => (
//     <Text
//       // numberOfLines={1}
//       style={{
//         color: focused ? 'white' : '#808285',
//         fontSize: 12,
//         //   fontWeight: focused ? 'bold' : 'normal',
//         fontWeight: 'bold',
//       }}>
//       {route.title}
//     </Text>
//   )}
// />
// );

export default function BuddyLists({navigation}) {
  const dispatch = useDispatch();
  const allSavings = useSelector((state) => state.getBuddySavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);

  useEffect(() => {
    console.log('From the store Max Loan Cap: ', allSavings);
  }, []);

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  const Joined = () => {
    return (
      <>
        <View style={[styles.cardContainer]}>
          {true ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.dark}}>
                You have not joined any savings yet
              </Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 80,
                f,
              }}
              scrollEnabled
              showsVerticalScrollIndicator={false}></ScrollView>
          )}
        </View>
      </>
    );
  };

  const Created = () => {
    return (
      <>
        <View style={[styles.cardContainer]}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 80,
            }}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {allSavings?.data?.length &&
              allSavings?.data?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.card]}
                    onPress={() => {
                      navigation.navigate('BuddySavingDashBoard', {
                        id: item.id,
                      });
                      // console.log(item.id);
                    }}>
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
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={[styles.cardTitle]}>{item.name}</Text>
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
          onPress={() => navigation.navigate('BuddySaving1')}
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
      </>
    );
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'one', title: 'Created'},
    {key: 'two', title: 'Joined'},
  ]);

  const renderScene = SceneMap({
    one: Created,
    two: Joined,
  });

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setIndex(i)}
              // onPress={() => this.setState({index: i})}
            >
              <Animated.View>
                <Animated.Text
                  style={[
                    {opacity},
                    {
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontSize: 12,
                      color: COLORS.primary,
                    },
                  ]}>
                  {route.title}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

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
            Buddy Savings
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
                Number(getMaxLoanCap1.data.total_buddy_savings).toFixed(2),
              )}
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

      <View style={{flex: 1}}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          //   initialLayout={{width: layout.width}}
          initialLayout={{width: Dimensions.get('window').width}}
        />
      </View>
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
  tabBar: {
    flexDirection: 'row',
    // borderTopColor: '#FFF',
    // borderTopWidth: 1,
    // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7F8FD',
  },
});
