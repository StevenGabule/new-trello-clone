import { Column } from './Column';
import { AppContainer } from './style';
import { useAppState } from './state/AppStateContext';
import { AddNewItem } from './AddNewItem';
import { CustomDragLayer } from './CustomDragLayer';
import { addList } from './state/actions';

const App = () => {
  const {lists, dispatch} = useAppState()
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map(list => <Column text={list.text} key={list.id} id={list.id} />)}
      <AddNewItem toggleButtonText='+ add another list' onAdd={text => dispatch(addList(text))} />
    </AppContainer>
  );
}

export default App;