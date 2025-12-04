import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PayslipListScreen from '../screens/PayslipList';
import PayslipDetailsScreen from '../screens/PayslipDetails';
import { Payslip } from '../types';

export type RootStackParamList = {
  PayslipList: undefined;
  PayslipDetails: { payslip: Payslip };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PayslipList">
        <Stack.Screen name="PayslipList" component={PayslipListScreen} options={{ title: 'Payslips' }} />
        <Stack.Screen name="PayslipDetails" component={PayslipDetailsScreen} options={{ title: 'Payslip Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
