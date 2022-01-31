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
  const {visible, onRequestClose, data, showDashboard} = props;
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    setSpinner(true);
    const payload = {
      email: data?.email,
      company: 'Kwaba',
    };
    try {
      const res = await fetch(payload);
      if (res.status == 200) {
        setSpinner(false);
        console.log('The Data: ', res.data);

        if (res?.data?.history?.length) {
          console.log('The Data: ', res.data);
          onRequestClose();
          showDashboard();
        } else {
          Alert.alert(
            'Credit history',
            'We are still searching for your credit report, please check back later.',
          );
        }
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={[designs.centeredView]}>
          <View style={[designs.topNav]}>
            <TouchableOpacity onPress={onRequestClose}>
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
      </Modal>
    </>
  );
}
