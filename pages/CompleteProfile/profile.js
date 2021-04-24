import React,{useState} from 'react';
import { StyleSheet, Text, View ,useWindowDimensions,Image,TouchableOpacity, ScrollView ,TextInput,Dimensions,Pressable,Modal } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import {COLORS, FONTS, images,icons} from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

const widthtouse=Dimensions.get('window').width;

const FirstRoute = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    return (

   // const [date, setDate] = useState(new Date(1598051730000));
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <ScrollView>      
        <View style={{flexDirection:'row',height:138}}>
            <Image
                style={{width: 101, height: 101, borderRadius: 50, marginRight: 11,marginLeft:35,marginTop:30,marginBottom:-20}}
                source={images.ellipse96}
            />
            <View style={{marginTop:60}} >

               
                <TouchableOpacity onPress={()=>{ }} style={{flexDirection:'row',justifyContent:'space-between',height:30,borderRadius:15,marginLeft:40,marginTop:10}}>
                  <Text  style={{height:30,borderRadius:15,color:COLORS.secondary,textAlign:'center',marginTop:5}}>Tap to change picture</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flexDirection:'column',alignItems:'center'}}>
            <View style={[designs.customInput, {width: widthtouse*0.9}]}>     
                
                <Text style={{color: COLORS.grey, fontSize: firstname == ''? 16: 10, lineHeight: firstname == ''? 30: 10, marginBottom: firstname == ''? 0: 23}}>First name</Text> 
                

                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    keyboardType="text"
                    value={firstname}
                    onChangeText={(text) => setFirstName(text)}
                />
            </View>
            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: lastname == ''? 16: 10, lineHeight: lastname == ''? 30: 10, marginBottom: lastname == ''? 0: 23}}>Last name</Text>              
                <TextInput
                    style={{alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    keyboardType="text"
                    value={lastname}
                    onChangeText={(text) => setLastName(text)}
                />
            </View>

            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: gender == ''? 16: 10, lineHeight: gender == ''? 30: 10, marginBottom: gender == ''? 0: 23}}>Gender</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    keyboardType="text"
                    value={gender}
                    onChangeText={(text) => setGender(text)}
                />
            </View>

            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: dateOfBirth == ''? 16: 10, lineHeight: dateOfBirth == ''? 30: 10, marginBottom: dateOfBirth == ''? 0: 23}}>Date of Birth</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    keyboardType="text"
                    value={dateOfBirth}
                    onChangeText={(text) => setDateOfBirth(text)}
                />
            </View>

            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: address == ''? 16: 10, lineHeight: address == ''? 30: 10, marginBottom: address == ''? 0: 23}}>Address</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    keyboardType="text"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
            </View>
            <TouchableOpacity
            onPress={()=>{}}
          
            style={[
              designs.btn,
              {
                backgroundColor: '#00DC99' ,
                width: widthtouse*0.9,
                borderRadius: 10,
              },
            ]}>
          <Text
            style={{
              color:  'white' ,
              fontSize: 14,
              lineHeight: 30,
              fontWeight: '900',
            }}>
            SAVE CHANGES
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>  
    </View>
    )
};
  
  const SecondRoute = () => {  
    const [pickerModalVisible, setPickerModalVisible] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [modeOfPayment, setModeOfPayment] = useState('')
    const [modeOfPaymentOptions] = useState([
        {label: 'Bank Transfer', value: 'Bank Transfer'},
        {label: 'Cheque', value: 'Cheque'},
        {label: 'Deposit', value: 'Deposit'},
      ])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <View>
      <Pressable onPress={() => {
                setPressed(!pressed);
                setPickerModalVisible(!pickerModalVisible)
                console.log('switched', pressed)
              }} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: modeOfPayment == ''? 25: 7, paddingBottom: 25, borderRadius: 10, borderColor: '#EFEFEF', backgroundColor: COLORS.white, marginBottom: 23}}> 
              <View style={{ padding: 0, justifyContent: 'center' }}>
                  <Text style={{color: COLORS.grey, fontSize: modeOfPayment == ''? 16: 10, lineHeight: modeOfPayment == ''? 30: 10, marginBottom: modeOfPayment == ''? 0: 3}}>How did you pay</Text>
                  
                  {modeOfPayment !== '' && <Text style={[FONTS.body1FontStyling, {marginBottom: 'auto'}]}>{modeOfPayment}</Text>}
    
              </View>
              <View style={{height: '100%', paddingTop: modeOfPayment == ''? 0: 12 }}><IconFA name = {pressed? 'angle-up': 'angle-down'} size={30} color={COLORS.grey}/></View>
           </Pressable>

          <Modal visible={pickerModalVisible} animationType="fade" transparent={true} onRequestClose ={()=>{setPickerModalVisible(!pickerModalVisible);
              setPressed(!pressed)}}>
              <View style={designs.modalWrapper}>
                    <View style={designs.modalView}>
                        <View style={[designs.modalHeader, {justifyContent: 'flex-end'}]}>
                              <Icon
                              onPress={() => {setPickerModalVisible(!pickerModalVisible);
                              setPressed(!pressed)}}
                              style={{alignSelf: 'flex-end'}}
                              name="close-outline"
                              size={30}
                              color="#465969"
                            />
                        </View>           
                        <View>

                            { modeOfPaymentOptions.map((value, index) => {
                              return <TouchableOpacity key={index} onPress={() => {setModeOfPayment(value.value); setPickerModalVisible(false); setPressed(!pressed)}}>
                                  <Text style={FONTS.body1FontStyling}>{ value.label }</Text>
                                </TouchableOpacity>
                            })}
                            
                        </View>
                     </View>
                </View>
            </Modal>
      </View>
    </View>
  )
}
  ;

  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >

    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  });
  

const profile = ({navigation}) => {
    const layout = useWindowDimensions();

    const [date, setDate] = useState(new Date(1598051730000));

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Personal' },
      { key: 'second', title: 'Employment' },
      { key: 'third', title: 'Security' },
    ]);
  
    return (



      <View style={{flex:1,backgroundColor:'#F7F8FD'}}>
        
        <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={35}
            style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
            color="#2A286A"
        />


          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{borderTopLeftRadius:20,borderTopRightRadius:20}}
          />
      </View>  
    );
}

export default profile;

const styles = StyleSheet.create({})
