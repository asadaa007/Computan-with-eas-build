import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from '../utils/colors';
import { AntDesign } from '@expo/vector-icons';

const MenuList = ({iconNeme, BtnName, OnPress}) => {
  return (
      <Pressable style={styles.gridBTN} onPress={OnPress}>
        <AntDesign name={iconNeme} size={30} color={colors.primary} />
        <Text style={styles.gridBTNText}>{BtnName}</Text>
        <AntDesign name="right" size={35} color={colors.primary} />
      </Pressable>
  );
};

export default MenuList;

const styles = StyleSheet.create({
    gridBTN: {
        backgroundColor: colors.light,
        padding: 25,
        borderRadius: 10,
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        gap:15,
        width: '100%',
        elevation: 5,
        marginBottom:10,
        borderLeftColor: colors.primary,
        borderLeftWidth:5,
    },
    gridBTNText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.primary,
        marginRight:'auto',
    },
});
