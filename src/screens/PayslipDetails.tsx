import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { colors, fontSizes } from '../constants/theme';
import { downloadPayslip } from '../services/file';
import { formatPeriod } from '../utils/date';

type PayslipDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'PayslipDetails'
>;

type Props = {
  route: PayslipDetailsScreenRouteProp;
};

const PayslipDetailsScreen = ({ route }: Props) => {
  const { payslip } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.text} accessibilityLabel={`ID: ${payslip.id}`}>
          ID: {payslip.id}
        </Text>
        <Text
          style={styles.text}
          accessibilityLabel={`Period: ${formatPeriod(
            payslip.fromDate,
            payslip.toDate,
          )}`}
        >
          Period: {formatPeriod(payslip.fromDate, payslip.toDate)}
        </Text>
        <Text
          style={styles.text}
          accessibilityLabel={`Type: ${payslip.file.split('.').pop()}`}
        >
          File: {payslip.file}
        </Text>
      </View>
      <Button
        title="Download"
        onPress={() => downloadPayslip(payslip.file)}
        color={colors.primary}
        accessibilityLabel="Download"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: fontSizes.medium,
    color: colors.text,
  },
});

export default PayslipDetailsScreen;
