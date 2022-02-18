import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../util';
// import stepsArray from '../../../util/stepsArray';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RnplSteps({navigation}) {
  const stepsArray = [
    {
      title: 'Credit score',
      subTitle: '',
      status: 'complete',
      navigate: () => console.log('Hello credit score here!'),
    },
    {
      title: 'Applications',
      subTitle: '',
      status: 'start',
      navigate: () => navigation.navigate('Form1'),
      // navigate: () => navigation.navigate('VerifyingDocuments'),
    },
    {
      title: 'Documents upload',
      subTitle: '',
      status: 'locked',
      navigate: () => navigation.navigate('NewAllDocuments'),
    },
    {
      title: 'Offer approval breakdown',
      subTitle: '',
      status: 'locked',
      navigate: () => navigation.navigate('RnplDirectdebit'),
    },
    {
      title: 'Property details',
      subTitle: '',
      status: 'locked',
      navigate: () => navigation.navigate('RnplDirectdebit'),
    },
    {
      title: 'Address verification',
      subTitle: '',
      status: 'locked',
      navigate: () => navigation.navigate('RnplDirectdebit'),
    },
    {
      title: 'Direct debit',
      subTitle: '',
      status: 'locked',
      navigate: () => navigation.navigate('RnplDirectdebit'),
    },
    {
      title: 'Disbursement',
      subTitle: '',
      status: 'locked',
      navigate: () => navigation.navigate('RnplDirectdebit'),
    },
  ];

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'rnplSteps');
    })();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Icon
          name="arrow-back"
          color={COLORS.dark}
          size={24}
          onPress={() => navigation.navigate('Rent')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.bottomView]}>
          {stepsArray.map((item, index) => {
            return (
              <TouchableOpacity
                disabled={item.status != 'start'}
                key={index}
                style={[
                  styles.stepCard,
                  {
                    borderColor:
                      item.status == 'complete'
                        ? '#61cd8f'
                        : item.status == 'start'
                        ? '#8fc1ed'
                        : COLORS.white,
                    backgroundColor:
                      item.status == 'complete' ? '#effbf7' : COLORS.white,
                  },
                ]}
                onPress={item.navigate}>
                <View style={[styles.content]}>
                  <Text
                    style={[
                      styles.title,
                      {color: item.status == 'locked' ? '#999' : COLORS.dark},
                    ]}>
                    {item.title}
                  </Text>
                </View>
                <View style={[styles.statusContent]}>
                  {item.status == 'start' && (
                    <Text style={[styles.status, styles.statusStart]}>
                      Start
                    </Text>
                  )}

                  {item.status == 'locked' && (
                    <Icon name="lock-closed" style={[styles.statusIcon]} />
                  )}
                  {item.status == 'complete' && (
                    <Text style={[styles.status, styles.statusComplete]}>
                      Complete
                    </Text>
                  )}
                </View>

                <View
                  style={[
                    styles.index,
                    {
                      borderColor:
                        item.status == 'complete'
                          ? '#61cd8f'
                          : item.status == 'start'
                          ? '#8fc1ed'
                          : '#ddd',
                    },
                  ]}>
                  {item.status == 'complete' && (
                    <Icon
                      name="ios-checkmark-circle-sharp"
                      style={[styles.statusIcon, {color: '#61cd8f'}]}
                    />
                  )}

                  {item.status != 'complete' && (
                    <Text
                      style={[
                        styles.indexText,
                        {color: item.status == 'start' ? '#8fc1ed' : '#ddd'},
                      ]}>
                      {index + 1}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    backgroundColor: '#eef7ff',
    backgroundColor: '#effbf7',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  topView: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topViewText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.dark,
    lineHeight: 25,
  },
  bottomView: {
    paddingHorizontal: 40,
    flex: 1,
  },
  stepCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#8fc1ed',
    marginBottom: 10,
  },
  content: {
    paddingRight: 50,
    flex: 1,
  },
  title: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: COLORS.dark,
  },
  subTitle: {
    marginTop: 20,
    color: COLORS.dark,
    lineHeight: 20,
    fontSize: 14,
  },
  statusContent: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusStart: {
    color: '#8fc1ed',
  },
  statusComplete: {
    color: '#61cd8f',
  },
  statusIcon: {
    fontSize: 20,
    color: '#ddd',
  },
  index: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 23,
    position: 'absolute',
    left: -16,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8fc1ed',
  },
  indexText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8fc1ed',
  },
  buttonContainer: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    elevation: 50,
  },
  button: {
    backgroundColor: '#61cd8f',
    width: '48%',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});
