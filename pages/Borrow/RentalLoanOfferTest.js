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
  ActivityIndicator
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
import { baseUrl } from '../../services/routes'
import { formatNumber } from '../../util/numberFormatter';
import Preloader from '../../components/Preloader';
import { getEmergencyLoans } from '../../services/network';
import { getCurrentApplication } from '../../services/network';

const RentalLoanOfferTest = ({navigation}) => {
  const [modalVisible, setVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [eSignatureModal, setESignatureModal] = useState(false);
  const [acceptOfferResponse, setAcceptOfferResponse] = useState({});
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [duration, setDuration] = useState('');
  const [acceptSpinner, setAcceptSpinner] = useState(false)

  const ref = useRef();

  useEffect(() => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const token = JSON.parse(userData).token;
      return token;
    };

    const setLoanOffer = async () => {
      const token = await getToken();
      const getAllAloans = await getEmergencyLoans();
      const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
      const applicationIDCallRes =  await getCurrentApplication({id: loan_id})

      console.log('Approved application', applicationIDCallRes.data.data)

      setApprovedAmount(applicationIDCallRes.data.data.approvedamount);
      setMonthlyPayment(applicationIDCallRes.data.data.monthly_repayment);
      setDuration(applicationIDCallRes.data.data.repayment_plan);
    };

    setLoanOffer();
  }, []);

  const handleSignature = async (signature) => {
    console.log('here is the image ' + signature);
    setAcceptSpinner(true)
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
    
    const getAllAloans = await getEmergencyLoans();
      const loan_id = getAllAloans?.data?.data?.find(element => element?.loan_type == 'rent_now_pay_later')?.id
      const applicationIDCallRes =  await getCurrentApplication({id: loan_id})

    const applicationId = applicationIDCallRes.data.data.id;

    console.log('application id', applicationId)

    setAcceptSpinner(false)
    try {
      const response = await axios.put(
        `${baseUrl}/application/accept_offer`,
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
      setAcceptSpinner(false)
      if(response.status.toString().startsWith(2)){
        const rnplStep = {
          nextStage: 'Property details',
          completedStages: ['Credit score', 'Applications', 'Offer approval breakdown', 'Documents upload']
        }
        await AsyncStorage.setItem('rnplSteps', JSON.stringify(rnplStep))

      }
      setAcceptOfferResponse(response);
    } catch (error) {
      console.log(error);
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
        font-family:Poppins-Medium;
        left: 0;
        background-color: #BFBFBF;
        width: 100px;
        height: 50px;
      }

    
    .m-signature-pad--footer
      .button.save {
        font-family:Poppins-Medium;
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
                fontSize: 20,
              },
            ]}>
            Rental Loan
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
                {duration}
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
                  ₦{formatNumber(`${Number(approvedAmount) * 0.05}`)}
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
                  ₦2,500
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
            onPress={handleRejectOffer}
            style={[
              designs.button,
              {backgroundColor: COLORS.white, elevation: 1, width: '43%'},
            ]}>
            <Text
              style={[
                designs.buttonText,
                {
                  fontSize: 14,
                  color: '#ADADAD',
                  textAlign: 'center',
                  fontWeight: 'normal',
                },
              ]}>
              REJECT OFFER
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setVisible(true)}
            onPress={() => navigation.navigate('PTMFB')}
            style={[
              designs.button,
              {backgroundColor: COLORS.secondary, elevation: 1, width: '43%'},
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
        <Preloader
          visible={acceptSpinner}
          setVisible={setAcceptSpinner}
        />
      </View>
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
    fontSize: 12,
    // lineHeight: 15,
    color: COLORS.primary,
  },
});
