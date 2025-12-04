import { formatPeriod } from '../utils/date';

describe('formatPeriod', () => {
  it('should format the date period correctly', () => {
    const fromDate = '2025-11-01';
    const toDate = '2025-11-30';
    expect(formatPeriod(fromDate, toDate)).toBe('Nov 01, 2025 - Nov 30, 2025');
  });
});
