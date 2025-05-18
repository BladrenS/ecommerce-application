import { renderHook } from '@testing-library/react';

import { useLoginSubmitting } from './useLoginSubmitting';

jest.mock('../../../api/CommerceToolsService');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('useLoginSubmitting', () => {
  it('initial state', () => {
    const { result } = renderHook(() => useLoginSubmitting());
    expect(result.current.loading).toBe(false);
    expect(result.current.errors).toEqual({});
    // isValid зависит от формы, можно проверить тип boolean
    expect(typeof result.current.isValid).toBe('boolean');
  });
});
