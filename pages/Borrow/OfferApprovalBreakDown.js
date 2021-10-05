import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LoanOfferContent from '../Payment/LoanOfferContent';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import SignatureScreen from 'react-native-signature-canvas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNFS from 'react-native-fs';
import {color} from 'react-native-reanimated';
import PrintOfferLetter from '../Payment/PrintOfferLetter';

import Spinner from 'react-native-loading-spinner-overlay';

import {formatNumber} from '../../util/numberFormatter';
import {acceptOffer, rejectOffer} from '../../services/network';

const RentalLoanOfferTest = ({navigation}) => {
  const [modalVisible, setVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [eSignatureModal, setESignatureModal] = useState(false);
  const [acceptOfferResponse, setAcceptOfferResponse] = useState({});
  const [approvedAmount, setApprovedAmount] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [duration, setDuration] = useState('');
  const [spinner, setSpinner] = useState(false);

  const [rentInsuranceCal, setRentInsuranceCal] = useState(0);

  const ref = useRef();

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };

    const setLoanOffer = async () => {
      const token = await getToken();
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      // setApprovedAmount(applicationIDCallRes.data.data.approvedAmount);
      setApprovedAmount(applicationIDCallRes.data.data.approvedamount);
      setMonthlyPayment(applicationIDCallRes.data.data.approvedrepayment);
      setDuration(applicationIDCallRes.data.data.approved_repayment_plan);

      console.log('HHH:', applicationIDCallRes.data.data.loanable_amount);
      console.log('DATA FROM BASE:', applicationIDCallRes.data.data);

      setRentInsuranceCal(0.05 * applicationIDCallRes.data.data.approvedamount); // Rent Insurance Calculation
    };

    setLoanOffer();
  });

  // useEffect(()=> {
  //   console.log()
  // },[]);

  const handleSignature = async (signature) => {
    console.log('here is the image ' + signature);
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };

    // let widthtouse=Dimensions.get('window').width;
    // let heighttouse= Dimensions.get('window').height;

    // useEffect(()=>{
    //  console.log('hello here how are you '+widthtouse);
    // },[]);

    const path = RNFS.CachesDirectoryPath + 'sign.png';
    //const path2 = RNFS.cacheDirectory + 'sign.png';

    // RNFS.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), {encoding: RNFS.EncodingType.Base64}).then(res => {
    //   console.log(res);
    //   RNFS.getInfoAsync(path, {size: true, md5: true}).then(file => {
    //     console.log(file);
    //   })
    // }).catch(err => {
    //   console.log("err", err);
    // })

    const token = await getToken();
    const applicationIDCallRes = await axios.get(
      'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/one',
      {
        headers: {'Content-Type': 'application/json', Authorization: token},
      },
    );

    console.log(applicationIDCallRes.data.data.id);
    console.log(applicationIDCallRes.data.data);
    const applicationId = applicationIDCallRes.data.data.id;

    try {
      const response = await axios.put(
        'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/accept_offer',
        {applicationId, signature},
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      // let stepsdata={
      //   documentdone:'done',
      //   propertydetail:'done',
      //   landlorddetail:'done',
      //   refree:'done',
      //   offeraccepted:'done',
      //   addressverification:'',
      //   debitmandate:'',
      //   awaitingdisbursment:'',
      // };

      // await AsyncStorage.setItem('borrwsteps', JSON.stringify(stepsdata));
      console.log(response);
      setAcceptOfferResponse(response);
    } catch (error) {
      console.log(error.response.data);
    }
    setESignatureModal(false);
    setSuccessModal(true);
  };
  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    console.log('clear success!');
  };

  const handleAcceptOfferClick = () => {
    setVisible(!modalVisible);
    setESignatureModal(true);
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const accept_offer = async () => {
    setSpinner(true);
    const token = await getToken();
    const user = await getUser();
    try {
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      if (applicationIDCallRes.status == 200) {
        const data = {
          applicationId: applicationIDCallRes.data.data.id,
          signature: 'user signature',
        };
        const res = await acceptOffer(data);
        if (res.status == 200) {
          setSpinner(false);
          console.log('RES ACCEPT OFFER: ', res.data.data);

          const rentalSteps = await AsyncStorage.getItem(
            `rentalSteps-${user.id}`,
          );
          const steps = JSON.parse(rentalSteps);
          let stepsData = {
            application_form: 'done',
            congratulation: 'done',
            all_documents: 'done',
            verifying_documents: 'done',
            offer_breakdown: 'done',
            property_detail: '',
            landlord_detail: '',
            referee_detail: '',
            offer_letter: '',
            address_verification: '',
            debitmandate: '',
            awaiting_disbursement: '',
            dashboard: '',
          };
          await AsyncStorage.setItem(
            `rentalSteps-${user.id}`,
            JSON.stringify(stepsData),
          );
          console.log('STEPS: ', steps);

          navigation.navigate('PostPaymentForm1');
        }
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error', 'error not found');
    }
  };

  // TODO
  const reject_offer = async () => {
    setSpinner(true);
    const token = await getToken();
    try {
      const applicationIDCallRes = await axios.get(
        'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/application/one',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
        },
      );

      if (applicationIDCallRes.status == 200) {
        const data = {
          applicationId: applicationIDCallRes.data.data.id,
          signature: 'user signature',
        };
        const res = await rejectOffer(data);
        if (res.status == 200) {
          setSpinner(false);
          console.log('RES REJECT OFFER: ', res.data.data);

          navigation.navigate('Reject');
        }
      }
    } catch (error) {
      setSpinner(false);
      console.log('Error', 'error not found');
    }
  };

  const handleRejectOffer = () => {
    Alert.alert('Offer Rejected', 'Offer Rejected.');
  };

  const style = `
    .m-signature-pad {
      flex:1;
      width: 400px;
      height: 600px;
      borderWidth: 2;
      background-color: #fff;
      box-shadow: none
    }  
    .m-signature-pad--footer {
      display: flex;
      align-items: center;
      padding: 20px 10px;
      height: 80px;
      position: absolute;
      bottom: 0
    }
    .m-signature-pad--footer 
      .button {
        background-color: red;
        color: #FFF;
      }
      .m-signature-pad--footer
      .button.clear {
        font-family:CircularStd-Book;
        left: 0;
        background-color: #BFBFBF;
        width: 100px;
        height: 50px;
      }

    
    .m-signature-pad--footer
      .button.save {
        font-family:CircularStd-Book;
        right: 0;
        background-color: #00DC99;
        width: 100px;
        height: 50px;
      }

    .m-signature-pad--footer
        .description {
          color: #2A286A;
          text-align: center;
          font-size: 1.2em;
          font-weight:bold;
        }
    `;

  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />

      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 18,
              },
            ]}>
            Rent Now Pay Later
          </Text>
          <Text
            style={{
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 14,
              lineHeight: 23,
              marginBottom: 14,
            }}>
            Here is your rent offer
          </Text>

          <View
            style={{
              borderRadius: 15,
              backgroundColor: COLORS.white,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <View style={[styles.flexContent]}>
              <Text style={styles.flexText}>Approved amount</Text>
              <Text style={[styles.flexText, {fontWeight: 'bold'}]}>
                ₦{formatNumber(approvedAmount)}
              </Text>
            </View>
            <View style={[styles.flexContent]}>
              <Text style={styles.flexText}>Monthly payment:</Text>
              <Text style={[styles.flexText, {fontWeight: 'bold'}]}>
                ₦{formatNumber(monthlyPayment)}
              </Text>
            </View>
            <View style={[styles.flexContent]}>
              <Text style={styles.flexText}>Duration</Text>
              <Text style={[styles.flexText, {fontWeight: 'bold'}]}>
                {duration} Months
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 22,
                paddingBottom: 40,
                borderColor: COLORS.grey,
                borderBottomWidth: 1,
                justifyContent: 'space-evenly',
              }}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, color: '#2A286A'}}>
                  Fees
                </Text>
                <Text
                  style={[
                    designs.offerBoxLabels,
                    {
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: '#465969',
                      marginTop: 10,
                    },
                  ]}>
                  Address verification
                </Text>
                <Text
                  style={[
                    {
                      fontWeight: 'normal',
                      fontSize: 12,
                      lineHeight: 20,
                      color: '#465969',
                      marginTop: 10,
                    },
                  ]}>
                  This is to be paid once you accept our offer.
                </Text>
              </View>

              <View style={{alignSelf: 'flex-end'}}>
                <Text
                  style={[
                    {fontWeight: 'bold', color: '#465969', fontSize: 12},
                  ]}>
                  ₦2,500
                </Text>
              </View>
            </View>

            <View style={[styles.flexContent]}>
              <View style={{flex: 2, flexDirection: 'column'}}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, color: '#465969'}}>
                  Rent insurance
                </Text>

                <Text
                  style={[
                    {
                      fontWeight: 'normal',
                      fontSize: 12,
                      lineHeight: 20,
                      color: '#465969',
                      marginTop: 10,
                    },
                  ]}>
                  This is to insure you against job loss or personal disability.
                  This will be deducted from the amount to be paid to your
                  landlord.
                </Text>
              </View>

              <View style={{}}>
                <Text
                  style={[
                    {fontWeight: 'bold', color: '#465969', fontSize: 12},
                  ]}>
                  ₦{formatNumber(rentInsuranceCal)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 19,
            marginTop: 20,
            justifyContent: 'space-around',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            // onPress={handleRejectOffer}
            onPress={reject_offer}
            style={[
              designs.button,
              {backgroundColor: COLORS.white, elevation: 1, width: '43%'},
            ]}>
            <Text
              style={[
                designs.buttonText,
                {
                  fontSize: 12,
                  color: '#777',
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
              ]}>
              REJECT OFFER
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setVisible(true)}
            // onPress={() => navigation.navigate('PostPaymentForm1')}
            onPress={accept_offer}
            style={[
              designs.button,
              {backgroundColor: COLORS.secondary, elevation: 1, width: '43%'},
            ]}>
            <Text
              style={[
                designs.buttonText,
                {
                  fontSize: 12,
                  color: COLORS.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
              ]}>
              ACCEPT OFFER
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {}}
        style={{flex: 1, maxHeight: 600}}>
        <View style={designs.modalWrapper}>
          <View style={designs.modalView}>
            <View style={[designs.modalHeader, {justifyContent: 'flex-end'}]}>
              <Icon
                onPress={() => setVisible(!modalVisible)}
                style={{alignSelf: 'flex-end'}}
                name="close-outline"
                size={30}
                color="#465969"
              />
            </View>

            <Text
              style={{
                fontSize: 16,
                lineHeight: 20,
                fontWeight: 'bold',
                color: COLORS.primary,
                textAlign: 'center',
              }}>
              Offer Letter
            </Text>

            {/* <ScrollView > */}
            {/* <LoanOfferContent /> */}
            <PrintOfferLetter />
            {/* </ScrollView> */}
            {/* <Text>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidu s dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, sit.
                </Text> */}
            <TouchableOpacity
              onPress={handleAcceptOfferClick}
              style={[
                designs.button,
                {
                  backgroundColor: COLORS.secondary,
                  elevation: 6,
                  width: '100%',
                  marginTop: 12,
                  alignSelf: 'center',
                },
              ]}>
              <Text
                style={[
                  designs.buttonText,
                  {
                    fontSize: 14,
                    color: COLORS.white,
                    textAlign: 'center',
                    fontWeight: 'normal',
                  },
                ]}>
                YES, ACCEPT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* here stays the modal */}

      <Modal visible={successModal} animationType="slide" transparent={true}>
        <View style={designs.centeredModalWrapper}>
          <View style={[designs.successModal, {borderRadius: 30}]}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#D6D6D6"
            />
            <Image
              source={icons.tick}
              style={{width: 84, height: 84, marginTop: 25}}
            />
            <Text style={designs.successModalBodyText}>Offer accepted</Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 12,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 6,
              }}>
              Set up your payment plan
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate(
                  'AddressVerificationPayment',
                  acceptOfferResponse,
                );
              }}
              style={[
                designs.button,
                {
                  marginTop: 30,
                  width: '100%',
                  alignSelf: 'center',
                  backgroundColor: COLORS.secondary,
                },
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                  textAlign: 'center',
                }}>
                SET UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <Modal
          visible={eSignatureModal}
          animationType="slide"
          transparent={true}>
          <SignatureScreen
            ref={ref}
            onOK={handleSignature}
            onEmpty={handleEmpty}
            onClear={handleClear}
            autoClear={true}
            descriptionText={'Sign above to confirm your Acceptamce'}
            webStyle={style}
          />
          <Text></Text>
        </Modal>
      </View>

      <Spinner visible={spinner} size="large" />
    </View>
  );
};

export default RentalLoanOfferTest;

const styles = StyleSheet.create({
  flexContent: {
    flexDirection: 'row',
    // paddingTop: 22,
    paddingVertical: 20,
    // paddingBottom: 16,
    borderColor: COLORS.grey,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },

  flexText: {
    fontSize: 14,
    // lineHeight: 15,
    color: COLORS.primary,
  },
});
