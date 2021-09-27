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

  useEffect(() => {
    const data = route.params;
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

  const handleNext = async () => {
    if (buddies.length < numberOfBuddies) {
      // Alert.alert('Please Invite all buddies before proceeding');
      setShowInviteBuddyModal(true);
    } else {
      // let data = {
      //   ...route.params,
      //   lock: locked,
      // };
      // console.log('Props Data for Next Button: ', data);
      // navigation.navigate('BuddySaving6');
    }
  };

  const handlePayment = async () => {
    const buddyRes = resData.buddy_savings;
    const paymentRes = resData.payment;
    console.log('Response Data: ', paymentRes);
    setShowCardModal(true);
  };

  // const handleSubmit = async () => {
  //   let data = {
  //     ...route.params,
  //     locked: locked,
  //     savings_tenure: route.params.duration,
  //   };

  //   // console.log('Props Data: ', data);
  //   // navigation.navigate('BuddySaving6');
  //   setSpinner(true);

  //   try {
  //     const res = await createBuddySavings(data);
  //     // console.log('Res: ', res.data);

  //     if (res.status == 201) {
  //       setSavingsCreated(true);
  //       console.log('Res: ', res.data.payment.amount);
  //       setResData(res.data);
  //       setSpinner(false);

  //       // show buddy invite modal
  //       setShowInviteBuddyModal(true);
  //     }
  //   } catch (error) {
  //     console.log('Error: ', error);
  //     setSavingsCreated(false);
  //     setSpinner(false);
  //   }
  // };

  const handleAddBuddy = async () => {
    let data = {
      ...route.params,
      locked: locked,
      savings_tenure: route.params.duration,
      num_of_buddies: route.params.number_of_buddies,
    };

    console.log('Data: ', data);

    setSpinner(true);

    try {
      const res = await createBuddySavings(data);
      // console.log('Res: ', res.data);

      if (res.status == 201) {
        setSavingsCreated(true);
        console.log('Res: ', res.data.payment.amount);
        setResData(res.data);
        setSpinner(false);

        // show buddy invite modal
        setShowInviteBuddyModal(true);
      } else {
        setSpinner(false);
        setSavingsCreated(false);
      }
    } catch (error) {
      console.log('Error: ', error);
      setSavingsCreated(false);
      setSpinner(false);
    }
  };

  const displayInviteModal = () => {
    setShowInviteBuddyModal(true);
  };

  const handleSendInvite = async () => {
    setSpinner(true);
    const data = {
      id: resData.buddy_savings.id, // loan_id
    };

    // console.log('The Data: ', resData);

    try {
      const response = await sendBuddySavingsInvites(data);
      if (response.status == 200) {
        setSpinner(false);
        // console.log('Invite sent: ', response.data);
        console.log('Res Data: ', resData);
        setShowInviteSentModal(true); // show success modal
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
    }
  };

  const removeBuddy = async (id) => {
    setSpinner(true);

    const response = await deleteBuddySavingsInvite(id);
    console.log('Delete Invite Response: ', response);

    try {
      if (response.status == 200) {
        setSpinner(false);

        const remainBuddies = buddies.filter((item) => item.id != id);

        console.log('The remaining buddies: ', remainBuddies);

        // append remain buddies
        setBuddies(remainBuddies);
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error: ', error);
    }
  };

  const CreateBuddiesTemplate = () =>
    buddies.map((buddy, index) => {
      return (
        <View
          key={index}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#BFBFBF20',
            backgroundColor: COLORS.white,
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginBottom: 5,
            // elevation: 0.5,
          }}>
          <TouchableOpacity
            onPress={() => removeBuddy(buddy.id)}
            style={{position: 'absolute', right: 5, top: 5, padding: 5}}>
            <Icon name="close" size={20} color={COLORS.grey} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: COLORS.orange,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}>
                {buddy.fullname.toString().charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.dark,
                }}>
                {buddy.fullname}
              </Text>
              <Text style={{fontSize: 10, color: COLORS.grey}}>
                {buddy.email}
              </Text>
            </View>
          </View>
          {Number(route.params.target_amount) >= 1 && (
            <View
              style={{
                marginTop: 20,
                // paddingHorizontal: 10,
                // justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: COLORS.grey,
                  }}>
                  Allocated Amount
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLORS.dark,
                  }}>
                  ₦{formatNumber(buddy.allocatedAmount)}
                </Text>
              </View>

              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: COLORS.grey,
                  }}>
                  {frequency} Saving
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLORS.dark,
                  }}>
                  ₦{formatNumber(buddy.savingAmount)}
                </Text>
              </View>
            </View>
          )}
        </View>
      );
    });

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
              <Text style={styles.value}>{locked ? '8%' : '7%'} P.A</Text>
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

        {/* {savingsCreated && ( */}
        <>
          <TouchableOpacity
            disabled={buddies.length == numberOfBuddies}
            onPress={savingsCreated ? displayInviteModal : handleAddBuddy}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
              opacity: buddies.length == numberOfBuddies && 0.5,
            }}>
            <Icon
              name="ios-person-add-outline"
              style={{color: COLORS.secondary, fontSize: 20}}
            />
            <Text
              style={{
                color: '#00DC99',
                fontSize: 12,
                fontWeight: '700',
                marginLeft: 12,
              }}>
              Add a buddy
            </Text>
          </TouchableOpacity>

          <View style={[styles.buddyInvites]}>
            {/* Buddies of 1 of how many buddies to invite */}
            <Text style={[styles.buddyInvitesCount]}>
              Buddies({buddies.length} of {numberOfBuddies}){' '}
            </Text>

            {!buddies.length ? (
              <View style={[styles.noBuddy]}>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.grey,
                    fontWeight: '700',
                  }}>
                  No Buddy Invite yet
                </Text>
              </View>
            ) : (
              <View style={[styles.buddiesContainer]}>
                <CreateBuddiesTemplate />
              </View>
            )}
          </View>
        </>
        {/* )} */}
      </ScrollView>

      <View style={{paddingVertical: 10}}>
        {buddies.length != numberOfBuddies ? (
          <TouchableOpacity
            onPress={savingsCreated ? displayInviteModal : handleAddBuddy}
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
              ADD A BUDDY
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSendInvite}
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
              SEND INVITE
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {showInviteBuddyModal && (
        <InviteBuddyModal
          onRequestClose={() => setShowInviteBuddyModal(!showInviteBuddyModal)}
          visible={showInviteBuddyModal}
          data={route.params}
          resData={resData}
          setBuddyInvite={(newElement) => {
            setBuddies((oldArray) => [newElement, ...oldArray]);
          }}
        />
      )}

      {showCardModal && (
        <CreditCardModalBuddy
          onRequestClose={() => setShowCardModal(!showCardModal)}
          visible={showCardModal}
          info={resData}
          navigation={navigation}
          redirectTo="BuddySavingDashBoard"
        />
      )}

      <Spinner visible={spinner} size="large" />

      {showInviteSentModal && (
        <InviteSentModal
          onRequestClose={() => {
            setShowInviteSentModal(!showInviteSentModal);
            navigation.navigate('BuddyPaymentScreen', {data: resData});
          }}
          visible={showInviteSentModal}
          navigation={navigation}
        />
      )}
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
