import {equal} from 'assert';
import {indexFunction} from './index';

describe('Typescript usage suite', () => {
  it('should be able to execute a test', () => {
    equal(true, true);
  });
  it('should return expected string', () => {
    equal(indexFunction('incoming'), 'incoming-static');
  });
});
