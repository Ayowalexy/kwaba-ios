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

const UploadBankStatementDocument = ({navigation}) => {
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
          paddingHorizontal: 20,
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
        <View style={{flex: 1, marginTop: 10}}>
          <Text
            style={[
              FONTS.body1FontStyling,
              {
                color: COLORS.dark,
                marginBottom: 4,
                fontSize: 14,
                fontWeight: 'bold',
              },
            ]}>
            Bank Statements
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.dark,
            }}>
            Upload at least 6 months bank Statement
          </Text>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '100%',
                minHeight: 20,
                marginTop: 10,
                borderWidth: 2,
                borderRadius: 10,
                borderStyle: 'dashed',
                // borderColor: COLORS.dark,
                borderColor: '#ADADAD',
                padding: 20,
              }}>
              <TouchableOpacity
                style={[
                  designs.button,
                  {
                    backgroundColor: COLORS.secondary,
                    borderRadius: 5,
                    marginBottom: 0,
                  },
                ]}>
                <Text
                  style={{
                    color: COLORS.white,
                    textAlign: 'center',
                    // textTransform: 'uppercase',
                    fontWeight: 'normal',
                    fontSize: 12,
                  }}>
                  Choose a File
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: '100%',
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderStyle: 'solid',
                borderColor: '#ADADAD',
                paddingHorizontal: 20,
                paddingVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: '80%',
                  fontSize: 16,
                  color: '#ADADAD',
                }}>
                Connect bank account via mobile/internet banking
              </Text>
              <Icon
                name="arrow-forward-outline"
                size={20}
                style={{
                  fontWeight: 'bold',
                }}
                color={'#ADADAD'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={[designs.button, {backgroundColor: COLORS.secondary}]}>
            <Text
              style={{
                color: COLORS.white,
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadBankStatementDocument;
