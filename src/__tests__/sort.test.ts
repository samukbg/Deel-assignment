import { usePayslipsStore } from '../store/payslips';

const mockPayslips = [
  { id: '1', fromDate: '2025-11-01', toDate: '2025-11-30', file: 'sample-payslip.pdf' },
  { id: '2', fromDate: '2025-10-01', toDate: '2025-10-31', file: 'sample-payslip.pdf' },
  { id: '3', fromDate: '2025-12-01', toDate: '2025-12-31', file: 'sample-payslip.pdf' },
];

describe('Payslips Store Sorting', () => {

    beforeEach(() => {
        usePayslipsStore.setState({ payslips: mockPayslips });
    });

  it('sorts payslips by most recent first', () => {
    const { sortPayslips } = usePayslipsStore.getState();
    sortPayslips('recent');
    const { payslips } = usePayslipsStore.getState();

    expect(payslips[0].id).toBe('3');
    expect(payslips[1].id).toBe('1');
    expect(payslips[2].id).toBe('2');
  });

  it('sorts payslips by oldest first', () => {
    const { sortPayslips } = usePayslipsStore.getState();
    sortPayslips('oldest');
    const { payslips } = usePayslipsStore.getState();

    expect(payslips[0].id).toBe('2');
    expect(payslips[1].id).toBe('1');
    expect(payslips[2].id).toBe('3');
  });
});
