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

  it('should transform "bulbasaur" to "BULBASAUR"', () => {
    expect(pipe.transform('bulbasaur')).toBe('BULBASAUR');
  });

  it('should keep "PIKACHU" as "PIKACHU"', () => {
    expect(pipe.transform('PIKACHU')).toBe('PIKACHU');
  });

  it('should transform "charizard" correctly regardless of current case', () => {
    expect(pipe.transform('charizard')).toBe('CHARIZARD');
  });
});
