import { CmPipe } from './cm.pipe';

describe('CmPipe', () => {
  let pipe: CmPipe;

  beforeEach(() => {
    pipe = new CmPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "-" when value is null or undefined', () => {
    expect(pipe.transform(null)).toBe('-');
    expect(pipe.transform(undefined)).toBe('-');
  });

  it('should convert 5dm to "50 cm"', () => {
    // 5 * 10 = 50
    expect(pipe.transform(5)).toBe('50 cm');
  });

  it('should convert 7dm to "70 cm"', () => {
    // 7 * 10 = 70
    expect(pipe.transform(7)).toBe('70 cm');
  });

  it('should convert 0dm to "0 cm"', () => {
    expect(pipe.transform(0)).toBe('0 cm');
  });

  it('should convert a larger value correctly (e.g. 15dm = 150cm)', () => {
    // 15 * 10 = 150
    expect(pipe.transform(15)).toBe('150 cm');
  });
});
