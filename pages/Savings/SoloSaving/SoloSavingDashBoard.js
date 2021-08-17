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
import Spinner from 'react-native-loading-spinner-overlay';

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
  const [locked, setLocked] = useState(true);

  const [spinner, setSpinner] = useState(false);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  useEffect(() => {
    console.log('Down....');
    dispatch(getTotalSoloSavings());
  }, []);

  useEffect(() => {
    console.log('Loading....');
    getUserSavings();
  }, []);

  const getUserSavings = async () => {
    setSpinner(true);
    const token = await getToken();
    const url = 'http://67.207.86.39:8000/api/v1/get_user_savings';
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
      });
      // console.log('RES: ', response.data.data[0]);

      let resData = response.data.data[0];

      setLocked(resData.locked);
      setSavingTitle(resData.name);
      setTotalSaving(resData.amount_save);
      setSavingsTarget(resData.target_amount);
      setPercentAchieved(
        (
          (Number(resData.amount_save) / Number(resData.target_amount)) *
          100
        ).toFixed(0),
      );
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
    }
  };

  const getTransactions = async () => {
    const url = '/api/v1/get_savings_history/:savings_id';
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
                  name={locked ? 'lock-closed' : 'lock-open'}
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
            // borderWidth: 1,
            // width: '100%',
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
                              fontSize: 14,
                              // fontWeight: 'bold',
                              color: COLORS.dark,
                            }}>
                            {savingTitle}
                          </Text>
                          {/* <Text
                            style={{
                              fontSize: 10,
                              // fontWeight: 'bold',
                              color: COLORS.dark,
                              opacity: 0.5,
                            }}>
                            {el.reference}
                          </Text> */}
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

      <Spinner visible={spinner} size="large" />
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
