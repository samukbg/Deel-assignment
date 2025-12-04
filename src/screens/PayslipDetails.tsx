import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { colors, fontSizes } from '../constants/theme';
import { downloadPayslip, getFilePath } from '../services/file';
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

  const handlePreview = async () => {
    try {
      const filePath = await getFilePath(payslip.file);
      const uri = Platform.OS === 'android' ? `file://${filePath}` : filePath;
      await Linking.openURL(uri);
    } catch (error) {
      console.error('Preview error:', error);
      Alert.alert('Error', 'Failed to open payslip');
    }
  };

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
      <View style={styles.buttonContainer}>
        <Button
          title="Preview"
          onPress={handlePreview}
          color={colors.primary}
          accessibilityLabel="Preview payslip"
        />
        <Button
          title="Download"
          onPress={() => downloadPayslip(payslip.file)}
          color={colors.primary}
          accessibilityLabel="Download payslip"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: fontSizes.medium,
    color: colors.text,
    marginBottom: 8,
  },
  buttonContainer: {
    gap: 10,
  },
});

export default PayslipDetailsScreen;
