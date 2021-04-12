import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const Borrow = ({navigation}) => {
  const [existingApplication, setExistingApplication] = useState('')

  useEffect(() => {
    const getApplicationData =async ()=> {
      const getToken = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const token = JSON.parse(userData).token;
        return token;
      };
      const token = await getToken();
      try{
      
          const applicationIDCallRes = await axios.get('http://67.207.86.39:8000/api/v1/application/one', {
              headers: {'Content-Type': 'application/json', Authorization: token},
            });
            console.log(applicationIDCallRes.data.data.id);
          const applicationId = applicationIDCallRes.data.data.id;
        if (applicationId){
          setExistingApplication(applicationId);
          console.log('here', existingApplication);
        }
      }
      catch(error) {
        console.log(error.response.data)
      }
    };
        // console.log(error.response.data)
    getApplicationData()
  }, []);

  const getToken = async () => {
    const userData = await AsyncStorage.getItem('userData');
    const token = JSON.parse(userData).token;
    return token;
  };

  const handleRentalLoanClick=()=> {
    if (existingApplication !== ''){
   navigation.navigate('UploadDocuments')}
   else{
    navigation.navigate('RentalLoanForm1')
   } 
  }
  
 return (
    <View style={designs.container}>
        
      
      {/* < */}
        <ImageBackground source={images.borrowSectionBGI} style={designs.bgImage} imageStyle={{
    resizeMode: "stretch", 
  }}>
      <View style={designs.contentView}>
          
          <View style={designs.textView}>
                <Text style={[FONTS.largeTitleFontStyling, designs.bigText]}>
                We can help you with some extra money
                </Text>
                <Text style={[FONTS.body2FontStyling, designs.smallHeaderText]}>
                Whether you need extra money to balance your rent or a quick loan to sort out personal stuff, we gat you!
                </Text>
          </View>
          </View>
        
        <View>
            <TouchableOpacity
              onPress={handleRentalLoanClick}
              activeOpacity={0.7}
              style={[designs.button, {marginBottom: 13}]}> 
              <View style={designs.buttonInnerView}>
                  <Text style={designs.buttonText}> Rental Loan</Text>
                  <Icon name="arrow-forward-outline" size={16} color= {COLORS.secondary} style={{fontWeight: '900'}}/>
              </View>              
            </TouchableOpacity>

            
         
            <TouchableOpacity
              onPress={() => navigation.navigate('EmergencyLoanRequestDashBoard')}
              style={designs.button}>
              <View style={designs.buttonInnerView}>
                  <Text style={designs.buttonText}> Emergency Funds </Text>
                  <Icon name="arrow-forward-outline" size={16} color= {COLORS.secondary} style={{fontWeight: '900'}} />
              </View>  
            </TouchableOpacity>   
            </View>   
            </ImageBackground>
      
      
    </View>
  );
};

export default Borrow;
