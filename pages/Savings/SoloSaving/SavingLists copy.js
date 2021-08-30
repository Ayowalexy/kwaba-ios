import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../../util';
import LinearGradient from 'react-native-linear-gradient';

export default function SavingLists({navigation}) {
  useEffect(() => {}, []);
  return (
    <View style={[styles.container]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={25}
        style={{fontWeight: '900', paddingVertical: 20, paddingHorizontal: 10}}
        color={COLORS.primary}
      />
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: COLORS.dark}}>
            You saved
          </Text>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: COLORS.dark}}>
            ₦0.00
          </Text>
        </View>

        <View style={[styles.cardContainer]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SoloSavingDashBoard')}>
            <LinearGradient
              style={[styles.card]}
              colors={['#9D98EC50', '#F9f9ff']}
              start={{x: 0, y: 1}}
              end={{x: 0.9, y: 0}}
              locations={[0, 1]}>
              <View>
                <Text></Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SoloSavingDashBoard')}>
            <LinearGradient
              style={[styles.card]}
              colors={['#9D98EC50', '#F9f9ff']}
              start={{x: 0, y: 1}}
              end={{x: 0.9, y: 0}}
              locations={[0, 1]}>
              <View>
                <Text></Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('SoloSaving1')}
        style={{
          backgroundColor: COLORS.primary,
          width: 60,
          height: 60,
          position: 'absolute',
          right: 20,
          bottom: 20,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          borderWidth: 1,
          borderColor: COLORS.dark,
        }}>
        <IconFA5 name="plus" size={25} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  card: {
    width: '100%',
    height: 100,
    backgroundColor: '#9D98EC50',
    borderRadius: 10,
    marginBottom: 10,
  },
});
