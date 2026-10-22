import { useState } from 'react';

import { type FieldConfiguration } from '@/page-layout/types/FieldConfiguration';
import { useCurrentWidget } from '@/page-layout/widgets/hooks/useCurrentWidget';

export const useFieldWidgetCardExpansion = () => {
  const widget = useCurrentWidget();
  const startsExpanded =
    (widget.configuration as FieldConfiguration).startsExpanded === true;
  const [expandedItemId, setExpandedItemId] = useState('');
  const [collapsedItemIds, setCollapsedItemIds] = useState<Set<string>>(
    new Set(),
  );

  const isItemExpanded = (itemId: string) =>
    startsExpanded ? !collapsedItemIds.has(itemId) : expandedItemId === itemId;

  const toggleItem = (itemId: string) => {
    if (startsExpanded) {
      setCollapsedItemIds((previous) => {
        const next = new Set(previous);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        return next;
      });
      return;
    }

    setExpandedItemId((previous) => (previous === itemId ? '' : itemId));
  };

  return { isItemExpanded, toggleItem };
};
