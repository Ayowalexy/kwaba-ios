import React, { useState } from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome'
import {COLORS, FONTS, images} from '../../util/index';
import { CustomTextInput, CustomPicker } from '../../components/CustomInput';
import designs from './style';



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


 const accountTabsAndSettings = [
     {iconName: 'add', tabTitle: 'Withdraw', onClickFunction: 'Withdraw'},
     {iconName: 'add', tabTitle: 'Card And Bank', onClickFunction: function openCardAndBank(){navigation.navigate('CardAndBankDetails')}},
     {iconName: 'add', tabTitle: 'Referral', onClickFunction: 'Referral'},
     {iconName: 'add', tabTitle: 'Change Password', onClickFunction: ''},
     {iconName: 'add', tabTitle: 'Documents', onClickFunction: ''},
     {iconName: 'add', tabTitle: 'Legals And FAQs', onClickFunction: ''},
     {iconName: 'add', tabTitle: 'About us', onClickFunction: ''},
 ]

 
 

return (
    <View>
      
      { accountTabsAndSettings.map((value, index) => {
              return <TouchableOpacity key={index} onPress={()=> {value.onClickFunction()}}>
                  <View>
                      <Icon name={value.iconName}/>
                  <Text style={FONTS.body1FontStyling}>{ value.tabTitle }</Text>
                  <IconFA name='angle-right'/>
                  </View>
                </TouchableOpacity>
            })}
        
    </View>
  );
}



export default AccountPage;




const styles = StyleSheet.create({})
