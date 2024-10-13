import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const InputPass = ({ value, onChangeText, placeHolder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeHolder}
          placeholderTextColor={colors.lightGray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={colors.primary}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputPass;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: colors.primary,
  },
  icon: {
    marginLeft: 10,
  },
});
