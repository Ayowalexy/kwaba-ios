import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images, icons} from '../../util/index';
import {
  formatNumber,
  unFormatNumber,
  numberWithCommas,
} from '../../util/numberFormatter';
import ChooseNetworkModal from './chooseNetworkModal';
import ConfirmModal from './ConfirmModal';
import NumberFormat from '../../components/NumberFormat';

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

const PurchaseAirtime = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState(route.params.name);

  // let name = route.params.name;

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  return (
    <View style={{flex: 1}}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingHorizontal: 10, paddingVertical: 20}}
        color={COLORS.primary}
      />

      <ScrollView style={{paddingHorizontal: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            color: COLORS.primary,
            marginLeft: 5,
          }}>
          Airtime - {name}
        </Text>

        <TouchableOpacity
          style={styles.customInput}
          onPress={() => {
            setVisible(!visible);
          }}>
          <Text style={{fontWeight: 'bold', color: COLORS.primary}}>
            {name}
          </Text>
          <Icon
            name="chevron-down-outline"
            size={20}
            style={{fontWeight: 'bold'}}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <View style={[styles.customInput, {padding: 0}]}>
          <TextInput
            style={{
              width: '100%',
              paddingLeft: 20,
              paddingVertical: 16,
            }}
            placeholder="Phone Number"
            placeholderTextColor="#BFBFBF"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <Icon
            onPress={() => navigation.goBack()}
            name="card-sharp"
            size={20}
            style={{fontWeight: 'bold', position: 'absolute', right: 20}}
            color={COLORS.primary}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'center',
              // marginLeft: 5,
              marginBottom: 10,
              color: COLORS.primary,
            }}>
            Select Amount
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {['100', '200', '500', '1000', '1500', '2000'].map(
              (value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.amount,
                    {
                      backgroundColor:
                        unFormatNumber(amount) === value
                          ? '#9D98EC'
                          : '#9D98EC50',
                    },
                  ]}
                  onPress={() => setAmount(value)}>
                  <Text style={styles.amountText}>
                    ₦{numberWithCommas(value)}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>

        <NumberFormat value={amount} onChangeText={(text) => setAmount(text)} />
      </ScrollView>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => {
            setConfirmModalVisible(!confirmModalVisible);
          }}
          // disabled={!isError()}
          style={[
            styles.btn,
            {
              backgroundColor: '#00DC99',
              width: '100%',
              borderRadius: 10,
              // marginTop: 20,
              // opacity: isError() ? 0 : 1,
            },
          ]}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              lineHeight: 30,
              fontWeight: 'bold',
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>

      <ChooseNetworkModal
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        selectedNetwork={name}
        onClick={(value) => setName(value.name)}
      />

      <ConfirmModal
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(!confirmModalVisible)}
        selectedNetwork={name}
        selectedPhoneNumber={phoneNumber}
        selectedAmount={formatNumber(amount)}
      />
    </View>
  );
};

export default PurchaseAirtime;

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  amount: {
    width: '32%',
    padding: 15,
    // paddingHorizontal: 10,
    backgroundColor: '#9D98EC',
    backgroundColor: '#EDECFC',
    borderRadius: 5,
    marginTop: 10,
    borderColor: '#ADADAD50',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },

  btnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    // borderWidth: 1,
  },

  btn: {
    padding: 15,
    borderRadius: 10,
    // marginTop: 20,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
});
