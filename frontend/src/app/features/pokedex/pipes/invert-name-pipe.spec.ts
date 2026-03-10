import { InvertNamePipe } from './invert-name-pipe';

describe('InvertNamePipe', () => {
  let pipe: InvertNamePipe;

  beforeEach(() => {
    pipe = new InvertNamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "-" when value is null or undefined', () => {
    expect(pipe.transform(null)).toBe('-');
    expect(pipe.transform(undefined)).toBe('-');
  });

  it('should return "-" when value is an empty string or whitespace', () => {
    expect(pipe.transform('')).toBe('-');
    expect(pipe.transform('   ')).toBe('-');
  });

  it('should invert "bulbasaur" to "ruasablub"', () => {
    expect(pipe.transform('bulbasaur')).toBe('ruasablub');
  });

  it('should invert "Pikachu" to "uhcakiP"', () => {
    expect(pipe.transform('Pikachu')).toBe('uhcakiP');
  });

  it('should invert a single character correctly', () => {
    expect(pipe.transform('a')).toBe('a');
  });
});