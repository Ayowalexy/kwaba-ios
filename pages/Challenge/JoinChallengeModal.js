import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, images} from '../../util';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';

const {width, height} = Dimensions.get('screen');

const img = require('../../assets/images/high-five.png');

export default function JoinChallengeModal(props) {
  const {onRequestClose, visible, navigation, data} = props;
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    console.log('The Data: ', data);
  },[])

  const handleNavigate = () => {
    onRequestClose();
    navigation.navigate('JoinChallengeDashboard');
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <Text
            style={{
              paddingVertical: 40,
              paddingHorizontal: 20,
              fontSize: 25,
              color: COLORS.white,
              fontWeight: 'bold',
              lineHeight: 35,
              //   width: width / 1.5
            }}>
            {data?.name}
          </Text>
          <View style={styles.modalView}>
            <View
              style={{
                flex: 1,
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 40,
              }}>
              <Image
                source={img}
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.dark,
                  textAlign: 'center',
                  lineHeight: 25,
                  marginTop: 20,
                }}>
                {data.description}
              </Text>
            </View>

            <TouchableOpacity style={[styles.btn]} onPress={handleNavigate}>
              <Text style={[styles.btnText]}>JOIN CHALLENGE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {backgroundColor: 'transparent'}]} onPress={onRequestClose}>
              <Text style={[styles.btnText, {color: '#5A4CB1'}]}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#5A4CB1',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    padding: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
  btn: {
    backgroundColor: '#5A4CB1',
    // backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10
  },
  btnText: {
    color: COLORS.white,
    // color: '#5A4CB1',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
