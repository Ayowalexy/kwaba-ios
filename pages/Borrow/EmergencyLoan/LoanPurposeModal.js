import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../util';

export default function LoandPurposeModal(props) {
  const {onRequestClose, visible, onClick, loanPurpose, setLoanPurpose} = props;
  const [reason, setReason] = useState('');
  const loanPurposeOptions = [
    // 'Household',
    // 'Personal',
    'Flexing',
    'Birthday/Anniversary',
    'Car maintanace',
    'Medical bills',
    'Wedding',
    'House furnishing',
    'School fees',
    'Side gig',
    'Others',
  ];

  const scrollViewRef = useRef('');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.dark,
              paddingBottom: 20,
            }}>
            Select loan purpose
          </Text>

          <Icon
            onPress={onRequestClose}
            name="close-outline"
            size={25}
            color="#465959"
            style={{
              padding: 20,
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />

          <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={true}
            ref={scrollViewRef}
            style={{
              paddingHorizontal: 25,
            }}>
            <View style={{marginTop: 20, paddingBottom: 20}}>
              {loanPurposeOptions.map((option, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onClick(option);
                    if (option.toLowerCase() != 'others') {
                      onRequestClose();
                    } else {
                      scrollViewRef.current.scrollToEnd();
                    }
                  }}
                  key={index}
                  style={{
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: '#EFEFEF',
                      elevation: 0.5,
                      marginRight: 15,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {loanPurpose == option && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: COLORS.dark,
                          borderRadius: 8,
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: COLORS.dark,
                    }}>
                    {option && option.toLowerCase() == 'others' ? (
                      <Text>
                        {option}{' '}
                        <Text
                          style={{
                            fontSize: 12,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: COLORS.grey,
                          }}>
                          (Kindly indicate below)
                        </Text>
                      </Text>
                    ) : (
                      option
                    )}
                  </Text>
                </TouchableOpacity>
              ))}
              <View>
                {loanPurpose != '' && loanPurpose.toLowerCase() == 'others' && (
                  // <Text>Inout Field</Text>
                  <>
                    <View style={[styles.customInput]}>
                      <TextInput
                        style={{
                          width: '100%',
                          paddingHorizontal: 16,
                          paddingVertical: 16,
                        }}
                        keyboardType="default"
                        placeholder="Enter loan reason here"
                        value={reason}
                        onChangeText={(text) => setReason(text)}
                        // onChangeText={(text) => setLoanPurpose(text)}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        onRequestClose();
                        setLoanPurpose(reason);
                        setReason('');
                      }}
                      style={[
                        styles.btn,
                        {
                          backgroundColor: COLORS.dark,
                        },
                      ]}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 10,
                          textTransform: 'uppercase',
                        }}>
                        Continue
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'CircularStd',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    maxHeight: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    // padding: 25,
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  btn: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 13,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
  },
});
