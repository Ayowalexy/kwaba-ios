import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, images} from '../../util';

export default function AppUpdate() {
  return (
    <View style={[styles.container]}>
      <View style={{flex: 1}}>
        <Image
          source={images.appUpdate}
          resizeMode="contain"
          style={[styles.img]}
        />
        <View style={[styles.textContainer]}>
          <Text style={[styles.title]}>New Update Available</Text>
          <Text style={[styles.body]}>
            To enjoy all the amazing services Kwaba has to offer you, we
            strongly advise you to update your app
          </Text>
        </View>
      </View>

      <View style={[styles.actionCenter]}>
        <TouchableOpacity style={[styles.actionBtn]}>
          <Text style={[styles.actionBtnText, {color: COLORS.white}]}>
            UPDATE APP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, {backgroundColor: 'transparent'}]}>
          <Text style={[styles.actionBtnText]}>I'LL UPDATE LATER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  img: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
  textContainer: {
    // marginTop: 20,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
  },

  actionCenter: {},
  actionBtn: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.grey,
  },
});
