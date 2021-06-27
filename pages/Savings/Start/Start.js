import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {BlurView, VibrancyView} from '@react-native-community/blur';

const width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../../util/index';
import {currencyFormat} from '../../../util/numberFormatter';
import designs from './style';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentUser} from '../../../redux/actions/userActions';
import moment from 'moment';
import ComingSoon from '../../../components/ComingSoon';

export default function Start({navigation}) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.getSoloSavingsReducer);
  const currentUser = useSelector((state) => state.getUserReducer);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [soloSaving, setSoloSaving] = useState(0);
  const [buddySaving, setBuddySaving] = useState(0);
  const [savingTenure, setSavingTenure] = useState(0);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    // const totalSoloSavings = store.data?.reduce(
    //   (saving, acc) => Number(saving.amount) + Number(acc.amount),
    //   0,
    // );

    // const soloInterestTotal = store.data?.reduce(
    //   (saving, acc) => Number(saving.interest) + Number(acc.interest),
    //   0,
    // );

    //   const balance =
    //   totalSoloSavings +
    //   soloInterestTotal / Number(currentUser.data?.savings_tenure || 0);
    // setTotalBalance(balance || 0);
    // setTotalSaving(totalSoloSavings || 0);
    // setTotalInterest(
    //   soloInterestTotal?.toFixed(2) /
    //     Number(currentUser.data?.savings_tenure) || 0,
    // );
    // setSoloSaving(totalSoloSavings || 0);

    // setTotalBalance(balance || 0);
    // setTotalSaving(totalSoloSavings || 0);
    // setTotalInterest(
    //   soloInterestTotal?.toFixed(2) /
    //     Number(currentUser.data?.savings_tenure) || 0,
    // );
    // setSoloSaving(totalSoloSavings || 0);

    const totalSoloSavings = store.data?.reduce(
      (acc, saving) => acc + Number(saving.amount),
      0,
    );

    const soloInterestTotal = store.data?.reduce(
      (acc, saving) => acc + Number(saving.interest),
      0,
    );
    const balance = totalSoloSavings + soloInterestTotal;

    setTotalBalance(balance || 0);
    setTotalSaving(totalSoloSavings || 0);
    setTotalInterest(soloInterestTotal || 0);
    setSoloSaving(totalSoloSavings || 0);

    console.log('Store: ', balance);
  }, []);

  const savingsCard = [
    {
      title: 'Solo Saving',
      content: 'Save towards your next rent alone',
      image: images.maskGroup15,
    },
    {
      title: 'Buddy Saving',
      content: 'Save towards your next rent with your flatmates or spouse',
      image: images.maskGroup14,
    },
  ];
  return (
    <View style={[designs.container]}>
      <Image
        source={images.group4585}
        style={{
          width: '100%',
          height: 300,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        resizeMode="cover"
      />
      <ScrollView>
        {/* <ImageBackground style={designs.backgroundImg} source={images.group4585}> */}

        <View style={{padding: 10}}>
          <Text
            style={{
              fontFamily: 'CircularStd',
              fontSize: 25,
              fontWeight: 'bold',
              color: '#00DC99',
              marginTop: 50,
              lineHeight: 32,
            }}>
            Savings
          </Text>
          <Text
            style={{
              width: '70%',
              fontFamily: 'CircularStd',
              fontSize: 13,
              fontWeight: '600',
              color: 'white',
              marginTop: 4,
              lineHeight: 20,
            }}>
            {/* Save towards your next rent with your flatmates, friends or family and
          earn interest on every deposit. */}
            Save effortlessly towards your rent by yourself or with friends and
            family. Use Kwaba’s solo or buddy saving features to meet your rent
            target with ease.
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
                ₦{currencyFormat(totalBalance)}
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
                ₦{currencyFormat(totalSaving)}
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
                ₦{currencyFormat(totalInterest)}
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
            padding: 10,
          }}>
          {/* {savingsCard.map(({title, content, image}, index) => (
          <View key={index} style={designs.card}>
            <View style={{width: '60%'}}>
              <Text style={designs.cardHeader}>{title}</Text>
              <Text style={designs.bodyText}>{content}</Text>
              <TouchableOpacity
                // onPress={navigation.navigate('')}
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  marginTop: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 27,
                  borderRadius: 21,
                  backgroundColor: '#F7F8FD',
                  width: 131,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#9D98EC',
                    fontWeight: '600',
                  }}>
                  Start saving
                </Text>
                <Icon
                  name="arrow-forward"
                  color="#9D98EC"
                  size={15}
                  style={{marginTop: 2, marginLeft: 10}}
                />
              </TouchableOpacity>
            </View>
            <Image
              style={{
                width: 300,
                height: '100%',
                position: 'absolute',
                right: -70,
                bottom: 0,
                alignItems: 'flex-end',
              }}
              source={image}
              resizeMode="contain"
            />
          </View>
        ))} */}
          <View style={designs.card}>
            <View style={designs.cardFlex}>
              <View>
                <Text style={designs.cardHeader}>Solo{'\n'}Saving</Text>
                <Text style={designs.bodyText}>
                  Save towards your{'\n'}next rent alone
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      soloSaving == 0 ? 'SoloSaving1' : 'SoloSavingDashBoard',
                    )
                  }
                  style={[
                    designs.cardFlex,
                    {
                      marginTop: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // height: 27,
                      borderRadius: 21,
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
                          fontSize: 16,
                          color: '#9D98EC',
                          fontWeight: '600',
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
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#9D98EC',
                          marginRight: 8,
                        },
                      ]}>
                      ₦{currencyFormat(soloSaving)}
                    </Text>
                  )}
                  <Icon name="arrow-forward" color="#9D98EC" size={15} />
                </TouchableOpacity>
              </View>
              <Image
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                  position: 'absolute',
                  right: -20,
                  bottom: -25,
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
                  onPress={() =>
                    // navigation.navigate(
                    //   soloSaving == 0 ? 'SoloSaving1' : 'SoloSavingDashBoard',
                    // )
                    setShowModal(!showModal)
                  }
                  style={[
                    designs.cardFlex,
                    {
                      marginTop: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // height: 27,
                      borderRadius: 21,
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
                          fontSize: 16,
                          color: '#9D98EC',
                          fontWeight: '600',
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
                          fontSize: 16,
                          color: '#9D98EC',
                          fontWeight: '600',
                          marginRight: 8,
                        },
                      ]}>
                      ₦{currencyFormat(soloSaving)}
                    </Text>
                  )}
                  <Icon name="arrow-forward" color="#9D98EC" size={15} />
                </TouchableOpacity>
              </View>
              <Image
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                  position: 'absolute',
                  right: -20,
                  bottom: -25,
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
