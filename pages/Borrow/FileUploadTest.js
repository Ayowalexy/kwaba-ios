import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import CountrySelect from '../../components/countrySelect';
import Icon from 'react-native-vector-icons/Ionicons';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import { trashAlt } from '../../util/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import fileProgressReducer from '../../redux/reducers/documentUploadReducers';
import { setUploadProgress } from '../../redux/actions/documentUploadActions';
import RNFS from 'react-native-fs';
import axios from 'axios';


const FileUploadTest = ({navigation}) => {

    const requiredFiles = [
        {
            id: 2,
            title: 'Government Issued ID Card',
            isUploading: false,
            progress: 0,
            isUploaded: false
          },
      
        {
            id: 3,
            title: 'Work Identity ',
            isUploading: false,
            progress: 0,
            isUploaded: false
          },
         {
            id: 4,
            title: 'Passport Photo',
            isUploading: false,
            progress: 0,
            isUploaded: false
          },
         {
            id: 5,
            title: 'Employment Letter',
            isUploading: false,
            progress: 0,
            isUploaded: false
          }
]

    const getToken = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const token = JSON.parse(userData).token;
        return token;
      };

const dispatch = useDispatch();
const fileProgress = useSelector((state) => state.fileProgressReducer.fileProgress);


  const store = useSelector((state) => state);

//   console.log(store);

//   const handleSubmit = async() => {
//     const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
//     console.log(loanFormData);
//     navigation.navigate('UploadDocuments')
//   };

const selectOneFile = async (item) => {
try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    console.log('work', 
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
    const base64File = await RNFS.readFile(res.uri, 'base64');
    // console.log(base64File);
    const convertedFile = `data:${res.type},/${base64File}`

    const token = await getToken();
    const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
        headers: {'Content-Type': 'application/json', Authorization: token},
      });
      console.log(applicationIDCallRes.data.data.id);
    const applicationId = applicationIDCallRes.data.data.id;

      try {
        const response = await axios.post('http://67.207.86.39:8000/api/v1/application/documents/upload', {applicationId, file: convertedFile, document_type: item.id, file_name: item.title }, {
          headers: {'Content-Type': 'application/json', Authorization: token},
        });
        console.log(response);
      } catch (error) {
        console.log(error.response.data);
        
      }
    
    // dispatch(setUploadProgress(e.target))
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      console.log(err);
    }
  }
};
  


  return (
    <ScrollView style={[designs.container, {backgroundColor: '#F7F8FD'}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={20}
        style={{marginTop: 28, marginLeft: 25, fontWeight: '900'}}
        color= {COLORS.primary}
      />
        <View
          style={{
            marginVertical: 11,
            marginHorizontal: 16,
          }}>
          <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: 15
              },
            ]}>
            All Documents
          </Text>

            {requiredFiles.map((item, index) => (
              <View key={index} style={[designs.flexRow, {backgroundColor: COLORS.white, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 20, elevation: 6, marginBottom: 25}]}> 
              <View style={{flex: 1}}>
              <View style={[designs.flexRow, {marginBottom: 16, alignItems: 'center'}]}> 
                  <Image source={icons.featherFileText} style={{width: 17, height: 21, marginRight: 8}} />
                  <Text>{item.title}</Text>
             </View>
             <View style={designs.flexRow}> 
                 {!item.isUploading && <Image source={item.isUploaded == true? icons.group2116 : icons.group3743}  style={{width: 16, height: 16, marginRight: 12}}/> }
                 {item.isUploaded && <Text style={{color: COLORS.secondary, borderBottomWidth: 1, borderBottomColor: COLORS.secondary}}>Johnson_Bank-ST.pdf.PDF</Text>}
                 {item.isUploaded && <TouchableOpacity style={{marginLeft: 4, alignSelf: 'center'}}><Icon name= 'trash-outline' size={14} style={{color: COLORS.grey, width: 14, height: 14}}/></TouchableOpacity>}
                 {!item.isUploaded &&<Text style={{color: '#ADADAD'}}>No file uploaded</Text>}
              </View></View>
               <TouchableOpacity onPress={()=> selectOneFile(item)}><Image source={images.group3745} style={{width: 39, height: 39, alignSelf: 'flex-end', marginTop: 'auto', marginBottom: 'auto'}}/></TouchableOpacity>
              </View>
            ))}

            
          
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('RentalLoanOfferTest')} style={[designs.button, {backgroundColor: COLORS.secondary}]}><Text style={{color: COLORS.white, textAlign: 'center'}}>FINISH</Text></TouchableOpacity>
        
   </ScrollView>
  );
};

export default FileUploadTest;
