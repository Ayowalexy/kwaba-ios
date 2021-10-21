import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';

const {width, height} = Dimensions.get('window');

export default function BankTransferModal(props) {
  const {onRequestClose, visible} = props;
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 30,
              height: height - 40,
              backgroundColor: '#F7F8FD',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                onPress={onRequestClose}
                name="arrow-back-outline"
                style={{marginRight: 20, fontSize: 25, color: COLORS.primary}}
              />
              <Text style={[styles.headline]}>Bank Transfer</Text>
            </View>

            <View
              style={{
                paddingVertical: 30,
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                Please make a bank transfer to the account number below.
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: COLORS.primary,
                  marginVertical: 10,
                  lineHeight: 20,
                  opacity: 0.8,
                  //   paddingHorizontal: 5,
                }}>
                The account number is unique to your Kwaba account
              </Text>

              {/* <Text
                style={{paddingVertical: 20, fontSize: 14, color: COLORS.primary}}>
                1. Copy the account details provided below
              </Text> */}

              <View
                style={{
                  width: '100%',
                  //   borderWidth: 1,
                  //   borderColor: COLORS.secondary,
                  // paddingVertical: 30,
                  // paddingHorizontal: 30,
                  backgroundColor: '#46596920',
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    // marginTop: 0,
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    borderBottomColor: '#46596920',
                    borderBottomWidth: 1,
                  }}>
                  <View style={[styles.flex]}>
                    <View>
                      <Text style={{fontSize: 14, color: COLORS.dark}}>
                        Bank Name
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.dark,
                          fontWeight: 'bold',
                        }}>
                        Paga
                      </Text>
                    </View>

                    <TouchableOpacity style={[styles.copy]}>
                      <Icon
                        // onPress={onRequestClose}
                        name="copy"
                        style={{
                          fontSize: 20,
                          color: COLORS.dark,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    // marginTop: 20,
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    borderBottomColor: '#46596920',
                    borderBottomWidth: 1,
                  }}>
                  <View style={[styles.flex]}>
                    <View>
                      <Text style={{fontSize: 14, color: COLORS.dark}}>
                        Bank Account Number
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.dark,
                          fontWeight: 'bold',
                        }}>
                        0094552107
                      </Text>
                    </View>

                    <TouchableOpacity style={[styles.copy]}>
                      <Icon
                        // onPress={onRequestClose}
                        name="copy"
                        style={{
                          fontSize: 20,
                          color: COLORS.dark,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    // marginTop: 20,
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                  }}>
                  <View style={[styles.flex]}>
                    <View>
                      <Text style={{fontSize: 14, color: COLORS.dark}}>
                        Bank Account Name
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.dark,
                          fontWeight: 'bold',
                        }}>
                        Joshua Nwosu
                      </Text>
                    </View>

                    <TouchableOpacity style={[styles.copy]}>
                      <Icon
                        // onPress={onRequestClose}
                        name="copy"
                        style={{
                          fontSize: 20,
                          color: COLORS.dark,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // backgroundColor: '#F7F8FD',
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingVertical: 20,
    // paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 50,
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    // marginTop: 10,
    // marginBottom: 20,
    paddingLeft: 10,
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  copy: {
    backgroundColor: '#46596920',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
