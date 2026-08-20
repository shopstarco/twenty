import { useState } from 'react';

import { type FieldConfiguration } from '@/page-layout/types/FieldConfiguration';
import { useCurrentWidget } from '@/page-layout/widgets/hooks/useCurrentWidget';

// A card collapses its related records by default and opens one at a time, so
// tracking the single open record is enough. Once the widget is configured to
// start expanded that inverts: every record is open, including ones the "Show
// more" button loads later, so what has to be tracked is which ones the user
// has since closed - and closing one must not reopen the rest.
export const useFieldWidgetCardExpansion = () => {
  const widget = useCurrentWidget();

  const startsExpanded =
    (widget.configuration as FieldConfiguration | undefined)?.startsExpanded ===
    true;

  const [expandedItemId, setExpandedItemId] = useState('');
  const [collapsedItemIds, setCollapsedItemIds] = useState<Set<string>>(
    new Set(),
  );

  const isItemExpanded = (itemId: string) =>
    startsExpanded ? !collapsedItemIds.has(itemId) : expandedItemId === itemId;

  const toggleItem = (itemId: string) => {
    if (startsExpanded) {
      setCollapsedItemIds((previousCollapsedItemIds) => {
        const nextCollapsedItemIds = new Set(previousCollapsedItemIds);

        if (nextCollapsedItemIds.has(itemId)) {
          nextCollapsedItemIds.delete(itemId);
        } else {
          nextCollapsedItemIds.add(itemId);
        }

        return nextCollapsedItemIds;
      });

      return;
    }

    setExpandedItemId((previousExpandedItemId) =>
      previousExpandedItemId === itemId ? '' : itemId,
    );
  };

  return { isItemExpanded, toggleItem };
};
