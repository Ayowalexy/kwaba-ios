import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images, COLORS} from '../../../util/index';
import {currencyFormat, numberWithCommas} from '../../../util/numberFormatter';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentUser} from '../../../redux/actions/userActions';
import {getTotalSoloSavings} from '../../../redux/actions/savingsActions';

import QuickSaveModal from '../../../components/QuickSaveModal';
import moment from 'moment';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SoloSavingDashBoard({navigation}) {
  const dispatch = useDispatch();
  const getSoloSaving = useSelector((state) => state.getSoloSavingsReducer);
  const soloSaving = useSelector((state) => state.soloSavingReducer);
  const currentUser = useSelector((state) => state.getUserReducer);
  // useSelector((state) => console.log('State:', state));
  const [activeTab, setActiveTab] = useState(0);
  const [today, setToday] = useState('');
  // const [openQuickSave, setOpenQuickSave] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [totalSaving, setTotalSaving] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [savingsTarget, setSavingsTarget] = useState(0);
  const [percentAchieved, setPercentAchieved] = useState(0);
  const [savingTitle, setSavingTitle] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [quickSaveModal, setQuickSaveModal] = useState(false);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getTotalSoloSavings());
  }, [getTotalSoloSavings]);

  useEffect(() => {
    const totalSoloSavings =
      getSoloSaving?.data?.length > 0
        ? getSoloSaving.data.reduce(
            (acc, saving) => acc + Number(saving.amount),
            0,
          )
        : 0;

    setTotalSaving(totalSoloSavings);

    const totalSoloSavingsInterest =
      getSoloSaving?.data?.length > 0
        ? getSoloSaving.data.reduce(
            (acc, saving) => acc + Number(saving.interest),
            0,
          )
        : 0;

    // console.log('Tot:', totalsolo)

    setTotalInterest(totalSoloSavingsInterest);

    // setSavingsTarget(soloSaving.savings_amount || 150000);

    setSavingTitle(soloSaving.savings_title);

    setPercentAchieved(
      ((Number(totalSoloSavings) / Number(savingsTarget)) * 100).toFixed(0),
    );

    // console.log('TOT: ', totalSoloSavings, savingsTarget);

    // console.log(getSoloSaving);
    getSavingsPlan();
  }, [savingsTarget]);

  useEffect(() => {
    getSavingsPlan();
  }, [getSoloSaving]);

  // const url = 'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/payments';
  // const url = 'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/savings';

  // useEffect(() => {
  //   getSavingsPlan();
  // }, []);

  const getSavingsPlan = async () => {
    const token = await getToken();
    const url =
      'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/savings_plan';

    // console.log('Token: ', token);

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );
      console.log('Fetch savings plan: ', response.data.data);
      let resData = response.data.data;
      setSavingsTarget(resData.amount || 150000);
    } catch (error) {
      console.log('Error: ', error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <Icon
        onPress={() => navigation.navigate('Home')}
        name="arrow-back-outline"
        size={25}
        style={{padding: 18, paddingHorizontal: 10}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <View style={[styles.content]}>
          <View style={{marginBottom: 20}}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.primary}}>
              Solo Saving{' '}
              <Text style={{fontSize: 10, color: '#ADADAD'}}>
                {savingTitle}
              </Text>
            </Text>
            <Text style={{fontSize: 12, fontWeight: '700', color: '#ADADAD'}}>
              {moment().format('ddd, D MMM')}
            </Text>
          </View>
          <View style={[styles.soloSavingCard]}>
            <Image
              source={images.soloSavingsCard}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'stretch',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
            <View style={{padding: 20}}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  zIndex: 5,
                }}
                onPress={() => setQuickSaveModal(true)}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={icons.addIcon}
                />
              </TouchableOpacity>

              <Text style={{color: COLORS.white}}>You have saved</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  marginLeft: 5,
                  // borderWidth: 1,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  ₦{currencyFormat(Number(totalSaving))}
                </Text>
                <Icon
                  name="lock-closed"
                  size={15}
                  style={{marginLeft: 10}}
                  color={COLORS.primary}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF50',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 10,
                      marginRight: 10,
                      backgroundColor: COLORS.secondary,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: -2,
                      color: COLORS.primary,
                    }}>
                    You are doing great
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 10, color: COLORS.white}}>
                    View saving details
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    size={15}
                    style={{color: COLORS.white, marginLeft: 10}}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ffffff20',
                flex: 1,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 10,
                    color: COLORS.white,
                    fontWeight: '200',
                  }}>
                  Interest Earned
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.white,
                    fontWeight: 'bold',
                  }}>
                  {/* ₦{currencyFormat(totalInterest)} */}
                  ₦0.00
                </Text>
              </View>

              <View />

              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: 10,
                    color: COLORS.white,
                    fontWeight: '200',
                  }}>
                  Saving Target
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.white,
                    fontWeight: 'bold',
                  }}>
                  ₦{currencyFormat(Number(savingsTarget))}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -50,
              elevation: 10,
            }}>
            <AnimatedCircularProgress
              size={90}
              width={10}
              rotation={0}
              style={styles.circularProgress}
              fill={Number(percentAchieved) || 0}
              tintColor={COLORS.secondary}
              backgroundColor="#2A286A90">
              {(fill) => (
                <View
                  style={{
                    backgroundColor: '#2A286A',
                    height: 100,
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={images.darkPurpleCircle}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'stretch',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'CircularStd',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                      // lineHeight: 27,
                      textAlign: 'center',
                    }}>
                    {percentAchieved || 0}%
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd',
                      fontSize: 10,
                      fontWeight: '600',
                      color: 'white',
                      // lineHeight: 14,
                      textAlign: 'center',
                      marginTop: -5,
                    }}>
                    achieved
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>

          {/*  */}

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('RentNowPayLaterOnboarding')}
              style={{
                width: '45%',
                minHeight: 100,
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 10,
                paddingBottom: 20,
                elevation: 1,
              }}>
              <View>
                <Image
                  style={{width: 80, height: 80, marginLeft: -20}}
                  source={icons.topUp}
                />
                <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
                  Rent Now Pay {'\n'}Later
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    color: '#ADADAD',
                    lineHeight: 20,
                  }}>
                  Let your family, friends assist you with your rent
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('EmergencyFundOnboarding')}
              style={{
                width: '45%',
                minHeight: 100,
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 10,
                paddingBottom: 20,
                elevation: 1,
              }}>
              <View>
                <Image
                  style={{width: 80, height: 80, marginLeft: -20}}
                  source={icons.instantLoan}
                />
                <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
                  Emergency {'\n'}Fund
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    color: '#ADADAD',
                    lineHeight: 20,
                  }}>
                  Access emerygency funds against your rent saving
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/*  */}

        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            minHeight: 200,
            marginTop: 10,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            elevation: 10,
          }}>
          <View style={{padding: 20}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: COLORS.primary,
              }}>
              My Transactions
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#F7F8FD',
                borderRadius: 10,
                overflow: 'hidden',
                marginTop: 10,
              }}>
              {['All', 'Savings', 'Withdrawals'].map((value, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveTab(index)}
                  style={{
                    flex: 1,
                    padding: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      activeTab == index ? COLORS.light : 'transparent',
                  }}>
                  {/* <View> */}
                  <Text
                    style={{
                      fontSize: 11,
                      color: activeTab == index ? COLORS.white : '#BFBFBF',
                    }}>
                    {value}
                  </Text>
                  {/* </View> */}
                </TouchableOpacity>
              ))}
            </View>

            {/* Transactions */}
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                {getSoloSaving.data.map((el, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 10,
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 20,
                          backgroundColor: COLORS.secondary,
                          marginRight: 10,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          // borderWidth: 1,
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              // fontWeight: 'bold',
                              color: COLORS.dark,
                            }}>
                            My Rent Savings
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              // fontWeight: 'bold',
                              color: COLORS.dark,
                              opacity: 0.5,
                            }}>
                            {el.reference}
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
                            ₦{currencyFormat(Number(el.amount))}
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
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#F7F8FD',
            }}
          />
        </View>
      </ScrollView>

      <QuickSaveModal
        onRequestClose={() => setQuickSaveModal(!quickSaveModal)}
        visible={quickSaveModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f00',
    backgroundColor: '#F7F8FD',
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // backgroundColor: '#f00',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  soloSavingCard: {
    width: '100%',
    minHeight: 180,
    // marginTop: 10,
    backgroundColor: COLORS.light,
    borderRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  circularProgress: {
    width: 97,
    height: 97,
    zIndex: 9,
    position: 'relative',
    // top: -50,
    // left: 50,
    // transform: [{translateX: 50}],
  },
});
