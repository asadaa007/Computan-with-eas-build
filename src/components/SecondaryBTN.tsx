import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { colors } from "../utils/colors";

const SecondaryBTN = ({ onPress, title }) => {
  return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.passwordReset}>{title}</Text>
      </TouchableOpacity>
  );
};

export default SecondaryBTN;

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
  passwordReset: {
    color: colors.primary,
    fontSize: 16,
    marginTop: 15,
    textAlign:'right',
},
});
