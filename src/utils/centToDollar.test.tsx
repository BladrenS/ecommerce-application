import { centToDollar } from './centToDollar';

describe('centToDollar', () => {
  test('возвращает пустую строку если cents не передан', () => {
    expect(centToDollar()).toBe('');
  });

  test('возвращает пустую строку если cents равен 0', () => {
    expect(centToDollar(0)).toBe('');
  });

  test('конвертирует центы в доллары с правильным форматированием', () => {
    expect(centToDollar(1)).toBe('$0.01');
    expect(centToDollar(10)).toBe('$0.10');
    expect(centToDollar(100)).toBe('$1.00');
    expect(centToDollar(123_456)).toBe('$1,234.56');
  });
});
