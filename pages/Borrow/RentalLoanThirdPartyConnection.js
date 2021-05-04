import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {icons} from '../../util/index';
import designs from './style';
import {COLORS, FONTS, images} from '../../util/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import {  thirdPartyConnections } from '../../util/index';

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth/2-44;

// 
const RentalLoanThirdPartyConnection = ({navigation}) => {

//   const [accommodationStatus, setAccommodationStatus] = useState('');
//   const [salaryAmount, setSalaryAmount] = useState('');

  const handleNavigation = () => {
    const data = {
    accommodationStatus: accommodationStatus,
    salaryAmount: salaryAmount,
    };
    // try {
    //   dispatch(soloSaving(data));

    //   return navigation.navigate('SoloSaving2');
    // } catch (error) {}
  };
  const getHeader = () => {
    return <View>
        <Image source={images.maskGroup55} style={{width: '100%', height: 141, resizeMode: "contain", top: -10}}/>
        <Text
      style={[
        FONTS.h1FontStyling,
        {
          color: '#2A286A',
          textAlign: 'left',
          fontWeight: 'bold',
          paddingHorizontal: 20,
          lineHeight: 30,
          color: COLORS.white
        },
      ]}>
      Access a better loan offer if you have accounts and funds with our partners
    </Text>
    <View style={designs.smallTextBox}>
        <Text style={designs.smallText}>Low interest rate</Text>
        <Text style={[designs.smallText, {fontSize: 8}]}>{''} {'\u2B24'} {''}</Text>
        <Text style={designs.smallText}>Instant funds</Text>
        <Text style={[designs.smallText, {fontSize: 8}]}>{''} {'\u2B24'} {''}</Text>
        <Text style={designs.smallText}>5x more funds</Text>
        
    </View>
    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 12}}>
        <Text style={{fontSize: 12, color: '#EDECFC'}}>Login to one or more accounts to increase your loan offer</Text>
    </View>
</View>

};
const getFooter = () => {
    
    return <TouchableOpacity
    onPress={() => navigation.navigate('RentalLoanForm2')}
    style={[designs.button, {backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFE700', marginTop: 30, elevation: 0}]}>
    <Text style={[designs.buttonText, {color: '#FFE700', textAlign: 'center', fontWeight: 'normal'}]}>I don’t have any of these accounts</Text>
  </TouchableOpacity>;
};


  return (
    <View style={[designs.container, {backgroundColor: '#F7F8FD'}]}>

        <View
          style={designs.contentBox}>
              
          
          <FlatList
          showsVerticalScrollIndicator={false}
          key={'_'}
          numColumns={2}
          data={thirdPartyConnections}
          renderItem={({item,index})=>(
            <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress ={() => navigation.navigate('LinkingAccount', item)}
            >
            <View style={[designs.card, {width: cardWidth, height: cardWidth}]}>
              <View style={{alignItems: 'center'}}>
                <Image source={item.logo} style={{height: 100, width: 100}} />
              </View>
              </View>
          </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFooter}
          />


        </View>
   </View>
  );
};

export default RentalLoanThirdPartyConnection;
