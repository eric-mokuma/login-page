import React from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  const handlePress = () => {
    Linking.openURL(href)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
})
