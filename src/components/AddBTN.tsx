import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";

const AddBTN = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add" size={24} color={colors.light} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AddBTN;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'center',
  },
  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
