import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getEmergencyLoans,
  loanRepayment,
  loanPaymentVerification,
} from '../../../services/network';
import Spinner from 'react-native-loading-spinner-overlay';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {currencyFormat} from '../../../util/numberFormatter';
import moment from 'moment';
import SuccessModal from '../../../components/SuccessModal';

const EmergencyLoanDashBoard = ({navigation}) => {
  const [spinner, setSpinner] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [verificationSpinner, setVerificationSpinner] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [repaymentAmount, setRepayment] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [loanId, setLoanId] = useState('');
  const [repaidLoans, setRepaidLoans] = useState([]);

  useEffect(() => {
    (async () => {
      const loans = await getEmergencyLoans();
      const activeLoan = loans.data.data.filter(
        (c) => c.repayment_status == 0,
      )[0];
      const paidLoans = loans.data.data.filter((c) => c.repayment_status == 1);
      setRepaidLoans(paidLoans);
      setLoanAmount(activeLoan != undefined ? activeLoan.loan_amount : 0);
      setRepayment(activeLoan != undefined ? activeLoan.repayment_amount : 0);
      setDueDate(
        activeLoan != undefined
          ? moment(activeLoan.repayment_date).format('DD, MMM YYYY')
          : '',
      );
      setLoanId(activeLoan != undefined ? activeLoan.id : '');
    })();
  }, []);

  const handlePayment = async () => {
    const data = {loanId: loanId};
    setSpinner(true);
    try {
      const response = await loanRepayment(data);

      if (response.status == 200) {
        setSpinner(false);
        const url = response.data.data.authorization_url;
        const result = await openInAppBrowser(url);
        if (result.type === 'cancel') {
          let data = {reference: response.data.data.reference, loanId: loanId};
          setVerificationSpinner(true);
          const verify = await loanPaymentVerification(data);
          if (verify.data.status == 'success') {
            setVerificationSpinner(false);
            setSuccessModal(true);
          } else {
            setVerificationSpinner(false);
            Alert.alert(
              'Payment Unverified',
              'Your payment was not verified. Please retry.',
            );
          }
        }
      }
    } catch (error) {
      setSpinner(false);
      Alert.alert('Error', error.message);
    }
  };

  const openInAppBrowser = async (url) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#2A286A',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          hasBackButton: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });

        return result;
      } else Linking.openURL(url);
    } catch (error) {
      return error.message;
    }
  };

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.navigate('Home')}
        name="arrow-back-outline"
        size={20}
        style={{marginTop: 28, marginLeft: 25, fontWeight: '900'}}
        color={COLORS.primary}
      />
      <View style={{flex: 1}}>
        <Text
          style={[
            FONTS.h1FontStyling,
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              marginBottom: 17,
              marginLeft: 16,
            },
          ]}>
          Emergency Loan
        </Text>
        <Text
          style={[
            FONTS.body3FontStyling,
            {
              fontSize: 10,
              lineHeight: 13,
              color: COLORS.light,
              backgroundColor: '#EDECFC',
              borderRadius: 5,
              padding: 6,
              marginHorizontal: 16,
              marginBottom: 22,
            },
          ]}>
          We hope this loan was helpful. Please ensure to make repayment on
          time, failure will incur 2.5% daily.
        </Text>

        <View
          style={[
            designs.activeLoanDashboard,
            {
              marginHorizontal: 16,
              elevation: 20,
              backgroundColor: COLORS.white,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 19,
                  color: COLORS.primary,
                  marginTop: 19,
                  marginLeft: 6,
                  marginBottom: 10,
                }}>
                Loan Repayment Amount
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  lineHeight: 38,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginLeft: 6,
                }}>
                ₦{currencyFormat(Number(repaymentAmount))}
              </Text>
            </View>
            <Image
              style={{width: 90, height: 95, alignSelf: 'flex-end', right: -10}}
              source={images.maskGroup31}
            />
          </View>
          <View
            style={{
              backgroundColor: '#46448d',
              borderRadius: 5,
              padding: 10,
              marginBottom: 12,
            }}>
            <View
              style={{
                padding: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <View>
                <Text
                  style={[
                    FONTS.body1FontStyling,
                    {color: COLORS.white, fontSize: 12},
                  ]}>
                  Loan Amount
                </Text>
                <Text
                  style={[
                    FONTS.body1FontStyling,
                    {color: COLORS.white, fontSize: 16, fontWeight: 'bold'},
                  ]}>
                  ₦{currencyFormat(Number(loanAmount))}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: COLORS.secondary,
                      lineHeight: 20,
                    }}>
                    {' '}
                    View Details{' '}
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    size={8}
                    color={COLORS.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                padding: 6,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View>
                <Text
                  style={[
                    FONTS.body1FontStyling,
                    {color: COLORS.white, fontSize: 12},
                  ]}>
                  Due Date
                </Text>
                <Text
                  style={[
                    FONTS.body1FontStyling,
                    {color: COLORS.white, fontSize: 16, fontWeight: 'bold'},
                  ]}>
                  {dueDate != '' ? dueDate : '---'}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.light,
                  padding: 10,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}
                onPress={handlePayment}>
                <View style={designs.flexRow}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 12,
                      paddingHorizontal: 3,
                    }}>
                    Pay now
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    size={12}
                    style={{
                      color: COLORS.white,
                      marginLeft: 2,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Spinner
          visible={spinner}
          textContent={'Initializing transactions...'}
          animation="fade"
          textStyle={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            lineHeight: 30,
          }}
          size="large"
        />
        <Spinner
          visible={verificationSpinner}
          textContent={'Verifying transactions...'}
          animation="fade"
          textStyle={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            lineHeight: 30,
          }}
          size="large"
        />
        <SuccessModal
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          handlePress={() => setSuccessModal(!successModal)}
          successHeading="Transaction Successful"
          successText="Your payment has been verified"
        />
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.white,
            paddingVertical: 13,
            paddingHorizontal: 16,
            marginTop: 19,
          }}>
          <Text
            style={[
              FONTS.h3FontStyling,
              {
                color: COLORS.primary,
                paddingBottom: 12,
                fontWeight: 'bold',
                borderBottomWidth: 1,
                borderBottomColor: '#BFBFBF',
              },
            ]}>
            Repayments
          </Text>
          <View>
            {repaidLoans && repaidLoans.length > 0 && (
              <FlatList
                data={repaidLoans}
                renderItem={({item}) => (
                  <View style={{marginTop: 12}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 4,
                      }}>
                      <View style={designs.flexRow}>
                        <Text
                          style={[
                            designs.smallText,
                            {fontSize: 8, color: COLORS.grey},
                          ]}>
                          {'\u2B24'} {''}
                        </Text>
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: 12,
                            lineHeight: 15,
                          }}>
                          {item.loan_purpose != ''
                            ? item.loan_purpose
                            : 'Untitled'}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontSize: 12,
                          lineHeight: 15,
                        }}>
                        ₦{currencyFormat(Number(item.repayment_amount))}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: COLORS.grey,
                          fontSize: 10,
                          lineHeight: 13,
                        }}>
                        {moment(item.updated_at).format('DD, MMM YYYY')}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.grey,
                          fontSize: 10,
                          lineHeight: 13,
                        }}>
                        {item.repayment_status == 1
                          ? 'PAID'
                          : 'PAYMENT UNVERIFIED'}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default EmergencyLoanDashBoard;
