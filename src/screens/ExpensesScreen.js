import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, TextInput, Button, List, useTheme, Text, Chip } from 'react-native-paper';
import { format } from 'date-fns';

const ExpensesScreen = () => {
  const theme = useTheme();
  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    category: '',
  });

  // Mock data - in a real app, this would come from your database
  const expenses = [
    {
      id: '1',
      amount: 1200,
      description: 'Rent',
      category: 'Housing',
      date: new Date(),
    },
    {
      id: '2',
      amount: 200,
      description: 'Groceries',
      category: 'Food',
      date: new Date(),
    },
  ];

  const categories = ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Other'];

  const handleAddExpense = () => {
    // In a real app, this would save to your database
    console.log('Adding new expense:', newExpense);
    setNewExpense({ amount: '', description: '', category: '' });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Add New Expense Form */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add New Expense</Title>
          <TextInput
            label="Amount"
            value={newExpense.amount}
            onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={newExpense.description}
            onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
            style={styles.input}
          />
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <Chip
                key={category}
                selected={newExpense.category === category}
                onPress={() => setNewExpense({ ...newExpense, category })}
                style={styles.chip}
              >
                {category}
              </Chip>
            ))}
          </View>
          <Button
            mode="contained"
            onPress={handleAddExpense}
            style={styles.addButton}
          >
            Add Expense
          </Button>
        </Card.Content>
      </Card>

      {/* Expenses List */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Recent Expenses</Title>
          {expenses.map((expense) => (
            <List.Item
              key={expense.id}
              title={expense.description}
              description={`${format(expense.date, 'MMM d, yyyy')} • ${expense.category}`}
              right={() => (
                <Text style={[styles.amount, { color: theme.colors.error }]}>
                  -€{expense.amount.toFixed(2)}
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
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.error }]}>
              €{expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.categoryBreakdown}>
            {categories.map((category) => {
              const categoryTotal = expenses
                .filter((expense) => expense.category === category)
                .reduce((sum, expense) => sum + expense.amount, 0);
              
              if (categoryTotal > 0) {
                return (
                  <View key={category} style={styles.categoryItem}>
                    <Text style={styles.categoryLabel}>{category}</Text>
                    <Text style={[styles.categoryValue, { color: theme.colors.error }]}>
                      €{categoryTotal.toFixed(2)}
                    </Text>
                  </View>
                );
              }
              return null;
            })}
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
  categoryContainer: {
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
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryBreakdown: {
    marginTop: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
  },
  categoryValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExpensesScreen; 