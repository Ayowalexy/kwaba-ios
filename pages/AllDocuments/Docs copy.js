import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, images, icons} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';

export default function Docs(props, {navigation}) {
  const {documentUploads} = props;
  const [modal, setModal] = useState(false);
  const [showSelectDocumentsModal, setShowSelectDocumentsModal] = useState(
    false,
  );
  const [showChooseFileModal, setShowChooseFileModal] = useState(false);
  const [item, setItem] = useState('');

  const handleRemove = async (item) => {
    console.log('Removing....');
    console.log('ITEM:', item);
    setItem(item);
    setModal(true);
  };

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');

    const token = JSON.parse(userData).token;
    return token;
  };

  const deleteFile = async () => {
    const token = await getToken();

    try {
      const response = await axios.delete(
        'http://67.207.86.39:8000/api/v1/application/document/delete',
        {
          headers: {'Content-Type': 'application/json', Authorization: token},
          data: {
            id: item.application_id,
          },
        },
      );
      console.log('Deleted Item: ', response);
      setModal(false);
    } catch (error) {
      console.log('error here : ', error);
    }
  };

  return (
    <>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.content]}>
          {documentUploads.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.documentList]}>
              <Icon
                name="documents-outline"
                style={{
                  fontSize: 35,
                  color: COLORS.primary,
                }}
              />
              <View style={{marginLeft: 10, flex: 1}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}>
                  {item.filename}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 12,
                      color: COLORS.secondary,
                    }}>
                    {/* {item.file} */}
                    JOSHUA FILE
                  </Text>
                  <Icon
                    onPress={() => handleRemove(item)}
                    name="remove-circle"
                    style={{
                      fontSize: 20,
                      color: COLORS.grey,
                      padding: 5,
                    }}
                  />
                </View>
              </View>
              <Icon
                name="ios-shield-checkmark-sharp"
                style={{
                  fontSize: 20,
                  color: COLORS.secondary,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
        isVisible={modal}>
        <View
          style={{
            backgroundColor: '#FFF',
            paddingVertical: 40,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            Do you want to delete file?
          </Text>
          <View style={[styles.actionBtnContainer]}>
            <TouchableOpacity
              style={[styles.actionBtn]}
              onPress={() => setModal(false)}>
              <Text style={[styles.actionBtnText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn]} onPress={deleteFile}>
              <Text style={[styles.actionBtnText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  heading: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  documentList: {
    backgroundColor: COLORS.white,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
    // marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f9f9f9',

    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },

  actionBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  actionBtn: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    marginLeft: 10,
    borderRadius: 5,
  },

  actionBtnText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
