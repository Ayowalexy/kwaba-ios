import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {COLORS} from '../../../../util';
import {formatNumber} from '../../../../util/numberFormatter';
import {AnimatedGaugeProgress} from 'react-native-simple-gauge';
import {fetch} from '../../../../services/creditScrore';
import designs from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreditDashboard(props) {
  const {route, navigation} = props;
  const [spinner, setSpinner] = useState(false);
  const [creditScore, setCreditScore] = useState('');
  const [creditRating, setCreditRating] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [creditScoreMessage, setCreditScoreMessage] = useState('');
  const [canApply, setCanApply] = useState(false);

  const [scoreData, setScoreData] = useState({});

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'creditDashboard');

      const creditScoreFormData = await AsyncStorage.getItem(
        `creditScoreData-${user.id}`,
      );
      const parseData = await JSON.parse(creditScoreFormData);
      console.log('Parsed Data: ', parseData);
      setScoreData(parseData);

      setSpinner(true);

      const payload = {
        email: parseData?.email,
        company: parseData?.company,
      };

      console.log('The Param: ', payload);

      try {
        const res = await fetch(payload);

        let x = res?.data?.history?.filter(
          (item) => item?.meta?.CREDIT_MICRO_SUMMARY && item?.meta,
        );

        let d = x[0]?.meta;
        if (x.length) {
          setSpinner(false);
          const cs = d?.CREDIT_SCORE_DETAILS?.CREDIT_SCORE_SUMMARY;

          setCreditScore(cs?.CREDIT_SCORE);
          setCreditRating(cs?.CREDIT_RATING);
          setPercentage((Number(cs?.CREDIT_SCORE - 300) * 100) / (850 - 300));

          const total = Object.values(d)
            .filter((c) => c?.CURRENCY?.SUMMARY && c.CURRENCY?.DUESUMMARY)
            .map((c) => ({
              first: c?.CURRENCY?.SUMMARY?.find(
                (c) => c.HEADINGTEXT.toLowerCase().trim() === 'over all total',
              ),
              second: c?.CURRENCY?.DUESUMMARY?.find(
                (c) => c.HEADINGTEXT.toLowerCase().trim() === 'over all total',
              ),
            }))
            .reduce(
              (acc, curr) => {
                return {
                  TOTAL_OUTSTANDING:
                    Number(
                      curr.first.TOTAL_OUTSTANDING.replace(/[^0-9]/g, ''),
                    ) + acc.TOTAL_OUTSTANDING,
                  TOTAL_NO_OF_CREDITGRANTORS:
                    Number(
                      curr.first.TOTAL_NO_OF_CREDITGRANTORS.replace(
                        /[^0-9]/g,
                        '',
                      ),
                    ) + acc.TOTAL_NO_OF_CREDITGRANTORS,
                  TOT_DUE:
                    Number(curr.second.TOT_DUE.replace(/[^0-9]/g, '')) +
                    acc.TOT_DUE,
                  NO_OF_DELINQCREDITFACILITIES:
                    Number(
                      curr.second.NO_OF_DELINQCREDITFACILITIES.replace(
                        /[^0-9]/g,
                        '',
                      ),
                    ) + acc.NO_OF_DELINQCREDITFACILITIES,
                  NO_OF_OPENEDCREDITFACILITIES:
                    Number(
                      curr.first.NO_OF_OPENEDCREDITFACILITIES.replace(
                        /[^0-9]/g,
                        '',
                      ),
                    ) + acc.NO_OF_DELINQCREDITFACILITIES,
                };
              },
              {
                NO_OF_DELINQCREDITFACILITIES: 0,
                TOT_DUE: 0,
                TOTAL_OUTSTANDING: 0,
                TOTAL_NO_OF_CREDITGRANTORS: 0,
                NO_OF_OPENEDCREDITFACILITIES: 0,
              },
            );

          console.log('total: ', total);

          if (total?.NO_OF_DELINQCREDITFACILITIES > 0) {
            if (Number(total?.TOT_DUE) < 20000) {
              setCreditScoreMessage(
                `You have ${total?.NO_OF_DELINQCREDITFACILITIES} bad loans valued at ${total?.TOT_DUE}. You are also currently servicing ${total?.NO_OF_OPENEDCREDITFACILITIES} loans with an outstanding balance of ${total?.TOTAL_OUTSTANDING}. You may still apply for a rental loan.`,
              );
              setCanApply(true);
            } else {
              setCreditScoreMessage(`You have ${total?.NO_OF_DELINQCREDITFACILITIES} bad loans valued at ${total?.TOT_DUE}. You are also currently servicing ${total?.NO_OF_DELINQCREDITFACILITIES} loans with an outstanding balance of ₦${total?.TOTAL_OUTSTANDING}. Unfortunately, you are not qualified for rent finance. However you can save for your rent to build your credit
            `);
              setCanApply(false);
            }
          } else if (
            total?.NO_OF_DELINQCREDITFACILITIES <= 0 &&
            total?.NO_OF_OPENEDCREDITFACILITIES <= 0
          ) {
            setCreditScoreMessage(
              'Great job, you have no bad loans. You can proceed to apply for rent finance',
            );
            setCanApply(true);
          } else if (
            total?.NO_OF_DELINQCREDITFACILITIES <= 0 &&
            total?.NO_OF_OPENEDCREDITFACILITIES > 0
          ) {
            setCreditScoreMessage(
              `You have no bad loans. However you are currently servicing ${total?.NO_OF_OPENEDCREDITFACILITIES} loans with an outstanding balance of ₦${total?.TOTAL_OUTSTANDING}`,
            );
            setCanApply(true);
          } else if (cs?.CREDIT_SCORE == '') {
            setCreditScoreMessage(
              "It seems you have not taken a loan from a financial institution before or we just can't find any record of your credit history. However you can proceed to apply for rent finance.",
            );
            setCanApply(true);
          }
        } else {
          setCreditScore(0);
          setCreditRating('Not available');
          setPercentage((Number(300 - 300) * 100) / (850 - 300));
          setCreditScoreMessage(
            "It seems you have not taken a loan from a financial institution before or we just can't find any record of your credit history. However you can proceed to apply for rent finance.",
          );
          setCanApply(true);
          setSpinner(false);
        }
      } catch (error) {
        console.log('The Error: ', error);
        setSpinner(false);
      }
    })();
  }, []);

  useEffect(() => {
    // handleFetch();
  }, [scoreData]);

  const handleClick = async () => {
    try {
      if (canApply) {
        const creditType = await AsyncStorage.getItem('creditType');

        creditType === 'business'
          ? navigation.navigate('BusinessForm1')
          : navigation.navigate('RnplSteps');
      } else {
        navigation.navigate('SavingsHome');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetch = async () => {
    setSpinner(true);

    const payload = {
      email: scoreData?.email,
      company: scoreData?.company,
    };

    console.log('The Param: ', payload);

    try {
      const res = await fetch(payload);

      let x = res?.data?.history?.filter(
        (item) => item?.meta?.CREDIT_MICRO_SUMMARY && item?.meta,
      );

      let d = x[0]?.meta;

      if (x.length) {
        setSpinner(false);
        const cs = d?.CREDIT_SCORE_DETAILS?.CREDIT_SCORE_SUMMARY;

        setCreditScore(cs?.CREDIT_SCORE);
        setCreditRating(cs?.CREDIT_RATING);
        setPercentage((Number(cs?.CREDIT_SCORE - 300) * 100) / (850 - 300));

        const total = Object.values(d)
          .filter((c) => c?.CURRENCY?.SUMMARY && c.CURRENCY?.DUESUMMARY)
          .map((c) => ({
            first: c?.CURRENCY?.SUMMARY?.find(
              (c) => c.HEADINGTEXT.toLowerCase().trim() === 'over all total',
            ),
            second: c?.CURRENCY?.DUESUMMARY?.find(
              (c) => c.HEADINGTEXT.toLowerCase().trim() === 'over all total',
            ),
          }))
          .reduce(
            (acc, curr) => {
              return {
                TOTAL_OUTSTANDING:
                  Number(curr.first.TOTAL_OUTSTANDING.replace(/[^0-9]/g, '')) +
                  acc.TOTAL_OUTSTANDING,
                TOTAL_NO_OF_CREDITGRANTORS:
                  Number(
                    curr.first.TOTAL_NO_OF_CREDITGRANTORS.replace(
                      /[^0-9]/g,
                      '',
                    ),
                  ) + acc.TOTAL_NO_OF_CREDITGRANTORS,
                TOT_DUE:
                  Number(curr.second.TOT_DUE.replace(/[^0-9]/g, '')) +
                  acc.TOT_DUE,
                NO_OF_DELINQCREDITFACILITIES:
                  Number(
                    curr.second.NO_OF_DELINQCREDITFACILITIES.replace(
                      /[^0-9]/g,
                      '',
                    ),
                  ) + acc.NO_OF_DELINQCREDITFACILITIES,
                NO_OF_OPENEDCREDITFACILITIES:
                  Number(
                    curr.first.NO_OF_OPENEDCREDITFACILITIES.replace(
                      /[^0-9]/g,
                      '',
                    ),
                  ) + acc.NO_OF_DELINQCREDITFACILITIES,
              };
            },
            {
              NO_OF_DELINQCREDITFACILITIES: 0,
              TOT_DUE: 0,
              TOTAL_OUTSTANDING: 0,
              TOTAL_NO_OF_CREDITGRANTORS: 0,
              NO_OF_OPENEDCREDITFACILITIES: 0,
            },
          );
        console.log('csD: ', total);

        if (total?.NO_OF_DELINQCREDITFACILITIES > 0) {
          if (Number(total?.TOT_DUE) < 20000) {
            setCreditScoreMessage(
              `You have ${total?.NO_OF_DELINQCREDITFACILITIES} bad loans valued at ${total?.TOT_DUE}. You are also currently servicing ${total?.NO_OF_OPENEDCREDITFACILITIES} loans with an outstanding balance of ${total?.TOTAL_OUTSTANDING}. You may still apply for a rental loan.`,
            );
            setCanApply(true);
          } else {
            setCreditScoreMessage(`You have ${total?.NO_OF_DELINQCREDITFACILITIES} bad loans valued at ${total?.TOT_DUE}. You are also currently servicing ${total?.NO_OF_DELINQCREDITFACILITIES} loans with an outstanding balance of ₦${total?.TOTAL_OUTSTANDING}. Unfortunately, you are not qualified for rent finance. However you can save for your rent to build your credit
            `);
            setCanApply(false);
          }
        } else if (
          total?.NO_OF_DELINQCREDITFACILITIES <= 0 &&
          total?.NO_OF_OPENEDCREDITFACILITIES <= 0
        ) {
          setCreditScoreMessage(
            'Great job, you have no bad loans. You can proceed to apply for rent finance',
          );
          setCanApply(true);
        } else if (
          total?.NO_OF_DELINQCREDITFACILITIES <= 0 &&
          total?.NO_OF_OPENEDCREDITFACILITIES > 0
        ) {
          setCreditScoreMessage(
            `You have no bad loans. However you are currently servicing ${total?.NO_OF_OPENEDCREDITFACILITIES} loans with an outstanding balance of ₦${total?.TOTAL_OUTSTANDING}`,
          );
          setCanApply(true);
        } else if (cs?.CREDIT_SCORE == '') {
          setCreditScoreMessage(
            "It seems you have not taken a loan from a financial institution before or we just can't find any record of your credit history. However you can proceed to apply for rent finance.",
          );
          setCanApply(true);
        }
      } else {
        setCreditScore(0);
        setCreditRating('Not available');
        setPercentage((Number(300 - 300) * 100) / (850 - 300));
        setCreditScoreMessage(
          "It seems you have not taken a loan from a financial institution before or we just can't find any record of your credit history. However you can proceed to apply for rent finance.",
        );
        setCanApply(true);
        setSpinner(false);
      }
    } catch (error) {
      console.log('The Error: ', error);
      setSpinner(false);
    }
  };

  return (
    <View style={[designs.centeredView]}>
      <View style={[designs.topNav]}>
        <TouchableOpacity onPress={() => navigation.navigate('Rent')}>
          <Icon name="arrow-back-outline" size={25} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={[designs.modalView, {paddingBottom: 0}]}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              // borderWidth: 1,
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                flexDirection: 'row',
                alignItems: 'baseline',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#999',
                  color: COLORS.dark,
                  paddingBottom: 50,
                }}>
                300
              </Text>
              <AnimatedGaugeProgress
                size={200}
                width={15}
                fill={percentage}
                rotation={90}
                cropDegree={180}
                tintColor={
                  percentage < 50
                    ? COLORS.orange
                    : percentage < 70 && percentage >= 50
                    ? COLORS.red
                    : COLORS.light
                }
                delay={0}
                // backgroundColor="#2b2835"
                backgroundColor={'#999'}
                stroke={[10, 20]} //For a equaly dashed line
                // strokeCap="circle"
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#999',
                  color: COLORS.dark,
                  paddingBottom: 50,
                }}>
                850
              </Text>
            </View>
            <View style={{position: 'absolute', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: COLORS.light,
                }}>
                {spinner ? (
                  <ActivityIndicator size="small" color={COLORS.light} />
                ) : (
                  creditScore
                )}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2b2735',
                  color: '#87cec870',
                  color: COLORS.dark,
                  marginTop: -5,
                  paddingBottom: 5,
                  lineHeight: 20,
                }}>
                Credit Score!
              </Text>
              <Text style={[styles.status, {backgroundColor: COLORS.dark}]}>
                {spinner ? (
                  <ActivityIndicator size="small" color={COLORS.light} />
                ) : (
                  creditRating
                )}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -10,
              paddingBottom: 30,
            }}>
            {/* <Text style={{fontSize: 12, color: '#2b2735'}}>
            updated 2 months ago
          </Text> */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={handleFetch}>
                <View
                  style={[
                    styles.button,
                    {
                      marginTop: 8,
                      paddingVertical: 5,
                      paddingHorizontal: 30,
                      borderRadius: 20,
                      backgroundColor: COLORS.light,
                    },
                  ]}>
                  <Icon
                    name="ios-shuffle-sharp"
                    color={COLORS.white}
                    size={25}
                    style={{marginTop: 2, marginRight: 10}}
                  />
                  <Text style={[styles.buttonText, {color: COLORS.white}]}>
                    Refresh Score
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.infoContent]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.infoContent_title]}>
                Your credit score is
              </Text>
              <View style={[styles.band]}>
                <Text style={[styles.bandText]}>
                  {spinner ? (
                    <ActivityIndicator size="small" color={COLORS.light} />
                  ) : (
                    creditRating
                  )}
                </Text>
              </View>
            </View>
            <Text style={[styles.infoContent_body]}>
              {/* {spinner ? (
              <ActivityIndicator size="small" color={COLORS.secondary} />
            ) : ( */}
              {creditScoreMessage}
              {/* )} */}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity disabled={spinner} onPress={handleClick}>
                <View style={styles.button}>
                  {canApply ? (
                    <Text style={styles.buttonText}>Apply now</Text>
                  ) : (
                    <Text style={styles.buttonText}>Build credit score</Text>
                  )}
                  <Icon
                    name="chevron-forward"
                    color={COLORS.white}
                    size={14}
                    style={{marginTop: 2, marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    backgroundColor: '#10131B',
    backgroundColor: '#F7F8FD',
    flex: 1,
    // paddingHorizontal: 20,
  },

  status: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    // marginTop: 5,
    // elevation: 5,
  },

  infoContent: {
    backgroundColor: '#151922',
    backgroundColor: '#F7F8FD',
    backgroundColor: '#f2f2f2',
    // elevation: 5,
    padding: 40,
    // marginTop: -20,
    flex: 1,
  },

  infoContent_title: {
    fontSize: 20,
    color: '#a5c2d1',
    color: COLORS.dark,
    fontWeight: 'bold',
  },
  infoContent_body: {
    fontSize: 14,
    marginTop: 20,
    lineHeight: 30,
    color: '#b2b3b690',
    color: COLORS.dark,
  },

  band: {
    // backgroundColor: '#10131B',
    backgroundColor: '#46596950',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginLeft: 10,
    // borderRadius: 5,
    opacity: 0.5,
  },

  bandText: {
    fontSize: 12,
    color: '#a5c2d1',
    color: COLORS.dark,
    // color: '#b2b3b650',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  button: {
    backgroundColor: '#212a33',
    backgroundColor: COLORS.light,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    color: '#536470',
    color: '#b2b3b690',
    color: COLORS.white,
    textTransform: 'capitalize',
  },
});
