import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  Share,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {icons, images, COLORS, FONTS, designs} from '../../../util/index';

const widthtouse = Dimensions.get('window').width;

const Referral = ({navigation}) => {
  const referral_msg = `I use Kwaba to save and pay for my rent. Join with my link to get N1,000 towards your rent savings`;
  const [referralCode, setReferralCode] = useState('');

  const fetchReferralCode = async () => {
    const text = await Clipboard.getString();
  };

  const copyToClipboard = async () => {
    const referral_code = await getReferralCode();
    Clipboard.setString(referral_code);
    ToastAndroid.show('Referral code copied', ToastAndroid.SHORT);
  };

  const getReferralCode = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const referral_code = JSON.parse(userData).user.referral_code;
    console.log(referral_code);
    setReferralCode(referral_code);
    return referral_code;
  };

  useEffect(() => {
    getReferralCode();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${referral_msg}  | ${referralCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ScrollView
      style={[
        styles.container,
        {flex: 1, backgroundColor: '#F7F8FD', backgroundColor: '#9D98EC'},
      ]}>
      <Icon
        onPress={() => navigation.navigate('Home')}
        name="arrow-back-outline"
        size={25}
        style={{padding: 15, fontWeight: '900'}}
        color={COLORS.primary}
      />

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          // margin: 0,
          // backgroundColor: '#9D98EC',
          // borderRadius: 20,
          alignItems: 'center',
          padding: 20,
          paddingTop: 20,
          paddingBottom: 20,
          // transform: [{scaleX: 0.95}, {scaleY: 0.98}],
        }}>
        <Image
          source={images.referhomeimage}
          style={{
            width: '100%',
            height: 200,
            // marginTop: 45,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text
          style={[
            FONTS.largeTitleFontStyling,
            {color: COLORS.primary, marginTop: -35, fontSize: 20},
          ]}>
          Refer and Earn
        </Text>
        <Text
          style={[
            FONTS.body1FontStyling,
            {
              color: COLORS.white,
              // alignSelf: 'center',
              textAlign: 'center',
              // marginLeft: 40,
              // marginRight: 40,
              fontSize: 12,
              lineHeight: 20,
              paddingHorizontal: 40,
            },
          ]}>
          Earn N1,000 per referral when your friends and family save for their
          rent with Kwaba
        </Text>
        <View
          style={{
            backgroundColor: '#00000022',
            borderRadius: 13,
            // height: 26,
            paddingHorizontal: 5,
            marginTop: 20,
            width: '100%',
          }}>
          <Text
            // numberOfLines={1}
            style={[
              // FONTS.body1FontStyling,
              {
                color: '#FFE700',
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingHorizontal: 10,
              },
            ]}>
            Your friends also get N1,000 when they make their first savings
          </Text>
        </View>
        <Text
          style={[
            FONTS.h1FontStyling,
            {
              color: COLORS.primary,
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginTop: 20,
              fontSize: 16,
              marginLeft: 10,
            },
          ]}>
          Referral code
        </Text>

        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            // height: 90,
            // alignSelf: 'flex-start',
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginTop: 10,
            width: '100%',
          }}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={{
              backgroundColor: '#BAB5FF',
              height: 60,
              // width: '100%',
              flex: 1,
              // width: '70%',
              borderRadius: 10,
              // marginLeft: 10,
              color: COLORS.white,
              paddingHorizontal: 20,
              marginRight: 20,
              fontSize: 13,
            }}
            value={referralCode}
          />
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              // marginLeft: widthtouse / 20,
            }}
            onPress={copyToClipboard}>
            {/* <IconFA
              name="clone"
              size={20}
              color={COLORS.primary}
              style={{alignSelf: 'center'}}
            /> */}
            <Icon
              name="clipboard-outline"
              size={30}
              color={COLORS.primary}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            onShare();
          }}
          style={[
            {
              backgroundColor: '#00DC99',
              width: '100%',
              borderRadius: 10,
              // height: 70,
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
              fontSize: 14,
              fontFamily: 'CircularStd-Medium',
              fontWeight: '600',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            },
          ]}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              // lineHeight: 30,
              fontWeight: 'bold',
            }}>
            SHARE CODE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: 10}}
          onPress={() => {
            navigation.navigate('ReferralDetails');
          }}>
          <View
            style={{
              // height: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              // borderWidth: 1,
              padding: 5,
            }}>
            <Text
              style={[
                FONTS.h3FontStyling,
                {
                  color: COLORS.primary,
                  marginRight: 10,
                  fontSize: 14,
                },
              ]}>
              Your referral details
            </Text>

            <IconFA
              name="angle-right"
              size={20}
              color={COLORS.primary}
              style={{marginLeft: 10}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Referral;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
});
