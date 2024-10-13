import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { colors } from "../utils/colors";

const PrimaryBTN = ({ onPress, title }) => {
  return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
  );
};

export default PrimaryBTN;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
