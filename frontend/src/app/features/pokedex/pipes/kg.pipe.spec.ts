import { KgPipe } from './kg.pipe';

describe('KgPipe', () => {
  let pipe: KgPipe;

  beforeEach(() => {
    pipe = new KgPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "-" when value is null or undefined', () => {
    expect(pipe.transform(null)).toBe('-');
    expect(pipe.transform(undefined)).toBe('-');
  });

  it('should convert 50hg to "5.0 kg"', () => {
    // 50 / 10 = 5.0
    expect(pipe.transform(50)).toBe('5.0 kg');
  });

  it('should convert 69hg to "6.9 kg"', () => {
    // 69 / 10 = 6.9
    expect(pipe.transform(69)).toBe('6.9 kg');
  });

  it('should convert 0hg to "0.0 kg"', () => {
    expect(pipe.transform(0)).toBe('0.0 kg');
  });

  it('should respect custom decimal precision (e.g., 2 decimals)', () => {
    // 69 / 10 = 6.90
    expect(pipe.transform(69, 2)).toBe('6.90 kg');
  });

  it('should round correctly if necessary', () => {
    // 675 / 10 = 67.5
    expect(pipe.transform(675, 1)).toBe('67.5 kg');
  });
});
