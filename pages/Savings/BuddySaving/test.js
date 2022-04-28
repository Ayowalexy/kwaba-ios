import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, icons, images} from '../../../util/index';
import moment from 'moment';
// import {useDispatch, useSelector} from 'react-redux';
// import {soloSaving} from '../../../redux/actions/savingsActions';
import {
  unFormatNumber,
  numberWithCommas,
  formatNumber,
} from '../../../util/numberFormatter';
import InviteBuddyModal from '../../../components/InviteBuddyModal';
import {
  getInterestRateForSavingsAndBuddy,
  createBuddySavings,
  deleteBuddySavingsInvite,
  sendBuddySavingsInvites,
} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import CreditCardModalBuddy from '../../../components/CreditCard/CreditCardModalBuddy';
import InviteSentModal from './InviteSentModal';

export default function Screen5(props) {
  const {navigation, route} = props;

  const [buddies, setBuddies] = useState([]);

  const [showInviteBuddyModal, setShowInviteBuddyModal] = useState(false);
  const [targetAmount, setTargetAmount] = useState(0);
  const [numberOfBuddies, setNumberOfBuddies] = useState(0);
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [yourTarget, setYourTarget] = useState(0);
  const [buddiesTarget, setBuddiesTarget] = useState(0);
  const [fillBar, setFillBar] = useState(10);
  const [instantSaving, setInstantSaving] = useState(null);

  const [locked, setLocked] = useState(true);
  const [savingsCreated, setSavingsCreated] = useState(false);
  const [resData, setResData] = useState('');
  const [spinner, setSpinner] = useState(false);

  const [showCardModal, setShowCardModal] = useState(false);

  const [showInviteSentModal, setShowInviteSentModal] = useState(false);

  const [soloSavingsRate, setSoloSavingRate] = useState('');

  useEffect(() => {

    (async () => {
      const rates = await getInterestRateForSavingsAndBuddy();

    setSoloSavingRate(rates.data[0].solo_savings);

    })()
    // const data = route.params;

    const data = {
        target_amount: 12000,
        number_of_buddies: 1,
        savings_frequency: "Daily",
        date_starting: '2022-04-20T08:16:02.026Z',
        date_ending: '2022-04-20T08:16:02.026Z',
        savings_amount: 1220
    }
    console.log('Data: ', data);

    const numberOfBuddiesAndMe = Number(data.number_of_buddies) + 1;

    // set fields;
    setTargetAmount(data.target_amount);
    setNumberOfBuddies(data.number_of_buddies);
    setFrequency(data.savings_frequency);
    setStartDate(data.date_starting);
    setEndDate(data.date_ending);
    setYourTarget(
      Math.round(Number(data.target_amount) / numberOfBuddiesAndMe),
    );
    setInstantSaving(data.savings_amount);

    setBuddiesTarget(
      Math.round(
        Number(data.target_amount) -
          Number(data.target_amount) / numberOfBuddiesAndMe,
      ),
    );

    setFillBar(
      (Number(data.target_amount) /
        numberOfBuddiesAndMe /
        Number(data.target_amount)) *
        100,
    );
  }, []);

  const toggleSwitch = () => {
    setLocked((previousState) => !previousState);
  };


  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingBottom: 10}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <Text style={[designs.boldText, {marginTop: 15, marginLeft: 10}]}>
          Invite your buddy
        </Text>
        <Text
          style={{
            color: '#ADADAD',
            fontSize: 12,
            fontWeight: '600',
            lineHeight: 16,
            marginTop: 8,
            marginLeft: 10,
          }}>
          An invite will be sent to all the buddies{'\n'}you add to this saving
          plan.
        </Text>
        <View style={[styles.summaryBox]}>
          {/* Top */}
          <View style={[styles.summaryBoxTop]}>
            <Text style={[styles.summaryBoxTopTitle]}>Target Amount</Text>
            <Text
              style={[
                styles.summaryBoxTopAmount,
                {
                  fontSize: Number(targetAmount) == 0 ? 16 : 26,
                  textTransform: 'uppercase',
                },
              ]}>
              {Number(targetAmount) == 0
                ? 'No target selected'
                : `₦${formatNumber(targetAmount)}`}
            </Text>
            <View style={[styles.summaryBoxTopLabel]}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.white,
                  marginTop: -2,
                }}>
                You are saving with{' '}
                <Text style={{color: COLORS.secondary}}>
                  {numberOfBuddies} {numberOfBuddies > 1 ? 'buddies' : 'buddy'}
                </Text>
              </Text>
            </View>
          </View>
          {/* end Top */}

          <View style={[styles.summaryBoxTargetCal]}>
            <View style={[styles.summaryBoxTargetCalValue]}>
              <View>
                <Text style={[styles.summaryBoxTargetCalValueText]}>
                  Your target:{' '}
                  <Text style={[styles.summaryBoxTargetCalValueTextBold]}>
                    {' '}
                    ₦{formatNumber(yourTarget) || '0.00'}
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={[styles.summaryBoxTargetCalValueText]}>
                  Other buddies target:{' '}
                  <Text style={[styles.summaryBoxTargetCalValueTextBold]}>
                    {' '}
                    ₦{formatNumber(buddiesTarget) || '0.00'}
                  </Text>
                </Text>
              </View>
            </View>

            <View style={[styles.summaryBoxTargetCalProgress]}>
              <View
                style={[
                  styles.summaryBoxTargetCalProgressFill,
                  {width: `${fillBar}%`},
                ]}></View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={styles.dataInfo}>
              <Text style={styles.key}>Frequency</Text>
              <Text style={styles.value}>{frequency}</Text>
            </View>
            <View style={[styles.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={styles.key}>Start Date</Text>
              <Text style={styles.value}>
                {moment(startDate).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={styles.dataInfo}>
              <Text style={styles.key}>End Date</Text>
              <Text style={styles.value}>
                {moment(endDate).format('DD-MM-YYYY')}
              </Text>
            </View>
            <View style={[styles.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={styles.key}>Interest Rate</Text>
              {/* <Text style={styles.value}>{locked ? '8%' : '7%'} P.A</Text> */}
              <Text style={styles.value}>{soloSavingsRate}% P.A</Text>
            </View>
          </View>

          {!savingsCreated && (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 23,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    lineHeight: 15,
                    marginRight: 23,
                  }}>
                  Lock saving?
                </Text>
                <Switch
                  trackColor={{false: 'white', true: 'white'}}
                  thumbColor={locked ? '#00DC99' : '#ADADAD'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={locked}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  borderRadius: 13,
                  backgroundColor: '#00000022',
                  padding: 2,
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    color: '#FFE700',
                    fontSize: 10,
                    lineHeight: 13,
                    fontWeight: 'bold',
                    fontFamily: 'Circular Std',
                    textAlign: 'center',
                  }}>
                  {locked
                    ? "You can't withdraw your savings until the end date"
                    : 'You can withdraw your savings any time you want'}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={{paddingVertical: 10}}>
        {buddies.length != numberOfBuddies ? (
          <TouchableOpacity
            // onPress={savingsCreated ? displayInviteModal : handleAddBuddy}
            style={[
              designs.button,
              {
                // marginTop: 50,
                paddingVertical: 10,
                marginBottom: 0,
                backgroundColor: '#00DC99',
              },
            ]}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12,
                lineHeight: 30,
              }}>
              ACCEPT INVITE
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // onPress={handleSendInvite}
            onPress={() => {
              navigation.navigate('BuddyPaymentScreen', {
                data: route?.params,
                res: resData,
              });
            }}
            style={[
              designs.button,
              {
                // marginTop: 50,
                paddingVertical: 10,
                marginBottom: 0,
                backgroundColor: '#00DC99',
              },
            ]}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12,
                lineHeight: 30,
              }}>
              PAY NOW
            </Text>
          </TouchableOpacity>
        )}
      </View>

     
      <Spinner visible={spinner} size="large" />

      
    </View>
  );
}

const styles = StyleSheet.create({
  summaryBox: {
    minHeight: 200,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#2A286A',
    marginTop: 16,
    padding: 23,
    paddingVertical: 30,
  },
  summaryBoxTop: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryBoxTopTitle: {
    fontSize: 12,
    color: COLORS.white,
  },
  summaryBoxTopAmount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.white,
    marginVertical: 5,
  },
  summaryBoxTopLabel: {
    backgroundColor: '#9D98EC50',
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 10,
  },
  summaryBoxTargetCal: {
    marginTop: 20,
    marginBottom: 10,
  },
  summaryBoxTargetCalValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  summaryBoxTargetCalValueText: {
    fontSize: 10,
    color: COLORS.white,
  },
  summaryBoxTargetCalValueTextBold: {
    fontWeight: 'bold',
  },
  summaryBoxTargetCalProgress: {
    width: '100%',
    height: 5,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  summaryBoxTargetCalProgressFill: {
    width: '30%',
    height: 5,
    backgroundColor: COLORS.secondary,
  },

  data: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 30,
    paddingLeft: 6,
    paddingRight: 6,
  },
  key: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    color: 'white',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    color: 'white',
  },

  buddyInvites: {
    borderTopColor: '#BFBFBF20',
    borderTopWidth: 1,
  },
  buddyInvitesCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingVertical: 10,
    marginLeft: 10,
  },
  noBuddy: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // buddies container
  buddiesContainer: {
    paddingVertical: 10,
  },
});
