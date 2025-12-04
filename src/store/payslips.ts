import { create } from 'zustand';
import { Payslip } from '../types';

interface PayslipsState {
  payslips: Payslip[];
  sortPayslips: (order: 'recent' | 'oldest') => void;
}

const mock: Payslip[] = [
  { id: '1', fromDate: '2025-11-01', toDate: '2025-11-30', file: 'sample-payslip.pdf' },
  { id: '2', fromDate: '2025-10-01', toDate: '2025-10-31', file: 'sample-payslip.pdf' },
  { id: '3', fromDate: '2025-09-01', toDate: '2025-09-30', file: 'sample-payslip.pdf' },
  { id: '4', fromDate: '2025-08-01', toDate: '2025-08-31', file: 'sample-payslip.pdf' },
  { id: '5', fromDate: '2025-07-01', toDate: '2025-07-31', file: 'sample-payslip.pdf' },
];

export const usePayslipsStore = create<PayslipsState>((set) => ({
  payslips: mock,
  sortPayslips: (order) =>
    set((state) => ({
      payslips: [...state.payslips].sort((a, b) => {
        const dateA = new Date(a.fromDate).getTime();
        const dateB = new Date(b.fromDate).getTime();
        return order === 'recent' ? dateB - dateA : dateA - dateB;
      }),
    })),
}));
