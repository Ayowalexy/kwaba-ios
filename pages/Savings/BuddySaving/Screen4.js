import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons} from '../../../util';
import ProgressBar from 'react-native-progress/Bar';

const Screen4 = ({navigation}) => {
  const [modalVisible, setVisible] = useState(false);
  const [numberOfBuddies, setNumberOfBuddies] = useState(3);
  const [targetAmount, setTargetAmount] = useState('2,500,000');
  const [allocatedAmount, setAllocatedAmount] = useState('625,000');
  const [amountLeft, setAmountLeft] = useState('1,875,000');
  return (
    <View style={designs.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900'}}
        color="#2A286A"
      />
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        style={{marginTop: 25}}>
        <Text style={[designs.boldText]}>Invite your buddy</Text>
        <Text
          style={{
            color: '#ADADAD',
            fontSize: 12,
            fontWeight: '600',
            lineHeight: 15,
            marginTop: 8,
          }}>
          An invite will be sent to any of your buddy{'\n'} you add to this
          saving plan.
        </Text>
        <View style={designs.buddySavingCard}>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontWeight: 'normal',
              fontSize: 10,
              lineHeight: 13,
              color: 'white',
              textAlign: 'center',
            }}>
            Target Amount
          </Text>
          <Text
            style={{
              fontFamily: 'Circular Std',
              fontWeight: 'bold',
              fontSize: 25,
              lineHeight: 32,
              color: 'white',
              textAlign: 'center',
              marginTop: 1,
            }}>
            ₦{targetAmount}
          </Text>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 169,
              height: 19,
              borderRadius: 10,
              backgroundColor: '#00000022',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginTop: 7,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 10,
                lineHeight: 16,
                fontWeight: 'normal',
                fontFamily: 'Poppins',
              }}>
              You are saving with{' '}
              <Text style={{color: '#00DC99', fontWeight: '700'}}>
                {numberOfBuddies} buddies
              </Text>
            </Text>
          </View>
          <View style={[designs.displayFlex, {marginTop: 15}]}>
            <Text
              style={{
                fontFamily: 'Poppins',
                fontWeight: 'normal',
                fontSize: 10,
                lineHeight: 13,
                color: 'white',
              }}>
              Allocated Amount:{' '}
              <Text style={{fontWeight: 'bold'}}>₦{allocatedAmount}</Text>
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins',
                fontWeight: 'normal',
                fontSize: 10,
                lineHeight: 13,
                color: 'white',
              }}>
              Amount left:{' '}
              <Text style={{fontWeight: 'bold'}}>₦{amountLeft}</Text>
            </Text>
          </View>
          <ProgressBar
            style={designs.progressBar}
            progress={0.3}
            color="#00DC99"
            unfilledColor="white"
            width={null}
          />
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 32,
          }}>
          <Image source={icons.addUser} />
          <Text
            style={{
              color: '#00DC99',
              fontFamily: 'Circular Std',
              fontSize: 15,
              lineHeight: 19,
              fontWeight: '700',
              marginLeft: 12,
            }}>
            Invite a buddy
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: '#EAEAEA',
            borderBottomWidth: 1,
            marginTop: 13,
          }}
        />
        <Text
          style={{
            fontFamily: 'Circular Std',
            fontWeight: 'bold',
            lineHeight: 13,
            fontSize: 12,
            color: '#ADADAD',
            marginTop: 8,
          }}>
          Buddies {`(${1} of ${4}) `}{' '}
        </Text>
        <View style={designs.buddyCard}>
          <View
            style={[
              designs.displayFlex,
              {marginTop: 0, marginLeft: 0, marginRight: 0},
            ]}>
            <View
              style={[
                designs.displayFlex,
                {
                  justifyContent: 'space-evenly',
                  marginTop: 0,
                  marginLeft: 0,
                  marginRight: 0,
                },
              ]}>
              <View style={designs.initials}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                    lineHeight: 19,
                  }}>
                  J
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    fontFamily: 'Circular Std',
                    fontWeight: 'bold',
                    lineHeight: 19,
                    fontSize: 15,
                    color: '#465969',
                  }}>
                  Johnson Amunez{'\n'}
                  <Text
                    style={{
                      fontFamily: 'Circular Std',
                      fontWeight: '600',
                      lineHeight: 15,
                      fontSize: 12,
                      color: '#BFBFBF',
                    }}>
                    dennis.mez@gmail.com
                  </Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Icon name="close-circle-outline" color="#D6D6D6" size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              designs.displayFlex,
              {
                marginTop: 22,
                marginLeft: 0,
                marginRight: 0,
                justifyContent: 'flex-start',
              },
            ]}>
            <View>
              <Text
                style={{
                  fontFamily: 'Circular Std',
                  fontWeight: '600',
                  lineHeight: 15,
                  fontSize: 12,
                  color: '#BFBFBF',
                }}>
                Allocated Amount
              </Text>
              <Text
                style={{
                  fontFamily: 'Circular Std',
                  fontWeight: 'bold',
                  lineHeight: 19,
                  fontSize: 15,
                  color: '#465969',
                }}>
                ₦{allocatedAmount}
              </Text>
            </View>
            <View style={{marginLeft: 74}}>
              <Text
                style={{
                  fontFamily: 'Circular Std',
                  fontWeight: '600',
                  lineHeight: 15,
                  fontSize: 12,
                  color: '#BFBFBF',
                }}>
                Monthly Saving
              </Text>
              <Text
                style={{
                  fontFamily: 'Circular Std',
                  fontWeight: 'bold',
                  lineHeight: 19,
                  fontSize: 15,
                  color: '#465969',
                }}>
                ₦52,083
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('BuddySaving5')}
          style={[designs.button, {marginTop: 30}]}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 14,
              lineHeight: 30,
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={designs.modal}>
          <View style={[designs.successModal, {height: 500}]}>
            <View
              style={[
                designs.displayFlex,
                {marginTop: 0, marginRight: 0, marginLeft: 0},
              ]}>
              <Icon
                onPress={() => setVisible(false)}
                name="arrow-back-outline"
                size={35}
                style={{fontWeight: '900'}}
                color="#2A286A"
              />
              <Icon
                style={{alignSelf: 'flex-end'}}
                onPress={() => setVisible(false)}
                name="close-outline"
                size={30}
                color="#465969"
              />
            </View>
            <Text
              style={{
                color: '#2A286A',
                fontFamily: 'CircularStd',
                fontWeight: 'bold',
                fontSize: 18,
                lineHeight: 23,
                marginTop: 14,
              }}>
              Enter your buddy details
            </Text>
            <TextInput
              style={[
                designs.textInput,
                {
                  marginTop: 16,
                  borderColor: '#ADADAD',
                  borderWidth: 1,
                  width: 350,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                },
              ]}
              placeholder="Full Name"
              keyboardType="default"
              placeholderTextColor="#ADADAD"
            />
            <TextInput
              style={[
                designs.textInput,
                {
                  marginTop: 16,
                  borderColor: '#ADADAD',
                  borderWidth: 1,
                  width: 350,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                },
              ]}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#ADADAD"
            />
            <View
              style={[
                designs.displayFlex,
                {marginTop: 24, marginLeft: 0, marginRight: 0},
              ]}>
              <View>
                <Text
                  style={{
                    color: '#2A286A',
                    fontFamily: 'CircularStd',
                    fontWeight: '600',
                    fontSize: 12,
                    lineHeight: 15,
                  }}>
                  Allocated Amount
                </Text>
                <View style={designs.small}>
                  <Text
                    style={{
                      fontFamily: 'Circular Std',
                      color: '#BFBFBF',
                      fontSize: 10,
                      lineHeight: 20,
                      fontWeight: '600',
                    }}>
                    Allocated Amount
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Circular Std',
                      color: '#000000',
                      fontSize: 16,
                      lineHeight: 30,
                      fontWeight: '600',
                    }}>
                    ₦625,000
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: '#2A286A',
                    fontFamily: 'CircularStd',
                    fontWeight: '600',
                    fontSize: 12,
                    lineHeight: 15,
                  }}>
                  Amount to save monthly
                </Text>
                <View style={designs.small}>
                  <Text
                    style={{
                      fontFamily: 'Circular Std',
                      color: '#BFBFBF',
                      fontSize: 10,
                      lineHeight: 20,
                      fontWeight: '600',
                    }}>
                    Saving amount
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Circular Std',
                      color: '#000000',
                      fontSize: 16,
                      lineHeight: 30,
                      fontWeight: '600',
                    }}>
                    ₦52,083
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[
                designs.button,
                {marginTop: 30, backgroundColor: '#2A286A', width: 350},
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 14,
                  lineHeight: 30,
                }}>
                INVITE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Screen4;
