import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {images, icons, COLORS} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';

export default function MoveMoneyOptionModal(props) {
  const {visible, onRequestClose, showWhereToMoveMoneyBasedOnID} = props;
  const [spinner, setSpinner] = useState(false);

  const handleClick = (id) => {
    onRequestClose();
    showWhereToMoveMoneyBasedOnID(id); // id: 1, 0
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.content}>
              <TouchableOpacity onPress={onRequestClose} style={styles.close}>
                <Icon name="close" size={25} color={COLORS.dark} />
              </TouchableOpacity>

              <View style={{marginTop: 50, flex: 1}}>
                <View style={{marginBottom: 20, paddingHorizontal: 20}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.dark,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    Move money to savings
                  </Text>
                </View>
                {[
                  {title: 'Move to existing savings plan', id: 0},
                  {title: 'Create a new savings plan', id: 1},
                ].map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleClick(item.id)}>
                      <View
                        style={{
                          borderTopColor: '#eee',
                          borderTopWidth: 1,
                          paddingHorizontal: 30,
                          paddingVertical: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <AntIcon
                          name={item.id == 1 ? 'form' : 'addfolder'}
                          size={25}
                          color={'#5A4CB1'}
                          style={{marginRight: 15}}
                        />
                        <Text style={{fontSize: 14, color: COLORS.dark}}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Spinner visible={spinner} size="large" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 200,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  close: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    top: 20,

    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  },

  heading: {
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: 'bold',
    // marginBottom: 20,
    paddingLeft: 30,
    backgroundColor: '#BFBFBF20',
    paddingVertical: 20,
    // textAlign: 'center',
  },
});
