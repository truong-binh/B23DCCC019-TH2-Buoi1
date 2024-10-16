import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoList from './components/TodoList';
import ImageSearch from './components/ImageSearch';
import RandomColor from './components/RandomColor';
import './App.css'; 

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <TodoList />
                <ImageSearch />
                <RandomColor />
            </div>
        </Provider>
    );
}

export default App;
