import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images} from '../util';
import NumberFormat from './NumberFormat';
import {
  currencyFormat,
  numberWithCommas,
  unFormatNumber,
  formatNumber,
} from '../util/numberFormatter';

export default function QuickSaveModal(props) {
  const {onRequestClose, visible, openSuccessModal} = props;
  const [start, setStart] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [amount, setAmount] = useState('');
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={[
                styles.displayFlex,
                {justifyContent: 'space-between', width: '100%'},
              ]}>
              {start ? (
                <Icon
                  onPress={() =>
                    proceed ? setProceed(false) : setStart(false)
                  }
                  name="arrow-back-outline"
                  size={20}
                  style={{fontWeight: '900'}}
                  color="#2A286A"
                />
              ) : (
                <Text
                  style={{
                    color: '#2A286A',
                    fontFamily: 'CircularStd',
                    fontWeight: 'bold',
                  }}>
                  Quick Save
                </Text>
              )}
              <Icon
                onPress={onRequestClose}
                name="close-outline"
                size={30}
                color="#465969"
              />
            </View>

            {!start && (
              <Text
                style={{
                  fontFamily: 'CircularStd',
                  color: '#465969',
                  fontWeight: '600',
                  marginTop: 10,
                  alignSelf: 'flex-start',
                }}>
                Where do you want to save to?
              </Text>
            )}
            {!start && (
              <TouchableOpacity
                onPress={() => setStart(true)}
                style={[styles.btn, {backgroundColor: '#F7F8FD'}]}>
                <View
                  style={[
                    styles.displayFlex,
                    {justifyContent: 'space-between'},
                  ]}>
                  <View style={styles.displayFlex}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={images.maskGroup15}
                    />
                    <Text
                      style={{
                        color: '#2A286A',
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      Solo Saving
                    </Text>
                  </View>
                  <Icon
                    style={{
                      color: '#2A286A',
                      backgroundColor: 'white',
                      borderRadius: 50,
                    }}
                    name="arrow-forward"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            )}
            {!start && (
              <TouchableOpacity
                onPress={() => setStart(true)}
                style={[
                  styles.btn,
                  {backgroundColor: '#F7F8FD', marginBottom: 20},
                ]}>
                <View
                  style={[
                    styles.displayFlex,
                    {justifyContent: 'space-between'},
                  ]}>
                  <View style={styles.displayFlex}>
                    <Image
                      style={{height: 50, width: 50}}
                      source={images.maskGroup14}
                    />
                    <Text
                      style={{
                        color: '#2A286A',
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      Buddy Saving
                    </Text>
                  </View>
                  <Icon
                    style={{
                      color: '#2A286A',
                      backgroundColor: 'white',
                      borderRadius: 50,
                    }}
                    name="arrow-forward"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            )}
            {start && (
              <View>
                {!proceed && (
                  <Text
                    style={{
                      color: '#2A286A',
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    How much?
                  </Text>
                )}
                {!proceed && (
                  // <TextInput
                  //   style={styles.textInput}
                  //   placeholder="Amount"
                  //   keyboardAppearance="dark"
                  //   keyboardType="number-pad"
                  //   placeholderTextColor="#BFBFBF"
                  // />
                  <NumberFormat
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                  />
                )}
                {!proceed && (
                  <TouchableOpacity
                    onPress={() => setProceed(true)}
                    style={[
                      styles.btn,
                      styles.displayFlex,
                      {backgroundColor: '#2A286A', marginBottom: 16},
                    ]}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      PROCEED
                    </Text>
                  </TouchableOpacity>
                )}
                {proceed && (
                  <View>
                    <View
                      style={[
                        styles.displayFlex,
                        {justifyContent: 'space-between'},
                      ]}>
                      <Text
                        style={{
                          color: '#2A286A',
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginTop: 10,
                        }}>
                        {/* ₦10,000.00 */}
                        {''}₦{formatNumber(unFormatNumber(amount))}
                      </Text>
                      <Text
                        style={{
                          color: '#2A286A',
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginTop: 10,
                          marginRight: 16,
                        }}>
                        Solo Saving
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.displayFlex,
                        {justifyContent: 'space-between'},
                      ]}>
                      <Text
                        style={{
                          color: '#BFBFBF',
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginTop: 10,
                        }}>
                        Payment method - Card
                      </Text>
                      <TouchableOpacity>
                        <Text
                          style={{
                            color: '#00DC99',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginRight: 16,
                          }}>
                          Change
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.creditCard}>
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
                      onPress={openSuccessModal}
                      style={[
                        styles.btn,
                        styles.displayFlex,
                        {backgroundColor: '#2A286A', marginBottom: 16},
                      ]}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: 'bold',
                          // fontWeight: '800',
                        }}>
                        NEXT
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    padding: 20,
  },
  btn: {
    width: '100%',
    // height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 1,
    paddingVertical: 20,
  },
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    padding: 16,
    fontSize: 18,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    borderColor: '#ADADAD',
    borderWidth: 1,
    marginTop: 15,
  },
  creditCard: {
    width: '100%',
    height: 51,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 19,
  },
});
