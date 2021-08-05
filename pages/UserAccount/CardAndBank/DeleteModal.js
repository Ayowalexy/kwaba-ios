import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {images, icons, COLORS} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import Modal from 'react-native-modal';
import {deleteBankAccount, deleteTokenizeCard} from '../../../services/network';

export default function DeleteModal(props) {
  const {
    type,
    showDeleteModal,
    setShowDeleteModal,
    clickedItem,
    deleteResponse,
    hideActionModal,
  } = props;

  const [spinner, setSpinner] = useState(false);

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    hideActionModal(false);
    setSpinner(true);

    let data = {
      id: clickedItem.id,
    };

    if (type == 'card') {
      try {
        const res = await deleteTokenizeCard(data);
        if (res.data.status == 'success') {
          deleteResponse(res.data.cards);
          setSpinner(false);
        }
      } catch (error) {
        console.log(error);
        setSpinner(false);
      }
    } else {
      try {
        const res = await deleteBankAccount(data);
        if (res.data.status == 'success') {
          deleteResponse(res.data.cards);
          setSpinner(false);
        }
      } catch (error) {
        console.log(error);
        setSpinner(false);
      }
    }
  };

  return (
    <>
      <Modal
        isVisible={showDeleteModal}
        onBackButtonPress={() => setShowDeleteModal(false)}
        onBackdropPress={() => setShowDeleteModal(false)}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="ios-warning" size={50} color={COLORS.red} />

            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: COLORS.dark,
                }}>
                Delete {type}?
              </Text>
              <Text style={{fontSize: 13, color: COLORS.dark}}>
                This action cannot be undone.
              </Text>
            </View>
          </View>

          <View style={[styles.buttonContainer]}>
            <TouchableOpacity
              onPress={() => setShowDeleteModal(false)}
              style={[
                styles.button,
                {
                  backgroundColor: COLORS.white,
                  borderColor: '#46596950',
                },
              ]}>
              <Icon
                name="close"
                size={15}
                style={{marginRight: 10}}
                color={COLORS.dark}
              />
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: COLORS.dark,
                  },
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirmDelete}
              style={[styles.button, {borderColor: COLORS.red}]}>
              <Icon
                name="trash-bin"
                size={15}
                style={{marginRight: 10}}
                color={COLORS.white}
              />
              <Text style={[styles.buttonText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: '#46596920',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 20,
  },
  button: {
    backgroundColor: COLORS.red,
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});
