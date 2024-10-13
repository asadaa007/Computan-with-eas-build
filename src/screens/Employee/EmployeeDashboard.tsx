import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { profilePics } from "../../utils/profilePics";
import userNames from "../../utils/userNames";
import TitleHeader from "../../components/TitleHeader";

const handelPress = () => {
  console.log("Button Pressed");
};

const EmployeeDashboard = () => {
  const name = userNames.employee.name;
  const profilePic = profilePics.employee;

  return (
    <View style={styles.container}>
      <TitleHeader
        imageUri={profilePic}
        name={name}
        designation="React Native Developer"
        onPress={handelPress}
        title={"Apply Leave"}
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
  topContainer: {
    position: "relative",
    zIndex: 1,
    backgroundColor: colors.primary,
    padding: 25,
    paddingBottom: 40,
    elevation: 5,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: colors.light,
    paddingBottom: 5,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.light,
  },
  profileName: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.secondary,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginBottom: 5,
    borderWidth: 3,
    borderColor: colors.light,
  },
  timerBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  timerStyle: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.dark,
  },
  totalStyle: {
    color: colors.light,
    fontSize: 20,
    position: "absolute",
    right: 0,
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "47%",
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.light,
    elevation: 5,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
  },
  btnPressed: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  btnPressedOut: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  bottomContainer: {
    position: "relative",
    zIndex: 2,
    flex: 2,
  },
  btnRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    padding: 15,
  },
});

export default EmployeeDashboard;
