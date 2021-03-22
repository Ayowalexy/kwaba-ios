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

const Borrow = ({navigation}) => {
  
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
              onPress={() => navigation.navigate('RentalLoanForm1')}
              activeOpacity={0.7}
              style={[designs.button, {marginBottom: 13}]}> 
              <View style={designs.buttonInnerView}>
                  <Text style={designs.buttonText}> Rental Loan</Text>
                  <Icon name="arrow-forward-outline" size={16} color= {COLORS.secondary} style={{fontWeight: '900'}}/>
              </View>              
            </TouchableOpacity>

            
         
            <TouchableOpacity
              onPress={() => navigation.navigate('FileUploadTest')}
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
