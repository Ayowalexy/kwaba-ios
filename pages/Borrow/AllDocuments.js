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

const AllDocuments = ({navigation, route}) => {

  const response = route.params;
  console.log(response);

  const requiredFiles = [
    {
      id: 1,
      title: 'Government Issued ID Card',
      isUploading: false,
      isUploaded: false
    },

    {
      id: 2,
      title: 'Work Identity ',
      isUploading: false,
      isUploaded: false
    },
    {
      id: 3,
      title: 'Passport Photo',
      isUploading: false,
      isUploaded: false
    },
    {
      id: 4,
      title: 'Employment Letter',
      isUploading: false,
      isUploaded: false
    },
  ];

  const [accommodationStatus, setAccommodationStatus] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const store = useSelector((state) => state);

  console.log(store);

  const handleSubmit = async() => {
    const loanFormData = await AsyncStorage.getItem('rentalLoanForm');
    console.log(loanFormData);
    navigation.navigate('UploadDocuments')
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

         

            <View style={[designs.flexRow, {backgroundColor: COLORS.white, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 20, elevation: 6, marginBottom: 25}]}> 
            <View style={{flex: 1}}>
            <View style={[designs.flexRow, {marginBottom: 16, alignItems: 'center'}]}> 
                <Image source={icons.featherFileText} style={{width: 17, height: 21, marginRight: 8}} />
                <Text>Bank Statement</Text>
           </View>
           <View style={designs.flexRow}> 
               <Image source={response.status == 201? icons.group2116 : icons.group3743} style={{width: 16, height: 16, marginRight: 12}}/> 
               <Text style={{color: COLORS.secondary, borderBottomWidth: 1, borderBottomColor: COLORS.secondary}}>Johnson_Bank-ST.pdf.PDF</Text>
               <TouchableOpacity style={{marginLeft: 4, alignSelf: 'center'}}><Icon name= 'trash-outline' size={14} style={{color: COLORS.grey, width: 14, height: 14}}/></TouchableOpacity>
            </View></View>
             <TouchableOpacity><Image source={images.group3745} style={{width: 39, height: 39, alignSelf: 'flex-end', marginTop: 'auto', marginBottom: 'auto'}}/></TouchableOpacity>
            </View>

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
               <TouchableOpacity><Image source={images.group3745} style={{width: 39, height: 39, alignSelf: 'flex-end', marginTop: 'auto', marginBottom: 'auto'}}/></TouchableOpacity>
              </View>
            ))}
           
          
        </View>

        <TouchableOpacity onPress={handleSubmit} style={[designs.button, {backgroundColor: COLORS.secondary}]}><Text style={{color: COLORS.white, textAlign: 'center'}}>FINISH</Text></TouchableOpacity>
        
   </ScrollView>
  );
};

export default AllDocuments;
