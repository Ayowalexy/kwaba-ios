import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  StyleSheet,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, icons, images} from '../../../util/index';
import moment from 'moment';
// import {useDispatch, useSelector} from 'react-redux';
// import {soloSaving} from '../../../redux/actions/savingsActions';
import {unFormatNumber, numberWithCommas} from '../../../util/numberFormatter';
import InviteBuddyModal from '../../../components/InviteBuddyModal';

export default function Screen5({navigation}) {
  const [locked, setLocked] = useState(true);

  const [showInviteBuddyModal, setShowInviteBuddyModal] = useState(false);

  const [buddies, setBuddies] = useState([
    {
      fullname: 'Joshson Amunez',
      email: 'johnsoamu@gmail.com',
      allocatedAmount: 1000000,
      monthlySaving: 330000,
    },
    {
      fullname: 'Tobi Odenjimi',
      email: 'tobiodenjimi@gmail.com',
      allocatedAmount: 1000000,
      monthlySaving: 330000,
    },
  ]);

  const toggleSwitch = () => {
    setLocked((previousState) => !previousState);
  };

  const handleSubmit = () => {
    console.log('Hello, world');
    navigation.navigate('BuddySaving6');
  };

  const CreateBuddiesTemplate = () => {
    return (
      <View style={{width: '100%', borderWidth: 1}}>
        <View></View>
        <View></View>
      </View>
    );
  };

  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
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
            lineHeight: 18,
            marginTop: 8,
            marginLeft: 10,
          }}>
          An invite will be sent to any of your buddy{'\n'}you add to this
          saving plan.
        </Text>
        <View style={[styles.summaryBox]}>
          {/* Top */}
          <View style={[styles.summaryBoxTop]}>
            <Text style={[styles.summaryBoxTopTitle]}>Target Amount</Text>
            <Text style={[styles.summaryBoxTopAmount]}>₦2,500,000</Text>
            <View style={[styles.summaryBoxTopLabel]}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.white,
                  marginTop: -2,
                }}>
                You are saving with{' '}
                <Text style={{color: COLORS.secondary}}>3 buddies</Text>
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
                    ₦625,000
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={[styles.summaryBoxTargetCalValueText]}>
                  Other buddies target:{' '}
                  <Text style={[styles.summaryBoxTargetCalValueTextBold]}>
                    {' '}
                    ₦1,875,000
                  </Text>
                </Text>
              </View>
            </View>

            <View style={[styles.summaryBoxTargetCalProgress]}>
              <View style={[styles.summaryBoxTargetCalProgressFill]}></View>
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
              <Text style={styles.value}>Monthly</Text>
            </View>
            <View style={[styles.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={styles.key}>Start Date</Text>
              <Text style={styles.value}>Dec 22, 2020</Text>
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
              <Text style={styles.value}>Dec 22, 2021</Text>
            </View>
            <View style={[styles.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={styles.key}>Interest Rate</Text>
              <Text style={styles.value}>{locked ? '2.5%' : '4.5%'} P.A</Text>
            </View>
          </View>

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
                ? "You can't withdraw your savings until the set maturity date"
                : "You can't withdraw your savings until the set maturity date"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowInviteBuddyModal(!showInviteBuddyModal)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
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
            Invite a buddy
          </Text>
        </TouchableOpacity>

        <View style={[styles.buddyInvites]}>
          {/* Buddies of 1 of how many buddies to invite */}
          <Text style={[styles.buddyInvitesCount]}>Buddies(0 of 4) </Text>

          {!buddies.length ? (
            <View style={[styles.noBuddy]}>
              <Text
                style={{fontSize: 12, color: COLORS.grey, fontWeight: '700'}}>
                No Buddy Invite yet
              </Text>
            </View>
          ) : (
            <View style={[styles.buddiesContainer]}>
              <CreateBuddiesTemplate />
            </View>
          )}
        </View>

        <TouchableOpacity
          // disabled={!toggleCheckBox}
          onPress={handleSubmit}
          style={[
            designs.button,
            {
              marginTop: 15,
              backgroundColor: '#00DC99',
            },
          ]}>
          <Text
            style={{
              // color: toggleCheckBox ? 'white' : '#000',
              // color: toggleCheckBox ? '#fff' : '#ffffff50',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 12,
              lineHeight: 30,
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <InviteBuddyModal
        onRequestClose={() => setShowInviteBuddyModal(!showInviteBuddyModal)}
        visible={showInviteBuddyModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summaryBox: {
    minHeight: 200,
    width: '100%',
    borderRadius: 30,
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
    borderTopColor: '#BFBFBF50',
    borderTopWidth: 1,
  },
  buddyInvitesCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.grey,
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
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 10,
  },
});
