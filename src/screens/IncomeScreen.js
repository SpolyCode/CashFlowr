import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, TextInput, Button, List, useTheme, Text } from 'react-native-paper';
import { format } from 'date-fns';

const IncomeScreen = () => {
  const theme = useTheme();
  const [newIncome, setNewIncome] = useState({
    amount: '',
    description: '',
    frequency: 'monthly',
  });

  // Mock data - in a real app, this would come from your database
  const incomeSources = [
    {
      id: '1',
      amount: 3000,
      description: 'Salary',
      frequency: 'monthly',
      date: new Date(),
    },
    {
      id: '2',
      amount: 500,
      description: 'Freelance Work',
      frequency: 'one-time',
      date: new Date(),
    },
  ];

  const handleAddIncome = () => {
    // In a real app, this would save to your database
    console.log('Adding new income:', newIncome);
    setNewIncome({ amount: '', description: '', frequency: 'monthly' });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Add New Income Form */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add New Income</Title>
          <TextInput
            label="Amount"
            value={newIncome.amount}
            onChangeText={(text) => setNewIncome({ ...newIncome, amount: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={newIncome.description}
            onChangeText={(text) => setNewIncome({ ...newIncome, description: text })}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleAddIncome}
            style={styles.addButton}
          >
            Add Income
          </Button>
        </Card.Content>
      </Card>

      {/* Income List */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Income Sources</Title>
          {incomeSources.map((income) => (
            <List.Item
              key={income.id}
              title={income.description}
              description={`${format(income.date, 'MMM d, yyyy')} • ${income.frequency}`}
              right={() => (
                <Text style={[styles.amount, { color: theme.colors.primary }]}>
                  €{income.amount.toFixed(2)}
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
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
              €{incomeSources.reduce((sum, income) => sum + income.amount, 0).toFixed(2)}
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

export default IncomeScreen; 