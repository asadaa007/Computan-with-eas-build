import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { Picker } from "@react-native-picker/picker";
import employeeData from "../../utils/employeeData";
import { useNavigation } from "@react-navigation/native";

const EmployeesList = () => {
  const [selectedCalendar, setSelectedCalendar] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const filteredTeamData = employeeData.filter((member) => {
    if (selectedCalendar === "All" && selectedTeam === "All") {
      return true;
    } else if (selectedCalendar !== "All" && selectedTeam === "All") {
      return (
        member.calendarType && member.calendarType.includes(selectedCalendar)
      );
    } else if (selectedCalendar === "All" && selectedTeam !== "All") {
      return member.teamName && member.teamName.includes(selectedTeam);
    } else {
      return (
        member.calendarType &&
        member.calendarType.includes(selectedCalendar) &&
        member.teamName &&
        member.teamName.includes(selectedTeam)
      );
    }
  });

  const handleMemberPress = (member) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.teamName}>
          {selectedTeam === "All" ? "COMPUTAN" : `${selectedTeam} Team`}
        </Text>
        <Text style={styles.managerName}>
          {selectedTeam === "All"
            ? "All Teams"
            : `Team Manager: ${
                employeeData.find((team) => team.teamName === selectedTeam)
                  ?.managerName
              }`}
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <Ionicons
          name="filter"
          size={24}
          color={colors.primary}
          style={styles.filterIcon}
        />
        <Picker
          selectedValue={selectedCalendar}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCalendar(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="PK, Holiday Calendar" value="PK" />
          <Picker.Item label="USA, Holiday Calendar" value="USA" />
        </Picker>
        <Picker
          selectedValue={selectedTeam}
          style={styles.picker}
          onValueChange={(itemValue) => handleTeamChange(itemValue)}
        >
          <Picker.Item label="All Teams" value="All" />
          <Picker.Item label="WordPress" value="WordPress" />
          <Picker.Item
            label="Hubspot Development"
            value="Hubspot Development"
          />
          <Picker.Item label="Shopify/Ecommerce" value="Shopify/Ecommerce" />
          <Picker.Item label=".Net/Azure Team" value=".Net/Azure Team" />
          <Picker.Item label="Devops & Security" value="Devops & Security" />
        </Picker>
      </View>
      <FlatList
        data={filteredTeamData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMemberPress(item)}>
            <View style={styles.teamMember}>
              <Image
                source={{ uri: item.profilePhoto }}
                style={styles.profilePhoto}
              />
              <View style={styles.statusLight} />
              <View style={styles.detailsContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <Text style={styles.designation}>{item.designation}</Text>
                <Text style={styles.calendarType}>
                  Calendar Type: {item.calendarType}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {selectedMember && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.info}
              onPress={
                () =>
                  navigation.navigate("EmployeeDetails", {
                    employeeId: selectedMember.id,
                  }) 
              }
            >
              <FontAwesome5 name="info" size={17} color={colors.light} />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedMember.profilePhoto }}
                style={styles.modalProfilePhoto}
              />
              <Text style={styles.modalName}>{selectedMember.name}</Text>
              <Text style={styles.modalDesignation}>
                {selectedMember.designation}
              </Text>
              <View>
                <Text style={styles.modalManagerName}>
                  Manager Name: {selectedMember.managerName}
                </Text>
                <Text style={styles.modalTeamName}>
                  Team Name: {selectedMember.teamName}
                </Text>
                <Text style={styles.modalShiftTime}>
                  Shift Time: {selectedMember.shiftTime}
                </Text>
                <Text style={styles.modalCheckInTime}>
                  Punch-in: {selectedMember.checkInTime}
                </Text>
                <Text style={styles.modalCheckOutTime}>
                  Punch-out: {selectedMember.checkOutTime}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.msgBtn}
                  onPress={() => {
                    /* handle send message action */
                  }}
                >
                  <Ionicons name="chatbubbles" size={24} color={colors.light} />
                </Pressable>
                <Pressable
                  style={styles.msgBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color={colors.light} />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default EmployeesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray3,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
    margin: 15,
    alignItems: "center",
    elevation: 5,
  },
  teamName: {
    color: colors.light,
    fontSize: 24,
    fontWeight: "bold",
  },
  managerName: {
    color: colors.gray2,
    fontSize: 16,
    marginTop: 5,
  },
  filterContainer: {
    backgroundColor: colors.light,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10,
    padding: 5,
    elevation: 5,
  },
  filterIcon: {
    marginRight: 10,
  },
  picker: {
    height: 50,
    flex: 1,
    color: colors.primary,
  },
  teamMember: {
    backgroundColor: colors.light,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderLeftColor: colors.primary,
    borderLeftWidth: 5,
    elevation: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  statusLight: {
    position: "absolute",
    left: 50,
    bottom: 25,
    width: 15,
    height: 15,
    backgroundColor: colors.success,
    borderRadius: 7,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
  },
  designation: {
    fontSize: 16,
    color: colors.gray2,
  },
  calendarType: {
    fontSize: 14,
    color: colors.lightGray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  info: {
    position: "relative",
    zIndex: 2,
    top: 45,
    right: -120,
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  modalContent: {
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    width: 300,
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalProfilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  modalDesignation: {
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 10,
  },
  modalTeamName: {
    fontSize: 16,
    color: colors.gray2,
    marginBottom: 10,
  },
  modalShiftTime: {
    fontSize: 16,
    color: colors.gray2,
    marginBottom: 10,
  },
  modalCheckInTime: {
    fontSize: 16,
    color: colors.gray2,
    marginBottom: 10,
  },
  modalCheckOutTime: {
    fontSize: 16,
    color: colors.gray2,
    marginBottom: 20,
  },
  modalManagerName: {
    fontSize: 16,
    color: colors.gray2,
    fontWeight: "500",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  msgBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  btnText: {
    color: colors.light,
  },
});
