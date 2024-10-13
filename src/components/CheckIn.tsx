import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import * as Location from 'expo-location';

const CheckIn = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLocation(address[0]);
    })();
  }, []);

  const handlePunchIn = () => {
    const currentTime = new Date();
    if (isPunchedIn) {
      setIsPunchedIn(false);
      setPunchOutTime(currentTime);
      setTimeout(() => {
        setPunchInTime(null);
        setPunchOutTime(null);
      }, 15000);
    } else {
      setIsPunchedIn(true);
      setPunchInTime(currentTime);
    }
  };

  const formatTime = (time) => {
    if (!time) return '__:__:__';
    const hours = `0${time.getHours()}`.slice(-2);
    const minutes = `0${time.getMinutes()}`.slice(-2);
    const seconds = `0${time.getSeconds()}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.row}>
          <Text style={styles.leftText}>Punch In</Text>
          <Text style={styles.rightText}>Punch Out</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.timerText}>
            {formatTime(punchInTime)}
          </Text>
          <Text style={styles.timerText2}>
            {formatTime(punchOutTime)}
          </Text>
        </View>
        {location && (
          <View style={styles.singleRow}>
            <Ionicons name="location" size={24} color={colors.primary} />
            <Text style={styles.locationText}>
              {location.city}, {location.country}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity
          style={[
            styles.button,
            isPunchedIn && styles.dangerButton,
          ]}
          onPress={handlePunchIn}
        >
          <Ionicons name="finger-print" size={24} color={colors.light} />
          <Text style={styles.buttonText}>
            {isPunchedIn ? 'Punch Out' : 'Punch In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.light,
    marginVertical: 15,
    elevation: 5,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
  },
  leftColumn: {
    flex: 1.5,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingRight: 40,
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  singleRow: {
    flex: 2,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    gap:5,
  },
  leftText: {
    fontSize: 16,
    color: colors.primary,
  },
  rightText: {
    fontSize: 16,
    color: colors.primary,
  },
  timerText: {
    fontSize: 16,
    color: colors.primary,
  },
  timerText2: {
    fontSize: 16,
    color: colors.primary,
  },
  locationText: {
    fontSize: 16,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
    color: colors.light,
  },
});

export default CheckIn;
