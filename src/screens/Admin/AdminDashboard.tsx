import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TitleHeader from "../../components/TitleHeader";
import { profilePics } from "../../utils/profilePics";
import userNames from "../../utils/userNames";
import { colors } from "../../utils/colors";

const handelPress = () => {
  console.log("Button Pressed");
};

const AdminDashboard = () => {
  const hrName = userNames.admin.name;
  const hrProfilePic = profilePics.admin;

  return (
    <View style={styles.container}>
      <TitleHeader
        imageUri={hrProfilePic}
        name={hrName}
        designation="VP Operations"
        onPress={handelPress}
        title={"View Teams"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    backgroundColor: colors.gray3,
  },
});

export default AdminDashboard;
