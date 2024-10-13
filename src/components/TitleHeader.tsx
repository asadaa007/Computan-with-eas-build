import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "../utils/colors";
import LeaveBTN from "./LeaveBTN";

const TitleHeader = ({ imageUri, name, designation, onPress, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.photoCol}>
        <Image source={{ uri: imageUri }} style={styles.profileImage} />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.desigTitle}>{designation}</Text>
      </View>
      <View style={styles.btnCol}>
       <LeaveBTN
       onPress={onPress}
       title={title}
       />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: colors.primary,
  },
  textCol:{
    marginRight:'auto',
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.secondary,
  },
  desigTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.light,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginBottom: 5,
    borderWidth: 3,
    borderColor: colors.light,
    elevation:5,
  },
  btnCol:{
    display:'flex',
    flexDirection:'column',
    gap:5,
  },
});

export default TitleHeader;
