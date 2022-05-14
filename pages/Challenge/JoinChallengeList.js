import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import JoinChallengeModal from './JoinChallengeModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSavingsChallengeList,
  getSavingsUnderChallengeList,
  getUserSavingsChallenge,
} from '../../redux/actions/savingsChallengeAction';
import Joined from './Joined';
import {formatNumber} from '../../util/numberFormatter';
import SavingsChallengeSummary from './SavingsChallengeSummary';
import axios from 'axios';
import urls from '../../services/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

const data = [
  {
    name: 'Double December 25k Challenge',
    description:
      'Challenge other renters to save 25k in the month of December and get double interest for the month',
    img: require('../../assets/images/target3.png'),
    startDate: 'December 1st',
    endDate: 'December 31st',
    target: '25000',
    interestRate: '',
    id: 1,
  },
  {
    name: 'Double December 50k Challenge',
    description:
      'Challenge other renters to save 50k in the month of December and get double interest for the month',
    img: require('../../assets/images/target2.png'),
    startDate: 'December 1st',
    endDate: 'December 31st',
    target: '50000',
    interestRate: '',
    id: 2,
  },
  {
    name: 'Double December 100k Challenge',
    description:
      'Challenge other renters to save 100k in the month of December and get double interest for the month',
    img: require('../../assets/images/target.png'),
    startDate: 'December 1st',
    endDate: 'December 31st',
    target: '100000',
    interestRate: '',
    id: 3,
  },
];

const img = require('../../assets/images/high-five.png');
const snowflake = require('../../assets/images/snowflake.png');
const snow = require('../../assets/images/snow.png');

const target1 = require('../../assets/images/target3.png');
const target2 = require('../../assets/images/target2.png');
const target3 = require('../../assets/images/target.png');

export default function JoinChallengeList({navigation}) {
  const dispatch = useDispatch();
  const userChallenge = useSelector(
    (state) => state.getUserSavingsChallengeReducer,
  );
  const allSavings = useSelector((state) => state.getSoloSavingsReducer);

  const [showModal, setShowModal] = useState(false);
  const [resData, setResData] = useState('');
  const [spinner, setSpinner] = useState(false);

  const [joinData, setJoinData] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [dataValue, setDataValue] = useState('');

  const [channel, setChannel] = useState('');

  const [showPaystackPayment, setShowPaystackPayment] = useState(false);

  const [allSavingsChallenges, setAllSavingschallenges] = useState([]);

  const [joinSavings, setJoinedSavings] = useState([]);

  // useEffect(() => {
  //   const filter = allSavings?.data?.filter(
  //     (item) => item.savings_type == 'savings_challenge',
  //   );

  //   setJoinedSavings(filter);

  //   console.log('Filter: ', filter);
  // }, []);

  useEffect(() => {
    dispatch(getUserSavingsChallenge());
  }, []);

  useEffect(() => {
    // console.log('user challenge: ', userChallenge);
    getAllSavingsChallenges();
  }, []);

  const handleNavigate = (data) => {
    if (
      joinSavings.length &&
      joinSavings?.filter((i) => i.challenge_id == data?.id)[0]
    ) {
      navigation.navigate('JoinChallengeDashboard', {id: data?.id});
    } else {
      setShowModal(true);
      setResData(data);
    }
  };

  const getAllSavingsChallenges = async () => {
    const token = await getToken();
    console.log('Token: ', token);
    try {
      setSpinner(true);
      const resp = await axios.get(urls.savings.GET_ALL_CHALLENGES, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      // console.log('Challenges: ', resp?.data?.data);
      setSpinner(false);
      setAllSavingschallenges(resp?.data?.data);


      for (let d of resp.data.data){
        console.log(d.id)
      }

      const filter = allSavings?.data?.filter(
        (item) => item.savings_type == 'savings_challenge',
      );

      setJoinedSavings(filter);
    } catch (error) {
      setSpinner(false);
      console.log('Error failed: ', error.response.data);
    }
  };

  const renderItem = ({item, index}) => {
    const {name, short_description, id, target_amount} = item;

    return (
      <TouchableOpacity
        onPress={() => {
          handleNavigate(item, id);
        }}
        style={[styles.card]}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{name}</Text>
            {/* <Text style={styles.cardBody}>{short_description}</Text> */}

            {joinSavings?.map(
              (v, i) =>
                v.challenge_id == id && (
                  <View
                    key={i}
                    style={{
                      marginTop: 10,
                      width: 70,
                      height: 30,
                      backgroundColor: '#5A4CB110',
                      padding: 10,
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#5A4CB1',
                        fontWeight: 'bold',
                      }}>
                      Joined
                    </Text>
                  </View>
                ),
            )}
          </View>

          <View style={styles.cardImageContainer}>
            <Image
              source={id == 1 ? target1 : id == 2 ? target2 : target3}
              style={{
                height: 60,
              }}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.targetText,
                {
                  color:
                    index == 0
                      ? COLORS.black
                      : index == 1
                      ? COLORS.red
                      : '#5A4CB1',
                },
              ]}>
              ₦{formatNumber(target_amount)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={[styles.container]}>
        <StatusBar backgroundColor={'#5A4CB1'} />
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          style={{fontWeight: '900'}}
          color={COLORS.white}
        />
        {/* <Image
          source={snowflake}
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            right: 10,
            top: 10,
            opacity: 0.2,
            zIndex: 0,
          }}
          resizeMode="contain"
        /> */}
        {/* <Image
          source={snow}
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
            left: 0,
            bottom: 10,
            opacity: 0.2,
            zIndex: 0,
          }}
          resizeMode="contain"
        /> */}
        {/* <Image
          source={snow}
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            right: 0,
            bottom: 10,
            opacity: 0.2,
            zIndex: 0,
          }}
          resizeMode="contain"
        /> */}
        <View style={{marginTop: 10, marginBottom: 20, paddingLeft: 5}}>
          <Text style={styles.heading}>Join a Savings Challenge</Text>
        </View>
        {spinner ? (
          <View
            style={{
              flex: 1,
            }}>
            <ActivityIndicator color={COLORS.white} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={allSavingsChallenges}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>

      {/* {showModal && (
        <JoinChallengeModal
          onRequestClose={() => setShowModal(!showModal)}
          visible={showModal}
          navigation={navigation}
          data={resData}
        />
      )} */}

      {showModal && (
        <SavingsChallengeSummary
          onRequestClose={() => setShowModal(!showModal)}
          visible={showModal}
          navigation={navigation}
          data={resData}
          // onSubmit={() => {
          //   setShowPaymentModal(true);
          // }}
          // setJoinData={(value) => setDataValue(value)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#5A4CB1',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 8,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5A4CB1',
    color: '#444',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.dark,
    color: '#555',
  },
  cardImageContainer: {
    width: 90,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#EEE',
    paddingLeft: 20,
  },
  targetText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.black,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
});
