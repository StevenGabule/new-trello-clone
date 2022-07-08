import { createContext, Dispatch, ReactNode, useContext, useEffect } from "react";
import { Action } from "./actions";
import { AppState, appStateReducer, List, Task } from "./appStateReducer";
import {useImmerReducer} from 'use-immer'
import { DragItem } from "../DragItem";
import { withInitialState } from "./withInitialState";
import { save } from "../api";

type AppStateContextProps = {
  draggedItem: DragItem | null
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>
};

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

type AppStateProviderProps = {
  children: ReactNode;
  initialState: AppState
}

export const AppStateProvider = withInitialState<AppStateProviderProps>(({ children, initialState }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

  useEffect(() => {
    save(state)
  }, [state])

  const {lists, draggedItem} = state;
  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }
  
  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch, draggedItem }}>
      {children}
    </AppStateContext.Provider>
  );
});

export const useAppState = () => useContext(AppStateContext)