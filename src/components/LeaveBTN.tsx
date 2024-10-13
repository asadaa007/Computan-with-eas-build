import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { colors } from "../utils/colors";

const LeaveBTN = ({ onPress, title }) => {
  return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
  );
};

export default LeaveBTN;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 25,
    borderColor:colors.light,
    borderWidth:2,
    alignItems: "center",
  },
  buttonText: {
    color: colors.light,
    fontSize: 14,
    fontWeight: "bold",
  },
});
