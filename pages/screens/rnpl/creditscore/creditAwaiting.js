import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetch} from '../../../../services/creditScrore';
import {COLORS} from '../../../../util';
import designs from './styles';

export default function CreditAwaiting(props) {
  const {data, navigation} = props;
  const [spinner, setSpinner] = useState(false);
  const [scoreData, setScoreData] = useState({});

  const getUser = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const user = JSON.parse(userData).user;
    return user;
  };

  useEffect(() => {
    handleFetch();
  }, [scoreData]);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      AsyncStorage.setItem(`creditScoreDetail-${user.id}`, 'awaiting');

      const creditScoreFormData = await AsyncStorage.getItem(
        `creditScoreData-${user.id}`,
      );
      const parseData = JSON.parse(creditScoreFormData);
      console.log('Parsed Data: ', parseData);
      setScoreData(parseData);
    })();
  }, []);

  const handleFetch = async () => {
    setSpinner(true);
    const payload = {
      email: scoreData?.email,
      company: scoreData?.company,
    };

    console.log('The payload: ', payload);

    const res = await fetch(payload);
    console.log('Dat res: ', res);
    try {
      if (res.status == 200) {
        setSpinner(false);
        if (res.data.history.length) {
          setSpinner(false);
          navigation.navigate('CreditDashboard');
        } else {
          setSpinner(false);
          Alert.alert(
            'Credit history',
            'We are still searching for your credit report, please check back later.',
          );
        }
      }

      // if (res.status == 200 && res.data.history.length) {
      //   setSpinner(false);
      //   navigation.navigate('CreditDashboard');
      //   console.log('The Data: ', res.data);
      // } else {
      //   setSpinner(false);
      //   Alert.alert(
      //     'Credit history',
      //     'We are still searching for your credit report, please check back later.',
      //   );
      // }
    } catch (error) {
      setSpinner(false);
      console.log('Errorrrrr: ', error.response);
    }
  };
  return (
    <>
      <View style={[designs.centeredView]}>
        <View style={[designs.topNav]}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="chevron-back" size={25} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={[designs.modalView]}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              flex: 1,
            }}>
            <View style={designs.textWrapper}>
              <Text style={designs.title}>Credit Report...</Text>
              <Text style={designs.subText}>
                We are currently processing your report, It takes up to 5
                minutes. please click the button below to refresh.
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleFetch}
              disabled={spinner}
              style={{opacity: spinner ? 0.5 : 1}}>
              <View style={designs.button}>
                <Text style={designs.buttonText}>
                  {spinner ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    'Check Again'
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
