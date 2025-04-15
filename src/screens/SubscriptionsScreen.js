import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, TextInput, Button, List, useTheme, Text, Chip } from 'react-native-paper';
import { format, addDays } from 'date-fns';

const SubscriptionsScreen = () => {
  const theme = useTheme();
  const [newSubscription, setNewSubscription] = useState({
    name: '',
    amount: '',
    paymentDate: new Date(),
    frequency: 'monthly',
  });

  // Mock data - in a real app, this would come from your database
  const subscriptions = [
    {
      id: '1',
      name: 'Netflix',
      amount: 15.99,
      paymentDate: addDays(new Date(), 5),
      frequency: 'monthly',
    },
    {
      id: '2',
      name: 'Spotify',
      amount: 9.99,
      paymentDate: addDays(new Date(), 10),
      frequency: 'monthly',
    },
  ];

  const frequencies = ['monthly', 'yearly'];

  const handleAddSubscription = () => {
    // In a real app, this would save to your database
    console.log('Adding new subscription:', newSubscription);
    setNewSubscription({
      name: '',
      amount: '',
      paymentDate: new Date(),
      frequency: 'monthly',
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Add New Subscription Form */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add New Subscription</Title>
          <TextInput
            label="Name"
            value={newSubscription.name}
            onChangeText={(text) => setNewSubscription({ ...newSubscription, name: text })}
            style={styles.input}
          />
          <TextInput
            label="Amount"
            value={newSubscription.amount}
            onChangeText={(text) => setNewSubscription({ ...newSubscription, amount: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.frequencyContainer}>
            {frequencies.map((frequency) => (
              <Chip
                key={frequency}
                selected={newSubscription.frequency === frequency}
                onPress={() => setNewSubscription({ ...newSubscription, frequency })}
                style={styles.chip}
              >
                {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
              </Chip>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={handleAddSubscription}
            style={styles.addButton}
          >
            Add Subscription
          </Button>
        </Card.Content>
      </Card>

      {/* Subscriptions List */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Active Subscriptions</Title>
          {subscriptions.map((subscription) => (
            <List.Item
              key={subscription.id}
              title={subscription.name}
              description={`Next payment: ${format(subscription.paymentDate, 'MMM d, yyyy')} • ${subscription.frequency}`}
              right={() => (
                <Text style={[styles.amount, { color: theme.colors.error }]}>
                  €{subscription.amount.toFixed(2)}
                </Text>
              )}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Monthly Summary */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Monthly Summary</Title>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Monthly Subscriptions</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.error }]}>
              €{subscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Next Payment Due</Text>
            <Text style={styles.summaryValue}>
              {format(
                subscriptions.reduce((min, sub) => 
                  sub.paymentDate < min ? sub.paymentDate : min, 
                  new Date()
                ),
                'MMM d, yyyy'
              )}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
  },
  addButton: {
    marginTop: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubscriptionsScreen; 