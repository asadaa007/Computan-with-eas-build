import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import TitleHeader from "../../components/TitleHeader";
import { profilePics } from "../../utils/profilePics";
import userNames from "../../utils/userNames";
import { ScrollView } from "react-native-gesture-handler";
import EmployeeList from "../../components/EmployeeList";
import { colors } from "../../utils/colors";
import employeeData from "../../utils/employeeData";
import AddBTN from "../../components/AddBTN";
import CheckIn from "../../components/CheckIn";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaveManagement from "./LeaveManagement";
import PayRoll from "./PayRoll";

const Tab = createBottomTabNavigator();





const handelPress = () => {
  console.log("Button Pressed");
};

const HRManagerDashboard = () => {
  const hrName = userNames.hrmanager.name;
  const hrProfilePic = profilePics.hrmanager;

  const navigation = useNavigation();

  const handleTeam = () => {
    navigation.navigate('Employees');
  };


  <Tab.Navigator
screenOptions={({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;
    if (route.name === 'Overview') {
      iconName = 'ios-information-circle';
    } else if (route.name === 'Reports') {
      iconName = 'ios-list';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
})}
tabBarOptions={{
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
}}
>
<Tab.Screen name="Overview" component={PayRoll} />
<Tab.Screen name="Reports" component={LeaveManagement} />
</Tab.Navigator>

  return (
    <ScrollView style={styles.container}>
      <TitleHeader
        imageUri={hrProfilePic}
        name={hrName}
        designation="Manager HR"
        onPress={handelPress}
        title={"Manage Leaves"}
        />
      <EmployeeList
        employeeData={employeeData}
        headTitle={"Employee Details"}
        onPress={handleTeam}
        />
      <AddBTN title={"Add Employee"} onPress={handelPress} />
        <CheckIn/>
    </ScrollView>
  );
};

export default HRManagerDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
