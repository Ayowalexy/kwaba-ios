import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {COLORS} from '../../../util';
import stepsArray from '../../../util/stepsArray';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RnplSteps({navigation}) {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Icon name="arrow-back" color={COLORS.dark} size={24} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.bottomView]}>
          {stepsArray.map((item, index) => {
            return (
              <TouchableOpacity
                disabled={item.status != 'start'}
                key={index}
                style={[
                  styles.stepCard,
                  {
                    borderColor:
                      item.status == 'complete'
                        ? '#61cd8f'
                        : item.status == 'start'
                        ? '#8fc1ed'
                        : COLORS.white,
                    backgroundColor:
                      item.status == 'complete' ? '#effbf7' : COLORS.white,
                  },
                ]}
                onPress={() => navigation.navigate('Form1')}>
                {/* onPress={() => navigation.navigate('RnplViews')}> */}
                <View style={[styles.content]}>
                  <Text style={[styles.title]}>{item.title}</Text>
                </View>
                <View style={[styles.statusContent]}>
                  {item.status == 'start' && (
                    <Text style={[styles.status, styles.statusStart]}>
                      Start
                    </Text>
                  )}

                  {item.status == 'locked' && (
                    <Icon name="lock-closed" style={[styles.statusIcon]} />
                  )}
                  {item.status == 'complete' && (
                    <Text style={[styles.status, styles.statusComplete]}>
                      Complete
                    </Text>
                  )}
                </View>

                <View
                  style={[
                    styles.index,
                    {
                      borderColor:
                        item.status == 'complete'
                          ? '#61cd8f'
                          : item.status == 'start'
                          ? '#8fc1ed'
                          : '#ddd',
                    },
                  ]}>
                  {item.status == 'complete' && (
                    <Icon
                      name="ios-checkmark-circle-sharp"
                      style={[styles.statusIcon, {color: '#61cd8f'}]}
                    />
                  )}

                  {item.status != 'complete' && (
                    <Text
                      style={[
                        styles.indexText,
                        {color: item.status == 'start' ? '#8fc1ed' : '#ddd'},
                      ]}>
                      {index + 1}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => console.log('Helloooo')}>
          <Text style={[styles.buttonText]}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.buttonText]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#eef7ff',
  },
  topView: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topViewText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.dark,
    lineHeight: 25,
  },
  bottomView: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    flex: 1,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    backgroundColor: '#eef7ff',
    paddingBottom: 100,
  },
  stepCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#8fc1ed',
    marginBottom: 10,
  },
  content: {
    paddingRight: 50,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  subTitle: {
    marginTop: 20,
    color: COLORS.dark,
    lineHeight: 20,
    fontSize: 14,
  },
  statusContent: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusStart: {
    color: '#8fc1ed',
  },
  statusComplete: {
    color: '#61cd8f',
  },
  statusIcon: {
    fontSize: 20,
    color: '#ddd',
  },
  index: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 23,
    position: 'absolute',
    left: -16,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8fc1ed',
  },
  indexText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8fc1ed',
  },
  buttonContainer: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    elevation: 50,
  },
  button: {
    backgroundColor: '#61cd8f',
    width: '48%',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});
