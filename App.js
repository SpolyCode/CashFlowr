import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import IncomeScreen from './src/screens/IncomeScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import SubscriptionsScreen from './src/screens/SubscriptionsScreen';
import SavingsScreen from './src/screens/SavingsScreen';
import FinancialOverviewScreen from './src/screens/FinancialOverviewScreen';

const Stack = createNativeStackNavigator();

// Custom dark theme
const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Dashboard"
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                contentStyle: {
                  backgroundColor: theme.colors.background,
                },
              }}
            >
              <Stack.Screen 
                name="Dashboard" 
                component={DashboardScreen}
                options={{ title: 'Übersicht' }}
              />
              <Stack.Screen 
                name="Income" 
                component={IncomeScreen}
                options={{ title: 'Einnahmen' }}
              />
              <Stack.Screen 
                name="Expenses" 
                component={ExpensesScreen}
                options={{ title: 'Ausgaben' }}
              />
              <Stack.Screen 
                name="Subscriptions" 
                component={SubscriptionsScreen}
                options={{ title: 'Abonnements' }}
              />
              <Stack.Screen 
                name="Savings" 
                component={SavingsScreen}
                options={{ title: 'Sparen' }}
              />
              <Stack.Screen 
                name="FinancialOverview" 
                component={FinancialOverviewScreen}
                options={{ title: 'Finanzübersicht' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
}); 