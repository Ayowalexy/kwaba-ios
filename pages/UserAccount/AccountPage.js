import React, { useState } from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    TouchableHighlight,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome'
import {COLORS, FONTS, images,icons} from '../../util/index';
import { CustomTextInput, CustomPicker } from '../../components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import designs from './style';
import axios from 'axios';



const width=Dimensions.get('window').width;
const AccountPage = ({navigation}) => {

    const [pressed, setPressed] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');
  const [secondPressed, setSecondPressed] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [loanPurpose] = useState([
    {label: 'Household', value: 'Household'},
    {label: 'Personal', value: 'Personal'},
])
// const openCardAndBank=()=> {
//   try{
//    console.log('start')
//    navigation.navigate('CardAndBankDetails')
//   }catch(error){
//     console.log(error)
//   }
  
// }


 const LogOut=()=>{
   console.log("hello here");

   AsyncStorage.removeItem('userData');

   try{

    AsyncStorage.removeItem('userData');

    Alert.alert('Message','Logout Sucessfully', [
      {text: 'Close'},
    ]);


   }catch(error){

   }
   
 }

 const accountTabsAndSettings = [
     {iconName: 'money', tabTitle: 'Withdraw', onClickFunction: function openCardAndBank(){navigation.navigate('CardAndBankDetails')}},
     {iconName: 'credit-card', tabTitle: 'Card And Bank', onClickFunction: function openCardAndBank(){navigation.navigate('CardAndBankDetails')}},
     {iconName: 'share-alt', tabTitle: 'Referral', onClickFunction: function openCardAndBank(){navigation.navigate('CardAndBankDetails')}},
     {iconName: 'unlock-alt', tabTitle: 'Change Password', onClickFunction: function openCardAndBank(){navigation.navigate('CardAndBankDetails')}},
     {iconName: 'folder-open', tabTitle: 'Documents', onClickFunction: function openCardAndBank(){navigation.navigate('UploadDocumentsList')}},
     {iconName: 'file', tabTitle: 'Legals And FAQs', onClickFunction: function openCardAndBank(){navigation.navigate('CardAndBankDetails')}},
     {iconName: 'info-circle', tabTitle: 'About us', onClickFunction: function openCardAndBank(){navigation.navigate('CardAndBankDetails')}},
 ]

 
 

return (
    <View style={{backgroundColor:'#F7F8FD',flex:1}}>

      <View  style={{backgroundColor:'#F7F8FD',marginBottom:22}}>
      <Text
            style={[
              FONTS.h1FontStyling,
              {
                color: '#2A286A',
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: 20,
                marginTop:20,
                marginLeft:20
              },
            ]}>
            Account
          </Text>

          <View style={{borderRadius:10,backgroundColor:'#ffffff',alignSelf:'center',backgroundColor:'#ffffff',width:width*0.9,}}>
             <View style={{flexDirection:'row',height:138}}>
                <Image
                  style={{width: 101, height: 101, borderRadius: 50, marginRight: 11,marginLeft:35,marginTop:30,marginBottom:-20}}
                  source={images.ellipse96}
                />
                <View style={{marginTop:60}} >

                  <Text style={[FONTS.h3FontStyling,{marginLeft:40,marginTop:-23,color:COLORS.primary,fontWeight: 'bold',}]} >Adebisi Joseph</Text>
                  <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#9D98EC',width:100,height:30,borderRadius:15,marginLeft:40,marginTop:10}}>
                    <Text  style={{width:78,height:30,borderRadius:15,color:COLORS.white,textAlign:'center',marginTop:5}}>Profile</Text>
                    <IconFA name='angle-right' size={20} color='#ffffff' style={{marginRight:20,marginTop:10,marginTop:5}} />
                  </TouchableOpacity>
                </View>
             </View>
             <View style={{flexDirection:'row',alignItems:'center',marginTop:22,borderBottomLeftRadius:10,borderBottomRightRadius:10,backgroundColor:'#2A286A',height:40,flexDirection:'row'}}>
                <Image
                  style={{width: 25, height: 25, marginRight: 5,marginLeft:12}}
                  source={icons.star}
                />
                <Text style={[FONTS.body1FontStyling,{color:COLORS.white}]}>credit score</Text>
                <View>
                  <TouchableOpacity style={{backgroundColor:COLORS.secondary,borderRadius:20,marginLeft:5,height:25,width:36}}>
                    <Text  style={[FONTS.h3FontStyling,{color:COLORS.primary,fontWeight: 'bold',textAlign:'center'}]} >65</Text>
                  </TouchableOpacity>
                  
                </View>
                <Text style={[FONTS.body1FontStyling,{color:COLORS.white,textAlign:'center'}]}>/100</Text>

                <View style={{  flexDirection: 'column',flex: 1}}>
                  <Text style={[FONTS.body1FontStyling,{color:COLORS.light,textAlign:'center',fontSize:8,flexShrink:1,lineHeight:12}]}>You are doing great, don’t default on your payments to build a good credi score</Text>
                </View>
             </View>
          </View>
      </View>

      <View style={{flexDirection:'column',alignSelf:'center',backgroundColor:'#ffffff',width:width*0.9,borderRadius:20}}>

          { accountTabsAndSettings.map((value, index) => {
                  return <TouchableOpacity style={{height:50}} key={index} onPress={()=> {value.onClickFunction()}}>
                                 <View  style={{height:50,flexDirection:'row',justifyContent:'space-between'}}>

                                    <View style={{}}>
                                      <IconFA name={value.iconName} size={20} style={{color:COLORS.light,marginLeft:10,marginTop:10}} />
                                      <Text style={[FONTS.h3FontStyling,{marginLeft:40,marginTop:-23,color:COLORS.dark}]}>{ value.tabTitle }</Text>
                                    </View>
                                    <View style={{}}> 
                                      <IconFA name='angle-right' size={20} color='#BFBFBF' style={{marginRight:20,marginTop:10}} />
                                    </View>
                                 </View>
                            </TouchableOpacity>
                        
                  
          })}
        </View>
        <View  style={{alignSelf:'center',width:width*0.9}}>
          <TouchableOpacity style={{height:50}}  onPress={()=>{LogOut()}}>
              <View  style={{height:50,flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{}}>
                  <IconFA name='sign-out' size={20} style={{color:COLORS.light,marginLeft:10,marginTop:10}} />
                  <Text style={[FONTS.h3FontStyling,{marginLeft:40,marginTop:-23,color:COLORS.dark}]}>Logout</Text>
                </View>
                <View style={{}}> 
                  <IconFA name='angle-right' size={20} color='#BFBFBF' style={{marginRight:20,marginTop:10}} />
                </View>
              </View>
            </TouchableOpacity>
        </View>
        
    </View>
  );
}



export default AccountPage;




const styles = StyleSheet.create({})
