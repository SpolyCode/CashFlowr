import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../config/supabase';

const DashboardScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Title style={styles.title}>CashFlowr</Title>
        <Button 
          mode="text" 
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>

      {/* Monthly Overview Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Monatsübersicht</Title>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Verfügbares Guthaben</Text>
            <Text style={styles.balanceAmount}>€2.500,00</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Einnahmen</Text>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>€3.000,00</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Ausgaben</Text>
              <Text style={[styles.statValue, { color: theme.colors.error }]}>€500,00</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Income')}
          style={styles.actionButton}
        >
          Einnahme hinzufügen
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Expenses')}
          style={styles.actionButton}
        >
          Ausgabe hinzufügen
        </Button>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresGrid}>
        <Card
          style={styles.featureCard}
          onPress={() => navigation.navigate('Income')}
        >
          <Card.Content>
            <Title>Einnahmen</Title>
            <Paragraph>Verwalten Sie Ihre Einnahmequellen</Paragraph>
          </Card.Content>
        </Card>

        <Card
          style={styles.featureCard}
          onPress={() => navigation.navigate('Expenses')}
        >
          <Card.Content>
            <Title>Ausgaben</Title>
            <Paragraph>Verfolgen Sie Ihre Ausgaben</Paragraph>
          </Card.Content>
        </Card>

        <Card
          style={styles.featureCard}
          onPress={() => navigation.navigate('Subscriptions')}
        >
          <Card.Content>
            <Title>Abonnements</Title>
            <Paragraph>Verwalten Sie wiederkehrende Zahlungen</Paragraph>
          </Card.Content>
        </Card>

        <Card
          style={styles.featureCard}
          onPress={() => navigation.navigate('Savings')}
        >
          <Card.Content>
            <Title>Sparziele</Title>
            <Paragraph>Verfolgen Sie Ihre Ziele</Paragraph>
          </Card.Content>
        </Card>

        <Card
          style={[styles.featureCard, styles.fullWidthCard]}
          onPress={() => navigation.navigate('FinancialOverview')}
        >
          <Card.Content>
            <Title>Finanzübersicht</Title>
            <Paragraph>Überblick über Ihr Finanzwesen</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginLeft: 8,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 16,
    opacity: 0.7,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    marginBottom: 16,
  },
  fullWidthCard: {
    width: '100%',
  },
});

export default DashboardScreen; 