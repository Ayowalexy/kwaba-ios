import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, images} from '../../util/index';
import {CustomTextInput, CustomPicker} from '../../components/CustomInput';
import designs from './style';

const Account = ({navigation}) => {
  const [pressed, setPressed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [secondPressed, setSecondPressed] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [loanPurpose] = useState([
    {label: 'Household', value: 'Household'},
    {label: 'Personal', value: 'Personal'},
  ]);
  const accountTabsAndSettings = [
    {iconName: '', tabTitle: 'Withdraw'},
    {iconName: '', tabTitle: 'Card And Bank'},
    {iconName: '', tabTitle: 'Referral'},
    {iconName: '', tabTitle: 'Change Password'},
    {iconName: '', tabTitle: 'Documents'},
    {iconName: '', tabTitle: 'Legals And FAQs'},
    {iconName: '', tabTitle: 'About us'},
  ];
  const onPress = () => {
    setSecondPressed(!pressed);
    setPickerModalVisible(!pickerModalVisible);
  };

  const onPressB = () => {
    setPressed(!pressed);
  };

  return (
    <View
      style={[
        designs.container,
        {
          backgroundColor: '#F7F8FD',
          paddingTop: 28,
          paddingHorizontal: 16,
          paddingBottom: 24,
        },
      ]}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          <View style={{textAlign: 'left'}}>
            <Text
              style={[
                FONTS.h1FontStyling,
                {color: COLORS.primary, fontWeight: 'bold'},
              ]}>
              Emergency Loan
            </Text>
          </View>
          <View style={designs.rlDisplay}>
            <View
              style={{
                marginTop: 8,
                paddingBottom: 11,
                borderBottomWidth: 1,
                borderColor: '#EAEAEA',
              }}>
              <View style={designs.flexRow}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 12,
                    lineHeight: 15,
                    marginBottom: 1,
                    marginRight: 5,
                  }}>
                  {/* Salary */} Maximum Loan Amount
                </Text>
              </View>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 23,
                  lineHeight: 29,
                  fontWeight: 'bold',
                }}>
                ₦310,000.00
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 16,
                  lineHeight: 20,
                  marginTop: 20,
                }}>
                How much do you want?
              </Text>
              <TextInput
                style={[
                  designs.textField,
                  {
                    marginTop: 8,
                    textAlign: 'left',
                    marginBottom: 0,
                  },
                ]}
                placeholder="Amount"
                keyboardType="default"
                placeholderTextColor="#BFBFBF"
              />
            </View>
            <CustomTextInput
              onPress={onPressB}
              pressed={pressed}
              placeHolderText="Email"
            />
            <CustomPicker
              onPress={onPress}
              pressed={secondPressed}
              value={selectedOption}
              close={() => {
                setPickerModalVisible(!pickerModalVisible);
                setSecondPressed(!secondPressed);
              }}
              modalVisible={pickerModalVisible}>
              <View>
                {loanPurpose.map((value, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedOption(value.value);
                        setPickerModalVisible(false);
                        setSecondPressed(!secondPressed);
                      }}>
                      <Text style={FONTS.body1FontStyling}>{value.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </CustomPicker>
          </View>
          <TouchableOpacity
            style={[
              designs.buttonStyleB,
              {backgroundColor: '#00DC99', width: '100%'},
            ]}
            onPress={() => navigation.navigate('AccountPage')}>
            <Text style={{color: COLORS.white}}>ACCESS LOAN</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Account;
