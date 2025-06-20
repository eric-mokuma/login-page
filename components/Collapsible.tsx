import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
}

export function Collapsible({ title, children }: CollapsibleProps) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <Text style={styles.title}>
          {title} {collapsed ? '+' : '-'}
        </Text>
      </TouchableOpacity>
      {!collapsed && <View style={styles.content}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
    paddingLeft: 8,
  },
})
