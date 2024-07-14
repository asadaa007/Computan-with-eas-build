import React, { useContext, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet, Modal, Pressable } from "react-native";
import ManagerDashboard from "../screens/Manager/ManagerDashboard";
import TeamsList from "../screens/Manager/TeamsList";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { AuthContext } from "../context/AuthContext";
import { profilePics } from "../utils/profilePics";
import { colors } from "../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Drawer = createDrawerNavigator();

const ManagerDrawer = () => {
  const { user } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <View style={styles.container}>
      <Drawer.Navigator
        initialRouteName="ManagerDashboard"
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.primary,
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.light,
          drawerActiveTintColor: colors.primary,
          drawerLabelStyle: {
            color: colors.secondary,
          },
          headerRight: () => (
            <View style={styles.headerIcons}>
              <Pressable onPress={toggleChat}>
                <Ionicons
                  name="chatbubbles"
                  size={24}
                  color={colors.light}
                  style={styles.notificationIcon}
                />
              </Pressable>
              <Pressable onPress={toggleNotifications}>
                <Ionicons
                  name="notifications"
                  size={24}
                  color={colors.light}
                  style={styles.notificationIcon}
                />
              </Pressable>
            </View>
          ),
        }}
        drawerContent={(props) => (
          <CustomDrawerContent {...props}>
            {user && (
              <View style={styles.profileContainer}>
                <Image
                  source={{ uri: profilePics[user.role] }}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>{user.role} User</Text>
              </View>
            )}
          </CustomDrawerContent>
        )}
      >
        <Drawer.Screen
          name="Dashboard"
          options={{
            drawerLabel: "Home",
            title: "Dashboard",
            drawerIcon: () => (
              <AntDesign name="home" size={20} color={colors.dark} />
            ),
          }}
          component={ManagerDashboard}
        />
        <Drawer.Screen
          name="TeamsList"
          options={{
            drawerLabel: "WordPress Team",
            title: "WordPress Team",
            drawerIcon: () => (
              <AntDesign name="team" size={20} color={colors.dark} />
            ),
          }}
          component={TeamsList}
        />
      </Drawer.Navigator>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showNotifications}
        onRequestClose={toggleNotifications}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <Pressable
                onPress={toggleNotifications}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.notficationArea}>
              <Text>No new notifications</Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal // New chat modal
        animationType="slide"
        transparent={true}
        visible={showChat}
        onRequestClose={toggleChat}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.modalTitle}>Chat</Text>
              <Pressable onPress={toggleChat} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.notficationArea}>
              <Text>No new chats</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationIcon: {
    marginRight: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.light,
    borderRadius: 10,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginRight: 20,
  },
  notificationIcon: {
    paddingHorizontal: 5,
  },
  notificationHeader: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
  },
  notficationArea: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.light,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.secondary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ManagerDrawer;
