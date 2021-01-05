import {TextInput, View, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import {moderateScale} from '../utils/ResponsiveUi';
import {colors} from '../themes';

const TextField = ({
  onChangeText,
  placeHolder,
  isPassword,
  icon,
  height,
  width,
  value,
  marginBottom,
  marginTop,
  marginRight,
  marginLeft,
  isEditable,
}) => {
  return (
    <View
      style={{
        height,
        width,
        backgroundColor: colors.white,
        flexDirection: 'row',
        marginTop,
        marginBottom,
        marginRight,
        marginLeft,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: moderateScale(2),
        },
        shadowOpacity: moderateScale(0.25),
        shadowRadius: moderateScale(8),
        elevation: moderateScale(5),
        borderRadius: moderateScale(10),
      }}>
      <View
        style={{
          height: height,
          //width: '16%',
          marginHorizontal: moderateScale(13),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={icon}
          style={{height: moderateScale(20), width: moderateScale(20), resizeMode:'contain'}}
        />
      </View>
      <View
        style={{
          height: height - moderateScale(10),
          flex:1,
          alignSelf: 'center',
        }}>
        <TextInput
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: colors.white,
            fontSize: moderateScale(13),
            paddingBottom: 0,
            color: colors.lightBlack,
            paddingBottom: 0,
            paddingTop: 0,
          }}
          editable={isEditable}
          placeholder={placeHolder}
          secureTextEntry={isPassword ? true : false}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
      </View>
    </View>
  );
};

export default TextField;
