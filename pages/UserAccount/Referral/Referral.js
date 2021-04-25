import React,{useEffect,useState} from 'react';
import { Image, StyleSheet, Text, View,Dimensions, TextInput ,TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {icons, images,COLORS, FONTS,designs} from '../../../util/index';

const widthtouse=Dimensions.get('window').width;



const Referral = () => {

    const [referralCode, setReferralCode] = useState('');


    const fetchReferralCode = async () => {
        const text = await Clipboard.getString();
        
      };
    

      const copyToClipboard  = async () => {

        const referral_code =await getReferralCode();
        Clipboard.setString(referral_code);
      };

      const getReferralCode = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const referral_code = JSON.parse(userData).user.referral_code;
        console.log(referral_code);
        setReferralCode(referral_code);
        return referral_code;
      };

    useEffect(()=>{
        getReferralCode();
    },[])
    return (
        <View style={{flex:1,backgroundColor:'#F7F8FD'}}>
            <View style={{flex:1,flexDirection:'column',margin:20,backgroundColor:'#9D98EC',borderRadius:20,alignItems:'center'}}>
               <Image  source={images.referhomeimage} style={{width:320,height:260,marginTop:45,resizeMode:'contain',alignSelf:'center'}} />
               <Text style={[FONTS.largeTitleFontStyling,{color:COLORS.primary,marginTop:-35}]}>Refer and Earn</Text>
               <Text style={[FONTS.body1FontStyling,{color:COLORS.white,alignSelf:'center',textAlign:'center',marginLeft:40,marginRight:40}]}>Earn money and discount when your friends and family join Kwaba</Text>
               <View style={{backgroundColor:'#00000022',borderRadius:13,height:26,marginTop:20,width:widthtouse*0.85}}>
                  <Text style={[FONTS.body1FontStyling,{color:'#FFE700',fontSize:12,fontWeight:'bold',textAlign:'center'}]} >For every 5 signups you get 1% discount on your rent.</Text>
               </View>
               <Text style={[FONTS.h1FontStyling,{color:COLORS.primary,fontWeight:'bold',alignSelf:'flex-start',marginTop:20,marginLeft:10}]}>Referral code</Text>
              
               <View style={{flexDirection:'row',justifyContent:'center',height:90,alignSelf:'flex-start'}}>
                  <TextInput editable={false} selectTextOnFocus={false}
                   style={{backgroundColor:'#BAB5FF',height:70,width:widthtouse*0.6,borderRadius:10,marginLeft:10,color:COLORS.white}}
                   
                   value={referralCode}
                   />
                  <TouchableOpacity style={{height:70,backgroundColor:COLORS.white,borderRadius:10,width:70,marginLeft:widthtouse/20}} 
                    onPress={copyToClipboard}
                  >
                     <IconFA name ='clone' size={30} color={COLORS.primary} style={{alignSelf:'center',marginTop:20}}/>
                  </TouchableOpacity>
               </View>
                <TouchableOpacity
                    onPress={()=>{}}
                
                    style={[
                    
                    {
                        backgroundColor: '#00DC99' ,
                        width: widthtouse*0.8,
                        borderRadius: 10,
                        height: 70,
                        borderRadius: 10,
                        marginBottom: 50,
                        fontSize: 14,
                        fontFamily: 'CircularStd-Medium',
                        fontWeight: '600',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    ]}>

                    <Text
                        style={{
                        color:  'white' ,
                        fontSize: 14,
                        lineHeight: 30,
                        fontWeight: '900',
                        }}>
                        SHARE CODE
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{height:50,marginTop:-34}}  onPress={()=>{}}>
                <View  style={{height:50,flexDirection:'row',justifyContent:'center'}}>

                    
                    
                    <Text style={[FONTS.h3FontStyling,{color:COLORS.primary,marginRight:10}]}>Your referral details</Text>
                    
                   
                    <IconFA name='angle-right' size={20} color={COLORS.primary} style={{paddingRight:10,marginTop:3}} />
                   
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Referral;

const styles = StyleSheet.create({

})
