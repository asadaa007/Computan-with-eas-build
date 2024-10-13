import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/colors";

const SplashScreen = () => (
  <View style={styles.container}>
    <Image
      source={{ uri: "https://timesheet.computan.com/computanLogo.png" }}
      style={styles.logo}
    />
    <Text style={styles.text}>Welcome to</Text>
    <Text style={styles.text}>Computan</Text>
    <Text style={styles.text}>Employee Management</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
