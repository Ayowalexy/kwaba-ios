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
import {images} from '../../../util/index';
import {currencyFormat} from '../../../util/numberFormatter';
import designs from './style';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentUser} from '../../../redux/actions/userActions';
import moment from 'moment';

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

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    const totalSoloSavings = store.data?.reduce(
      (saving, acc) => Number(saving.amount) + Number(acc.amount),
      0,
    );
    const soloInterestTotal = store.data?.reduce(
      (saving, acc) => Number(saving.interest) + Number(acc.interest),
      0,
    );
    const balance =
      totalSoloSavings +
      soloInterestTotal / Number(currentUser.data?.savings_tenure || 0);
    setTotalBalance(balance || 0);
    setTotalSaving(totalSoloSavings || 0);
    setTotalInterest(
      soloInterestTotal?.toFixed(2) /
        Number(currentUser.data?.savings_tenure) || 0,
    );
    setSoloSaving(totalSoloSavings || 0);
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
    <ScrollView style={designs.container}>
      {/* <ImageBackground style={designs.backgroundImg} source={images.group4585}> */}
      {/* <Image
        source={images.group4585}
        style={{
          width: 400,
          height: 300,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        resizeMode="cover"
      /> */}
      <View style={{padding: 10}}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
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
            width: '60%',
            fontFamily: 'Poppins-Medium',
            fontSize: 12,
            fontWeight: '600',
            color: 'white',
            marginTop: 4,
            lineHeight: 20,
          }}>
          Save towards your next rent with your flatmates, friends or family and
          earn interest on every deposit.
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
                fontFamily: 'Poppins-Medium',
                fontSize: 9,
                fontWeight: '600',
                lineHeight: 11,
                color: 'white',
              }}>
              Total Balance
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 17,
                fontWeight: 'bold',
                lineHeight: 22,
                color: 'white',
                marginTop: 4,
              }}>
              ???{currencyFormat(totalBalance)}
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
                fontFamily: 'Poppins-Medium',
                fontSize: 9,
                fontWeight: '600',
                lineHeight: 11,
                color: 'white',
              }}>
              Total Savings
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 17,
                fontWeight: 'bold',
                lineHeight: 22,
                color: 'white',
                marginTop: 4,
              }}>
              ???{currencyFormat(totalSaving)}
            </Text>
            {/* </BlurView> */}
          </View>

          <View style={designs.smallBox}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 9,
                fontWeight: '600',
                lineHeight: 11,
                color: 'white',
              }}>
              Total Interest Earned
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 17,
                fontWeight: 'bold',
                lineHeight: 22,
                color: 'white',
                marginTop: 4,
              }}>
              ???{totalInterest}
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
                    width: 131,
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
                        color: '#9D98EC',
                        fontWeight: '600',
                        marginRight: 8,
                      },
                    ]}>
                    ???{currencyFormat(soloSaving)}
                  </Text>
                )}
                <Icon name="arrow-forward" color="#9D98EC" size={15} />
              </TouchableOpacity>
            </View>
            <Image
              style={{width: 146, height: 146}}
              source={images.maskGroup15}
            />
          </View>
        </View>

        <View style={designs.card}>
          <View style={designs.cardFlex}>
            <View>
              <Text style={designs.cardHeader}>Buddy{'\n'}Saving</Text>
              <Text style={designs.bodyText}>
                Save towards your next rent with{'\n'}your flatmates or spouse
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    buddySaving == 0 ? 'BuddySaving1' : 'BuddySavingDashBoard',
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
                    width: 131,
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
                    ???{currencyFormat(buddySaving)}
                  </Text>
                )}
                <Icon name="arrow-forward" color="#9D98EC" size={15} />
              </TouchableOpacity>
            </View>
            <Image
              style={{width: 146, height: 206}}
              source={images.maskGroup14}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
