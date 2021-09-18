import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../../util/index';
import {currencyFormat, formatNumber} from '../../../util/numberFormatter';
import designs from './style';
import {useSelector, useDispatch} from 'react-redux';
import {getMaxLoanCap} from '../../../redux/actions/savingsActions';
import ComingSoon from '../../../components/ComingSoon';

export default function Start({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const getMaxLoanCap1 = useSelector((state) => state.getMaxLoanCapReducer);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [soloSaving, setSoloSaving] = useState(0);
  const [buddySaving, setBuddySaving] = useState(0);
  const [savingTenure, setSavingTenure] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getMaxLoanCap());
  }, []);

  useEffect(() => {
    const data = getMaxLoanCap1?.data;

    setTotalBalance(data?.you_have_save);
    setTotalSaving(data?.you_have_save);
    setSoloSaving(data?.total_solo_savings);
    setBuddySaving(data?.total_buddy_savings || 0);
  }, [store]);

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
          paddingHorizontal: 20,
        }}>
        {/* <ImageBackground style={designs.backgroundImg} source={images.group4585}> */}

        <View style={{paddingVertical: 10}}>
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
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  fontSize: 9,
                  fontWeight: '600',
                  lineHeight: 11,
                  color: 'white',
                }}>
                Total Balance
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
                ₦{formatNumber(totalBalance) || '0.00'}
              </Text>
            </View>

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
                ₦{formatNumber(totalSaving) || '0.00'}
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
                  onPress={() =>
                    navigation.navigate(
                      soloSaving == 0 ? 'SoloSaving1' : 'SavingLists',
                    )
                  }
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
                  {soloSaving == 0 ? (
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
                      ₦{formatNumber(soloSaving)}
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

          <View style={designs.card}>
            <View style={designs.cardFlex}>
              <View>
                <Text style={designs.cardHeader}>Buddy{'\n'}Saving</Text>
                <Text style={designs.bodyText}>
                  Save towards your rent with{'\n'}your flatmates or spouse
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // console.log('Hello')
                    navigation.navigate(
                      buddySaving == 0 ? 'BuddySaving1' : 'BuddyLists',
                    );
                    // setShowModal(!showModal)
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
                  {buddySaving == 0 ? (
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
                      ₦{formatNumber(buddySaving)}
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
