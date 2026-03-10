import { KgConverterPipe } from './kg-converter-pipe';

describe('KgConverterPipe', () => {
  const pipe = new KgConverterPipe();

  it('debería convertir 69hg a 6.9 kg', () => {
    expect(pipe.transform(69)).toBe('6.9 kg');
  });

  it('debería manejar valores 0', () => {
    expect(pipe.transform(0)).toBe('0.0 kg');
  });
});
