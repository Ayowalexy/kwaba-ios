import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {icons, images} from '../../../util/index';
import QuickSaveModal from '../../../components/QuickSaveModal';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default function BuddySavingDashBoard({navigation}) {
  const [activeTab, setActiveTab] = useState(1);
  const [openQuickSave, setOpenQuickSave] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [progress, setProgress] = useState(75);

  return (
    <View style={[designs.container, {paddingLeft: 0, paddingRight: 0}]}>
      <Icon
        onPress={() => navigation.navigate('SavingsHome')}
        name="arrow-back-outline"
        size={35}
        style={{fontWeight: '900', marginLeft: 16}}
        color="#2A286A"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
        <Text
          style={[
            designs.boldText,
            {marginTop: 15, fontSize: 25, lineHeight: 32, marginLeft: 16},
          ]}>
          Buddy Saving{' '}
          <Text
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: '#ADADAD',
            }}>
            2021 Rent
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            color: '#ADADAD',
            lineHeight: 15,
            marginLeft: 16,
          }}>
          Weds, 15 Oct
        </Text>
        <ImageBackground
          style={designs.soloSavingCard}
          source={images.soloSavingsCard}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 23,
            }}>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 19,
                color: 'white',
                fontWeight: '600',
                marginTop: 19,
              }}>
              Buddy Saving Balance
            </Text>
            <TouchableOpacity onPress={() => setOpenQuickSave(true)}>
              <Image style={{width: 43, height: 43}} source={icons.addIcon} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 23,
            }}>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 38,
                color: 'white',
                fontWeight: 'bold',
                marginRight: 5,
              }}>
              ₦2,0007,000.00
            </Text>
            <Image style={{width: 13, height: 15}} source={icons.lock} />
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 6,
              paddingRight: 26,
              paddingLeft: 23,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: 128,
                height: 19,
                borderRadius: 10,
                backgroundColor: '#9D98EC',
                opacity: 1,
              }}>
              <View
                style={{
                  backgroundColor: '#00DC99',
                  height: 8,
                  width: 8,
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  color: '#2A286A',
                  fontSize: 10,
                  lineHeight: 13,
                  fontWeight: '700',
                  fontFamily: 'Circular Std',
                }}>
                You guys are doing great
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'CircularStd',
                    fontSize: 10,
                    fontWeight: '700',
                    lineHeight: 13,
                    color: 'white',
                  }}>
                  View savings details
                </Text>
                <Icon name="chevron-forward" color="white" size={15} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={designs.fadedBottom}>
            <View>
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 15,
                  color: 'white',
                  fontWeight: '600',
                }}>
                Interest Earned
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 15,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                ₦7,000.00
              </Text>
            </View>
            <AnimatedCircularProgress
              size={100}
              width={10}
              rotation={0}
              style={designs.circularProgress}
              fill={progress}
              tintColor="#FFE700"
              backgroundColor="#2A286A">
              {(fill) => (
                <View
                  style={{
                    backgroundColor: '#2A286A',
                    height: 100,
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'CircularStd',
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'white',
                      lineHeight: 27,
                      textAlign: 'center',
                    }}>
                    {progress}%
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'CircularStd',
                      fontSize: 10,
                      fontWeight: '600',
                      color: 'white',
                      lineHeight: 14,
                      textAlign: 'center',
                    }}>
                    achieved
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
            {/* <ImageBackground
              style={designs.circularProgress}
              source={images.darkPurpleCircle}>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    lineHeight: 15,
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  0%
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    lineHeight: 15,
                    color: 'white',
                    fontWeight: '600',
                  }}>
                  achieved
                </Text>
              </View>
            </ImageBackground> */}

            <View>
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 15,
                  color: 'white',
                  fontWeight: '600',
                }}>
                Savings Target
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 15,
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                ₦2,500,000.00
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={designs.faces}>
          <View>
            <Text
              style={{
                fontFamily: 'Circular Std',
                fontSize: 10,
                lineHeight: 13,
                fontWeight: '600',
                color: '#2A286A',
              }}>
              You have saved
            </Text>
            <Text
              style={{
                fontFamily: 'Circular Std',
                fontSize: 15,
                lineHeight: 19,
                fontWeight: 'bold',
                color: '#2A286A',
              }}>
              ₦425,000
            </Text>
          </View>
          <View
            style={[
              designs.displayFlex,
              {
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: 0,
                marginLeft: 5,
                marginRight: 0,
              },
            ]}>
            <Image style={{width: 31, height: 31}} source={images.ellipse96} />
            <Image style={{width: 31, height: 31}} source={images.ellipse116} />
            <Image style={{width: 31, height: 31}} source={images.ellipse117} />
          </View>
        </View>
        <ScrollView
          style={{marginTop: 30}}
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity>
            <View style={designs.whiteCard}>
              <Image style={{width: 52, height: 52}} source={icons.invite} />
              <Text
                style={{
                  fontFamily: 'Circular Std',
                  fontSize: 18,
                  lineHeight: 23,
                  fontWeight: 'bold',
                  color: '#2A286A',
                  marginTop: 10,
                }}>
                Invite
              </Text>
              <Text
                style={{
                  color: '#ADADAD',
                  fontFamily: 'Circular Std',
                  fontSize: 10,
                  lineHeight: 13,
                  fontWeight: '700',
                }}>
                Invite your friends,family{'\n'}or to save with you
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={designs.whiteCard}>
              <Image style={{width: 52, height: 52}} source={icons.topUp} />
              <Text
                style={{
                  fontFamily: 'Circular Std',
                  fontSize: 18,
                  lineHeight: 23,
                  fontWeight: 'bold',
                  color: '#2A286A',
                  marginTop: 10,
                }}>
                Rent Top-up
              </Text>
              <Text
                style={{
                  color: '#ADADAD',
                  fontFamily: 'Circular Std',
                  fontSize: 10,
                  lineHeight: 13,
                  fontWeight: '700',
                }}>
                Let your family, friends{'\n'}assist you with your rent
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={designs.whiteCard}>
              <Image
                style={{width: 52, height: 52}}
                source={icons.instantLoan}
              />
              <Text
                style={{
                  fontFamily: 'Circular Std',
                  fontSize: 18,
                  lineHeight: 23,
                  fontWeight: 'bold',
                  color: '#2A286A',
                  marginTop: 10,
                }}>
                Instant Loan
              </Text>
              <Text
                style={{
                  color: '#ADADAD',
                  fontFamily: 'Circular Std',
                  fontSize: 10,
                  lineHeight: 13,
                  fontWeight: '700',
                }}>
                Access instant loans{'\n'}against your rent savings
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={designs.transactions}>
          <Text style={[designs.boldText, {fontSize: 18, lineHeight: 23}]}>
            My Transactions
          </Text>
          <View
            style={[
              designs.displayFlex,
              {
                marginTop: 11,
                marginLeft: 0,
                marginRight: 0,
                justifyContent: 'center',
                width: 380,
                height: 32,
                borderRadius: 5,
                backgroundColor: '#F7F8FD',
              },
            ]}>
            <TouchableOpacity
              onPress={() => setActiveTab(1)}
              style={[
                designs.transactionTab,
                {backgroundColor: activeTab == 1 ? '#9D98EC' : '#F7F8FD'},
              ]}>
              <Text
                style={{
                  color: activeTab == 1 ? 'white' : '#BFBFBF',
                  fontSize: 12,
                  lineHeight: 15,
                  fontWeight: '700',
                  fontFamily: 'Circular Std',
                }}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab(2)}
              style={[
                designs.transactionTab,
                {backgroundColor: activeTab == 2 ? '#9D98EC' : '#F7F8FD'},
              ]}>
              <Text
                style={{
                  color: activeTab == 2 ? 'white' : '#BFBFBF',
                  fontSize: 12,
                  lineHeight: 15,
                  fontWeight: '700',
                  fontFamily: 'Circular Std',
                }}>
                Savings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab(3)}
              style={[
                designs.transactionTab,
                {backgroundColor: activeTab == 3 ? '#9D98EC' : '#F7F8FD'},
              ]}>
              <Text
                style={{
                  color: activeTab == 3 ? 'white' : '#BFBFBF',
                  fontSize: 12,
                  lineHeight: 15,
                  fontWeight: '700',
                  fontFamily: 'Circular Std',
                }}>
                Withdrawal
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: '#BFBFBF',
              borderBottomWidth: 1,
              marginTop: 10,
            }}
          />
          <View
            style={{marginTop: 40, marginRight: 'auto', marginLeft: 'auto'}}>
            <Image
              style={{
                width: 62,
                height: 78,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              source={images.fileImage}
            />
            <Text
              style={{
                marginTop: 13,
                color: '#ADADAD',
                fontSize: 12,
                lineHeight: 15,
                fontWeight: '700',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              No transaction yet
            </Text>
            <TouchableOpacity
              onPress={() => setOpenQuickSave(true)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
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
                Quick save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <QuickSaveModal
        onRequestClose={() => setOpenQuickSave(false)}
        visible={openQuickSave}
        openSuccessModal={() => {
          setSuccessModal(true);
          setOpenQuickSave(false);
        }}
      />
      <Modal visible={successModal} animationType="fade" transparent={true}>
        <View style={designs.modal}>
          <View style={designs.successModal}>
            <Icon
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSuccessModal(false)}
              name="close-outline"
              size={30}
              color="#465969"
            />
            <Image source={icons.tick} />
            <Text style={[designs.boldText, {marginTop: 45, fontSize: 22}]}>
              You are good to go
            </Text>
            <Text
              style={{
                color: '#ADADAD',
                fontSize: 14,
                lineHeight: 15,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              Quick save was successful
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate('SoloSavingDashBoard');
              }}
              style={[designs.button, {marginTop: 55, width: 340}]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 14,
                  lineHeight: 30,
                }}>
                DONE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
