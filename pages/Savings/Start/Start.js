import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, images } from '../../../util/index';
import { currencyFormat, formatNumber } from '../../../util/numberFormatter';
import designs from './style';
import { useSelector, useDispatch } from 'react-redux';
import { getMaxLoanCap } from '../../../redux/actions/savingsActions';
import ComingSoon from '../../../components/ComingSoon';
import { TrackEvent } from '../../../util/segmentEvents';
import axios from 'axios';
import urls from '../../../services/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { seletAllSavingsStats } from '../../../redux/reducers/store/solo-savings/solo-savings-selectors';
import { selectAllSavingsChallenge } from '../../../redux/reducers/store/solo-savings/solo-savings-selectors';
import { selectAllUserSavingsChellange } from '../../../redux/reducers/store/savings-challenge/savings-challenge.selectors';
import { selectBuddies } from '../../../redux/reducers/store/buddy-savings/buddy-savings.selectors';
import { selectSolo } from '../../../redux/reducers/store/solo-savings/solo-savings-selectors';
import { useRoute } from '@react-navigation/native';


const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

export default function Start({ navigation }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const store2 = useSelector((state) => state.getBuddySavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [soloSaving, setSoloSaving] = useState(0);
  const [buddySaving, setBuddySaving] = useState(0);
  const [savingTenure, setSavingTenure] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const allSavings = useSelector((state) => state.getSoloSavingsReducer);
  const [allSavingsChallenges, setAllSavingschallenges] = useState([])
  const [joinSavings, setJoinedSavings] = useState([])
  const userSavingStats = useSelector(seletAllSavingsStats)
  const usersJoinedSavingsChallenge = useSelector(selectAllSavingsChallenge)
  const buddies = useSelector(selectBuddies)
  const user = useSelector(selectSolo)
  const [amountSaved, setAmountSaved] = useState('')
  const userSavingsChallenges = useSelector(selectAllUserSavingsChellange)

  const route = useRoute();
  console.log('Bu', userSavingsChallenges)


  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.name == 'SavingsHome') {
        const filtered = user.filter(a => a.savings_type == 'solo_savings')
          .reduce((b, c) => b + Number(c.amount_saved), 0)
        setAmountSaved(filtered)
      }
    });

    return unsubscribe;
  }, [navigation]);

  console.log('stats', userSavingStats)

  useEffect(() => {
    const data = getMaxLoanCap1?.data;

    // setTotalBalance(data?.total_savings);
    // setTotalSaving(data?.total_savings);
    // setSoloSaving(data?.total_solo_savings);
    // setBuddySaving(data?.total_buddy_savings);


  }, [store]);

  useEffect(() => {
    setTotalBalance(userSavingStats?.total_savings);
    setTotalSaving(userSavingStats?.total_savings);
    setSoloSaving(userSavingStats?.total_solo_savings);
    setBuddySaving(userSavingStats?.total_buddy_savings);


  }, [userSavingStats]);




  const getAllSavingsChallenges = async () => {
    const token = await getToken();
    console.log('Token: ', token);
    try {
      const resp = await axios.get(urls.savings.GET_ALL_CHALLENGES, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      // console.log('Challenges: ', resp?.data?.data);
      setAllSavingschallenges(resp?.data?.data);


      for (let d of resp.data.data) {
        console.log(d.id)
      }

      const filter = allSavings?.data?.filter(
        (item) => item.savings_type == 'savings_challenge',
      );

      setJoinedSavings(filter);

      console.log('Joined saving', filter)
    } catch (error) {
      console.log('Error failed: ', error.response.data);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllSavingsChallenges()
    })()
  }, [])

  return (
    <View style={[designs.container]}>
      <Icon
        onPress={() => navigation.navigate('Home')}
        name="arrow-back-outline"
        size={25}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 15,
          zIndex: 1,
        }}
        color={COLORS.white}
      />
      <Image
        source={images.group4585}
        style={{
          width: '100%',
          height: 300,
          position: 'absolute',
          top: 0,
          right: 0,
          opacity: 0.3,
        }}
        resizeMode="cover"
      />
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 30,
        }}>
        {/* <ImageBackground style={designs.backgroundImg} source={images.group4585}> */}

        <View style={{ paddingVertical: 10 }}>
          <Text
            style={{
              fontFamily: 'CircularStd',
              fontSize: 25,
              fontWeight: 'bold',
              color: '#00DC99',
              marginTop: 20,
              lineHeight: 32,
              paddingLeft: 10,
            }}>
            Savings
          </Text>
          <Text
            style={{
              width: '80%',
              fontFamily: 'CircularStd',
              fontSize: 12,
              fontWeight: '600',
              color: 'white',
              marginTop: 4,
              lineHeight: 20,
              paddingLeft: 10,
            }}>
            {/* Save towards your next rent with your flatmates, friends or family and
          earn interest on every deposit. */}
            {/* Save effortlessly towards your rent by yourself or with friends and
            family. Use Kwaba’s solo or buddy saving features to meet your rent
            target with ease. */}
            Use Kwaba’s solo or buddy savings to meet your rent target with
            ease. Earn daily interest while your rent works for you.
          </Text>
        </View>
        <View style={designs.scrollContainer}>
          <ScrollView
            scrollEnabled
            horizontal
            showsHorizontalScrollIndicator={false}>
            

            <View style={designs.smallBox}>
              {/* <BlurView
           blurType={'light'}
          blurAmount={20}
         
          style={[styles.blurView]}
          > */}

              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 9,
                  fontWeight: '600',
                  lineHeight: 11,
                  color: 'white',
                }}>
                Total Savings
              </Text>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 17,
                  fontWeight: 'bold',
                  lineHeight: 22,
                  color: 'white',
                  marginTop: 4,
                }}>
                {/* ₦{formatNumber(totalSaving) || '0.00'} */}
                ₦{
                  formatNumber(
                    Number(
                      user.filter(a => a?.savings_type == 'solo_savings')
                        .reduce((b, c) => b + Number(c.amount_saved), 0))
                    +
                    Number(buddies.reduce((a, b) => a + b.amount_saved, 0))
                    + Number(userSavingsChallenges.reduce((a, b) => a + b.amount_saved, 0))
                  ) || '0.00'}
              </Text>
              {/* </BlurView> */}
            </View>

            <View style={designs.smallBox}>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 9,
                  fontWeight: '600',
                  lineHeight: 11,
                  color: 'white',
                }}>
                Total Interest Earned
              </Text>
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 17,
                  fontWeight: 'bold',
                  lineHeight: 22,
                  color: 'white',
                  marginTop: 4,
                }}>
                ₦{currencyFormat(totalInterest) || '0.00'}
              </Text>
            </View>
            {/* </BlurView> */}
          </ScrollView>
        </View>
        {/* </ImageBackground> */}

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            // marginTop: 20,
            paddingVertical: 10,
          }}>
          <View style={designs.card}>
            <View style={designs.cardFlex}>
              <View>
                <Text style={designs.cardHeader}>Solo{'\n'}Saving</Text>
                <Text style={designs.bodyText}>
                  Save towards your next{'\n'}rent alone
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // console.log(store?.data);
                    TrackEvent('Solo Saving');
                    navigation.navigate(
                      // soloSaving == 0 ? 'SoloSaving1' : 'SavingLists',
                      store?.data?.length == 0 ? 'SoloSaving1' : 'SavingLists',
                    );
                  }}
                  style={[
                    designs.cardFlex,
                    {
                      marginTop: 16,
                      alignItems: 'center',
                      // justifyContent: 'center',
                      // height: 27,
                      // borderRadius: 10,
                      backgroundColor: '#F7F8FD',
                      // width: 131,
                      padding: 5,
                      paddingHorizontal: 10,
                    },
                  ]}>
                  {Number(user.filter(a => a?.savings_type == 'solo_savings')
                    .reduce((b, c) => b + Number(c.amount_saved), 0)) == 0
                    || !Number(user.filter(a => a.savings_type == 'solo_savings')
                      .reduce((b, c) => b + Number(c.amount_saved), 0)) ? (
                    <Text
                      style={[
                        designs.bodyText,
                        {
                          marginTop: 0,
                          fontSize: 14,
                          color: '#9D98EC',
                          fontWeight: 'bold',
                          marginRight: 8,
                        },
                      ]}>
                      Start saving
                    </Text>
                  ) : (
                    <Text
                      style={[
                        designs.bodyText,
                        {
                          marginTop: 0,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: '#9D98EC',
                          marginRight: 8,
                        },
                      ]}>
                      ₦{formatNumber(
                        user.filter(a => a?.savings_type == 'solo_savings')
                          .reduce((b, c) => b + Number(c.amount_saved), 0))}
                    </Text>
                  )}
                  <Icon name="arrow-forward" color="#9D98EC" size={15} />
                </TouchableOpacity>
              </View>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                  position: 'absolute',
                  right: -30,
                  bottom: -20,
                }}
                source={images.maskGroup15}
              />
            </View>
          </View>

          <View style={[designs.card]}>
            <View style={designs.cardFlex}>
              <View>
                <Text style={designs.cardHeader}>Buddy{'\n'}Savings</Text>
                <Text style={designs.bodyText}>
                  Save towards your rent with{'\n'}your flatmates or spouse
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    TrackEvent('Buddy Saving');
                    // navigation.navigate('BuddySaving1');
                    navigation.navigate(
                      buddies.length == 0 ? 'BuddySaving1' : 'BuddyLists',
                    );

                    // Alert.alert(
                    //   'Feature currently unavailable',
                    //   'We are working hard to make this available as soon as we can.',
                    // );
                  }}
                  style={[
                    designs.cardFlex,
                    {
                      marginTop: 16,
                      alignItems: 'center',
                      // justifyContent: 'center',
                      // height: 27,
                      // borderRadius: 10,
                      backgroundColor: '#F7F8FD',
                      width: 131,
                      padding: 5,
                    },
                  ]}>
                  {Number(buddies.reduce((a, b) => a + b.amount_saved, 0)) == 0 || !Number(buddies.reduce((a, b) => a + b.amount_saved, 0)) ? (
                    <Text
                      style={[
                        designs.bodyText,
                        {
                          marginTop: 0,
                          fontSize: 14,
                          color: '#9D98EC',
                          fontWeight: 'bold',
                          marginRight: 8,
                        },
                      ]}>
                      Start saving
                    </Text>
                  ) : (
                    <Text
                      style={[
                        designs.bodyText,
                        {
                          marginTop: 0,
                          fontSize: 14,
                          color: '#9D98EC',
                          fontWeight: 'bold',
                          marginRight: 8,
                        },
                      ]}>
                      ₦{formatNumber(buddies.reduce((a, b) => a + b.amount_saved, 0))}
                    </Text>
                  )}
                  <Icon name="arrow-forward" color="#9D98EC" size={15} />
                </TouchableOpacity>
              </View>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                  position: 'absolute',
                  right: -30,
                  bottom: -20,
                }}
                source={images.maskGroup14}
              />
            </View>
          </View>
          <View style={[designs.card]}>
            <View style={designs.cardFlex}>
              <View>
                <Text style={designs.cardHeader}>Savings{'\n'}Challenge</Text>
                <Text style={designs.bodyText}>
                  Save to meet your audacious goals{'\n'}with the big boys Challenge

                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('BuddySaving1');
                    navigation.navigate(
                      userSavingsChallenges?.length == 0 ? 'JoinChallengeList' : 'JoinChallengeDashboard', {
                      id: userSavingsChallenges?.[0]?.challenge_id,
                      amount: userSavingsChallenges?.[0]?.amount_saved
                    }
                    );

                    // Alert.alert(
                    //   'Feature currently unavailable',
                    //   'We are working hard to make this available as soon as we can.',
                    // );
                  }}
                  style={[
                    designs.cardFlex,
                    {
                      marginTop: 16,
                      alignItems: 'center',
                      // justifyContent: 'center',
                      // height: 27,
                      // borderRadius: 10,
                      backgroundColor: '#F7F8FD',
                      width: 131,
                      padding: 5,
                    },
                  ]}>
                  {userSavingsChallenges?.length == 0 ? (
                    <Text
                      style={[
                        designs.bodyText,
                        {
                          marginTop: 0,
                          fontSize: 14,
                          color: '#9D98EC',
                          fontWeight: 'bold',
                          marginRight: 8,
                        },
                      ]}>
                      Join Challenge
                    </Text>
                  ) : (
                    <Text
                      style={[
                        designs.bodyText,
                        {
                          marginTop: 0,
                          fontSize: 14,
                          color: '#9D98EC',
                          fontWeight: 'bold',
                          marginRight: 8,
                        },
                      ]}>
                      ₦{formatNumber(userSavingsChallenges[0]?.amount_saved)}
                    </Text>
                  )}
                  <Icon name="arrow-forward" color="#9D98EC" size={15} />
                </TouchableOpacity>
              </View>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                  position: 'absolute',
                  right: -30,
                  bottom: -20,
                }}
                source={images.maskGroup14}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <ComingSoon
        onRequestClose={() => setShowModal(!showModal)}
        visible={showModal}
        name="buddySaving"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  blurView: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    width: 160,
    height: 64,
    borderRadius: 10,
  },
  img: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: null,
    width: null,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  blurToggle: {
    position: 'absolute',
    top: 30,
    right: 10,
    alignItems: 'flex-end',
  },
});
