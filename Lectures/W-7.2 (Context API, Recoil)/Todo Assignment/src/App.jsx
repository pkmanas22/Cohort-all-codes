
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'
import { filteredTodosList } from './store/atoms'
import { useState } from 'react';
import TodoItemCreator from './components/TodoItemCreator';
import TODOItem from './components/TODOItem';
import FilteredTodos from './components/FilteredTodos';
import TodoListsStats from './components/TodoListsStats';

function App() {
  const todoLists = useRecoilValue(filteredTodosList);

  return (
    <>
      < TodoItemCreator />
      < FilteredTodos />
      < TodoListsStats />

      {
        todoLists.map((item) => (
          <TODOItem key={todoLists.indexOf(item)} todo={item} />
        ))
      }
    </>
  )
}




export default App
