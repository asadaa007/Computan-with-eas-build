import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const OverTimeScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    setManagerName('');
    setProjectName('');
    setReason('');
    Alert.alert(
      "Overtime Request Submitted",
      `Project Name: ${projectName}\nManager Name: ${managerName}\nDate: ${date.toDateString()}\nStart Time: ${startTime.toLocaleTimeString()}\nEnd Time: ${endTime.toLocaleTimeString()}\nReason: ${reason}`
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Overtime Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Project Name"
        value={projectName}
        onChangeText={setProjectName}
      />
      <TextInput
        style={styles.input}
        placeholder="Manager Name"
        value={managerName}
        onChangeText={setManagerName}
      />
      <View style={styles.selectContainer}>
        <View style={styles.dateTimeContainer}>
          <Ionicons
            name="calendar"
            size={24}
            color={colors.primary}
            onPress={() => setShowDatePicker(true)}
          />
          <Text style={styles.dateText} onPress={() => setShowDatePicker(true)}>
            {date.toDateString()}
          </Text>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
        <View style={styles.dateTimeContainer}>
          <Ionicons
            name="time"
            size={24}
            color={colors.primary}
            onPress={() => setShowStartTimePicker(true)}
          />
          <Text
            style={styles.dateText}
            onPress={() => setShowStartTimePicker(true)}
          >
            {startTime.toLocaleTimeString()}
          </Text>
        </View>
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowStartTimePicker(false);
              if (selectedTime) {
                setStartTime(selectedTime);
              }
            }}
          />
        )}
        <View style={styles.dateTimeContainer}>
          <Ionicons
            name="time"
            size={24}
            color={colors.primary}
            onPress={() => setShowEndTimePicker(true)}
          />
          <Text
            style={styles.dateText}
            onPress={() => setShowEndTimePicker(true)}
          >
            {endTime.toLocaleTimeString()}
          </Text>
        </View>
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowEndTimePicker(false);
              if (selectedTime) {
                setEndTime(selectedTime);
              }
            }}
          />
        )}
      </View>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Reason for Overtime"
        value={reason}
        onChangeText={setReason}
        multiline
      />
      <Pressable onPress={handleSubmit} style={styles.btnSubmit}>
        <Text style={styles.submitText}>Submit Request</Text>
      </Pressable>
    </View>
  );
};

export default OverTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.gray3,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: colors.secondary,
    borderLeftWidth:5,
    borderLeftColor:colors.primary,
  },
  selectContainer:{
    backgroundColor:colors.light,
    padding:20,
    marginBottom:20,
    borderRadius: 10,
    borderLeftWidth:5,
    borderLeftColor:colors.primary,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: colors.secondary,
    marginLeft: 30,
  },
  btnSubmit: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: "center",
    borderRadius:10,
  },
  submitText: {
    color: colors.light,
    fontSize: 18,
  },
});
