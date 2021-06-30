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
import {icons, images, COLORS} from '../../util/index';
import {currencyFormat} from '../../util/numberFormatter';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function RentNowPayLaterDashboard({navigation}) {
  const [percentAchieved, setPercentAchieved] = useState(75);
  const [nextPaymentDueDate, setnextPaymentDueDate] = useState(45);
  const [noOfDaysToNextPayment, setnoOfDaysToNextPayment] = useState(45);
  const [repaymentBalance, setrepaymentBalance] = useState(45);
  const [monthlyRepayment, setmonthlyRepayment] = useState();



  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };


  useEffect(()=>{


    const getDashboardData =async ()=> {
    
      const token = await getToken();

      
      try{

        const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
            headers: {'Content-Type': 'application/json', Authorization: token},
          });
          console.log(applicationIDCallRes.data.data.non_refundable_deposit);
          const loanId = applicationIDCallRes.data.data.id;
          setmonthlyRepayment(Number(applicationIDCallRes.data.data.approvedrepayment))
        
       
          // const response = await axios.post('http://67.207.86.39:8000/api/v1/application/payment/pay', {amount}, {
          //   headers: {'Content-Type': 'application/json', Authorization: token},
          // });
      
          const res = await axios.post('http://67.207.86.39:8000/api/v1/application/dashboard', {loanId}, {
              headers: {'Content-Type': 'application/json', Authorization: token},
            });
       
            
            console.log(res.data);

            setPercentAchieved(res.data.percentagePaid);
            setnextPaymentDueDate(res.data.nextPaymentDueDate);
            setnoOfDaysToNextPayment(res.data.noOfDaysToNextPayment);
            setrepaymentBalance(res.data.repaymentBalance);
                 
    
      }
      catch(error) {
        console.log(error.response.data)
      }

  

      
    };

    getDashboardData();


  },[nextPaymentDueDate])

  if(nextPaymentDueDate!=null){

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
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.primary}}>
              Rent Now Pay Later
            </Text>
          </View>

          <View style={[styles.soloSavingCard]}>
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 0,
                paddingHorizontal: 10,
              }}>
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}

              <Text style={{color: COLORS.white, fontSize: 12, marginLeft: 5}}>
                Next payment amount
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 5,
                  marginLeft: 5,
                  // paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: COLORS.white,
                  }}>
                  ₦{currencyFormat(Number(monthlyRepayment))}
                </Text>

                <Image
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                    right: -11,
                    bottom: 0,
                    position: 'absolute',
                  }}
                  source={images.maskGroup29}
                />
              </View>

              <View style={[styles.paymentDetail]}>
                <View style={[styles.paymentDetailContent]}>
                  <Text style={[styles.text]}>Next loan payment</Text>
                  <Text style={[styles.value]}>{noOfDaysToNextPayment} days</Text>
                </View>
                <View style={[styles.paymentDetailContent]}>
                  <Text style={[styles.text]}>Next payment due date</Text>
                  <Text style={[styles.value]}>{nextPaymentDueDate}</Text>
                </View>
                <View style={[styles.paymentDetailContent]}>
                  <Text style={[styles.text]}>Repayment balance</Text>
                  <Text style={[styles.value]}>₦{currencyFormat(repaymentBalance)}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                // backgroundColor: '#ffffff20',
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
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
                  1 of 2 months
                </Text>
              </View>

              <View />

              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.light,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      color: COLORS.white,
                      fontWeight: '200',
                    }}>
                    Pay now
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    size={10}
                    style={{color: COLORS.white, marginLeft: 5, marginTop: 2}}
                  />
                </TouchableOpacity>
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
              fill={percentAchieved}
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
                    {percentAchieved}%
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
        </View>
      </ScrollView>
    </View>
  )
}
    else{
      return (  
    <>
    <View>
       <Text>loading...</Text>  
    </View>
    </>
    )
    }

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
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  circularProgress: {
    width: 97,
    height: 97,
    zIndex: 9,
    position: 'relative',
  },
  paymentDetail: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff20',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  paymentDetailContent: {
    alignItems: 'center',
  },
  text: {
    fontSize: 8,
    color: COLORS.white,
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
