import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';
import { COLORS } from '../../../util';
// import stepsArray from '../../../util/stepsArray';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../../services/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentApplication } from '../../../services/network';
import { getEmergencyLoans } from '../../../services/network';
export default function RnplSteps({ navigation }) {


  const [rnplStep, setRnplStep] = useState([])
  const [documentApproved, setDocumentApproved] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const refresh_in = async () => {
    const getAllAloans = await getEmergencyLoans();
    const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
    const applicationIDCallRes = await getCurrentApplication({ id: loan_id })

    console.log('data i', applicationIDCallRes?.data?.data)
    const documents_approved = Number(applicationIDCallRes?.data?.data?.status)
    setDocumentApproved(documents_approved)


  }

  const onRefresh = useCallback(() => {


    setRefreshing(true);
    refresh_in();

    setTimeout(() => {
      setRefreshing(false)
    }, 3000)
  }, []);


  // VerifyingDocuments
  useEffect(() => {
    (async () => {
      const token = await getToken();
      const getAllAloans = await getEmergencyLoans();
      const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
      const applicationIDCallRes = await getCurrentApplication({ id: loan_id })


      console.log('loan status', applicationIDCallRes?.data?.data?.status)

      const documents_approved = applicationIDCallRes?.data?.data?.status
      setDocumentApproved(documents_approved)

      // 1, "Pending Documents"
      // 2, "Documents Uploaded"
      // 3, "Documents Verified"
      // 4, "Awaiting Disbursement"
      // 5, "Active"
      // 6, "Completed"
      // 7, "Declined"
      // 8, "Cancelled"
      const rnplStep = await AsyncStorage.getItem('rnplSteps')
      const parsed = JSON.parse(rnplStep)
      console.log('application', applicationIDCallRes?.data)


      if (documents_approved == 1 || documents_approved == 3 ) {
        setCanProceed(true)
      } else if (documents_approved == 2) {
        setCanProceed(false)
      }
      // setDocumentApproved(documentApproved)
    })()
  }, [])

  console.log('set canprocedd', canProceed)

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
      // navigate: () => navigation.navigate('BusinessForm1'),
    },
  {
      title: 'Documents upload',
      subTitle: '',
      status: 'start',
      navigate: () => navigation.navigate('NewAllDocuments'),
    },
    {
      title: 'Offer approval breakdown',
      subTitle: '',
      status: 'start',
      navigate: () => navigation.navigate('RentalLoanOfferTest'),
    },
    {
      title: 'Property details',
      subTitle: '',
      status: 'start',
      navigate: () => navigation.navigate('PostPaymentForm1'),
    },

    {
      title: 'Address verification',
      subTitle: '',
      status: 'start',
      navigate: () => navigation.navigate('AddressVerificationPayment'),
    },

    {
      title: 'Direct debit',
      subTitle: '',
      status: 'start',
      navigate: () => navigation.navigate('RnplDirectdebit'),
    },
    {
      title: 'Disbursement',
      subTitle: '',
      status: 'start',
      navigate: () => navigation.navigate('AwaitingDisbursement'),
    },
  ];

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  const getRNPLStep = async () => {
    const rnplStep = await AsyncStorage.getItem('rnplSteps')
    return JSON.parse(rnplStep)
  }



  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', async () => {
      if (route.name == 'RnplSteps') {
        const res = await getRNPLStep()
        refresh_in()
        setRnplStep(res)
      }
    });

    return unsubscribe;
  }, [navigation]);
  // Disbursement

  useEffect(() => {
    (async () => {
      const user = await getUser();
      // const rnplStep = {
      //   nextStage: "Documents upload",
      //   completedStages: ['Credit score', 'Applications']
      // }
      // await AsyncStorage.setItem('rnplSteps', JSON.stringify(rnplStep))


      await AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'rnplSteps');
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}>
        <View style={[styles.bottomView]}>
          {stepsArray.map((item, index) => {
            return (
              <TouchableOpacity
                // disabled={
                //   (!rnplStep?.nextStage?.includes(item.title))
                //     ? true 
                //     : false
                // }
                key={index}
                style={[
                  styles.stepCard,
                  {
                    borderColor:
                      rnplStep?.completedStages?.includes(item.title)
                        ? '#61cd8f'
                        : rnplStep?.nextStage?.includes(item?.title)
                          ? '#8fc1ed'
                          : '#ddd',
                    backgroundColor:
                      rnplStep?.completedStages?.includes(item.title) ? '#effbf7' : COLORS.white,
                  },
                ]}
                onPress={() => {
                  // item.navigate()
                  if (documentApproved == 1 
                    || documentApproved == undefined
                    || documentApproved == 4
                    || documentApproved == 5
                    )
                     {
                    item.navigate()
                  } else if (documentApproved == 2 || documentApproved == 3) {
                    // item.navigate()

                      // navigation.navigate('VerifyingDocuments')
                  }
                }}>
                <View style={[styles.content]}>
                  <Text
                    style={[
                      styles.title,
                      { color: !rnplStep?.completedStages?.includes(item.title) ? '#999' : COLORS.dark },
                    ]}>
                    {item.title}
                  </Text>
                </View>
                <View style={[styles.statusContent]}>
                  {
                    rnplStep?.nextStage?.includes(item.title) && documentApproved? (
                      <Text style={[styles.status, styles.statusStart]}>
                        Start
                      </Text>
                    ) : null
                  }

                  {
                    rnplStep?.nextStage?.includes(item.title) && !documentApproved ? (
                      <Icon name="lock-closed" style={[styles.statusIcon]} />
                    ) : null
                  }

                  {
                    !rnplStep?.completedStages?.includes(item.title)
                      && !rnplStep?.nextStage?.includes(item?.title)
                      ? (
                        <Icon name="lock-closed" style={[styles.statusIcon]} />
                      )
                      : null
                  }
                  {rnplStep?.completedStages?.includes(item.title) && (
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
                        rnplStep?.completedStages?.includes(item.title)
                          ? '#61cd8f'
                          : rnplStep?.nextStage?.includes(item.title)
                            ? '#8fc1ed'
                            : '#ddd',
                    },
                  ]}>
                  {rnplStep?.completedStages?.includes(item.title) && (
                    <Icon
                      name="ios-checkmark-circle-sharp"
                      style={[styles.statusIcon, { color: '#61cd8f' }]}
                    />
                  )}

                  {!rnplStep?.completedStages?.includes(item.title) && (
                    <Text
                      style={[
                        styles.indexText,
                        { color: rnplStep?.nextStage?.includes(item?.title) ? '#8fc1ed' : '#ddd' },
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
