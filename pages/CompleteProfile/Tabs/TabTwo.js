import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, FONTS, images, icons} from '../../../util/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';

import {useDispatch} from 'react-redux';
import {me} from '../../../services/network';
import {setLoginState} from '../../../redux/actions/userActions';

import SelectEmploymentStatusModal from '../../../components/SelectEmploymentStatusModal';

export default function TabTwo(props) {
  const dispatch = useDispatch();
  const [employmentStatus, setEmplpoymentStatus] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');

  const [employmentStatusModal, setEmploymentStatusModal] = useState(false);

  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);

  const {} = props;

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

  useEffect(() => {
    (async () => {
      const data = await getUserData();
      const {employment_status, work_place} = data.user;

      // auto fill input fields
      setEmplpoymentStatus(employment_status);
      setCompanyName(work_place);
      // setLocation();
    })();
  }, []);

  const saveLoginToStorage = async (data) => {
    // console.log(data);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {}
  };

  const updateProfile = async () => {
    const token = await getToken();

    const updateData = {
      employment_status: employmentStatus,
      work_place: companyName,
      location: '',
    };

    let userData = await getUserData();
    setSpinner(true);

    try {
      const url = 'http://67.207.86.39:8000/api/v1/user/update_profile';
      const response = await axios.put(url, JSON.stringify(updateData), {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      if (response.status == 200) {
        setSpinner(false);
        setModal(true);
        const res = await me();

        saveLoginToStorage({
          ...userData,
          user: res.user,
          username: res.user.firstname,
        });

        dispatch(
          setLoginState({
            ...userData,
            user: res.user,
            username: res.user.firstname,
          }),
        );
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 80}}>
        <View style={{marginTop: 20}} />
        <View>
          {/* <TextInput
            style={[designs.textField]}
            placeholder="Employment Status"
            placeholderTextColor="#999"
            keyboardType="default"
            value={employmentStatus}
            onChangeText={(text) => setEmplpoymentStatus(text)}
          /> */}

          <TouchableOpacity
            style={[designs.customInput, {padding: 20}]}
            onPress={() => {
              // setShowSelectGenderModal(!showSelectGenderModal);
              setEmploymentStatusModal(!employmentStatusModal);
            }}>
            {employmentStatus != null ? (
              <Text
                style={{
                  color: '#777',
                  fontWeight: 'bold',
                }}>
                {employmentStatus}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#BABABA',
                }}>
                Employment Status
              </Text>
            )}
            <Icon
              name="chevron-down-outline"
              size={20}
              style={{fontWeight: 'bold'}}
              color="#BABABA"
            />
          </TouchableOpacity>

          <TextInput
            style={[designs.textField]}
            placeholder="Name of Company"
            placeholderTextColor="#555"
            keyboardType="default"
            value={companyName}
            onChangeText={(text) => setCompanyName(text)}
          />
          <TextInput
            style={[designs.textField]}
            placeholder="Location"
            placeholderTextColor="#555"
            keyboardType="default"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>

      <Spinner visible={spinner} size="large" />
      <Modal
        isVisible={modal}
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text style={{color: COLORS.secondary, fontWeight: 'bold'}}>
            Profile updated!
          </Text>
        </View>
      </Modal>

      <SelectEmploymentStatusModal
        onRequestClose={() => setEmploymentStatusModal(!employmentStatusModal)}
        visible={employmentStatusModal}
        onClick={(value) => setEmplpoymentStatus(value)}
        // onClick={(value) => console.log(value)}
      />
    </>
  );
}
