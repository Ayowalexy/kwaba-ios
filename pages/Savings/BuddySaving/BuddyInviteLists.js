import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {fetchUserBuddyInvites} from '../../../services/network';
import {COLORS} from '../../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatNumber} from '../../../util/numberFormatter';

export default function BuddyInviteLists(props) {
  const {navigation, route} = props;
  const [inviteLists, setInviteLists] = useState([]);
  useEffect(() => {
    lists();
  }, []);
  const lists = async () => {
    try {
      const resp = await fetchUserBuddyInvites();
      if (resp.status == 201) {
        console.log('User invites: ', resp.data.invites);
        setInviteLists(resp?.data?.invites);
      } else {
        // Alert.alert('No Invite', 'You have no invite');
      }
    } catch (error) {
      console.log('The error: ', error);
    }
  };

  const demoData = [
    {
      inviter: 'Joshua Nwosu', // the admin
      id: 5,
      loan_id: 1,
      fullname: 'Adebisi Joseph',
      email: 'adebisijoe@gmail.com',
      phonenumber: '09057399928',
      target_amount: '200000',
      amount_to_save_monthly: '50000',
      accepted: 0,
      created_at: '2021-08-31T11:26:58.000Z',
      updated_at: '2021-08-31T11:26:58.000Z',
    },
    {
      inviter: 'Joshua Nwosu',
      id: 18,
      loan_id: 259,
      fullname: 'Adebisi Joseph',
      email: 'adebisijoe@gmail.com',
      phonenumber: '09057399928',
      target_amount: '200000',
      amount_to_save_monthly: '50000',
      accepted: 0,
      created_at: '2021-08-31T11:26:58.000Z',
      updated_at: '2021-08-31T11:26:58.000Z',
    },
  ];

  return (
    <View style={[styles.container]}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          padding: 20,
          color: COLORS.white,
          fontWeight: 'bold',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          onPress={() => navigation.navigate('Home')}
          name="arrow-back-outline"
          size={20}
          style={{marginRight: 20}}
          color={COLORS.white}
        />
        <Text
          style={{
            color: COLORS.white,
            fontWeight: 'bold',
          }}>
          Buddy Invites
        </Text>
      </View>

      <View style={[styles.content]}>
        {!inviteLists.length ? (
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: COLORS.dark,
              }}>
              No Buddy Invite
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SavingsHome')}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.white,
                  textTransform: 'uppercase',
                }}>
                Create Buddy savings
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {inviteLists?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[styles.card]}
                  key={index}
                  onPress={() =>
                    navigation.navigate('AcceptInvite', {id: item.id})
                  }>
                  {/* <View style={[styles.list]}>
                    <Text style={[styles.title]}>Inviter</Text>
                    <Text style={[styles.value]}>{item.fullname}</Text>
                  </View> */}
                  <View style={[styles.flex]}>
                    <View style={[styles.list]}>
                      <Text style={[styles.title]}>Target Amount</Text>
                      <Text style={[styles.value]}>
                        ₦{formatNumber(item.target_amount)}
                      </Text>
                    </View>
                    <View style={[styles.list]}>
                      <Text style={[styles.title]}>Amount to save monthly</Text>
                      <Text style={[styles.value]}>
                        ₦{formatNumber(item.amount_to_save_monthly)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    // borderWidth: 1,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 1,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#BFBFBF20',
    borderTopWidth: 1,
  },

  list: {
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.dark,
    opacity: 0.7,
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 2,
    marginLeft: 2,
  },
});
