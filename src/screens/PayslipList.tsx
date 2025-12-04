import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePayslipsStore } from '../store/payslips';
import { formatPeriod } from '../utils/date';
import { colors, fontSizes } from '../constants/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { Payslip } from '../types';

type PayslipListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PayslipList'
>;

type Props = {
  navigation: PayslipListScreenNavigationProp;
};

const PayslipListScreen = ({ navigation }: Props) => {
  const { payslips, sortPayslips } = usePayslipsStore();

  const renderItem = ({ item }: { item: Payslip }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('PayslipDetails', { payslip: item })}
      accessibilityLabel={`View details for payslip from ${formatPeriod(item.fromDate, item.toDate)}`}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{formatPeriod(item.fromDate, item.toDate)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sortContainer}>
        <Button title="Recent First" onPress={() => sortPayslips('recent')} color={colors.primary} accessibilityLabel="Sort payslips by most recent first" />
        <Button title="Oldest First" onPress={() => sortPayslips('oldest')} color={colors.primary} accessibilityLabel="Sort payslips by oldest first" />
      </View>
      <FlatList
        data={payslips}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    padding: 20,
  },
  itemText: {
    fontSize: fontSizes.medium,
    color: colors.text,
  },
});

export default PayslipListScreen;
