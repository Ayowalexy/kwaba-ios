import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images, icons} from '../../util/index';

const Profile = ({navigation}) => {
  const [tab, setTab] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: '#F7F8FD'}}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingHorizontal: 20, paddingVertical: 10}}
        color={COLORS.primary}
      />
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.primary,
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}>
          Profile
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              borderBottomColor: '#ADADAD50',
              borderBottomWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {['Personal', 'Employment', 'Security'].map((value, index) => (
              <TouchableOpacity
                onPress={() => setTab(index)}
                key={index}
                style={{
                  backgroundColor: '#F7F8FD',
                  width: '33.33%',
                  textAlign: 'center',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  paddingVertical: 12,
                  borderLeftWidth: index == 1 ? 1 : 0,
                  borderRightWidth: index == 1 ? 1 : 0,
                  borderColor: '#EAEAEA',

                  backgroundColor: tab == index ? COLORS.light : '#F7F8FD',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: tab == index ? '#FFF' : '#BFBFBF',
                  }}>
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: '#F7F8FD',
                  borderRadius: 100,
                }}></View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: COLORS.secondary,
                  }}>
                  Tap to change picture
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 20, marginVertical: 10}}>
              <View style={[styles.customInput, {padding: 0}]}>
                <TextInput
                  style={{
                    width: '100%',
                    paddingLeft: 20,
                    paddingVertical: 16,
                    fontSize: 14,
                    fontWeight: '400',
                  }}
                  placeholder="First Name"
                  placeholderTextColor="#ADADAD"
                  keyboardType="number-pad"
                />
              </View>
              <View style={[styles.customInput, {padding: 0}]}>
                <TextInput
                  style={{
                    width: '100%',
                    paddingLeft: 20,
                    paddingVertical: 16,
                    fontSize: 14,
                    fontWeight: '400',
                  }}
                  placeholder="Last Name"
                  placeholderTextColor="#ADADAD"
                  keyboardType="number-pad"
                />
              </View>

              <TouchableOpacity
                style={styles.customInput}
                // onPress={() => {
                //   setVisible(!visible);
                // }}
              >
                <Text style={{fontWeight: '400', color: '#ADADAD'}}>
                  Gender
                </Text>
                <Icon
                  name="chevron-down-outline"
                  size={20}
                  style={{fontWeight: 'bold', color: '#ADADAD'}}
                  // color={COLORS.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.customInput}
                // onPress={() => {
                //   setVisible(!visible);
                // }}
              >
                <Text style={{fontWeight: '400', color: '#ADADAD'}}>
                  Date of Birth
                </Text>
                <Icon
                  name="calendar"
                  size={20}
                  style={{fontWeight: 'bold', color: '#ADADAD'}}
                  // color={COLORS.primary}
                />
              </TouchableOpacity>
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: COLORS.primary,
                    }}>
                    Address
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: COLORS.secondary,
                      }}>
                      Change address
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.customInput, {padding: 0}]}>
                  <TextInput
                    editable={false}
                    style={{
                      width: '100%',
                      paddingLeft: 20,
                      paddingVertical: 16,
                      fontSize: 14,
                      fontWeight: '400',
                    }}
                    placeholder="15 Lawal street, Iyana Ipaja, Lagos, Nigeria"
                    placeholderTextColor="#ADADAD"
                    keyboardType="default"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setConfirmModalVisible(!confirmModalVisible);
                }}
                // disabled={!isError()}
                style={[
                  styles.btn,
                  {
                    backgroundColor: '#00DC99',
                    width: '100%',
                    borderRadius: 10,
                    marginTop: 20,
                    // opacity: isError() ? 0 : 1,
                  },
                ]}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    lineHeight: 30,
                    fontWeight: 'bold',
                  }}>
                  SAVE CHANGES
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#ADADAD50',
    elevation: 0.2,
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },

  btn: {
    padding: 15,
    borderRadius: 10,
    // marginTop: 20,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
});
