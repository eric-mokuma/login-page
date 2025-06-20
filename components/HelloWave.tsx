import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function HelloWave() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>👋</Text>
      <Text style={styles.text}>Hello, welcome!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  emoji: {
    fontSize: 48,
  },
  text: {
    fontSize: 18,
    marginTop: 8,
  },
})
