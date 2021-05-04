import React,{useState} from 'react';
import { StyleSheet, Text, View ,useWindowDimensions,Image,TouchableOpacity, ScrollView ,TextInput,Dimensions,Pressable,Modal } from 'react-native';
import { 
  TabView, 
  SceneMap,
  TabBar,
  NavigationState,
  SceneRendererProps, 
} from 'react-native-tab-view';

import {COLORS, FONTS, images,icons} from '../../util/index';
import designs from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

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
                    
                    value={firstname}
                    onChangeText={(text) => setFirstName(text)}
                />
            </View>
            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: lastname == ''? 16: 10, lineHeight: lastname == ''? 30: 10, marginBottom: lastname == ''? 0: 23}}>Last name</Text>              
                <TextInput
                    style={{alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                   
                    value={lastname}
                    onChangeText={(text) => setLastName(text)}
                />
            </View>

            <DropDownPicker
              items={[
                  {label: 'Male', value: 'male', },
                  {label: 'Female', value: 'female', }
              ]}
              placeholder="Select Gender"
              defaultValue={gender}
              containerStyle={{height: 70,marginTop:20}}
              style={{backgroundColor: '#fff',height:0,width: widthtouse*0.9}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) =>{
                setGender(item.value);
                console.log(item.value);
              }}
          />

            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: dateOfBirth == ''? 16: 10, lineHeight: dateOfBirth == ''? 30: 10, marginBottom: dateOfBirth == ''? 0: 23}}>Date of Birth</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    
                    value={dateOfBirth}
                    onChangeText={(text) => setDateOfBirth(text)}
                />
            </View>

            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: address == ''? 16: 10, lineHeight: address == ''? 30: 10, marginBottom: address == ''? 0: 23}}>Address</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    
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
    const [employmentStatus, setEmploymentStatus] = useState('');
    const [nameOfCompany, setNameOfCompany] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [modeOfPaymentOptions] = useState([
        {label: 'Bank Transfer', value: 'Bank Transfer'},
        {label: 'Cheque', value: 'Cheque'},
        {label: 'Deposit', value: 'Deposit'},
      ])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <View style={{flexDirection:'column',marginTop:30,alignItems:'center'}}>
        
        <DropDownPicker
              items={[
                  {label: 'Employment', value: 'Employment', },
                  {label: 'Unemployed', value: 'unemployed', }
              ]}
              placeholder="Select Employment Status"
              defaultValue={employmentStatus}
              containerStyle={{height: 70}}
              style={{backgroundColor: '#fafafa',height:0,width: widthtouse*0.9,}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) =>{
                setEmploymentStatus(item.value);
                console.log(item.value);
              }}
          />

          <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: nameOfCompany == ''? 16: 10, lineHeight: nameOfCompany == ''? 30: 10, marginBottom: nameOfCompany == ''? 0: 23}}>Name Of Company</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    
                    value={nameOfCompany}
                    onChangeText={(text) => setNameOfCompany(text)}
                />
            </View>

            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: companyLocation == ''? 16: 10, lineHeight: companyLocation == ''? 30: 10, marginBottom: companyLocation == ''? 0: 23}}>Location</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    
                    value={companyLocation}
                    onChangeText={(text) => setCompanyLocation(text)}
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
    </View>
  )
};

  const ThirdRoute = () => {
    const [pickerModalVisible, setPickerModalVisible] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bvn, setBvn] = useState('');
    const [modeOfPaymentOptions] = useState([
        {label: 'Bank Transfer', value: 'Bank Transfer'},
        {label: 'Cheque', value: 'Cheque'},
        {label: 'Deposit', value: 'Deposit'},
      ])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} >
      <View style={{flexDirection:'column',marginTop:30,alignItems:'center'}}>

      <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: email == ''? 16: 10, lineHeight: email == ''? 30: 10, marginBottom: email == ''? 0: 23}}>Email</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>


          <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: phoneNumber == ''? 16: 10, lineHeight: phoneNumber == ''? 30: 10, marginBottom: phoneNumber == ''? 0: 23}}>Phone Number</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>

            <View style={[designs.customInput, {width: widthtouse*0.9}]}>      
                <Text style={{color: COLORS.grey, fontSize: bvn == ''? 16: 10, lineHeight: bvn == ''? 30: 10, marginBottom: bvn == ''? 0: 23}}>Bvn</Text>              
                <TextInput
                    style={{flex: 1,alignSelf:'center'}}
                   
                    placeholderTextColor="#BFBFBF"
                    
                    value={bvn}
                    onChangeText={(text) => setBvn(text)}
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
    </View>
  )
  };


  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color:focused?'white':COLORS.grey, margin: 0,backgroundColor:focused?'#9D98EC':'white',height:32,textAlign:'center',width:100,paddingTop:6,borderRadius:5 }}>
          {route.title}
        </Text>   
    )}
    />
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
            size={25}
            style={{marginTop: 28, marginLeft: 16, fontWeight: '900'}}
            color="#2A286A"
        />


          <TabView
            renderTabBar={renderTabBar}
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

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#263238',
    overflow: 'hidden',
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: 'rgb(0, 132, 255)',
    width: 48,
    height: 48,
    borderRadius: 24,
    margin: 6,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
