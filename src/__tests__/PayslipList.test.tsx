import { usePayslipsStore } from '../store/payslips';

describe('PayslipList', () => {
  it('renders payslips from store', () => {
    const { payslips } = usePayslipsStore.getState();
    expect(payslips).toBeDefined();
    expect(payslips.length).toBeGreaterThan(0);
  });
});
