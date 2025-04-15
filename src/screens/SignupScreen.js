import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

const SignupScreen = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignup = () => {
    // TODO: Implement signup logic
    if (password !== confirmPassword) {
      // TODO: Show error message
      return;
    }
    console.log('Registrierungsversuch mit:', email, password);
    navigation.replace('Dashboard');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logo, { color: theme.colors.primary }]}>CashFlowr</Text>
        <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
          Konto erstellen
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          label="E-Mail"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Passwort"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? 'eye' : 'eye-off'}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
          style={styles.input}
        />

        <TextInput
          label="Passwort bestätigen"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry={secureTextEntry}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSignup}
          style={styles.signupButton}
        >
          Registrieren
        </Button>

        <View style={styles.loginContainer}>
          <Text style={{ color: theme.colors.onBackground }}>
            Bereits ein Konto?{' '}
          </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          >
            Anmelden
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  signupButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButton: {
    marginLeft: -8,
  },
});

export default SignupScreen; 