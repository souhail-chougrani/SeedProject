import { TableReducer, initialState } from './table.reducer';

describe('Table Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = TableReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
