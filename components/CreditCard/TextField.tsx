import React, {useEffect, useRef, useState} from 'react';
import {
  //@ts-ignore
  Text, //@ts-ignore
  TextInput, //@ts-ignore
  StyleSheet, //@ts-ignore
  View, //@ts-ignore
  Animated, //@ts-ignore
  Easing, //@ts-ignore
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../util';

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string | null;
  icon: string;
  endEnhancer?: React.ReactNode;
};

const TextField: React.FC<Props> = (props) => {
  const {
    icon,
    label,
    errorText,
    value,
    endEnhancer,
    style,
    onBlur,
    onFocus,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? COLORS.primary : '#BFBFBF70';
  if (errorText) {
    color = '#B00020';
  }

  return (
    <View style={style}>
      <Icon
        name={icon}
        size={25}
        style={{
          position: 'absolute',
          top: 18,
          left: 10,
          color: COLORS.grey,
          opacity: 0.5,
        }}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor: color,
            // height: '100%',
            // backgroundColor: 'red',
          },
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, -15],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text
            style={[
              styles.label,
              {
                color,
              },
            ]}>
            {label}
            {errorText ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {endEnhancer && (
        <View style={styles.enhancerContainer}>{endEnhancer}</View>
      )}
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // padding: 24,
    // paddingHorizontal: 24,
    paddingLeft: 50,
    paddingRight: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 4,
    // fontFamily: 'Avenir-Medium',
    fontSize: 16,
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 6,
    backgroundColor: 'white',
  },
  label: {
    // fontFamily: 'Avenir-Heavy',
    fontSize: 16,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
    // fontFamily: 'Avenir-Medium',
  },
  enhancerContainer: {
    // width: 30,
    // height: 30,
    // backgroundColor: 'red',
    position: 'absolute',
    top: 15,
    right: -100,
    // borderWidth: 1,
  },
});

export default TextField;
