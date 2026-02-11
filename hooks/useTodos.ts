import { useReducer } from 'react';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

type Action =
  | { type: 'ADD_TASK'; text: string }
  | { type: 'TOGGLE_TASK'; id: string }
  | { type: 'REMOVE_TASK'; id: string };

function todoReducer(state: Task[], action: Action): Task[] {
  if (action.type === 'ADD_TASK') {
    const newTask: Task = {
      id: Date.now().toString(),
      text: action.text,
      done: false
    };
    return [...state, newTask];
  }
  
  if (action.type === 'TOGGLE_TASK') {
    return state.map(task => {
      if (task.id === action.id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
  }
  
  if (action.type === 'REMOVE_TASK') {
    return state.filter(task => task.id !== action.id);
  }
  
  return state;
}

export function useTodos() {
  const [tasks, dispatch] = useReducer(todoReducer, []);

  function addTask(text: string) {
    dispatch({ type: 'ADD_TASK', text });
  }

  function toggleTask(id: string) {
    dispatch({ type: 'TOGGLE_TASK', id });
  }

  function removeTask(id: string) {
    dispatch({ type: 'REMOVE_TASK', id });
  }

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask
  };
}