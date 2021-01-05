import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {moderateScale} from '../utils/ResponsiveUi';
import {images, fonts, colors} from '../themes';

const Button = ({
  buttonTitle,
  height,
  width,
  backgroundColor,
  marginBottom,
  textStyle,
  onButtonPress,
  buttonImage,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onButtonPress()}
      style={{
        height: height,
        width: width,
        backgroundColor: backgroundColor,
        borderRadius: moderateScale(13),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{height, width, resizeMode: 'contain'}}
        source={buttonImage}
      />
    </TouchableOpacity>
  );
};

export default Button;
