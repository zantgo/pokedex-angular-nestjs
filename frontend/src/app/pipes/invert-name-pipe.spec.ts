import { InvertNamePipe } from './invert-name-pipe';

describe('InvertNamePipe', () => {
  const pipe = new InvertNamePipe();

  it('debería invertir el nombre y ponerlo en mayúsculas', () => {
    expect(pipe.transform('bulbasaur')).toBe('RUASABLUB');
  });

  it('debería retornar cadena vacía si el input es null', () => {
    expect(pipe.transform('')).toBe('');
  });
});
