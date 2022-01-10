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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {COLORS} from '../../util';
import {formatNumber} from '../../util/numberFormatter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnimatedGaugeProgress} from 'react-native-simple-gauge';
import Spinner from 'react-native-loading-spinner-overlay';
import {creditScoreFetch} from '../../services/network';

export default function CreditScoreDashboard({navigation, route}) {
  const [spinner, setSpinner] = useState(false);
  const [creditScore, setCreditScore] = useState('');
  const [creditRating, setCreditRating] = useState('');
  const [percentage, setPercentage] = useState(0);

  const [creditScoreDetails, setCreditScoreDetails] = useState({});
  const [creditScoreMessage, setCreditScoreMessage] = useState('');

  const [canApply, setCanApply] = useState(false);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    setSpinner(true);

    const data = {
      bvn: '22262641382',
      company: 'Kwaba',
      email: 'joshuanwosu078@gmail.com',
    };

    try {
      const res = await creditScoreFetch(route?.params || data);
      if (res?.data?.history?.length) {
        setSpinner(false);
        const cs =
          res.data.history[0]?.meta?.CREDIT_SCORE_DETAILS?.CREDIT_SCORE_SUMMARY;

        console.log(
          'SUMMARY: ',
          res.data.history[0]?.meta?.CREDIT_MICRO_SUMMARY?.CURRENCY?.DUESUMMARY,
        );

        setCreditScore(cs?.CREDIT_SCORE);
        setCreditRating(cs?.CREDIT_RATING);
        setPercentage((Number(cs?.CREDIT_SCORE - 300) * 100) / (850 - 300));

        const summary =
          res.data.history[0]?.meta?.CREDIT_MICRO_SUMMARY?.CURRENCY?.SUMMARY;
        const duesummary =
          res.data.history[0]?.meta?.CREDIT_MICRO_SUMMARY?.CURRENCY?.DUESUMMARY;

        // setCreditScoreDetails({
        //   ...summary,
        //   ...duesummary,
        // });

        // console.log('The summary: ', summary);
        // console.log('The due summary: ', duesummary);

        // console.log('The summary: ', summary.slice(-1)[0]);
        // console.log('The due summary: ', duesummary.slice(-1)[0]);

        console.log('The All: ', {
          ...summary.slice(-1)[0],
          ...duesummary.slice(-1)[0],
        });

        setCreditScoreDetails({
          ...summary.slice(-1)[0],
          ...duesummary.slice(-1)[0],
        });

        const csDetails = {
          ...summary.slice(-1)[0],
          ...duesummary.slice(-1)[0],
        };

        if (csDetails?.NO_OF_DELINQCREDITFACILITIES > 0) {
          setCreditScoreMessage(`You have ${csDetails?.NO_OF_DELINQCREDITFACILITIES} bad loans valued at ${csDetails?.TOT_DUE}. You are also currently servicing ${csDetails?.NO_OF_DELINQCREDITFACILITIES} loans with an outstanding balance of ${csDetails?.TOTAL_OUTSTANDING}. Unfortunately, you are not qualified for rent finance. However you can save for your rent to build your credit 
          `);
          setCanApply(false);
        } else if (
          csDetails?.NO_OF_DELINQCREDITFACILITIES <= 0 &&
          csDetails?.NO_OF_OPENEDCREDITFACILITIES <= 0
        ) {
          setCreditScoreMessage(
            'Great job, you have no bad loans. You can proceed to apply for rent finance',
          );
          setCanApply(true);
        } else if (
          csDetails?.NO_OF_DELINQCREDITFACILITIES <= 0 &&
          csDetails?.NO_OF_OPENEDCREDITFACILITIES > 0
        ) {
          setCreditScoreMessage(
            `You have no bad loans. However you are currently servicing ${csDetails?.NO_OF_OPENEDCREDITFACILITIES} loans with an outstanding balance of ${csDetails?.TOTAL_OUTSTANDING}`,
          );
          setCanApply(true);
        } else if (cs?.CREDIT_SCORE == '') {
          setCreditScoreMessage(
            "It seems you have not taken a loan from a financial institution before or we just can't find any record of your credit history. However you can proceed to apply for rent finance.",
          );
          setCanApply(true);
        }
      }
    } catch (error) {
      console.log('The Error: ', error);
      setSpinner(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#10131B'} />
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderBottomColor: '#2b273550',
            borderBottomWidth: 1,
          }}>
          <Icon
            name="chevron-back"
            color={COLORS.white}
            size={20}
            onPress={() => navigation.navigate('Home')}
          />
          <Text
            style={{
              color: COLORS.white,
              // textTransform: 'uppercase',
              // fontWeight: 'bold',
              fontSize: 14,
            }}>
            Your Credit Scrore
          </Text>
          <Icon name="ellipsis-vertical" color={COLORS.white} size={20} />
        </View>

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
                  ? COLORS.red
                  : percentage < 70 && percentage >= 50
                  ? COLORS.light
                  : COLORS.red
              }
              delay={0}
              backgroundColor="#2b2835"
              stroke={[10, 20]} //For a equaly dashed line
              // strokeCap="circle"
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#999',
                paddingBottom: 50,
              }}>
              850
            </Text>
          </View>
          <View style={{position: 'absolute', alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#87cec8'}}>
              {spinner ? (
                <ActivityIndicator size="small" color={COLORS.secondary} />
              ) : (
                creditScore
              )}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#2b2735',
                color: '#87cec870',
                marginTop: -5,
                paddingBottom: 5,
                lineHeight: 20,
              }}>
              Credit Score!
            </Text>
            <Text style={[styles.status, {backgroundColor: '#2b2735'}]}>
              {spinner ? (
                <ActivityIndicator size="small" color={COLORS.secondary} />
              ) : (
                creditRating
              )}
            </Text>
            {/* {scoreMark < 50 ? (
              <Text style={[styles.status, {backgroundColor: COLORS.red}]}>
                Poor
              </Text>
            ) : scoreMark < 70 && scoreMark >= 50 ? (
              <Text style={[styles.status, {backgroundColor: COLORS.light}]}>
                Good
              </Text>
            ) : (
              <Text style={[styles.status, {backgroundColor: '#2b2735'}]}>
                Excellent
              </Text>
            )} */}
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
                  },
                ]}>
                <Icon
                  name="ios-shuffle-sharp"
                  color={'#536470'}
                  size={25}
                  style={{marginTop: 2, marginRight: 10}}
                />
                <Text style={styles.buttonText}>Refresh Score</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.infoContent]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.infoContent_title]}>Your credit score is</Text>
            <View style={[styles.band]}>
              <Text style={[styles.bandText]}>
                {spinner ? (
                  <ActivityIndicator size="small" color={COLORS.secondary} />
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
            <TouchableOpacity
              onPress={() => {
                {
                  canApply
                    ? navigation.navigate('Borrow')
                    : navigation.navigate('SavingsHome');
                }
              }}>
              <View style={styles.button}>
                {canApply ? (
                  <Text style={styles.buttonText}>Apply now</Text>
                ) : (
                  <Text style={styles.buttonText}>Build credit score</Text>
                )}
                <Icon
                  name="chevron-forward"
                  color={'#536470'}
                  size={14}
                  style={{marginTop: 2, marginLeft: 20}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {spinner && <ActivityIndicator size="small" color={COLORS.secondary} />}
      </View>

      {/* <Spinner visible={spinner} size="small" /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    backgroundColor: '#10131B',
    flex: 1,
    // paddingHorizontal: 20,
  },

  status: {
    fontWeight: 'bold',
    color: COLORS.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    // marginTop: 5,
    // elevation: 5,
  },

  infoContent: {
    backgroundColor: '#151922',
    // elevation: 5,
    padding: 40,
    // marginTop: -20,
    flex: 1,
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50,
    // borderRightWidth: 30,
    // borderRightColor: '#131720',
    // borderLeftWidth: 30,
    // borderLeftColor: '#131720',
    // elevation: 100,
  },

  infoContent_title: {
    fontSize: 20,
    color: '#a5c2d1',
    fontWeight: 'bold',
  },
  infoContent_body: {
    fontSize: 14,
    marginTop: 20,
    lineHeight: 30,
    color: '#b2b3b690',
  },

  band: {
    backgroundColor: '#10131B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 20,
  },

  bandText: {
    fontSize: 12,
    color: '#a5c2d1',
    // color: '#b2b3b650',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  button: {
    backgroundColor: '#212a33',
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
    textTransform: 'capitalize',
  },
});
