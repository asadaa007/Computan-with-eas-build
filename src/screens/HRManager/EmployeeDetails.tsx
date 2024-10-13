// HRManager/EmployeeDetails.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import employeeData from '../../utils/employeeData';


const EmployeeDetails = ({ route, navigation }) => {
  const { employeeId } = route.params;
  const employee = employeeData.find(emp => emp.id === employeeId);
  
  const [editMode, setEditMode] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState(employee);
  

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    // Logic to delete employee from the list
    // Example: employeeData.splice(employeeIndex, 1);
    alert('Employee deleted');
    navigation.goBack(); // Go back to previous screen after deletion
  };

  const handleSave = () => {
    // Logic to update the employeeData
    // Example: update employeeData with updatedEmployee
    alert('Employee updated');
    setEditMode(false);
  };

  const handleListBack = () =>
{
    navigation.navigate('Employees')
}
  return (
    <View style={styles.container}>
      <Image source={{ uri: updatedEmployee.profilePhoto }} style={styles.profileImage} />
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            value={updatedEmployee.name}
            onChangeText={(text) => setUpdatedEmployee({ ...updatedEmployee, name: text })}
            placeholder="Employee Name"
          />
          <TextInput
            style={styles.input}
            value={updatedEmployee.designation}
            onChangeText={(text) => setUpdatedEmployee({ ...updatedEmployee, designation: text })}
            placeholder="Designation"
          />
         {/* Add inputs for other fields like checkInTime, checkOutTime, teamName, etc. */}
          <Button title="Save" onPress={handleSave} />
        </>
      ) : (
        <>
          <View style={styles.mainContainer}>
            <View style={styles.header}>
          <Text style={styles.text}>Name: {updatedEmployee.name}</Text>
          <Text style={styles.text}>Designation: {updatedEmployee.designation}</Text>
            </View>
          <Text style={styles.text}>Team: {updatedEmployee.teamName}</Text>
          <Text style={styles.text}>Shift: {updatedEmployee.shiftTime}</Text>
          <Text style={styles.text}>Working From: {updatedEmployee.workingFrom}</Text>
            {/* Display other employee details */}
          <Button title="Edit" onPress={handleEdit} />
          <Button title="Delete" onPress={handleDelete} />
          <Button title="Back" onPress={handleListBack} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default EmployeeDetails;
