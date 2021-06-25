import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Switch} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {images} from '../../../util/index';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {soloSaving} from '../../../redux/actions/savingsActions';
import {unFormatNumber, numberWithCommas} from '../../../util/numberFormatter';
import CardAndBankModal from './CardAndBankModal';

export default function Screen3({navigation}) {
  const store = useSelector((state) => state.soloSavingReducer);
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [locked, setLocked] = useState(true);

  const savings_target = store.savings_amount * Number(store.savings_tenure[0]);
  const savings_start_date = moment(store.savings_start_date).format(
    'MMM D, YYYY',
  );
  const savings_end_date = moment(store.savings_end_date).format('MMM D, YYYY');
  // const savings_start_date = moment(store.savings_start_date, 'YYYY-MM-DD');
  // const savings_end_date = moment(store.savings_end_date, 'YYYY-MM-DD');
  const toggleSwitch = () => {
    setLocked((previousState) => !previousState);
  };

  const [amountToSave, setAmountToSave] = useState(null);

  const [modal, setModal] = useState(false);
  const [addCardModal, setAddCardModal] = useState(false);

  const addCardAndBankModal = () => {
    setModal(true);
    console.log(store);
  };

  useEffect(() => {
    dispatch(soloSaving({locked: locked}));
    // console.log(store.savings_target_amount);
  }, [locked]);

  useEffect(() => {
    const frequency = store.savings_frequency;
    const targetAmount = store.savings_target_amount;
    const tenure = store.savings_tenure;
    const locked_interest_rate = 0.08;
    const unlock_interest_rate = 0.07;
    const numberOfDaysInAMonth = 30;
    const numberOfWeeksInAMonth = 4;
    console.log('Freq:', frequency);
    console.log('Tenure:', tenure);
    if (frequency == 'Daily') {
      if (tenure.toLowerCase() == '1 year') {
        let amount_to_save = targetAmount / (numberOfDaysInAMonth * 12);

        setAmountToSave(amount_to_save);
      } else {
        let amount_to_save = targetAmount / (numberOfDaysInAMonth * tenure[0]);

        setAmountToSave(amount_to_save);
      }
    } else if (frequency == 'Weekly') {
      if (tenure.toLowerCase() == '1 year') {
        let amount_to_save = targetAmount / (numberOfWeeksInAMonth * 12);

        setAmountToSave(amount_to_save);
      } else {
        let amount_to_save = targetAmount / (numberOfWeeksInAMonth * tenure[0]);

        setAmountToSave(amount_to_save);
      }
    } else if (frequency == 'Monthly') {
      if (tenure.toLowerCase() == '1 year') {
        let amount_to_save = targetAmount / 12;
        setAmountToSave(amount_to_save);
      } else {
        let amount_to_save = targetAmount / tenure[0];
        setAmountToSave(amount_to_save);
      }
    }
  }, []);

  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={35}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <Text style={[designs.boldText, {marginTop: 15}]}>
          Review your saving details
        </Text>
        <View style={[designs.summaryBox, {paddingBottom: 16}]}>
          <View style={designs.whiteBox}>
            <View style={{marginTop: 16}}>
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 15,
                  fontWeight: '700',
                  color: '#9D98EC',
                  fontFamily: 'Circular Std',
                }}>
                SOLO SAVING
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#2A286A',
                  lineHeight: 23,
                  fontFamily: 'Circular Std',
                }}>
                {store.savings_title}
              </Text>
            </View>
            <Image
              style={{width: 61, height: 66}}
              source={images.maskGroup15}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>
                Amount To Save {store.savings_frequency}
              </Text>
              <Text style={designs.value}>
                ₦{numberWithCommas(Number(amountToSave).toFixed(2)) || ' 0.00'}
              </Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Target Amount</Text>
              <Text style={designs.value}>
                ₦
                {numberWithCommas(
                  Number(store.savings_target_amount).toFixed(2),
                ) || ' 0.00'}
              </Text>
            </View>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>Frequency</Text>
              <Text style={designs.value}>{store.savings_frequency}</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Start Date</Text>
              <Text style={designs.value}>{savings_start_date}</Text>
            </View>
            <View style={designs.dataInfo}>
              <Text style={designs.key}>End Date</Text>
              <Text style={designs.value}>{savings_end_date}</Text>
            </View>
            <View style={[designs.dataInfo, {alignItems: 'flex-end'}]}>
              <Text style={designs.key}>Interest Rate</Text>
              <Text style={designs.value}>{locked ? '8%' : '7%'} P.A</Text>
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
                fontSize: 10,
                lineHeight: 15,
                fontWeight: '700',
                color: '#9D98EC',
                fontFamily: 'Circular Std',
              }}>
              SOLO SAVING
            </Text>
<<<<<<< HEAD
=======
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
>>>>>>> 506b7739fae3916ddc38ea69070cdc8d8993711b
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#2A286A',
                lineHeight: 23,
                fontFamily: 'Circular Std',
              }}>
              {new Date().getFullYear()} Rent
            </Text>
          </View>
          <Image style={{width: 61, height: 66}} source={images.maskGroup15} />
        </View>
        <View style={designs.data}>
          <View>
            <Text style={designs.key}>
              Amount to save {store.savings_frequency}
            </Text>
            <Text style={designs.value}>₦{store.savings_amount}</Text>
          </View>
          <View style={{marginLeft: 90}}>
            <Text style={designs.key}>Target Amount</Text>
            <Text style={designs.value}>₦{savings_target}</Text>
          </View>
        </View>
        <View style={{marginTop: 16, paddingLeft: 8}}>
          <Text style={designs.key}>Amount to save today</Text>
          <Text style={designs.value}>₦{store.instant_saved_amount}</Text>
        </View>
        <View style={designs.data}>
          <View>
            <Text style={designs.key}>Frequency</Text>
            <Text style={designs.value}>{store.savings_frequency}</Text>
          </View>
          <View style={{marginLeft: 165}}>
            <Text style={designs.key}>Start Date</Text>
            <Text style={designs.value}>{savings_start_date}</Text>
          </View>
        </View>
        <View style={designs.data}>
          <View>
            <Text style={designs.key}>End Date</Text>
            <Text style={designs.value}>{savings_end_date}</Text>
          </View>
          <View style={{marginLeft: 125}}>
            <Text style={designs.key}>Interest Rate</Text>
            <Text style={designs.value}>{locked ? '8%' : '7%'}</Text>
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
        <TouchableOpacity
          disabled={!toggleCheckBox}
          onPress={() => navigation.navigate('SoloSavingDashBoard')}
          // onPress={() => navigation.navigate('SetUpPaymentPlan')}
          // onPress={() => navigation.navigate('SoloSaving4')}
          // onPress={addCardAndBankModal}
          style={[
            designs.button,
            {
              marginTop: 15,
              // backgroundColor: toggleCheckBox ? '#00DC99' : '#EAEAEA',
              backgroundColor: '#00DC99',
            },
          ]}>
          <Text
            style={{
              // color: toggleCheckBox ? 'white' : '#000',
              color: toggleCheckBox ? '#fff' : '#ffffff50',
              fontWeight: 'bold',
              fontSize: 12,
              lineHeight: 30,
            }}>
            CONTINUE
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <CardAndBankModal
        onRequestClose={() => setModal(!modal)}
        visible={modal}
        store={store}
        navigation={navigation}
      />
    </View>
  );
}
