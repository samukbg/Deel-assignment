import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PayslipListScreen from '../screens/PayslipList';
import { usePayslipsStore } from '../store/payslips';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { Payslip } from '../types';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../store/payslips');

const mockUsePayslipsStore = usePayslipsStore as unknown as jest.Mock;

const mockPayslips: Payslip[] = [
  { id: '1', fromDate: '2025-11-01', toDate: '2025-11-30', file: 'sample-payslip.pdf' },
  { id: '2', fromDate: '2025-10-01', toDate: '2025-10-31', file: 'sample-payslip.pdf' },
];

const Stack = createStackNavigator<RootStackParamList>();

const MockedNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="PayslipList" component={PayslipListScreen} options={{title: "Payslips"}}/>
        </Stack.Navigator>
    </NavigationContainer>
);

describe('PayslipListScreen', () => {
  it('renders the list of payslips', () => {
    mockUsePayslipsStore.mockReturnValue({
      payslips: mockPayslips,
      sortPayslips: jest.fn(),
    });

    render(<MockedNavigator />);

    expect(screen.getByText('Nov 01, 2025 - Nov 30, 2025')).toBeTruthy();
    expect(screen.getByText('Oct 01, 2025 - Oct 31, 2025')).toBeTruthy();
  });
});
