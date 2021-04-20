import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions
} from 'react-native';

const width=Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../../../util/index';
import {currencyFormat} from '../../../util/numberFormatter';
import designs from './style';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentUser} from '../../../redux/actions/userActions';

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
    );
    const soloInterestTotal = store.data?.reduce(
      (saving, acc) => Number(saving.interest) + Number(acc.interest),
    );
    const balance =
      totalSoloSavings +
      soloInterestTotal / Number(currentUser.data?.savings_tenure || 0);
    setTotalBalance(balance || 0);
    setTotalSaving(totalSoloSavings || 0);
    setTotalInterest(
      soloInterestTotal?.toFixed(2) / Number(currentUser.data?.savings_tenure) || 0
    );
    setSoloSaving(totalSoloSavings || 0);
  }, []);
  return (
    <View style={designs.container}>
      <ImageBackground style={designs.backgroundImg} source={images.group4585}>
        <View>
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
              fontFamily: 'CircularStd',
              fontSize: 12,
              fontWeight: '600',
              color: 'white',
              marginTop: 4,
              lineHeight: 15,
            }}>
            Save towards your next rent with your{'\n'}flatmates, friends or
            family and earn interest{'\n'}on every deposit.
          </Text>
        </View>
        <View style={designs.scrollContainer}>
          <ScrollView scrollEnabled horizontal>
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
                ₦{totalInterest}
              </Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
     

    


      <View style={{flexDirection:'column',justifyContent:'center'}}>

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
                      soloSaving == 0 ? 'SoloSaving1' : 'SoloSavingDashBoard',
                    )
                  }
                  style={[
                    designs.cardFlex,
                    {
                      marginTop: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 27,
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
                      ₦{currencyFormat(soloSaving)}
                    </Text>
                  )}
                  <Icon name="arrow-forward" color="#9D98EC" size={15} />
                </TouchableOpacity>
              </View>
              <Image
                style={{width: 146, height: 146,}}
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
                      height: 27,
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
                      ₦{currencyFormat(buddySaving)}
                    </Text>
                  )}
                  <Icon name="arrow-forward" color="#9D98EC" size={15} />
                </TouchableOpacity>

              </View>
              <Image
                style={{width: 146, height: 146}}
                source={images.maskGroup14}
              />
            </View>
          </View>
      </View>
    




    </View>
  );
}
