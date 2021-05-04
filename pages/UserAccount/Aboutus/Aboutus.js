import React from 'react';
import { StyleSheet, Text, View,Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import {COLORS, FONTS, images,SIZES,icons,designs} from '../../../util/index';

const Aboutus = ({navigation}) => {
    return (

       <ScrollView>

        <View style={styles.container}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={25}
            style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
            color="#2A286A"
          />
          <Text
              style={[
                FONTS.h1FontStyling,
                {
                  color: '#2A286A',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  marginBottom: 15,
                  marginLeft: 16,
                },
              ]}>
             About us
          </Text>
           <View  style={styles.aboutussection}>
              <Text style={styles.aboutusText}>
                The easy way to save and pay for your rent. Kwaba helps you save towards your rent, 
                get rent top-ups and instant loans. Kwaba has your privacy at heart. 
                Our platform was built with Bank-grade security features.
                We work with PCIDSS compliant payment processors for the security of your data. 
                Your savings are overseen by our partners who are regulated at the highest standard of 
                compliance hence your funds are safe.
              </Text>
              <Text style={styles.contactusText}>
                Contact us
              </Text>
              <Text  style={styles.aboutusMinorText}>
                131A Eti-Osa way, Dolphin Estate, Ikoyi, Lagos - Nigeria 
              </Text>
              <Text  style={styles.aboutusMinorText}>
                hello@kwaba.ng
              </Text>
              <View style={styles.iconsSection}>
                <Image source={icons.instagram}  style={{height:24,width:24}}/>
                <Image source={icons.facebook}  style={{height:24,width:24}}/>
                <Image source={icons.whatsapp}  style={{height:24,width:24}}/>
                <Image source={icons.linkedin}  style={{height:24,width:24}}/>
                <Image source={icons.telegram}  style={{height:24,width:24}}/>
              </View>
              <Text  style={styles.aboutusMinorText}>
                www.kwaba.ng
              </Text>
              <Image
                 style={[ {marginTop: 0, width: 129,
                    height: 30,
                    marginLeft: 16,
                    marginTop: 89,}]}
                 source={images.kwabaLogoWithName}
               />
              <Text  style={[styles.aboutusMinorText,{color:COLORS.grey}]}>
                Copyright 2021. All Rights Reserved {'\n'}App Version 0.1
              </Text>
           </View>
        </View>
       </ScrollView> 
    )
}

export default Aboutus

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F7F8FD'
    },
    aboutussection:{
     flex:1,
     borderRadius:20,
     backgroundColor:COLORS.white,
     margin:20,
     flexDirection:'column'
    },
    aboutusText:{
     marginTop:25,
     marginLeft:36,
     marginRight:36,
     marginBottom:18,
     fontFamily: 'Circular Std',
     fontSize:16,
     color:COLORS.dark,
     fontWeight:'500'
     
    },
    aboutusMinorText:{
    marginTop:5,
    marginLeft:36,
    marginRight:36,
    marginBottom:18,
    fontFamily: 'Circular Std',
    fontSize:16,
    color:COLORS.dark,
        
    },
   contactusText:{
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.h1,
    lineHeight: 32,
    color: '#2A286A',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 36,
   },
  iconsSection:
  {
   flexDirection:'row',
   height:25,
   justifyContent:'space-evenly'

  }

})
