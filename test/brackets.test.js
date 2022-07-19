import doBracketsBalance from '../src/brackets_balance';

describe('test evaluate ', () => {

  test('undefined input', () => {
    const resp = doBracketsBalance();
    expect(resp).toBe(false);
  });

  test('bad input', () => {
    const input = 'function test ([a,b,c])=>[] ( )}';
    const resp = doBracketsBalance(input);
    expect(resp).toBe(false);
  });

  test('clean input', () => {
    const input = 'abcdefg123456';
    const resp = doBracketsBalance(input);
    expect(resp).toBe(true);
  });

  test('fine input with last text', () => {
    const input = 'function test ([a,b,c])=>{ ( )} text here';
    const resp = doBracketsBalance(input);
    expect(resp).toBe(true);
  });

  test('blank string', () => {
    const input = '                     ';
    const resp = doBracketsBalance(input);
    console.log(resp)
    expect(resp).toBe(true);
  });

  test('fine input with last text and blank', () => {
    const input = 'function test ([a,b,c])=>{ ( )} text here    ';
    const resp = doBracketsBalance(input);
    expect(resp).toBe(true);
  });

  test('fine input', () => {
    const input = 'function test ([a,b,c])=>{ ( )}';
    const resp = doBracketsBalance(input);
    expect(resp).toBe(true);
  });
});