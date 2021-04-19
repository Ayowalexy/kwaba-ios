import React from 'react';
import { StyleSheet, Text, View,Dimensions,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, images,icons} from '../../util/index';

const screenheight=Dimensions.get('window').height;
const screenwidth=Dimensions.get('window').width;
const headerHeight=screenheight/4;
const width=Dimensions.get('window').width;
const BillsHome = ({navigation}) => {

    const billsHomeCarddata= [
        {image: icons.electricity, cardTitle: 'Electricity', cardSubTitle: 'Pay for your electricity easily', onClickFunction:function openCardAndBank(){}},
        {image: icons.cabletv, cardTitle: 'Cable TV', cardSubTitle: 'Keep the show on, pay easily', onClickFunction: function openCardAndBank(){}},
        {image: icons.internetsub, cardTitle: 'Internet subscription', cardSubTitle: 'Pay your internet subscription', onClickFunction: function openCardAndBank(){}},
        {image: icons.waste, cardTitle: 'Waste', cardSubTitle: 'Sort out your waste bill', onClickFunction: function openCardAndBank(){}},
        {image: icons.water, cardTitle: 'Water', cardSubTitle: 'Keep water flowing, pay easily', onClickFunction: function openCardAndBank(){}},
        
    ]
    return (
        <View style={styles.container}>
           <View style={styles.header}>
            <Icon
                onPress={() => navigation.goBack()}
                name="arrow-back-outline"
                size={35}
                style={{fontWeight: '900', marginLeft: 16,marginTop:20}}
                color={COLORS.light}
            />

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>

               <View style={{flexDirection:'column',}}>
                  <Text style={styles.headerMainText} >Pay bills</Text>
                  <Text style={styles.headertext}>Take care of all your </Text>
                  <Text style={styles.headertext}>essentials bills.</Text>
               </View>
               
                  <Image  source={images.billheaderimage} style={styles.headerImage} />
               
            </View>

            </View>

            <View style={{flex:1,flexDirection:'column',alignSelf:'center',borderRadius:10,width:width*0.9,}}>
            { billsHomeCarddata.map((value, index) => {
                  return <TouchableOpacity style={{height:78,backgroundColor:COLORS.white,flexDirection:'row',marginTop:20,borderRadius:10,justifyContent:'space-between'}} key={index} onPress={()=> {value.onClickFunction()}}>
                           
                           <View style={{flex:1,flexDirection:'row'}}>
                              <Image  style={{width: 100, height: 100,marginTop:5}} source={value.image} />  
                              <View style={{flexDirection:'column',marginTop:20}}>
                                  <Text style={[FONTS.h3FontStyling,{color:COLORS.primary,fontWeight:'bold'}]}>{value.cardTitle}</Text>
                                  <Text style={[FONTS.body4FontStyling,{color:COLORS.grey}]}>{value.cardSubTitle}</Text>
                              </View>
                           </View>

                           <View>
                             <Icon
                                
                                name="arrow-forward-outline"
                                size={30}
                                style={{fontWeight: '900', marginLeft: 16,marginTop:20,marginRight:10}}
                                color={COLORS.primary}
                             />
                           </View>
                           
                         </TouchableOpacity>
            })}
            </View>
        </View>
    )
}

export default BillsHome;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F7F8FD',
    },
    header: {
        flex:1,
        flexDirection:'column',
        maxHeight:178,
        backgroundColor:'#2A286A',
        borderBottomLeftRadius: 27,
        borderBottomRightRadius: 27,
        
      },
      headerMainText:{
          marginLeft:16,
          color:COLORS.yellow,
          fontFamily: 'CircularStd-bold',
          fontSize:25,
          fontWeight:'700',
          marginTop:20
      },
      headertext:{
        color:COLORS.white,
        fontFamily: 'CircularStd-bold,Book', 
        textAlign:'justify',
        marginLeft: 16
      },
      headerImage:{
        flex:1,
        height:176,
        width:216,
        resizeMode:'contain',
        marginTop:-55,
        marginLeft:30
      },
})
