import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images} from '../../../util/index';
import AddCardModal from '../../../components/addCardModal';

export default function Screen6({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const addCard = () => {
    setModalVisible(false);
  };
  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <Text style={[designs.boldText, {marginTop: 35}]}>
        Choose how you want to pay
      </Text>
      <TouchableOpacity
        onPress={() => setSuccessModal(true)}
        style={designs.creditCard}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="folder-outline" size={20} color="#D6D6D6" />
          <Text
            style={{
              fontSize: 15,
              lineHeight: 19,
              fontWeight: '600',
              color: '#2A286A',
              marginLeft: 10,
            }}>
            2345
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#ADADAD',
              fontSize: 12,
              lineHeight: 15,
              fontWeight: '700',
              marginRight: 10,
            }}>
            EXPIRES 12/2022
          </Text>
          <Image
            style={{width: 47, height: 30}}
            source={images.masterCardSymbol}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 17,
          height: 70,
          width: 380,
        }}>
        <Icon name="add" size={20} color="#00DC99" />
        <Text
          style={{
            color: '#00DC99',
            fontSize: 14,
            fontWeight: '700',
            lineHeight: 30,
          }}>
          ADD NEW CARD
        </Text>
      </TouchableOpacity>
      <AddCardModal
        onConfirm={addCard}
        onRequestClose={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
      />
      <Modal visible={successModal} animationType="fade" transparent={true}>
        <View
          style={[
            designs.modal,
            {justifyContent: 'center', paddingLeft: 16, paddingRight: 16},
          ]}>
          <View style={[designs.successModal, {borderRadius: 30}]}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#465969"
            />
            <Image source={icons.tick} />
            <Text style={[designs.boldText, {marginTop: 55, fontSize: 22}]}>
              Great work
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 14,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              Buddy savings has been set up
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate('BuddySavingDashBoard');
              }}
              style={[designs.button, {marginTop: 30, width: 340}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                }}>
                NICE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
