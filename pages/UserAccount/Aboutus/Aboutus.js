import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import {icons} from '../../../util/index';
import {COLORS, FONTS, images} from '../../../util/index';

const Aboutus = ({navigation}) => {
    return (
        <View style={styles.container}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={35}
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

           </View>
        </View>
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
     margin:20
    }

})
