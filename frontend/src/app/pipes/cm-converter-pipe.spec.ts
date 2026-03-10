import { CmConverterPipe } from './cm-converter-pipe';

describe('CmConverterPipe', () => {
  const pipe = new CmConverterPipe();

  it('debería convertir 7dm a 70 cm', () => {
    expect(pipe.transform(7)).toBe('70 cm');
  });

  it('debería manejar valores 0', () => {
    expect(pipe.transform(0)).toBe('0 cm');
  });
});
