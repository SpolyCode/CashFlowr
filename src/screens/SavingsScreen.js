import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, TextInput, Button, List, useTheme, Text, ProgressBar } from 'react-native-paper';
import { format, addMonths } from 'date-fns';

const SavingsScreen = () => {
  const theme = useTheme();
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    monthlySavings: '',
  });

  // Mock data - in a real app, this would come from your database
  const savingsGoals = [
    {
      id: '1',
      name: 'New Laptop',
      targetAmount: 1500,
      currentAmount: 750,
      monthlySavings: 250,
      startDate: new Date(),
      estimatedCompletionDate: addMonths(new Date(), 3),
    },
    {
      id: '2',
      name: 'Vacation',
      targetAmount: 3000,
      currentAmount: 1200,
      monthlySavings: 300,
      startDate: new Date(),
      estimatedCompletionDate: addMonths(new Date(), 6),
    },
  ];

  const handleAddGoal = () => {
    // In a real app, this would save to your database
    console.log('Adding new savings goal:', newGoal);
    setNewGoal({
      name: '',
      targetAmount: '',
      monthlySavings: '',
    });
  };

  const calculateProgress = (current, target) => {
    return current / target;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Add New Goal Form */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add New Savings Goal</Title>
          <TextInput
            label="Goal Name"
            value={newGoal.name}
            onChangeText={(text) => setNewGoal({ ...newGoal, name: text })}
            style={styles.input}
          />
          <TextInput
            label="Target Amount"
            value={newGoal.targetAmount}
            onChangeText={(text) => setNewGoal({ ...newGoal, targetAmount: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Monthly Savings"
            value={newGoal.monthlySavings}
            onChangeText={(text) => setNewGoal({ ...newGoal, monthlySavings: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleAddGoal}
            style={styles.addButton}
          >
            Add Goal
          </Button>
        </Card.Content>
      </Card>

      {/* Savings Goals List */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Your Savings Goals</Title>
          {savingsGoals.map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <Text style={styles.goalAmount}>
                  €{goal.currentAmount.toFixed(2)} / €{goal.targetAmount.toFixed(2)}
                </Text>
              </View>
              <ProgressBar
                progress={calculateProgress(goal.currentAmount, goal.targetAmount)}
                color={theme.colors.primary}
                style={styles.progressBar}
              />
              <View style={styles.goalDetails}>
                <Text style={styles.goalDetail}>
                  Monthly: €{goal.monthlySavings.toFixed(2)}
                </Text>
                <Text style={styles.goalDetail}>
                  Target: {format(goal.estimatedCompletionDate, 'MMM yyyy')}
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Monthly Summary */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Monthly Summary</Title>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Monthly Savings</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
              €{savingsGoals.reduce((sum, goal) => sum + goal.monthlySavings, 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Saved</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
              €{savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0).toFixed(2)}
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
  goalItem: {
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalAmount: {
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  goalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalDetail: {
    fontSize: 12,
    opacity: 0.7,
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

export default SavingsScreen; 