import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {images, icons, COLORS} from '../../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import DeleteModal from './DeleteModal';

export default function ActionModal(props) {
  const {visible, onRequestClose, type, clickedItem, setDeleteResponse} = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [defaultcard, setDefaultcard] = useState(false);
  const [defaultbank, setDefaultbank] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const setDefaultCard = async (item) => {
    if (item == 'Default Payment Card') {
      setDefaultcard(!defaultcard);

      const data = {
        id: clickedItem.id,
        defaultcard: defaultcard ? 1 : 0,
      };

      console.log(data);
    } else if (item == 'Default Bank Account') {
      setDefaultbank(!defaultbank);

      const data = {
        id: clickedItem.id,
        defaultbank: defaultbank ? 1 : 0,
      };

      console.log(data);
    }
  };

  useEffect(() => {
    if (visible) console.log('clickedItem: ', clickedItem);
  }, [visible]);

  // const setDeleteResponse = async (data) => {
  //   if (type == 'card') {
  //     // console.log('A card was deleted:', data);
  //     setCards(data);
  //   } else {
  //     // console.log('A bank was deleted:', data);
  //     setBanks(data);
  //   }
  // };

  const CardLayout = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 14,
            color: '#2A2B6A',
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Assign Card
        </Text>
        <Icon
          onPress={onRequestClose}
          name="close-outline"
          size={25}
          color="#465969"
          style={{position: 'absolute', right: 0, padding: 10}}
        />

        {['Buddy Saving', 'Solo Saving', 'Default Payment Card'].map(
          (item, index) => (
            <TouchableOpacity
              onPress={() => setDefaultCard(item)}
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View>
                <Text
                  style={{fontWeight: 'bold', fontSize: 12, color: '#465969'}}>
                  {item}
                </Text>
              </View>
              {item == 'Default Payment Card' ? (
                <Icon
                  name="checkbox"
                  size={25}
                  color={defaultcard ? COLORS.secondary : '#46596920'}
                />
              ) : (
                <Icon name="checkbox" size={25} color="#46596920" />
              )}
            </TouchableOpacity>
          ),
        )}

        <TouchableOpacity
          onPress={handleDelete}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 20,
            paddingHorizontal: 15,
            borderTopColor: '#46596930',
            borderTopWidth: 1,
            opacity: 0.5,
            marginTop: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontSize: 12,
              color: 'red',
            }}>
            Remove Payment Card
          </Text>
          <Icon name="trash-bin" size={20} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const BankLayout = () => (
    <View>
      <Text
        style={{
          fontSize: 14,
          color: '#2A2B6A',
          fontWeight: 'bold',
          marginVertical: 20,
        }}>
        Assign Bank
      </Text>
      <Icon
        onPress={onRequestClose}
        name="close-outline"
        size={25}
        color="#465969"
        style={{position: 'absolute', right: 0, padding: 10}}
      />
      {['Withdrawal', 'Pay Rent', 'Default Bank Account'].map((item, index) => (
        <TouchableOpacity
          // onPress={() => setDefaultCard(item)}
          onPress={() => {
            setDefaultCard(item);
            console.log(item);
          }}
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#465969'}}>
              {item}
            </Text>
          </View>
          {item == 'Default Bank Account' ? (
            <Icon
              name="checkbox"
              size={25}
              color={defaultbank ? COLORS.secondary : '#46596920'}
            />
          ) : (
            <Icon name="checkbox" size={25} color="#46596920" />
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={handleDelete}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingTop: 20,
          paddingHorizontal: 15,
          borderTopColor: '#46596930',
          borderTopWidth: 1,
          opacity: 0.5,
          marginTop: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: 12,
            color: 'red',
          }}>
          Remove Bank Account
        </Text>
        <Icon name="trash-bin" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            fontFamily: 'CircularStd',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              minHeight: 200,
              backgroundColor: '#fff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: 25,
            }}>
            {type == 'card' ? <CardLayout /> : <BankLayout />}
          </View>
        </View>
      </Modal>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        type={type}
        clickedItem={clickedItem}
        // deleteResponse={(all) => setDeleteResponse(all)}
        deleteResponse={(cards) => setDeleteResponse({cards, type})}
        hideActionModal={(bol) => onRequestClose(bol)}
      />
    </>
  );
}
