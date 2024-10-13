import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "../../utils/colors";
import { profilePics } from "../../utils/profilePics";
import userNames from "../../utils/userNames";
import EmployeeList from "../../components/EmployeeList";
import TitleHeader from "../../components/TitleHeader";
import employeeData from "../../utils/employeeData";

const ManagerDashboard = () => {
  const personName = userNames.manager.name;
  const ProfilePic = profilePics.manager;

  const navigation = useNavigation();

  const handleTeam = () => {
    navigation.navigate("TeamsList");
  };

  const handelPress = () => {
    console.log("Button Pressed");
  };

  return (
    <View style={styles.container}>
      <TitleHeader
        imageUri={ProfilePic}
        name={personName}
        designation="WordPress Manager"
        onPress={handelPress}
        title={"View Teams"}
      />
      <EmployeeList
        employeeData={employeeData}
        headTitle={"Employee Details"}
        onPress={handleTeam}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.gray3,
  },
});

export default ManagerDashboard;
