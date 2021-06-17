import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplicationProgress = ({navigation}) => {
  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', padding: 15, paddingVertical: 10}}
        color={COLORS.primary}
      />
      <View
        style={{
          height: '100%',
          paddingHorizontal: 15,
          flex: 1,
        }}>
        <Text
          style={[
            {
              color: '#2A286A',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 18,
            },
          ]}>
          Rent Top-up
        </Text>
        <View
          style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
          <Image
            source={images.group3693}
            style={designs.uploadDocumentImage}
          />
          <Text
            style={{
              color: '#2A286A',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Processing application
          </Text>
          <Text
            style={{
              width: 300,
              color: '#ADADAD',
              textAlign: 'center',
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 10,
            }}>
            To fast track the decision making process, please upload other
            required documents.
          </Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UploadBankStatementDocument')}
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text
              style={{
                color: COLORS.white,
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              Upload Documents
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ApplicationProgress;
