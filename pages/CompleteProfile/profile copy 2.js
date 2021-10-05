import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import {COLORS, FONTS, images, icons} from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SelectGenderModal from '../../components/SelectGenderModal';
import AddressModal from '../../components/AddressModal';

import TabOne from './Tabs/TabOne';

const getToken = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const token = JSON.parse(userData).token;
  return token;
};

const getUserData = async () => {
  const userData = await AsyncStorage.getItem('userData');
  const data = JSON.parse(userData);
  return data;
};

const CustomInput = (props) => {
  const {placeholder, value} = props;

  // console.log('Complete-profile:', placeholder, value);
  return (
    <>
      <View
        style={[
          {
            borderRadius: 5,
            backgroundColor: '#FFFFFF',
            borderColor: '#EFEFEF',
            borderWidth: 1,
            marginBottom: 10,
            marginTop: 5,
            width: '100%',
            position: 'relative',
            elevation: 0.5,
          },
        ]}>
        {placeholder.toLowerCase() == 'gender' ||
        placeholder.toLowerCase() == 'employment status' ? (
          <>
            <TextInput
              style={{
                width: '100%',
                paddingVertical: 15,
                paddingHorizontal: 20,
                paddingRight: 50,
              }}
              placeholder={placeholder}
            />
            <IconFA5
              name="chevron-down"
              size={20}
              color="#D6D6D6"
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
              }}
            />
          </>
        ) : placeholder.toLowerCase() == 'date of birth' ? (
          <>
            <TextInput
              style={{
                width: '100%',
                paddingVertical: 15,
                paddingHorizontal: 20,
                paddingRight: 50,
              }}
              placeholder={placeholder}
              value={value}
              {...props}
            />
            <IconFA5
              name="calendar-alt"
              size={20}
              color="#D6D6D6"
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
              }}
            />
          </>
        ) : (
          <>
            <TextInput
              style={{
                width: '100%',
                paddingVertical: 15,
                paddingHorizontal: 20,
              }}
              placeholder={placeholder}
            />
          </>
        )}
      </View>
    </>
  );
};

const Space = () => <View style={{marginTop: 20}} />;

const SaveChangesBtn = () => {
  return (
    <TouchableOpacity
      // onPress={handleSubmit}
      style={[
        {
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
          fontSize: 14,
          fontFamily: 'CircularStd-Medium',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 1,

          backgroundColor: '#00DC99',
          width: '100%',
          borderRadius: 10,
        },
      ]}>
      <Text
        style={{
          color: 'white',
          fontSize: 12,
          lineHeight: 30,
          fontWeight: 'bold',
        }}>
        SAVE CHANGES
      </Text>
    </TouchableOpacity>
  );
};

const FirstRoute = () => {
  // Fot tab one
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [showSelectGenderModal, setShowSelectGenderModal] = useState(false);
  const [selectedGender, setSelectedGender] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('userData');
      const data = JSON.parse(userData);
      // console.log('USER DATA:', data.user.firstname);

      const {firstname, lastname, gender, homeaddress} = data.user;

      // console.log('FirstName:', data.user);

      // auto fill input fields
      setFirstName(firstname);
      setLastName(lastname);
      setSelectedGender(gender);

      // try {
      //   const user = await axios.get(apiUrl + '/api/v1/me', {
      //     headers: {'Content-Type': 'application/json'},
      //   });
      //   return banks.data;
      // } catch (error) {
      //   return error.message;
      // }

      const user = await axios.get(apiUrl + '/api/v1/me', {
        headers: {'Content-Type': 'application/json'},
      });
      console.log('ME:', user);
    })();
  }, []);

  const onConfirm = () => {
    // close address modal
    setShowAddressModal(false);
    console.log('DATA:', {street, city, state, country});
  };

  const updateProfile = async () => {
    const token = await getToken();

    const userData = {
      firstname: firstName,
      lastname: lastName,
      gender: selectedGender,
      homeaddress: address,
    };

    console.log(userData);

    try {
      const url =
        'https://kwaba-main-api-2-cq4v8.ondigitalocean.app/api/v1/user/update_profile';
      const response = await axios.put(url, JSON.stringify(userData), {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      // console.log(response.status);
      if (response.status == 200) {
        // await AsyncStorage.setItem('userData', JSON.stringify(data));

        const userData = await AsyncStorage.getItem('userData');
        const data = JSON.parse(userData);

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#F7F8FD',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="camera"
            size={40}
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
              fontWeight: '900',
            }}
            color={COLORS.grey}
          />
        </View>
        <TouchableOpacity>
          <Text
            style={{color: COLORS.secondary, fontWeight: 'bold', fontSize: 12}}>
            Tap to change picture
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {/* <CustomInput placeholder="First Name" value={firstName} />
        <CustomInput placeholder="Last Name" value={lastName} />
        <CustomInput placeholder="Gender" value={gender} />
        <CustomInput placeholder="Date of Birth" value={dateOfBirth} /> */}
        <TextInput
          style={[styles.textField]}
          placeholder="First Name"
          keyboardType="default"
          // placeholderTextColor="#BFBFBF"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <TextInput
          style={[styles.textField]}
          placeholder="Last Name"
          keyboardType="default"
          // placeholderTextColor="#BFBFBF"
          value={lastName}
          onChangeText={(text) => onChange(text)}
        />

        <TouchableOpacity
          style={styles.customInput}
          onPress={() => {
            setShowSelectGenderModal(!showSelectGenderModal);
          }}>
          {selectedGender != '' ? (
            <Text
              style={{
                // fontWeight: 'bold',
                color: COLORS.primary,
                textTransform: 'capitalize',
              }}>
              {selectedGender}
            </Text>
          ) : (
            <Text
              style={{
                // fontWeight: 'bold',
                color: '#BABABA',
              }}>
              Gender
            </Text>
          )}

          <Icon
            name="chevron-down-outline"
            size={20}
            style={{fontWeight: 'bold'}}
            color="#BABABA"
          />
        </TouchableOpacity>

        {/* <TextInput
          style={[styles.textField]}
          placeholder="First Name"
          keyboardType="number-pad"
          // placeholderTextColor="#BFBFBF"
          value={gender}
          onChangeText={(text) => setGender(text)}
        /> */}

        {/* <TextInput
          style={[styles.textField]}
          placeholder="First Name"
          keyboardType="number-pad"
          // placeholderTextColor="#BFBFBF"
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(text)}
        /> */}

        {/* <TextInput
          style={[styles.textField]}
          placeholder="First Name"
          keyboardType="number-pad"
          // placeholderTextColor="#BFBFBF"
          value={address}
          onChangeText={(text) => setAddress(text)}
        /> */}

        <View style={{paddingVertical: 10}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{fontSize: 15, fontWeight: 'bold', color: COLORS.primary}}>
              Address
            </Text>
            <TouchableOpacity
              onPress={() => setShowAddressModal(!showAddressModal)}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: COLORS.secondary,
                }}>
                Change address
              </Text>
            </TouchableOpacity>
          </View>
          {/* <CustomInput placeholder="15 Herber Macaulay way, Yaba, Lagos, Nigeria" /> */}

          <TouchableOpacity onPress={() => setShowAddressModal(true)}>
            <TextInput
              style={[styles.textField]}
              placeholder="Address"
              keyboardType="number-pad"
              editable={false}

              // placeholderTextColor="#BFBFBF"
              // value={firstName}
              // onChangeText={(text) => setFirstName(text)}
            />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          onPress={updateProfile}
          style={[
            {
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
              fontSize: 14,
              fontFamily: 'CircularStd-Medium',
              fontWeight: '600',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 1,

              backgroundColor: '#00DC99',
              width: '100%',
              borderRadius: 10,
            },
          ]}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              lineHeight: 30,
              fontWeight: 'bold',
            }}>
            SAVE CHANGES
          </Text>
        </TouchableOpacity> */}
        <SaveChangesBtn />
      </View>

      <SelectGenderModal
        onRequestClose={() => setShowSelectGenderModal(!showSelectGenderModal)}
        visible={showSelectGenderModal}
        onClick={(value) => setSelectedGender(value)}
      />

      <AddressModal
        onConfirm={onConfirm}
        onRequestClose={() => setShowAddressModal(!showAddressModal)}
        visible={showAddressModal}
        street={street}
        setStreet={setStreet}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        country={country}
        setCountry={setCountry}
      />
    </ScrollView>
  );
};

const SecondRoute = () => {
  // For tab two
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [nameOfCompany, setNameOfCompany] = useState('');
  const [location, setLocation] = useState('');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Space />
      <CustomInput placeholder="Employment Status" />
      <CustomInput placeholder="Name of Company" />
      <CustomInput placeholder="Location" />
      <SaveChangesBtn />
    </ScrollView>
  );
};

const ThirdRoute = () => {
  // For tab three
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bvn, setBvn] = useState('');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Space />
      <CustomInput placeholder="Email" />
      <CustomInput placeholder="Phone Number" />
      <CustomInput placeholder="Bank Verification Number (BVN)" />
      <SaveChangesBtn />
    </ScrollView>
  );
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#9D98EC', flex: 1, height: '100%'}}
    pressColor={'transparent'}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#F7F8FD',
    }}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          color: focused ? 'white' : COLORS.grey,
          fontSize: 12,
          // fontWeight: 'bold',
        }}>
        {route.title}
      </Text>
    )}
  />
);

export default function Profile({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Personal'},
    {key: 'second', title: 'Employment'},
    {key: 'third', title: 'Security'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <View style={{flex: 1, backgroundColor: '#F7F8FD'}}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{paddingVertical: 20, paddingHorizontal: 10, fontWeight: '900'}}
        color="#2A286A"
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
          marginLeft: 10,
        }}>
        Profile
      </Text>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          tabStyle={{elevation: 0}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textField: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: COLORS.primary,
  },

  customInput: {
    borderRadius: 5,
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
});
