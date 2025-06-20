import { StyleSheet, Text, TextProps } from 'react-native'

const styles = StyleSheet.create({
  default: {
    color: '#222',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  defaultSemiBold: {
    fontWeight: '600',
  },
})

const typeStyles = {
  title: styles.title,
  subtitle: styles.subtitle,
  link: styles.link,
  defaultSemiBold: styles.defaultSemiBold,
}

type ThemedTextProps = TextProps & {
  type?: keyof typeof typeStyles
  style?: any
}

export function ThemedText({ type, style, ...props }: ThemedTextProps) {
  return (
    <Text
      style={[styles.default, type ? typeStyles[type] : null, style]}
      {...props}
    />
  )
}
