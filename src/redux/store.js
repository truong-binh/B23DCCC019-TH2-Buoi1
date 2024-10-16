import { createStore, combineReducers } from 'redux';

const initialState = {
  todo: {
    tasks: []
  },
  imageSearch: {
    query: '',
    images: []
  },
  randomColor: {
    color: '#000000',
    history: [],
    isAutoChanging: false
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, todo: { ...state.todo, tasks: [...state.todo.tasks, action.payload] } };
    case 'EDIT_TASK':
      return { ...state, todo: { ...state.todo, tasks: state.todo.tasks.map((task, index) => 
        index === action.payload.index ? { ...task, text: action.payload.text } : task
      )}};
    case 'TOGGLE_TASK':
      return { ...state, todo: { ...state.todo, tasks: state.todo.tasks.map((task, index) => 
        index === action.payload ? { ...task, completed: !task.completed } : task
      )}};
    case 'DELETE_TASK':
      return { ...state, todo: { ...state.todo, tasks: state.todo.tasks.filter((_, index) => index !== action.payload) } };
    
    case 'SET_QUERY':
      return { ...state, imageSearch: { ...state.imageSearch, query: action.payload } };
    case 'SET_IMAGES':
      return { ...state, imageSearch: { ...state.imageSearch, images: action.payload } };
    
    case 'SET_COLOR':
      return { ...state, randomColor: { ...state.randomColor, color: action.payload, history: [...state.randomColor.history, action.payload] } };
    case 'TOGGLE_AUTO_CHANGE':
      return { ...state, randomColor: { ...state.randomColor, isAutoChanging: !state.randomColor.isAutoChanging } };
    case 'CLEAR_HISTORY':
      return { ...state, randomColor: { ...state.randomColor, history: [], color: '#000000' } };
    case 'REMOVE_CURRENT_COLOR':
      const newHistory = [...state.randomColor.history];
      newHistory.pop();
      return { 
        ...state, 
        randomColor: { 
          ...state.randomColor, 
          history: newHistory, 
          color: newHistory.length > 0 ? newHistory[newHistory.length - 1] : '#000000' 
        } 
      };
    
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;



