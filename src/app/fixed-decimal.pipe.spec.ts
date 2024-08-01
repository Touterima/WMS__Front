import { FixedDecimalPipe } from './fixed-decimal.pipe';

describe('FixedDecimalPipe', () => {
  it('create an instance', () => {
    const pipe = new FixedDecimalPipe();
    expect(pipe).toBeTruthy();
  });
});
