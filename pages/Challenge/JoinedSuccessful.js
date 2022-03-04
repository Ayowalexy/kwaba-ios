import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons, images} from '../../util';

export default function JoinedSuccessful(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  const handlePress = () => {
    props.navigation.replace('JoinChallengeDashboard', {
      id: props?.route?.params?.id,
    });
  };

  return (
    <View style={[styles.container]}>
      <StatusBar backgroundColor={'#fff'} />
      <View style={[styles.content]}>
        <Image
          style={[styles.img]}
          source={images.congratulation}
          resizeMode="contain"
        />
        <Text style={[styles.title]}>{props?.route?.params?.content}</Text>
        <Text style={[styles.subText]}>{props?.route?.params?.subText}</Text>
      </View>
      <TouchableOpacity style={[styles.btn]} onPress={handlePress}>
        <Text style={[styles.btnText]}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    paddingHorizontal: 20,
  },

  img: {height: 150},

  btn: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    // height: 70,
    borderRadius: 10,
    marginTop: 18,
    fontSize: 14,
    fontFamily: 'CircularStd-Medium',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    paddingVertical: 20,
  },

  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },

  subText: {
    fontSize: 15,
    marginTop: 10,
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 20,
  },
});
