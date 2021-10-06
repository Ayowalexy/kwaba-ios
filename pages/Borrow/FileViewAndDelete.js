import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';

export const FileViewAndDelete = ({navigation}) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const getUploadedDocuments = async () => {
      const token = await getToken();
      try {
        const uploadedDocumentsRes = await axios.get(
          'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/documents',
          {
            headers: {'Content-Type': 'application/json', Authorization: token},
          },
        );
        console.log(uploadedDocumentsRes);
        setDocuments(uploadedDocumentsRes.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUploadedDocuments();
  }, []);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const selectOneFile = async (item) => {
    const token = await getToken();
    try {
      const response = await axios.delete(
        'https://kwaba-main-api-3-cp4jm.ondigitalocean.app/api/v1/application/document/delete',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          data: {
            id: item.id,
          },
        },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      {documents.map((item, index) => (
        <View
          key={index}
          style={[
            designs.flexRow,
            {
              backgroundColor: COLORS.white,
              borderRadius: 10,
              paddingHorizontal: 18,
              paddingVertical: 20,
              elevation: 6,
              marginBottom: 25,
            },
          ]}>
          <View style={{flex: 1}}>
            <View
              style={[
                designs.flexRow,
                {marginBottom: 16, alignItems: 'center'},
              ]}>
              <Image
                source={icons.featherFileText}
                style={{width: 17, height: 21, marginRight: 8}}
              />
              <Text>{item.title}</Text>
            </View>
            <View style={designs.flexRow}>
              {!item.isUploading && (
                <Image
                  source={
                    item.isUploaded == true ? icons.group2116 : icons.group3743
                  }
                  style={{width: 16, height: 16, marginRight: 12}}
                />
              )}
              {item.isUploaded && (
                <Text
                  style={{
                    color: COLORS.secondary,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.secondary,
                  }}>
                  Johnson_Bank-ST.pdf.PDF
                </Text>
              )}
              {item.isUploaded && (
                <TouchableOpacity style={{marginLeft: 4, alignSelf: 'center'}}>
                  <Icon
                    name="trash-outline"
                    size={14}
                    style={{color: COLORS.grey, width: 14, height: 14}}
                  />
                </TouchableOpacity>
              )}
              {!item.isUploaded && !item.isUploading && (
                <Text style={{color: '#ADADAD'}}>No file uploaded</Text>
              )}
              {item.isUploading && (
                <View style={{flex: 1, marginRight: 20}}>
                  <View
                    style={[
                      designs.flexRow,
                      {justifyContent: 'space-between', paddingHorizontal: 3},
                    ]}>
                    <Text style={{color: COLORS.grey}}>Johnson_Bank Id</Text>
                    <Text
                      style={{fontWeight: 'bold'}}>{`${item.progress}%`}</Text>
                  </View>
                  <ProgressBar
                    style={{borderColor: 'transparent', height: 5}}
                    progress={item.progress}
                    color={COLORS.secondary}
                    unfilledColor={COLORS.grey}
                    width={null}
                  />
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={() => selectOneFile(item)}>
            <Image
              source={images.group3745}
              style={{
                width: 39,
                height: 39,
                alignSelf: 'flex-end',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => navigation.navigate('PostPaymentForm1')}
        style={[designs.button, {backgroundColor: COLORS.secondary}]}>
        <Text style={{color: COLORS.white, textAlign: 'center'}}>FINISH</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
