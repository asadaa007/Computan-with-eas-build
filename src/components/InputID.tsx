import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import {FontAwesome } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const InputID = ({value, onChangeText, placeHolder}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeHolder}
                    placeholderTextColor={colors.lightGray}
                    value={value}
                    onChangeText={onChangeText}
                />
                <FontAwesome name="id-card" size={24} color={colors.primary} style={styles.icon} />
            </View>
    </View>
  )
}

export default InputID

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        marginBottom: 20,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        color: colors.primary,
    },
    icon: {
        marginLeft: 10,
    },
})