import { createContext, Dispatch, FC, ReactNode, useContext } from "react";
import { Action } from "./actions";
import { AppState, appStateReducer, List, Task } from "./appStateReducer";
import {useImmerReducer} from 'use-immer'
import { DragItem } from "../DragItem";

type AppStateContextProps = {
  draggedItem: DragItem | null
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>
};

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
  draggedItem: null
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const {lists, draggedItem} = state;

  const getTasksByListId = (id: string) => lists.find((list) => list.id === id)?.tasks || [];
  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch, draggedItem }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext)
}