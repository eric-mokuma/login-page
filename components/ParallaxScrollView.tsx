import React from 'react'
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native'

interface ParallaxScrollViewProps extends ViewProps {
  children: React.ReactNode
  headerBackgroundColor?: { light: string; dark: string }
  headerImage?: React.ReactNode
}

export function ParallaxScrollView({
  children,
  style,
  headerBackgroundColor,
  headerImage,
  ...props
}: ParallaxScrollViewProps) {
  return (
    <ScrollView style={[styles.container, style]} {...props}>
      <View
        style={[
          styles.parallaxHeader,
          { backgroundColor: headerBackgroundColor?.light || '#eee' },
        ]}
      >
        {headerImage}
      </View>
      {children}
    </ScrollView>
  )
}

export default ParallaxScrollView

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parallaxHeader: {
    height: 150,
    backgroundColor: '#eee',
  },
})
