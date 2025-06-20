import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useOAuth,
  useSignIn,
} from '@clerk/clerk-expo'
import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const clerkPubKey =
  'pk_test_c2hhcmluZy1kaW5vc2F1ci05MS5jbGVyay5hY2NvdW50cy5kZXYk'

function SignInForm() {
  const { signIn, setActive } = useSignIn()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSignInPress = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      if (!signIn) throw new Error('SignIn is not ready')
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      })

      if (!setActive) throw new Error('setActive is not ready')
      await setActive({ session: completeSignIn.createdSessionId })
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  const onGoogleSignInPress = async () => {
    try {
      setLoading(true)
      const { createdSessionId, setActive: setOAuthActive } =
        await startOAuthFlow()

      if (createdSessionId && setOAuthActive) {
        setOAuthActive({ session: createdSessionId })
      }
    } catch (err: any) {
      Alert.alert('Error', 'Google sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.signInContainer}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onSignInPress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing In...' : 'Sign In with Email'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={onGoogleSignInPress}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing In...' : 'Sign In with Google'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default function LoginScreen() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <View style={styles.container}>
        <SignedOut>
          <SignInForm />
        </SignedOut>
        <SignedIn>
          <Text style={styles.welcomeText}>Welcome! You are signed in.</Text>
        </SignedIn>
      </View>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  signInContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
  },
})
