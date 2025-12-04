import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
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
  const [filterText, setFilterText] = useState('');

  const filteredPayslips = useMemo(() => {
    if (!filterText.trim()) {
      return payslips;
    }
    const searchText = filterText.toLowerCase();
    return payslips.filter(payslip => {
      const period = formatPeriod(payslip.fromDate, payslip.toDate);
      return (
        payslip.id.toLowerCase().includes(searchText) ||
        period.toLowerCase().includes(searchText) ||
        payslip.file.toLowerCase().includes(searchText)
      );
    });
  }, [payslips, filterText]);

  const renderItem = ({ item }: { item: Payslip }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PayslipDetails', { payslip: item })}
      accessibilityLabel={`Detail for ${formatPeriod(
        item.fromDate,
        item.toDate,
      )}`}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {formatPeriod(item.fromDate, item.toDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Filter payslips..."
        value={filterText}
        onChangeText={setFilterText}
        accessibilityLabel="Filter payslips by text"
      />
      <View style={styles.sortContainer}>
        <Button
          title="Recent First"
          onPress={() => sortPayslips('recent')}
          color={colors.primary}
          accessibilityLabel="Sort payslips by most recent first"
        />
        <Button
          title="Oldest First"
          onPress={() => sortPayslips('oldest')}
          color={colors.primary}
          accessibilityLabel="Sort payslips by oldest first"
        />
      </View>
      <FlatList
        data={filteredPayslips}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    fontSize: fontSizes.medium,
    color: colors.text,
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
