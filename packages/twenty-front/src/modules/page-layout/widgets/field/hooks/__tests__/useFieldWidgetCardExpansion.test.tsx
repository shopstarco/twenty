import { useFieldWidgetCardExpansion } from '@/page-layout/widgets/field/hooks/useFieldWidgetCardExpansion';
import { act, renderHook } from '@testing-library/react';

let mockStartsExpanded = false;

jest.mock('@/page-layout/widgets/hooks/useCurrentWidget', () => ({
  useCurrentWidget: () => ({
    configuration: { startsExpanded: mockStartsExpanded },
  }),
}));

describe('useFieldWidgetCardExpansion', () => {
  it('opens one record at a time when the setting is off', () => {
    mockStartsExpanded = false;
    const { result } = renderHook(useFieldWidgetCardExpansion);

    expect(result.current.isItemExpanded('first')).toBe(false);
    act(() => result.current.toggleItem('first'));
    expect(result.current.isItemExpanded('first')).toBe(true);
    act(() => result.current.toggleItem('second'));
    expect(result.current.isItemExpanded('first')).toBe(false);
    expect(result.current.isItemExpanded('second')).toBe(true);
  });

  it('opens every record initially and only collapses the selected record', () => {
    mockStartsExpanded = true;
    const { result } = renderHook(useFieldWidgetCardExpansion);

    expect(result.current.isItemExpanded('first')).toBe(true);
    expect(result.current.isItemExpanded('later-loaded')).toBe(true);
    act(() => result.current.toggleItem('first'));
    expect(result.current.isItemExpanded('first')).toBe(false);
    expect(result.current.isItemExpanded('second')).toBe(true);
    act(() => result.current.toggleItem('first'));
    expect(result.current.isItemExpanded('first')).toBe(true);
  });
});
