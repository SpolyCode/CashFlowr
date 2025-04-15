import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../lib/AuthContext';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={signOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 