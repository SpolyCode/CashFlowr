import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Title, useTheme, Text, ProgressBar } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const FinancialOverviewScreen = () => {
  const theme = useTheme();

  // Mock data - in a real app, this would come from your database
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    income: [3000, 3200, 3100, 3300, 3400, 3500],
    expenses: [2500, 2600, 2700, 2800, 2900, 3000],
  };

  const currentMonth = {
    income: 3500,
    expenses: 3000,
    savings: 500,
    subscriptions: 200,
  };

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.colors.primary,
    labelColor: (opacity = 1) => theme.colors.onSurface,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Monthly Trends */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Monthly Trends</Title>
          <LineChart
            data={{
              labels: monthlyData.labels,
              datasets: [
                {
                  data: monthlyData.income,
                  color: (opacity = 1) => theme.colors.primary,
                  strokeWidth: 2,
                },
                {
                  data: monthlyData.expenses,
                  color: (opacity = 1) => theme.colors.error,
                  strokeWidth: 2,
                },
              ],
            }}
            width={Dimensions.get('window').width - 48}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Current Month Overview */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Current Month</Title>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Income</Text>
            <Text style={[styles.overviewValue, { color: theme.colors.primary }]}>
              €{currentMonth.income.toFixed(2)}
            </Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Expenses</Text>
            <Text style={[styles.overviewValue, { color: theme.colors.error }]}>
              €{currentMonth.expenses.toFixed(2)}
            </Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Savings</Text>
            <Text style={[styles.overviewValue, { color: theme.colors.primary }]}>
              €{currentMonth.savings.toFixed(2)}
            </Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Subscriptions</Text>
            <Text style={[styles.overviewValue, { color: theme.colors.error }]}>
              €{currentMonth.subscriptions.toFixed(2)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Budget Progress */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Budget Progress</Title>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Monthly Budget</Text>
            <ProgressBar
              progress={currentMonth.expenses / currentMonth.income}
              color={theme.colors.error}
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>
              {((currentMonth.expenses / currentMonth.income) * 100).toFixed(1)}% used
            </Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Savings Goal</Text>
            <ProgressBar
              progress={currentMonth.savings / 1000}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>
              {((currentMonth.savings / 1000) * 100).toFixed(1)}% of €1,000 goal
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Financial Health */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Financial Health</Title>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>Savings Rate</Text>
            <Text style={[styles.healthValue, { color: theme.colors.primary }]}>
              {((currentMonth.savings / currentMonth.income) * 100).toFixed(1)}%
            </Text>
          </View>
          <View style={styles.healthItem}>
            <Text style={styles.healthLabel}>Subscription Ratio</Text>
            <Text style={[styles.healthValue, { color: theme.colors.error }]}>
              {((currentMonth.subscriptions / currentMonth.income) * 100).toFixed(1)}%
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  overviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overviewLabel: {
    fontSize: 16,
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressItem: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
  },
  healthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthLabel: {
    fontSize: 16,
  },
  healthValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinancialOverviewScreen; 