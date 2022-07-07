import { useAppState } from './../state/AppStateContext';
import { DragItem } from "../DragItem";
import { useDrag } from 'react-dnd';
import { setDraggedItem } from '../state/actions';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react';

/**
 * @NOTES
 * @type - it will be CARD or COLUMN
 • @item - returns dragged item object and dispatches the SET_DRAGGED_ITEM action
 • @end - is called when we release the item
 * */ 

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState()
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item))
      return item;
    },
    end: () => dispatch(setDraggedItem(null))
  })

  useEffect(() => {
    preview(getEmptyImage(), {captureDraggingState: true})
  }, [preview])

  return { drag }
}